import type { ReactElement } from "react";
import { Store, Truck } from "lucide-react";
import { Button } from "@/modules/shared/components/ui";
import { DELIVERY_METHOD_LABELS, DeliveryMethod } from "../types";

type DeliveryMethodSelectorProps = {
  value: DeliveryMethod;
  onChange: (method: DeliveryMethod) => void;
};

export const DeliveryMethodSelector = ({
  value,
  onChange,
}: DeliveryMethodSelectorProps): ReactElement => (
  <section className="flex flex-col gap-3">
    <h4 className="text-lg font-semibold text-white">1. Método de entrega</h4>

    <div className="flex w-full items-center gap-3">
      <Button
        variant={value === DeliveryMethod.DELIVERY ? "primary" : "secondary"}
        onClick={() => onChange(DeliveryMethod.DELIVERY)}
        className="capitalize"
      >
        <Truck size={16} className="text-inherit" />
        {DELIVERY_METHOD_LABELS[DeliveryMethod.DELIVERY]}
      </Button>

      <Button
        variant={value === DeliveryMethod.PICKUP ? "primary" : "secondary"}
        onClick={() => onChange(DeliveryMethod.PICKUP)}
        className="capitalize"
      >
        <Store size={16} className="text-inherit" />
        {DELIVERY_METHOD_LABELS[DeliveryMethod.PICKUP]}
      </Button>
    </div>
  </section>
);
