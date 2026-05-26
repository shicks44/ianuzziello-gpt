"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export function AuthSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider
      basePath={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/auth`}
    >
      {children}
    </SessionProvider>
  );
}
