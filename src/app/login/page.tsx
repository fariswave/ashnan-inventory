"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userLoginSchema } from "@/validation/auth";

type LoginInput = z.infer<typeof userLoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    setGlobalMessage("");
    setIsSuccess(false);
    clearErrors();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            const message = result.errors[key]?.[0];
            if (message) {
              setError(key as keyof LoginInput, {
                type: "server",
                message,
              });
            }
          });
        } else if (result.message) {
          setGlobalMessage(result.message);
        }
        return;
      }

      setIsSuccess(true);
      setGlobalMessage(result.message || "Login Berhasil!");
    } catch {
      setGlobalMessage("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {globalMessage && (
        <p
          className={`mb-4 text-center text-sm font-medium ${
            isSuccess ? "text-green-600" : "text-red-500"
          }`}
        >
          {globalMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full"
        >
          {isSuccess
            ? "Berhasil! Mengalihkan..."
            : isLoading
              ? "Loading..."
              : "Login"}
        </Button>
      </form>
    </div>
  );
}
