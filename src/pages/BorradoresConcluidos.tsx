import { useState } from "react";
import { Search, Download, FileText, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { mockDrafts, type DraftStatus } from "../services/mock/mockData";

const statusStyle: Record<DraftStatus, string> = {
    Completado: "bg-green-500/20 text-green-400 border border-green-500/40",
    Revisado:   "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    Procesando: "bg-orange-500/20 text-orange-400 border border-orange-500/40",
};

const BorradoresConcluidos = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = mockDrafts.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.legalName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Borradores Concluidos</h1>
                    <p className="text-sm text-gray-400 mt-1">Gestione y descargue sus documentos convertidos a Word.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1a2233] border border-gray-700 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <Download className="w-4 h-4" /> Exportar Todo
                </button>
            </div>

            {/* Filters bar */}
            <div className="bg-[#1a2233] rounded-xl border border-gray-800 p-4 mb-5">
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 min-w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar documentos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-sm text-white pl-9 pr-3 py-2 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    <span className="text-xs text-gray-500 font-medium">Filtrar por:</span>

                    {/* Fecha */}
                    <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-xs text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <Calendar className="w-3.5 h-3.5" />
                        Fecha: Últimos 30 días
                        <ChevronLeft className="w-3 h-3 rotate-90" />
                    </button>

                    {/* Legal */}
                    <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-xs text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <div className="w-4 h-4 rounded-full bg-blue-600 text-[8px] flex items-center justify-center text-white font-bold">L</div>
                        Legal: Todos
                        <ChevronLeft className="w-3 h-3 rotate-90" />
                    </button>

                    {/* Estado */}
                    <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-xs text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                        Estado: Completado
                        <ChevronLeft className="w-3 h-3 rotate-90" />
                    </button>

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-3 h-3" /> Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a2233] rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800">
                            {["NOMBRE DEL ARCHIVO", "LEGAL", "FECHA DE CREACIÓN", "ESTADO", "ACCIONES"].map((h) => (
                                <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((draft) => (
                            <tr key={draft.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                {/* Nombre */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-white">{draft.name}</p>
                                            <p className="text-[11px] text-gray-500">{draft.size}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Legal */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                                            {draft.legalInitials}
                                        </div>
                                        <span className="text-xs text-gray-300">{draft.legalName}</span>
                                    </div>
                                </td>

                                {/* Fecha */}
                                <td className="px-5 py-4 text-xs text-gray-400">{draft.createdAt}</td>

                                {/* Estado */}
                                <td className="px-5 py-4">
                                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${statusStyle[draft.status]}`}>
                                        {draft.status === "Completado" && <span className="mr-1">●</span>}
                                        {draft.status}
                                    </span>
                                </td>

                                {/* Acciones */}
                                <td className="px-5 py-4">
                                    <button className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-colors">
                                        <Download className="w-3 h-3" /> Descargar Word
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">
                        Mostrando 1 a {filtered.length} de 124 resultados
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center">
                            <ChevronLeft className="w-3 h-3" />
                        </button>
                        {[1, 2, 3, "...", 12].map((p, i) => (
                            <button
                                key={i}
                                onClick={() => typeof p === "number" && setPage(p)}
                                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                                    p === page ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button className="w-7 h-7 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center">
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorradoresConcluidos;
