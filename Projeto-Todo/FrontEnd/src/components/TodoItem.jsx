import React, { useState } from "react";
import TodoChatModal from "./TodoChatModal.jsx";
import { patchTodoStatus } from "../api/Todo.jsx";

export default function TodoItem({ todo, usuarioLogado, onStatusChange }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Extrai as iniciais do nome (ex: "Carlos Silva" -> "CS")
    const getInitials = (nome) => {
        if (!nome) return "?";
        const parts = nome.trim().split(" ");
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const criador = todo.criadoPor;
    const participantes = todo.participam || [];

    // Limite de participantes visíveis na pilha
    const maxVisible = 3;
    const visibleParticipantes = participantes.slice(0, maxVisible);
    const extraCount = participantes.length - maxVisible;

    // Lista com todos os nomes para tooltip
    const todosNomesParticipantes = participantes.map((p) => p.nome).join(", ");

    const [situacao, setSituacao] = useState(todo.situacao);

    const STATUS_LABELS = {
        PENDENTE: "Pendente",
        EM_ANDAMENTO: "Em Andamento",
        CONCLUIDA: "Concluída",
        CANCELADA: "Cancelada"
    };

    const OPCOES_STATUS = [
        { key: "PENDENTE", label: "Pendente", style: "text-gray-700 bg-gray-100 border-gray-300 hover:bg-gray-200" },
        { key: "EM_ANDAMENTO", label: "Em Andamento", style: "text-yellow-800 bg-yellow-50 border-yellow-200 hover:bg-yellow-100" },
        { key: "CONCLUIDA", label: "Concluir", style: "text-green-700 bg-green-50 border-green-200 hover:bg-green-100" },
        { key: "CANCELADA", label: "Cancelar", style: "text-red-600 bg-red-50 border-red-200 hover:bg-red-100" },
    ];

    async function handleStatusChange(novoStatus) {
        const statusAnterior = situacao;
        setSituacao(novoStatus);

        try {
            await patchTodoStatus({
                id: todo._id,
                situacao: novoStatus
            });
            onStatusChange(todo._id, novoStatus);

        } catch (error) {
            console.error("Erro ao sincronizar com o servidor:", error);
            setSituacao(statusAnterior);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                {/* Linha Superior: Título + Badge de Situação */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                            {todo.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{todo.descricao}</p>
                    </div>

                    <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 transition-colors cursor-pointer ${situacao === "CONCLUIDA"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : situacao === "EM_ANDAMENTO"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : situacao === "CANCELADA"
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {STATUS_LABELS[situacao] || situacao}
                    </span>


                </div>

                {/* Rodapé do Card: Infos + Equipe + Botão de Chat */}
                <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <div>
                            <span className="font-medium text-gray-700">Prazo:</span>{" "}
                            {todo.dataLimite
                                ? new Date(todo.dataLimite).toLocaleDateString("pt-BR")
                                : "Sem data"}
                        </div>

                        {criador && (
                            <div>
                                <span className="font-medium text-gray-700">Criado por:</span>{" "}
                                <span className="text-gray-900 font-medium">
                                    {criador.nome}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">

                        {participantes.length > 0 && (
                            <div
                                className="flex items-center gap-2 min-w-0"
                                title={`Participantes: ${todosNomesParticipantes}`}
                            >
                                <span className="font-medium text-gray-700 text-xs shrink-0">
                                    Equipe:
                                </span>

                                <div className="flex -space-x-2">
                                    {visibleParticipantes.map((participante, index) => (
                                        <div
                                            key={participante._id || index}
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 text-white font-semibold border-2 border-white shadow-sm text-[10px] shrink-0"
                                            title={participante.nome}
                                        >
                                            {getInitials(participante.nome)}
                                        </div>
                                    ))}

                                    {extraCount > 0 && (
                                        <div
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold border-2 border-white shadow-sm text-[10px] shrink-0"
                                            title={`Mais ${extraCount} participantes: ${participantes
                                                .slice(maxVisible)
                                                .map((p) => p.nome)
                                                .join(", ")}`}
                                        >
                                            +{extraCount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2 ml-auto">

                            {OPCOES_STATUS
                                .filter(opcao => opcao.key !== situacao)
                                .map((opcao) => (
                                    <button
                                        key={opcao.key}
                                        onClick={() => handleStatusChange(opcao.key)}
                                        className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transition-colors cursor-pointer whitespace-nowrap ${opcao.style}`}
                                    >
                                        {opcao.label}
                                    </button>
                                ))}

                            <span className="text-gray-300 hidden sm:inline">
                                |
                            </span>

                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                                title="Abrir chat da tarefa"
                            >
                                <span>💬</span>
                                <span>Chat</span>
                            </button>

                        </div>
                    </div>
                </div>

            </div>

            {/* Modal do Chat acionado pelo estado */}
            {isChatOpen && (
                <TodoChatModal
                    tarefa={todo}
                    usuarioLogado={usuarioLogado}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </>

    );
}
