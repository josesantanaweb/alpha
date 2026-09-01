import type { ReactElement } from "react";
import { Input } from "@/modules/shared/components/ui";
import type { CheckoutFormData, FormErrors } from "../types";

type ContactFormProps = {
  values: Pick<CheckoutFormData, "firstName" | "lastName" | "email" | "phone">;
  errors: FormErrors;
  onChange: <K extends keyof CheckoutFormData>(field: K, value: string) => void;
};

export const ContactForm = ({
  values,
  errors,
  onChange,
}: ContactFormProps): ReactElement => (
  <section className="flex flex-col gap-4">
    <h4 className="text-base font-semibold text-white">Datos de Contacto</h4>

    <div className="flex items-start gap-3">
      <Input
        placeholder="Ej: John"
        label="Nombre"
        type="text"
        value={values.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
        error={errors.firstName}
      />
      <Input
        placeholder="Ej: Doe"
        label="Apellido"
        type="text"
        value={values.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
        error={errors.lastName}
      />
    </div>

    <Input
      placeholder="Ej: johndoe@gmail.com"
      label="Correo electrónico"
      type="email"
      value={values.email}
      onChange={(e) => onChange("email", e.target.value)}
      error={errors.email}
    />

    <Input
      placeholder="Ej: +58 412 000 0000"
      label="Teléfono / WhatsApp"
      type="tel"
      value={values.phone}
      onChange={(e) => onChange("phone", e.target.value)}
      error={errors.phone}
    />
  </section>
);
