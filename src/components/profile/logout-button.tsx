"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-error-container text-on-error-container text-[16px] font-semibold rounded-xl active:translate-y-0.5 transition-all duration-75 shadow-[0_2px_0_0_#ba1a1a] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span className="material-symbols-outlined">
        {loading ? "hourglass_empty" : "logout"}
      </span>
      {loading ? "Logging out…" : "Logout"}
    </button>
  );
}