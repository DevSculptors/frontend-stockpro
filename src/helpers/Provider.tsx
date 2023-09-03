"use client";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NotificationProvider } from "@/context/NotificationContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryclient = new QueryClient();

  return (
    <QueryClientProvider client={queryclient}>
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  );
}
