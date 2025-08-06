"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Logo />
              <h1 className="text-3xl font-bold font-headline text-primary">VERITAS</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Acesse a plataforma para gerenciar Governança, Risco e Compliance.
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/signup" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div 
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" 
          style={{
            backgroundImage: "url('https://placehold.co/1200x900.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          data-ai-hint="corporate office"
        ></div>
      </div>
    </div>
  );
}
