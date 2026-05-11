"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Verify your path to the auth client
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // Or your desired redirect
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left"
      >
        {user.image ? (
          <Image 
            src={user.image} 
            alt="Profile" 
            width={48} 
            height={48} 
            className="rounded-full border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-neutral-200 flex items-center justify-center font-bold">
            {user.name[0] || user.email[0]}
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-lg font-semibold">{user.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-20">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors border border-red-100"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}