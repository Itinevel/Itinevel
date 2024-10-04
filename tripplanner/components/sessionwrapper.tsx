// components/SessionWrapper.tsx
"use client"; // This directive makes the component a client component

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: any;
}

export const SessionWrapper = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
