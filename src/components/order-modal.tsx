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
      // aqui resetamos os campos quando o modal é fechado
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg animate-in zoom-in-95 duration-200 m-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">{initialData ? "Editar Pedido" : "Novo Pedido"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Produto */}
          <div className="space-y-2">
            <label htmlFor="produto" className="block text-sm font-medium text-gray-700">
              Produto
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#7B3FF3]/20 focus:border-[#7B3FF3]"
                }`}
              />
            </div>
            {errors.produto && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-600">⚠</span> {errors.produto}
              </p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#7B3FF3]/20 focus:border-[#7B3FF3]"
                }`}
              />
            </div>
            {errors.valor && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-600">⚠</span> {errors.valor}
              </p>
            )}
          </div>

          {/* quantidade */}
          <div className="space-y-2">
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                    ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                    : "border-gray-300 focus:ring-[#7B3FF3]/20 focus:border-[#7B3FF3]"
                }`}
              />
            </div>
            {errors.quantidade && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-600">⚠</span> {errors.quantidade}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="px-6 bg-[#7B3FF3] hover:bg-[#6B2FE3] text-white">
            Salvar Pedido
          </Button>
        </div>
      </div>
    </div>
  )
}
