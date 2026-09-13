"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { Download, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
  Activo: "bg-emerald-500/15 text-emerald-400",
  Agotado: "bg-amber-500/15 text-amber-400",
  Inactivo: "bg-white/8 text-body",
};

export const AdminPerfumesTable = ({
  perfumes,
}: AdminPerfumesTableProps): ReactElement => {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const filteredPerfumes = perfumes.filter(({ name, designer }) =>
    `${name} ${designer}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  const allVisibleSelected =
    filteredPerfumes.length > 0 &&
    filteredPerfumes.every(({ id }) => selectedIds.has(id));

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((current) => {
      const next = new Set(current);
      filteredPerfumes.forEach(({ id }) =>
        allVisibleSelected ? next.delete(id) : next.add(id)
      );
      return next;
    });
  };

  return (
    <section className="flex min-h-full flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <label className="border-stroke bg-surface text-body flex h-8 w-full max-w-52 items-center gap-2 rounded-md border px-3 sm:w-52">
          <Search size={14} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar perfume, diseñador..."
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-body"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.size > 0 && (
            <button type="button" className="border-error text-error hover:bg-error/10 h-8 cursor-pointer rounded-md border px-3 text-[11px] font-semibold transition-colors">
              <Trash2 className="mr-1 inline" size={13} /> Eliminar seleccionados ({selectedIds.size})
            </button>
          )}
          <button type="button" className="border-stroke text-white hover:bg-white/5 h-8 cursor-pointer rounded-md border px-3 text-[11px] font-semibold transition-colors">
            <Download className="mr-1 inline" size={13} /> Exportar
          </button>
          <button type="button" className="bg-white text-surface hover:bg-white/90 h-8 cursor-pointer rounded-md px-3 text-[11px] font-bold transition-colors">
            <Plus className="mr-1 inline" size={13} /> Agregar producto
          </button>
        </div>
      </div>

      <div className="border-stroke bg-surface w-full overflow-x-auto rounded-lg border">
        <table className="min-w-225 w-full text-left">
          <thead>
            <tr className="border-stroke border-b text-[10px] font-medium text-body">
              <th className="w-11 px-4 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Seleccionar todos los productos" className="accent-white" /></th>
              <th className="px-3 py-3">ID</th>
              <th className="w-12 px-2 py-3">Imagen</th>
              <th className="px-3 py-3">Nombre</th>
              <th className="px-3 py-3">Diseñador</th>
              <th className="px-3 py-3">Precio</th>
              <th className="px-3 py-3">Stock</th>
              <th className="px-3 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPerfumes.map((perfume) => (
              <tr
                key={perfume.id}
                className="border-stroke border-b last:border-0 hover:bg-white/3"
              >
                <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.has(perfume.id)} onChange={() => toggleSelection(perfume.id)} aria-label={`Seleccionar ${perfume.name}`} className="accent-white" /></td>
                <td className="px-3 py-3 text-[11px] text-body">PF-{perfume.id.replace(/^p/i, "").padStart(3, "0")}</td>
                <td className="px-2 py-2"><div className="border-stroke bg-white/5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border">{perfume.image ? <Image src={perfume.image} alt={perfume.name} width={36} height={36} className="h-full w-full object-cover" /> : <span className="text-body text-xs">?</span>}</div></td>
                <td className="px-3 py-3 text-xs font-medium text-white">{perfume.name}</td>
                <td className="px-3 py-3 text-[11px] text-body">{perfume.designer}</td>
                <td className="px-3 py-3 text-xs font-semibold text-white">
                  {formatPrice(perfume.price)}
                </td>
                <td className="px-3 py-3"><span className={`rounded px-2 py-1 text-[10px] font-semibold ${perfume.stock === 0 ? "bg-error/15 text-error" : perfume.stock <= 8 ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>{perfume.stock} unidades</span></td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded px-2 py-1 text-[10px] font-semibold ${
                      STATUS_CLASSES[perfume.status] ?? "bg-white/8 text-body"
                    }`}
                  >
                    {perfume.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    className="text-body hover:text-white flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white/5"
                    title="Editar"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    className="text-error hover:bg-error/10 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-error/10"
                    title="Eliminar"
                  >
                    <Trash2 size={13} />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPerfumes.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-xs text-body">No se encontraron productos.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-body text-[10px]">Mostrando {filteredPerfumes.length} de {perfumes.length} productos</p>
        <div className="flex gap-1">
          <button type="button" className="bg-white text-surface flex h-7 w-7 cursor-pointer items-center justify-center rounded text-[10px] font-bold">1</button>
        </div>
      </div>
    </section>
  );
};
