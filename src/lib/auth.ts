import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const TOKEN_EXPIRATION = process.env.AUTH_TOKEN_EXPIRATION || "1h";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET no está definida en .env");
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: {
  userId: string;
  email: string;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(TOKEN_EXPIRATION)
    .setIssuedAt()
    .sign(getSecret());
}

export async function verifyToken(
  token: string
): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export function getTokenFromHeaders(request: NextRequest): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}
