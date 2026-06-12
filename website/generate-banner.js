import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, ".env");
const outputPath = join(__dirname, "public", "assets", "volkslauf-bg.png");

function loadEnvFile(filePath) {
  let raw;

  try {
    raw = readFileSync(filePath, "utf8");
  } catch (error) {
    throw new Error(`Konnte die .env-Datei nicht lesen: ${filePath}`, { cause: error });
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

async function main() {
  loadEnvFile(envPath);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY wurde in der .env-Datei nicht gefunden.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt =
    "A modern, clean web banner for a running event called '51. O.T.N. Volkslauf'. Happy people running on a track near a sports field in Germany, dynamic and professional atmosphere, dominant color accent #003399, high-quality photography, 16:9 aspect ratio.";

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image",
    contents: prompt,
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      responseFormat: {
        image: {
          aspectRatio: "16:9",
          imageSize: "2K",
        },
      },
    },
  });

  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((part) => part?.inlineData?.data);

  if (!imagePart?.inlineData?.data) {
    throw new Error("Die API-Antwort enthielt kein Bild zum Speichern.");
  }

  const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, imageBuffer);

  console.log(`Bild gespeichert: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
