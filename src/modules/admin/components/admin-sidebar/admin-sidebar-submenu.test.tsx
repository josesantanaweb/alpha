import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Box, ListTree } from "lucide-react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminSidebarSubmenu } from "./admin-sidebar-submenu";

const { pathname, push } = vi.hoisted(() => ({
  pathname: { current: "/admin" },
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
  useRouter: () => ({ push }),
}));

const submenu = [
  { label: "Catálogo", icon: Box, path: "/admin" },
  { label: "Inventario", icon: ListTree },
];

describe("AdminSidebarSubmenu", () => {
  beforeEach(() => {
    pathname.current = "/admin";
    push.mockReset();
  });

  it("navigates to routed items and highlights the active route", async () => {
    const user = userEvent.setup();

    render(
      <AdminSidebarSubmenu submenu={submenu} isOpen={true} isCollapse={false} />
    );

    const catalogButton = screen.getByRole("button", { name: "Catálogo" });
    expect(catalogButton).toHaveClass("text-white");

    await user.click(catalogButton);

    expect(push).toHaveBeenCalledWith("/admin");
  });

  it("does not navigate items without a route", async () => {
    const user = userEvent.setup();

    render(
      <AdminSidebarSubmenu submenu={submenu} isOpen={true} isCollapse={false} />
    );

    const inventoryButton = screen.getByRole("button", { name: "Inventario" });
    expect(inventoryButton).toHaveClass("cursor-default");

    await user.click(inventoryButton);

    expect(push).not.toHaveBeenCalled();
  });

  it("hides labels while the sidebar is collapsed", () => {
    render(
      <AdminSidebarSubmenu submenu={submenu} isOpen={true} isCollapse={true} />
    );

    expect(screen.queryByText("Catálogo")).not.toBeInTheDocument();
    expect(screen.queryByText("Inventario")).not.toBeInTheDocument();
  });
});
