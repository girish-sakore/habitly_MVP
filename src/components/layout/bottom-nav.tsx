"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/edition/current", icon: "joystick", label: "Play" },
    { href: "/rankings", icon: "leaderboard", label: "Rankings" },
    { href: "/profile", icon: "person", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
      {links.map(({ href, icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-6 py-2 shadow-[0_2px_0_0_#3a6757] active:translate-y-0.5 transition-all duration-75"
                : "flex flex-col items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant rounded-xl active:translate-y-0.5 transition-all duration-75"
            }
          >
            <span
              className="material-symbols-outlined mb-1"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {icon}
            </span>
            {/* <span className="">
              {label}
            </span> */}
          </Link>
        );
      })}
    </nav>
  );
}