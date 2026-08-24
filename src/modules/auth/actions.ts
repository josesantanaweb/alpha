import "server-only";

import { db } from "@/lib/db";

import { signToken, verifyToken, getTokenFromHeaders } from "@/lib/auth";
import { RegisterSchema, LoginSchema } from "./schema";
import { ApiResult } from "@/modules/shared/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

type UserWithoutPassword = Omit<User, "password">;

function sanitizeUser(user: User): UserWithoutPassword {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
}

export async function register(input: unknown): Promise<ApiResult<{ user: UserWithoutPassword; token: string }>> {
  const parsed = RegisterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de registro inválidos",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { email, password, name } = parsed.data;

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return {
        success: false,
        status: 409,
        message: "Ya existe un usuario con ese email",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { email, password: passwordHash, name },
    });

    const token = await signToken({ userId: user.id, email: user.email });

    return { success: true, status: 201, data: { user: sanitizeUser(user), token } };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al registrar usuario",
    };
  }
}

export async function login(input: unknown): Promise<ApiResult<{ user: UserWithoutPassword; token: string }>> {
  const parsed = LoginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      message: "Datos de inicio de sesión inválidos",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return {
        success: false,
        status: 401,
        message: "Email o contraseña incorrectos",
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        success: false,
        status: 401,
        message: "Email o contraseña incorrectos",
      };
    }

    const token = await signToken({ userId: user.id, email: user.email });

    return { success: true, status: 200, data: { user: sanitizeUser(user), token } };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al iniciar sesión",
    };
  }
}

export async function getMe(request: NextRequest): Promise<ApiResult<UserWithoutPassword>> {
  const token = getTokenFromHeaders(request);
  if (!token) {
    return { success: false, status: 401, message: "Token no proporcionado" };
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return { success: false, status: 401, message: "Token inválido o expirado" };
  }

  try {
    const user = await db.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    return { success: true, status: 200, data: sanitizeUser(user) };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error al obtener perfil",
    };
  }
}

export function getGoogleAuthUrl(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error("Google OAuth no configurado (GOOGLE_CLIENT_ID o GOOGLE_REDIRECT_URI faltantes)");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function googleCallback(code: string): Promise<ApiResult<{ user: UserWithoutPassword; token: string }>> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return {
      success: false,
      status: 500,
      message: "Google OAuth no configurado en el servidor",
    };
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      return {
        success: false,
        status: 400,
        message: "Error al obtener token de Google",
      };
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userResponse.json();
    if (!userResponse.ok || !googleUser.email) {
      return {
        success: false,
        status: 400,
        message: "Error al obtener perfil de Google",
      };
    }

    const user = await db.user.upsert({
      where: { googleId: googleUser.id },
      update: {
        email: googleUser.email,
        name: googleUser.name || null,
        avatar: googleUser.picture || null,
      },
      create: {
        email: googleUser.email,
        googleId: googleUser.id,
        name: googleUser.name || null,
        avatar: googleUser.picture || null,
      },
    });

    const token = await signToken({ userId: user.id, email: user.email });

    return { success: true, status: 200, data: { user: sanitizeUser(user), token } };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Error en autenticación con Google",
    };
  }
}