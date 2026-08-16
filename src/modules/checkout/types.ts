export type DeliveryMethod = "delivery" | "pickup";
export type PaymentCurrency = "ves" | "usd";
export type PaymentProvider = "pago_movil" | "binance" | "zinli";

export interface CheckoutFormData {
  deliveryMethod: DeliveryMethod;
  paymentCurrency: PaymentCurrency;
  paymentProvider: PaymentProvider;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

export type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export const INITIAL_FORM: CheckoutFormData = {
  deliveryMethod: "delivery",
  paymentCurrency: "ves",
  paymentProvider: "pago_movil",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
};


