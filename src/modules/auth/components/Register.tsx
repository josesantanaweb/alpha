"use client";
import { type FormEvent, useState, type ReactElement, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo, Input, Button } from "@/modules/shared/components/ui";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/constants";
import { register, loginWithGoogle } from "@/lib/api/auth";
import { RegisterSchema } from "@/modules/auth/schema";

export const Register = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
};

const RegisterContent = (): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const redirect = searchParams.get("redirect");
  const postRegisterRoute = redirect === "checkout" ? ROUTES.CHECKOUT : ROUTES.HOME;

  const hasErrors = !!errors.name || !!errors.email || !!errors.password;
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateName = (val: string) => {
    const res = RegisterSchema.shape.name.safeParse(val);
    if (!res.success) {
      return res.error.issues[0].message;
    }
    return "";
  };

  const validateEmail = (val: string) => {
    const res = RegisterSchema.shape.email.safeParse(val);
    if (!res.success) {
      return res.error.issues[0].message;
    }
    return "";
  };

  const validatePassword = (val: string) => {
    const res = RegisterSchema.shape.password.safeParse(val);
    if (!res.success) {
      return res.error.issues[0].message;
    }
    return "";
  };

  const validators = { name: validateName, email: validateEmail, password: validatePassword };

  const handleFieldChange = (field: "name" | "email" | "password", val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setGeneralError("");
    if (touched[field] || val.length > 0) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](val) }));
    }
  };

  const handleBlur = (field: "name" | "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    setGeneralError("");

    const nextErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.password) {
      return;
    }

    setIsSubmitting(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      router.push(postRegisterRoute);
    } else {
      setGeneralError(result.message ?? "No se pudo completar el registro");
      if (result.errors) {
        setErrors((prev) => ({
          name: result.errors?.name?.[0] ?? prev.name,
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
            Registra tu cuenta.
          </h3>
          <p className="text-body text-base">
            Estamos encantados de tenerte con nosotros.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <Input
              placeholder="Tu nombre"
              label="Nombre"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              error={errors.name}
            />
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

          <div className="flex w-full flex-col items-center gap-6">
            <Button type="submit" disabled={isSubmitting || hasErrors}>
              {isSubmitting ? "Registrando..." : "Regístrate"}
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
              Regístrate con Google
            </Button>
            <div className="flex items-center justify-center gap-2.5">
              <p className="text-base text-white">¿Ya tienes cuenta?</p>
              <Link
                href={redirect ? `${ROUTES.LOGIN}?redirect=${redirect}` : ROUTES.LOGIN}
                className="text-base font-bold text-white"
              >
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
