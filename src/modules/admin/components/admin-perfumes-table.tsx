import type { ReactElement } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/modules/shared/utils";

export interface AdminPerfume {
  id: string;
  name: string;
  designer: string;
  image: string | null;
  type: string;
  price: number;
  stock: number;
  status: string;
}

export interface AdminPerfumesTableProps {
  perfumes: AdminPerfume[];
}

const STATUS_CLASSES: Record<string, string> = {
  Activo: "border-emerald-400 text-emerald-400",
  Agotado: "border-amber-400 text-amber-400",
  Inactivo: "border-stroke text-body",
};

export const AdminPerfumesTable = ({
  perfumes,
}: AdminPerfumesTableProps): ReactElement => {
  return (
    <>
      <div className="border-stroke bg-surface w-full overflow-hidden rounded-lg border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-stroke text-body text-xs">
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {perfumes.map((perfume) => (
              <tr
                key={perfume.id}
                className="border-b border-stroke hover:bg-white/5"
              >
                <td className="flex items-center gap-2 px-4 py-3">
                  <div className="border-stroke bg-white/5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border">
                    {perfume.image ? (
                      <Image
                        src={perfume.image}
                        alt={perfume.name}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-body text-xs">?</span>
                    )}
                  </div>
                  <span className="text-sm text-white">{perfume.name}</span>
                </td>
                <td className="px-4 py-3 text-sm text-body">
                  {perfume.designer}
                </td>
                <td className="px-4 py-3 text-sm text-body">{perfume.type}</td>
                <td className="px-4 py-3 text-sm text-white">
                  {formatPrice(perfume.price)}
                </td>
                <td className="px-4 py-3 text-sm text-body">{perfume.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${
                      STATUS_CLASSES[perfume.status] ?? "border-stroke text-body"
                    }`}
                  >
                    {perfume.status}
                  </span>
                </td>
                <td className="flex items-center justify-end gap-1.5 px-4 py-3">
                  <button
                    type="button"
                    className="text-body cursor-pointer hover:text-white"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="text-error cursor-pointer hover:opacity-70"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-body text-xs">{perfumes.length} productos</p>
        <button
          type="button"
          className="bg-white flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-surface cursor-pointer hover:opacity-90"
        >
          <Plus size={16} />
          Agregar perfume
        </button>
      </div>
    </>
  );
};