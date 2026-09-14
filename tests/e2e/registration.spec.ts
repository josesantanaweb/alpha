import { expect, test } from "@playwright/test";
import { disconnectDatabase, findUserByEmail, resetDatabase } from "./database";

const email = "registro.e2e@aura.test";

test.afterAll(async () => {
  await disconnectDatabase();
});

test("registra un usuario y conserva su sesión", async ({ page }) => {
  await resetDatabase();
  await page.goto("/register");

  await page.getByPlaceholder("Tu nombre").fill("Usuario E2E");
  await page.getByPlaceholder("tu@correo.com").fill(email);
  await page.getByPlaceholder("••••••••").fill("password-seguro");
  await page
    .getByRole("button", { name: "Regístrate", exact: true })
    .click();

  await expect(page).toHaveURL("/");
  await expect.poll(() => findUserByEmail(email)).not.toBeNull();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const session = localStorage.getItem("aura_auth");
        return session ? JSON.parse(session).state.token : null;
      })
    )
    .not.toBeNull();
});
