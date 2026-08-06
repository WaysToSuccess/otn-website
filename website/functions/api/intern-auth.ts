import { getSecret, sign, TOKEN_TTL_MS, type InternEnv } from './_intern-shared'

export const onRequestPost: PagesFunction<InternEnv> = async ({ request, env }) => {
  const body = await request.json().catch(() => null) as { password?: unknown } | null
  const password = typeof body?.password === 'string' ? body.password : ''

  const { password: expected, secret } = getSecret(env)
  if (password !== expected) {
    return Response.json({ ok: false }, { status: 401 })
  }

  const expires = Date.now() + TOKEN_TTL_MS
  const payload = String(expires)
  const sig = await sign(secret, payload)
  return Response.json({ ok: true, token: `${payload}.${sig}` })
}
