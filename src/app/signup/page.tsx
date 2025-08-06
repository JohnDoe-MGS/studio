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

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    // For this prototype, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
           <div className="flex justify-center items-center gap-4 mb-2">
              <Logo />
              <h1 className="text-2xl font-bold font-headline text-primary">VERITAS</h1>
            </div>
          <CardTitle className="text-xl text-center">Cadastro</CardTitle>
          <CardDescription className="text-center">
            Crie sua conta para começar a usar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input id="full-name" placeholder="Seu Nome" required />
              </div>
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
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/" className="underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
