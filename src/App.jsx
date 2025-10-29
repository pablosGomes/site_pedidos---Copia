"use client"
import { useState } from "react"
import { Home, LogOut, Search, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderModal } from "@/components/order-modal"
import { Toaster } from "@/components/ui/toaster"

/** @typedef {Object} Order
 * @property {number} id
 * @property {string} produto
 * @property {number} valor
 * @property {number} quantidade
 */

export default function PedidosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orders, setOrders] = useState([
    { id: 1, produto: "Ventilador", valor: 100.0, quantidade: 1 },
    { id: 2, produto: "Ventilador", valor: 100.0, quantidade: 1 },
    { id: 3, produto: "Ventilador", valor: 100.0, quantidade: 1 },
  ])
  const [editingOrder, setEditingOrder] = useState(null)

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      // aqui vamos estar editando um pedido existente
      setOrders(orders.map((order) => (order.id === editingOrder.id ? { ...order, ...orderData } : order)))
      setEditingOrder(null)
    } else {
      // aqui vamos estar adicionando um novo pedido
      const newOrder = {
        id: Math.max(...orders.map((o) => o.id), 0) + 1,
        ...orderData,
      }
      setOrders([...orders, newOrder])
    }
  }

  const handleEditOrder = (order) => {
    setEditingOrder(order)
    setIsModalOpen(true)
  }

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingOrder(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-[#1e293b] mb-8">Pedidos JÁ</h1>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[#7B3FF3] bg-[#7B3FF3]/10 rounded-lg font-medium border-l-4 border-[#7B3FF3]">
            <Home className="h-5 w-5" />
            Início
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Início</h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Pedidos</h3>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B3FF3]/20 w-64"
                />
              </div>

              <Button onClick={() => setIsModalOpen(true)} className="bg-[#7B3FF3] hover:bg-[#6B2FE3] text-white px-6">
                Novo Pedido
              </Button>
            </div>
          </div>

          {/* Tabela*/}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Produto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Quantidade</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{order.produto}</td>
                    <td className="py-4 px-4 text-gray-900">R$ {order.valor.toFixed(2).replace(".", ",")}</td>
                    <td className="py-4 px-4 text-gray-900">{order.quantidade}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 text-gray-600 hover:text-[#7B3FF3] hover:bg-[#7B3FF3]/10 rounded-lg transition-colors"
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginas */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Mostrando {orders.length} de {orders.length} itens
            </p>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">‹</button>
              <button className="px-3 py-1.5 bg-[#7B3FF3] text-white rounded-lg">1</button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">3</button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">4</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">40</button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">›</button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveOrder}
        initialData={editingOrder || undefined}
      />

      {/* Toast Container */}
      <Toaster />
    </div>
  )
}
