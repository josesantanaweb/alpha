"use client";
import type { ReactElement } from "react";
import { Logo, Input, Button } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

export const Login = (): ReactElement => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url('/images/auth-bg.png')] bg-cover bg-center bg-no-repeat p-5">
      <div className="absolute inset-0 bg-canvas/60" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10">
        <Logo />

        <div className="flex w-full flex-col items-start">
          <h3 className="text-xl font-bold text-white">
            Inicia sesión con tu cuenta.
          </h3>
          <p className="text-body text-base">
            Bienvenido de nuevo, se te ha echado de menos.
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <Input placeholder="tu@correo.com" label="Correo electrónico" />
            <Input placeholder="••••••••" label="Contraseña" />
          </div>
          <Link
            href="/login"
            className="flex w-full justify-end text-base text-white underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="flex w-full flex-col items-center gap-6">
            <Button>Iniciar sesión</Button>
            <div className="relative flex w-full items-center justify-center">
              <span className="bg-stroke block h-px w-full" />
              <p className="bg-canvas absolute top-0 left-1/2 z-10 flex h-10 w-10 -translate-1/2 items-center justify-center text-base font-semibold text-white uppercase">
                O
              </p>
            </div>
            <Button variant="secondary">
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
              <Link href="/register" className="text-base font-bold text-white">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
