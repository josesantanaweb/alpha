"use client";
import { type FormEvent, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Logo, Input, Button } from "@/modules/shared/components/ui";
import Link from "next/link";
import Image from "next/image";
import { login } from "@/lib/api/auth";
import { ROUTES } from "@/constants";

export const Login = (): ReactElement => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.message ?? "Error al iniciar sesión");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url('/images/auth-bg.png')] bg-cover bg-center bg-no-repeat p-5">
      <div className="absolute inset-0 bg-canvas/60" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6">
        <Logo />

        <div className="flex w-full flex-col items-start">
          <h3 className="text-xl font-bold text-white">
            Inicia sesión con tu cuenta.
          </h3>
          <p className="text-body text-base">
            Bienvenido de nuevo, se te ha echado de menos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <Input
              placeholder="tu@correo.com"
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="••••••••"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-error">{error}</p>
          )}

          <Link
            href={ROUTES.REGISTER}
            className="flex w-full justify-end text-base text-white underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="flex w-full flex-col items-center gap-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <div className="relative flex w-full items-center justify-center">
              <span className="bg-stroke block h-px w-full" />
              <p className="bg-canvas absolute top-0 left-1/2 z-10 flex h-10 w-10 -translate-1/2 items-center justify-center text-base font-semibold text-white uppercase">
                O
              </p>
            </div>
            <Button variant="secondary" type="button">
              <Image
                src="/images/google.png"
                width={50}
                height={50}
                className="h-6 w-6"
                alt="google"
              />
              Iniciar sesión con Google
            </Button>
            <div className="flex items-center justify-center gap-2.5">
              <p className="text-base text-white">¿No tienes cuenta?</p>
              <Link href={ROUTES.REGISTER} className="text-base font-bold text-white">
                Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};