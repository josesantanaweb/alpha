"use client";
import { useAuth, type User } from "@/modules/auth/store";
import { useCartStore } from "@/modules/cart/store";
import { addCartItem } from "@/lib/api/cart";
import { API_ROUTES } from "@/constants";

async function syncGuestCartToServer(token: string) {
  const guestItems = useCartStore.getState().items;
  if (guestItems.length === 0) return;

  await Promise.allSettled(
    guestItems.map((item) =>
      addCartItem(
        token,
        item.perfumeId,
        item.perfume.decantId ?? undefined,
        item.quantity,
      ),
    ),
  );
}

export async function initialize() {
  const { token, clearSession } = useAuth.getState();

  if (!token) {
    useAuth.setState({ isLoading: false });
    return;
  }

  try {
    const res = await fetch(API_ROUTES.AUTH.ME, {
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
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[] | undefined> }> {
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
        errors: data.errors,
      };
    }
    useAuth.getState().setSession(data.user, data.token);
    await syncGuestCartToServer(data.token);
    return { success: true };
  } catch {
    return { success: false, message: "Error de conexión" };
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string; errors?: Record<string, string[] | undefined> }> {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Error al registrar usuario",
        errors: data.errors,
      };
    }
    useAuth.getState().setSession(data.user, data.token);
    await syncGuestCartToServer(data.token);
    return { success: true };
  } catch {
    return { success: false, message: "Error de conexión" };
  }
}

export async function logout() {
  useAuth.getState().clearSession();
  useCartStore.getState().clearCart();
  window.location.href = "/";
}

export function loginWithGoogle() {
  window.location.href = API_ROUTES.AUTH.GOOGLE;
}

export async function completeGoogleLogin(token: string): Promise<boolean> {
  try {
    const res = await fetch(API_ROUTES.AUTH.ME, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return false;

    const user = (await res.json()) as User;
    useAuth.getState().setSession(user, token);
    await syncGuestCartToServer(token);
    return true;
  } catch {
    return false;
  }
}
