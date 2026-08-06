import { getSecret, sign, type InternEnv } from './_intern-shared'

export const onRequestPost: PagesFunction<InternEnv> = async ({ request, env }) => {
  const body = await request.json().catch(() => null) as { token?: unknown } | null
  const token = typeof body?.token === 'string' ? body.token : ''

  const [payload, sig] = token.split('.')
  if (!payload || !sig) {
    return Response.json({ ok: false })
  }

  const { secret } = getSecret(env)
  const expectedSig = await sign(secret, payload)
  if (sig !== expectedSig || Date.now() > Number(payload)) {
    return Response.json({ ok: false })
  }

  return Response.json({ ok: true })
}
