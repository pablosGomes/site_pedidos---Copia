"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Package, DollarSign, Hash } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "../hooks/use-toast"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (order: { produto: string; valor: number; quantidade: number }) => void
  initialData?: {
    produto: string
    valor: number
    quantidade: number
  }
}

export function OrderModal({ isOpen, onClose, onSave, initialData }: OrderModalProps) {
  const [produto, setProduto] = useState("")
  const [valor, setValor] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [errors, setErrors] = useState<{
    produto?: string
    valor?: string
    quantidade?: string
  }>({})
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && initialData) {
      setProduto(initialData.produto)
      setValor(initialData.valor.toString())
      setQuantidade(initialData.quantidade.toString())
    } else if (!isOpen) {
      setProduto("")
      setValor("")
      setQuantidade("")
      setErrors({})
    }
  }, [isOpen, initialData])

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!produto.trim()) {
      newErrors.produto = "O campo Produto é obrigatório"
    }

    if (!valor.trim()) {
      newErrors.valor = "O campo Valor é obrigatório"
    } else if (isNaN(Number(valor)) || Number(valor) <= 0) {
      newErrors.valor = "Digite um valor válido maior que zero"
    }

    if (!quantidade.trim()) {
      newErrors.quantidade = "O campo Quantidade é obrigatório"
    } else if (isNaN(Number(quantidade)) || Number(quantidade) <= 0 || !Number.isInteger(Number(quantidade))) {
      newErrors.quantidade = "Digite uma quantidade válida (número inteiro maior que zero)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      const orderData = {
        produto: produto.trim(),
        valor: Number(valor),
        quantidade: Number(quantidade),
      }

      onSave?.(orderData)

      toast({
        title: "Sucesso!",
        description: "Pedido salvo com sucesso!",
        duration: 3000,
      })

      onClose()
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleOverlayClick}
      style={{
        animation: isOpen ? "fadeIn 0.3s ease-out" : "none",
      }}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl m-4 border border-blue-100"
        style={{
          animation: isOpen ? "slideUp 0.3s ease-out" : "none",
        }}
      >
        {/* header com degradezinho */}
        <div className="flex items-center justify-between border-b border-blue-100 px-6 py-4 bg-linear-to-r from-blue-50 to-cyan-50">
          <h2 className="text-xl font-semibold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {initialData ? "Editar Pedido" : "Novo Pedido"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 transition-all hover:rotate-90 duration-300"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Produto */}
          <div className="space-y-2 animate-in slide-in-from-left duration-300">
            <label htmlFor="produto" className="block text-sm font-medium text-gray-700">
              Produto
            </label>
            <div className="relative group">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 transition-all group-focus-within:text-blue-600" />
              <input
                id="produto"
                type="text"
                value={produto}
                onChange={(e) => {
                  setProduto(e.target.value)
                  if (errors.produto) {
                    setErrors({ ...errors, produto: undefined })
                  }
                }}
                placeholder="Digite o nome do produto"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.produto
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/30"
                    : "border-blue-200 focus:ring-blue-200 focus:border-blue-400 hover:border-blue-300"
                }`}
              />
            </div>
            {errors.produto && (
              <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top duration-200">
                <span className="text-red-600">⚠</span> {errors.produto}
              </p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2 animate-in slide-in-from-left duration-300" style={{ animationDelay: "0.1s" }}>
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor
            </label>
            <div className="relative group">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400 transition-all group-focus-within:text-cyan-600" />
              <input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={valor}
                onChange={(e) => {
                  setValor(e.target.value)
                  if (errors.valor) {
                    setErrors({ ...errors, valor: undefined })
                  }
                }}
                placeholder="0,00"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.valor
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/30"
                    : "border-cyan-200 focus:ring-cyan-200 focus:border-cyan-400 hover:border-cyan-300"
                }`}
              />
            </div>
            {errors.valor && (
              <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top duration-200">
                <span className="text-red-600">⚠</span> {errors.valor}
              </p>
            )}
          </div>

          {/* Quantidade */}
          <div className="space-y-2 animate-in slide-in-from-left duration-300" style={{ animationDelay: "0.2s" }}>
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <div className="relative group">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400 transition-all group-focus-within:text-sky-600" />
              <input
                id="quantidade"
                type="number"
                step="1"
                min="1"
                value={quantidade}
                onChange={(e) => {
                  setQuantidade(e.target.value)
                  if (errors.quantidade) {
                    setErrors({ ...errors, quantidade: undefined })
                  }
                }}
                placeholder="0"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.quantidade
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/30"
                    : "border-sky-200 focus:ring-sky-200 focus:border-sky-400 hover:border-sky-300"
                }`}
              />
            </div>
            {errors.quantidade && (
              <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top duration-200">
                <span className="text-red-600">⚠</span> {errors.quantidade}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-blue-100 px-6 py-4 bg-gradient-to-r from-blue-50/30 to-cyan-50/30">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 border-blue-200 text-gray-700 hover:bg-blue-50 bg-transparent transition-all hover:scale-105"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Salvar Pedido
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
