"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/constants";
import { Button } from "@/modules/shared/components/ui";

interface OrderSuccessModalProps {
  open: boolean;
  whatsappUrl: string;
  onClose: () => void;
}

export const OrderSuccessModal = ({
  open,
  whatsappUrl,
  onClose,
}: OrderSuccessModalProps): ReactElement => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-60 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="bg-surface fixed right-0 bottom-0 left-0 z-70 mx-auto max-w-md rounded-t-4xl p-6 pt-10"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <span className="bg-body/30 absolute h-1 top-5 left-1/2 w-15 -translate-1/2 rounded-full" />
            <div className="flex w-full flex-col gap-20 justify-between h-full">
              <div className="flex flex-col items-center gap-3 text-center">
                <CheckCircle2 size={56} className="text-success" />
                <h4 className="text-xl font-semibold text-white">
                  ¡Tu pedido #10024 está confirmado! ✨
                </h4>
                <p className="text-body text-sm">
                  Gracias por tu compra. Envíanos tu pedido por WhatsApp para
                  coordinar el pago y la entrega.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3">
                <Button asChild>
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir a WhatsApp
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(ROUTES.HOME)}
                >
                  Ir al inicio
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
