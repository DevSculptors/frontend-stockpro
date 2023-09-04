"use client";

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hook/useAuthFetch";
import { useLoading } from "@/hook/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";

export default function ChangePasswordPage() {
  const { isLoading, finishLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const { authRouter } = useAuthFetch();
  return (
    <div>
      <h1>ChangePasswordPage</h1>
    </div>
  );
}
