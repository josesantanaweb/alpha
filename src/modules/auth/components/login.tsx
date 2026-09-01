"use client";

import {
  Suspense,
  useEffect,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/constants";
import { completeGoogleLogin, login, loginWithGoogle } from "@/lib/api/auth";
import { Button, Input, Logo } from "@/modules/shared/components/ui";
import { LoginSchema } from "@/modules/auth/schema";

export const Login = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
};

const LoginContent = (): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState(() =>
    searchParams.get("error") ? "No se pudo iniciar sesión con Google" : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get("redirect");
  const postLoginRoute =
    redirect === "checkout" ? ROUTES.CHECKOUT : ROUTES.HOME;

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      completeGoogleLogin(token).then((success) => {
        if (success) {
          router.replace(postLoginRoute);
        } else {
          setGeneralError("No se pudo iniciar sesión con Google");
          router.replace(ROUTES.LOGIN);
        }
      });
    } else if (error) {
      router.replace(ROUTES.LOGIN);
    }
  }, [searchParams, router, postLoginRoute]);

  const hasErrors = !!errors.email || !!errors.password;
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (val: string) => {
    const res = LoginSchema.shape.email.safeParse(val);
    if (!res.success) {
      return res.error.issues[0].message;
    }
    return "";
  };

  const validatePassword = (val: string) => {
    const res = LoginSchema.shape.password.safeParse(val);
    if (!res.success) {
      return res.error.issues[0].message;
    }
    return "";
  };

  const validators = { email: validateEmail, password: validatePassword };

  const handleFieldChange = (field: "email" | "password", val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setGeneralError("");
    if (touched[field] || val.length > 0) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](val) }));
    }
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validators[field](formData[field]),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setGeneralError("");

    const nextErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      router.push(postLoginRoute);
    } else {
      setGeneralError(result.message ?? "Correo o contraseña no válidos");
      if (result.errors) {
        setErrors((prev) => ({
          email: result.errors?.email?.[0] ?? prev.email,
          password: result.errors?.password?.[0] ?? prev.password,
        }));
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden p-5">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/presentation.png"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/presentation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80" />
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

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          <div className="flex w-full flex-col items-center gap-5">
            <Input
              placeholder="tu@correo.com"
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
            />
            <Input
              placeholder="••••••••"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-body transition-colors hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          {generalError && (
            <div className="bg-error/5 text-error w-full p-4 text-center text-sm font-medium">
              {generalError}
            </div>
          )}

          <Link
            href={ROUTES.REGISTER}
            className="flex w-full justify-end text-base text-white underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="flex w-full flex-col items-center gap-6">
            <Button type="submit" disabled={isSubmitting || hasErrors}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <div className="relative flex w-full items-center justify-center">
              <span className="bg-stroke block h-px w-full" />
              <p className="bg-canvas absolute top-0 left-1/2 z-10 flex h-10 w-10 -translate-1/2 items-center justify-center text-base font-semibold text-white uppercase">
                O
              </p>
            </div>
            <Button variant="secondary" type="button" onClick={loginWithGoogle}>
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
              <Link
                href={ROUTES.REGISTER}
                className="text-base font-bold text-white"
              >
                Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
