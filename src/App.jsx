"use client";

import { useState } from "react";
import { Home, LogOut, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderModal } from "@/components/order-modal";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 1, produto: "Ventilador", valor: 100.0, quantidade: 1 },
    { id: 2, produto: "Ventilador", valor: 100.0, quantidade: 1 },
    { id: 3, produto: "Ventilador", valor: 100.0, quantidade: 1 },
  ]);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? { ...order, ...orderData } : order
        )
      );
      setEditingOrder(null);
    } else {
      const newOrder = {
        id: Math.max(...orders.map((o) => o.id), 0) + 1,
        ...orderData,
      };
      setOrders([...orders, newOrder]);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white/80 backdrop-blur-sm border-r border-blue-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
          Pedidos JÁ
        </h1>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-blue-600 bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg font-medium border-l-4 border-blue-500 transition-all hover:shadow-sm">
            <Home className="h-5 w-5" />
            Início
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 hover:bg-blue-50/50 rounded-lg font-medium transition-all">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </nav>
      </aside>

      {/* estrutura principal */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Início</h2>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6 transition-all hover:shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Pedidos</h3>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2 bg-linear-to-r from-blue-50 to-cyan-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-64 transition-all"
                />
              </div>

              <Button
                onClick={() => {
                  setEditingOrder(null)
                  setIsModalOpen(true)
                }}
                className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 shadow-md hover:shadow-lg transition-all"
              >
                Novo Pedido
              </Button>
            </div>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Produto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Quantidade
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-blue-50 hover:bg-linear-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all"
                  >
                    <td className="py-4 px-4 text-gray-900">{order.produto}</td>
                    <td className="py-4 px-4 text-gray-900">
                      R$ {order.valor.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {order.quantidade}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all hover:scale-110"
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
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

          {/* Paginação */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Mostrando {orders.length} de {orders.length} itens
            </p>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
                ‹
              </button>
              <button className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-sm">
                1
              </button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
                2
              </button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
                3
              </button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
                4
              </button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
                40
              </button>
              <button className="px-3 py-1.5 text-gray-600 hover:bg-blue-50 rounded-lg transition-all">
              </button>
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
  );
}
