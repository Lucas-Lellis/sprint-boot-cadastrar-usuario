"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

interface RegisterFormProps {
  onSubmit: (fullName: string, email: string, password: string, confirmPassword: string) => void
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      fullName?: string
      email?: string
      password?: string
      confirmPassword?: string
    } = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório"
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!email) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit(fullName, email, password, confirmPassword)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="register-fullname" className="text-sm font-medium text-card-foreground">
          Nome Completo
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-fullname"
            type="text"
            placeholder="Seu nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`pl-10 ${errors.fullName ? "border-destructive focus:ring-destructive" : "focus:ring-accent focus:border-accent"}`}
            aria-describedby={errors.fullName ? "register-fullname-error" : undefined}
          />
        </div>
        {errors.fullName && (
          <p id="register-fullname-error" className="text-sm text-destructive">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email" className="text-sm font-medium text-card-foreground">
          E-mail
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`pl-10 ${errors.email ? "border-destructive focus:ring-destructive" : "focus:ring-accent focus:border-accent"}`}
            aria-describedby={errors.email ? "register-email-error" : undefined}
          />
        </div>
        {errors.email && (
          <p id="register-email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password" className="text-sm font-medium text-card-foreground">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-10 pr-10 ${errors.password ? "border-destructive focus:ring-destructive" : "focus:ring-accent focus:border-accent"}`}
            aria-describedby={errors.password ? "register-password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="register-password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-confirm-password" className="text-sm font-medium text-card-foreground">
          Confirmar Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive focus:ring-destructive" : "focus:ring-accent focus:border-accent"}`}
            aria-describedby={errors.confirmPassword ? "register-confirm-password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p id="register-confirm-password-error" className="text-sm text-destructive">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Ao se cadastrar, você concorda com nossos{" "}
          <button type="button" className="text-accent hover:text-accent/80 underline">
            Termos de Uso
          </button>
        </p>
      </div>
    </form>
  )
}
