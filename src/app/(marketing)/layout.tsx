import Navbar from "@/components/layout/navbar";
import React from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 grow">
        {children}
      </main>

    </div>
  );
}