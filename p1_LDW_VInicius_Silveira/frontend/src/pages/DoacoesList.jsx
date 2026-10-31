import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllDoacoes,
    createDoacao,
    getByTipoDoacoes,
    updateQuantidadeDoacao,
    updateStatusDoacao
} from "../api/Doacoes.jsx";

export default function DoacoesList() {
    const [doacoes, setDoacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [tipoItem, setTipoItem] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [doador, setDoador] = useState("");

    const [filtroTipo, setFiltroTipo] = useState("");

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDistributeOpen, setModalDistributeOpen] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [novaQuantidade, setNovaQuantidade] = useState("");

    const fetchDoacoes = async (tipo = "") => {
        setLoading(true);
        setError("");
        try {
            let response;
            if (tipo.trim() !== "") {
                response = await getByTipoDoacoes(tipo);
            } else {
                response = await getAllDoacoes();
            }

            setDoacoes(response.data.doacoes || response.data.itens || []);
        } catch (err) {
            console.log(err.status)
            setError(err.response?.data?.message || "Erro ao buscar doações");
            setDoacoes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoacoes();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            await createDoacao({
                tipoItem,
                quantidade: Number(quantidade),
                doador,
            });

            setSuccessMessage("Doação cadastrada com sucesso!");
            setTipoItem("");
            setQuantidade("");
            setDoador("");
            fetchDoacoes();
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao cadastrar doação");
        }
    };

    const abrirModalEditar = (item) => {
        setItemSelecionado(item);
        setNovaQuantidade(item.quantidade);
        setModalEditOpen(true);
    };

    const abrirModalDistribuir = (item) => {
        setItemSelecionado(item);
        setModalDistributeOpen(true);
    };

    const confirmarEdicaoQuantidade = async (e) => {
        e.preventDefault();
        if (!itemSelecionado) return;

        try {
            await updateQuantidadeDoacao(itemSelecionado._id, { quantidade: Number(novaQuantidade) });
            setSuccessMessage("Quantidade atualizada com sucesso!");
            setModalEditOpen(false);
            setItemSelecionado(null);
            fetchDoacoes();
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao atualizar quantidade");
        }
    };

    const confirmarDistribuicao = async () => {
        if (!itemSelecionado) return;

        try {
            await updateStatusDoacao(itemSelecionado._id);
            setSuccessMessage("Status alterado para distribuído!");
            setModalDistributeOpen(false);
            setItemSelecionado(null);
            fetchDoacoes();
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao atualizar status");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDoacoes(filtroTipo);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">

            {/* cabecalho */}
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Doações</h1>
                <Link to="/" className="text-sm text-blue-600 hover:underline">
                    &larr; Voltar para Home
                </Link>
            </div>

            {/* feedback */}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
            {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{successMessage}</div>}

            {/* cadastro */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Cadastrar Nova Doação</h2>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Tipo do Item (ex: Cesta Básica)"
                        value={tipoItem}
                        onChange={(e) => setTipoItem(e.target.value)}
                        required
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Nome do Doador"
                        value={doador}
                        onChange={(e) => setDoador(e.target.value)}
                        required
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        type="submit"
                        className="md:col-span-3 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
                    >
                        Adicionar Doação
                    </button>
                </form>
            </div>

            {/* filtro de tipo */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 flex gap-2">
                <input
                    type="text"
                    placeholder="Filtrar por tipo de item..."
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Buscar
                </button>
                <button
                    onClick={() => { setFiltroTipo(""); fetchDoacoes(); }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    Limpar
                </button>
            </div>

            {/* listagem */}
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <h2 className="text-lg font-semibold p-4 bg-gray-50 border-b text-gray-700">Lista de Doações</h2>

                {loading ? (
                    <p className="p-6 text-center text-gray-500">Carregando doações...</p>
                ) : doacoes.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">Nenhuma doação encontrada.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm border-b">
                                    <th className="p-3">Item</th>
                                    <th className="p-3">Quantidade</th>
                                    <th className="p-3">Doador</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {doacoes.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="p-3 font-medium uppercase">{item.tipoItem}</td>
                                        <td className="p-3">{item.quantidade}</td>
                                        <td className="p-3">{item.doador}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${item.status === "disponivel"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center space-x-2">
                                            {item.status === "disponivel" ? (
                                                <>
                                                    <button
                                                        onClick={() => abrirModalEditar(item)}
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 transition"
                                                    >
                                                        Editar Qtde
                                                    </button>
                                                    <button
                                                        onClick={() => abrirModalDistribuir(item)}
                                                        className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition"
                                                    >
                                                        Distribuir
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">Encerrado</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* modal editar */}
            {modalEditOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl space-y-4">
                        <h3 className="text-lg font-bold text-gray-800">Editar Quantidade</h3>
                        <p className="text-sm text-gray-600">
                            Item: <span className="font-semibold uppercase">{itemSelecionado?.tipoItem}</span>
                        </p>
                        <form onSubmit={confirmarEdicaoQuantidade} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Nova Quantidade</label>
                                <input
                                    type="number"
                                    value={novaQuantidade}
                                    onChange={(e) => setNovaQuantidade(e.target.value)}
                                    required
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalEditOpen(false)}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* modal distribuir */}
            {modalDistributeOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl space-y-4">
                        <h3 className="text-lg font-bold text-gray-800">Confirmar Distribuição</h3>
                        <p className="text-sm text-gray-600">
                            Deseja realmente marcar o item <span className="font-semibold uppercase">{itemSelecionado?.tipoItem}</span> como distribuído? Essa ação mudará o status permanentemente.
                        </p>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setModalDistributeOpen(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={confirmarDistribuicao}
                                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition"
                            >
                                Confirmar Distribuição
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}