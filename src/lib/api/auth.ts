"use client";
import { useAuth, type User } from "@/stores/auth";

export async function initialize() {
  const { token, clearSession } = useAuth.getState();

  if (!token) {
    useAuth.setState({ isLoading: false });
    return;
  }

  try {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      clearSession();
      useAuth.setState({ isLoading: false });
      window.location.href = "/";
      return;
    }

    const user = (await res.json()) as User;
    useAuth.setState({ user, isLoading: false });
  } catch {
    clearSession();
    useAuth.setState({ isLoading: false });
  }
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Error al iniciar sesión",
      };
    }
    useAuth.getState().setSession(data.user, data.token);
    return { success: true };
  } catch {
    return { success: false, message: "Error de conexión" };
  }
}

export async function logout() {
  useAuth.getState().clearSession();
  window.location.href = "/";
}