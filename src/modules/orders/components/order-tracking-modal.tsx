"use client";

import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin, MessageCircle, Package, Truck, X } from "lucide-react";
import type { OrderWithItems } from "@/modules/orders/types";
import { supportUrl } from "../utils/order-labels";

const TRACKING_STEPS: { icon: typeof Package; label: string }[] = [
  { icon: Package, label: "Pedido confirmado" },
  { icon: Truck, label: "En camino" },
  { icon: Check, label: "Entregado" },
];

const ORDER_TRACKING_STATUS: OrderWithItems["status"][] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
];

interface OrderTrackingModalProps {
  order: OrderWithItems | null;
  onClose: () => void;
}

export const OrderTrackingModal = ({
  order,
  onClose,
}: OrderTrackingModalProps): ReactElement | null => {
  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="bg-canvas/60 fixed inset-0 z-100 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-surface border-stroke fixed right-0 left-0 bottom-0 z-101 mx-auto flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl"
          >
            <div className="flex items-center justify-between border-b border-stroke p-4">
              <h4 className="text-lg font-semibold text-white">Seguimiento</h4>
              <button
                onClick={onClose}
                className="text-body cursor-pointer hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto p-4">
              <div className="border-stroke bg-canvas flex flex-col gap-1 rounded-lg border p-3">
                <p className="text-sm font-semibold text-white">
                  Orden #{order.id.slice(0, 8)}
                </p>
                <p className="text-body text-xs">
                  {order.items.map((i) => i.perfume.name).join(", ")}
                </p>
              </div>

              <div className="flex flex-col gap-0 pt-2">
                {TRACKING_STEPS.map((step, index) => {
                  const currentIndex =
                    order.status === "CANCELLED"
                      ? 0
                      : ORDER_TRACKING_STATUS.indexOf(order.status);
                  const done = index <= currentIndex;
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                            done
                              ? "border-primary bg-primary text-surface"
                              : "border-stroke bg-surface text-body"
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        {index < TRACKING_STEPS.length - 1 && (
                          <div
                            className={`w-px flex-1 ${
                              index < currentIndex ? "bg-primary" : "bg-stroke"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p
                          className={`text-sm ${
                            done ? "text-white" : "text-body"
                          }`}
                        >
                          {step.label}
                        </p>
                        {done && (
                          <p className="text-body text-xs">
                            {new Date(order.createdAt).toLocaleDateString(
                              "es-VE",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {order.status === "CANCELLED" && (
                <div className="bg-error/10 border-error/30 rounded-lg border p-3">
                  <p className="text-error text-xs">
                    Esta orden fue cancelada. Si tienes dudas, contáctanos por
                    soporte.
                  </p>
                </div>
              )}

              {order.status === "PENDING" && (
                <div className="border-stroke bg-surface/70 flex items-center gap-2 rounded-lg border p-3">
                  <MapPin size={16} className="text-body" />
                  <p className="text-body text-xs">
                    Tu pedido está pendiente de confirmación. Cuando sea
                    confirmado, aquí verás su envío.
                  </p>
                </div>
              )}

              <a
                href={supportUrl(order)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-stroke py-3 text-sm font-medium text-white transition-colors hover:bg-surface/80"
              >
                <MessageCircle size={16} className="text-primary" />
                Hablar con soporte por WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};