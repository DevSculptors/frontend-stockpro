"use client";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryclient = new QueryClient();

  return (
    <QueryClientProvider client={queryclient}>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
