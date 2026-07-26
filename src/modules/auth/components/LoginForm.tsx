"use client";
import { type FormEvent, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo, Input, Button } from "@/modules/shared/components/ui";
import Link from "next/link";
import Image from "next/image";
import { login } from "@/lib/api/auth";
import { ROUTES } from "@/constants";
import { LoginSchema } from "@/modules/auth/schema";

export const Login = (): ReactElement => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const hasErrors = !!emailError || !!passwordError;
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

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setGeneralError("");
    if (touched.email || val.length > 0) {
      setEmailError(validateEmail(val));
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setGeneralError("");
    if (touched.password || val.length > 0) {
      setPasswordError(validatePassword(val));
    }
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setEmailError(validateEmail(email));
    } else {
      setPasswordError(validatePassword(password));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setGeneralError("");

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setGeneralError(result.message ?? "Correo o contraseña no válidos");
      if (result.errors) {
        if (result.errors.email?.[0]) setEmailError(result.errors.email[0]);
        if (result.errors.password?.[0]) setPasswordError(result.errors.password[0]);
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

        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <Input
              placeholder="tu@correo.com"
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => handleBlur("email")}
              error={emailError}
            />
            <Input
              placeholder="••••••••"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={passwordError}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-body hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          {generalError && (
            <div className="w-full bg-error/5 p-4 text-center text-sm font-medium text-error">
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