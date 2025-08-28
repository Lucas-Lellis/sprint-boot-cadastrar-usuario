"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export default function AuthInterface() {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      // ESTA É A PARTE QUE CONECTA COM O BACKEND PARA LOGIN
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      if (response.ok) { // Verifica se o status é 2xx
        setFeedback({
          type: "success",
          message: "Login realizado com sucesso!",
        })
        setTimeout(() => setFeedback({ type: null, message: "" }), 5000)
      } else {
        throw new Error("Credenciais inválidas. Verifique seu email e senha.")
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erro ao fazer login. Verifique suas credenciais.",
      })
      setTimeout(() => setFeedback({ type: null, message: "" }), 5000)
    }
  }

  const handleRegisterSubmit = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem")
      }

      const response = await fetch('http://localhost:8080/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: fullName,
          email: email,
          senha: password,
        }),
      })

      if (response.status === 201) {
        setFeedback({
          type: "success",
          message: "Cadastro realizado com sucesso!",
        })
        setTimeout(() => setFeedback({ type: null, message: "" }), 5000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro desconhecido ao cadastrar.")
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Erro ao realizar cadastro.",
      })
      setTimeout(() => setFeedback({ type: null, message: "" }), 5000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Feedback Alert */}
        {feedback.type && (
          <div className="mb-6">
            <Alert
              className={`${
                feedback.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-destructive bg-destructive/10 text-destructive"
              }`}
            >
              {feedback.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertDescription className="font-medium">{feedback.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Login Section */}
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-card-foreground mb-2">Entrar</h1>
              <p className="text-muted-foreground">Acesse sua conta existente</p>
            </div>
            <LoginForm onSubmit={handleLoginSubmit} />
          </div>

          {/* Register Section */}
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-card-foreground mb-2">Cadastrar</h1>
              <p className="text-muted-foreground">Crie uma nova conta</p>
            </div>
            <RegisterForm onSubmit={handleRegisterSubmit} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Sistema de Cadastro de Usuários - Spring Boot</p>
        </div>
      </div>
    </div>
  )
}