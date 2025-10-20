import { SignJWT, jwtVerify } from "jose";

const secret_key = "ALKIRA"

const secret = new TextEncoder().encode(secret_key);

export async function signJwt(
  payload: Record<string, string>,
  expiresIn: string = "12h"
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
