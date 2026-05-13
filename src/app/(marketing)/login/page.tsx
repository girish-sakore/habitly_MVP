import { redirect } from "next/navigation";
import { MobileContainer } from "@/components/layout/mobile-container";
import { LoginForm } from "@/features/auth/login-form";
import { getCachedAuthSession } from "@/lib/auth-session";

export default async function LoginPage() {
  const session = await getCachedAuthSession();
  if (session?.user?.id) redirect("/edition/current");

  return (
    <MobileContainer>
      <div
        className="flex flex-col min-h-[100dvh]"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Brand header */}
        <header className="flex justify-center items-center w-full px-6 h-24">
          <span
            className="text-[32px] font-extrabold tracking-tight"
            style={{ color: "var(--secondary)" }}
          >
            Habitly
          </span>
        </header>

        {/* Main content */}
        <main className="flex-grow flex flex-col items-center px-6 w-full gap-12">

          {/* Form */}
          <div className="w-full">
            <LoginForm />
          </div>

          {/* Decorative bento tiles */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div
              className="aspect-square rounded-2xl flex items-center justify-center p-6 shadow-sm"
              style={{ backgroundColor: "var(--secondary-container)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 64,
                  color: "var(--on-secondary-container)",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                local_fire_department
              </span>
            </div>
            <div
              className="aspect-square rounded-2xl flex items-center justify-center p-6 shadow-sm"
              style={{ backgroundColor: "var(--tertiary-fixed)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 64,
                  color: "var(--on-tertiary-fixed-variant)",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                menu_book
              </span>
            </div>
          </div>

          {/* Legal */}
          <p
            className="text-center text-sm"
            style={{ color: "var(--on-surface-variant)" }}
          >
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="font-bold hover:underline"
              style={{ color: "var(--secondary)" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-bold hover:underline"
              style={{ color: "var(--secondary)" }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </main>

        {/* Footer */}
        <footer className="h-16 flex items-center justify-center">
          <p
            className="text-[11px] font-bold tracking-widest uppercase opacity-50"
            style={{ color: "var(--outline)" }}
          >
            v2.4.0 • SECURE AUTH
          </p>
        </footer>
      </div>
    </MobileContainer>
  );
}