export const DeliveryMethod = {
  DELIVERY: "DELIVERY",
  PICKUP: "PICKUP",
} as const;

export type DeliveryMethod =
  (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export const PaymentCurrency = {
  VES: "VES",
  USD: "USD",
} as const;

export type PaymentCurrency =
  (typeof PaymentCurrency)[keyof typeof PaymentCurrency];

export const PaymentProvider = {
  MOBILE_PAYMENT: "MOBILE_PAYMENT",
  BINANCE: "BINANCE",
  ZINLI: "ZINLI",
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];

export const DELIVERY_METHOD_LABELS: Record<DeliveryMethod, string> = {
  [DeliveryMethod.DELIVERY]: "Delivery",
  [DeliveryMethod.PICKUP]: "Retiro en tienda",
};

export const PAYMENT_PROVIDER_LABELS: Record<PaymentProvider, string> = {
  [PaymentProvider.MOBILE_PAYMENT]: "Pago Móvil",
  [PaymentProvider.BINANCE]: "Binance Pay",
  [PaymentProvider.ZINLI]: "Zinli",
};

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
  deliveryMethod: DeliveryMethod.DELIVERY,
  paymentCurrency: PaymentCurrency.VES,
  paymentProvider: PaymentProvider.MOBILE_PAYMENT,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
};
