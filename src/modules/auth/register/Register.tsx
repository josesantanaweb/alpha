"use client";
import type { ReactElement } from "react";
import { Logo, Input, Button } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/constants";

export const Register = (): ReactElement => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url('/images/auth-bg.png')] bg-cover bg-center bg-no-repeat p-5">
      <div className="absolute inset-0 bg-canvas/60" />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6">
        <Logo />

        <div className="flex w-full flex-col items-start">
          <h3 className="text-xl font-bold text-white">
            Registra tu cuenta.
          </h3>
          <p className="text-body text-base">
            Estamos encantados de tenerte con nosotros.
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <Input placeholder="Tu nombre" label="Nombre" />
            <Input placeholder="tu@correo.com" label="Correo electrónico" />
            <Input placeholder="••••••••" label="Contraseña" />
          </div>

          <div className="flex w-full flex-col items-center gap-6">
            <Button>Regístrate</Button>
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
              Regístrate con Google
            </Button>
            <div className="flex items-center justify-center gap-2.5">
              <p className="text-base text-white">¿Ya tienes cuenta?</p>
              <Link href={ROUTES.LOGIN} className="text-base font-bold text-white">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
