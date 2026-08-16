import type { ReactElement } from "react";
import { Truck, Store } from "lucide-react";
import { Button } from "@/modules/shared/components/ui";
import type { DeliveryMethod } from "../types";

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
        variant={value === "delivery" ? "primary" : "secondary"}
        onClick={() => onChange("delivery")}
        className="capitalize"
      >
        <Truck size={16} className="text-inherit" />
        Delivery
      </Button>

      <Button
        variant={value === "pickup" ? "primary" : "secondary"}
        onClick={() => onChange("pickup")}
        className="capitalize"
      >
        <Store size={16} className="text-inherit" />
        Retiro
      </Button>
    </div>
  </section>
);
