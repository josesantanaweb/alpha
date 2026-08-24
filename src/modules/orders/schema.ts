import { z } from "zod";

export const DeliveryMethodEnum = z.enum(["DELIVERY", "PICKUP"], {
  errorMap: () => ({ message: "Método de entrega inválido" }),
});

export const PaymentCurrencyEnum = z.enum(["VES", "USD"], {
  errorMap: () => ({ message: "Moneda de pago inválida" }),
});

export const PaymentProviderEnum = z.enum(
  ["MOBILE_PAYMENT", "BINANCE", "ZINLI"],
  {
    errorMap: () => ({ message: "Método de pago inválido" }),
  }
);

const orderItemSchema = z.object({
  perfumeId: z.string().uuid("perfumeId inválido"),
  decantId: z.string().uuid("decantId inválido").optional(),
  quantity: z.number().int().positive("La cantidad debe ser mayor a 0"),
});

export const CreateOrderSchema = z.object({
  deliveryMethod: DeliveryMethodEnum,
  paymentCurrency: PaymentCurrencyEnum,
  paymentProvider: PaymentProviderEnum,
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  city: z.string().optional().default(""),
  address: z.string().optional().default(""),
  items: z.array(orderItemSchema).min(1, "El carrito está vacío"),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
