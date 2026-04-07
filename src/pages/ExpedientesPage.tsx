import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search, SlidersHorizontal, Download, RefreshCw,
    Shield, ClipboardList, CheckCircle2, Bot, ChevronLeft, ChevronRight,
} from "lucide-react";
import { mockExpedientes, type ExpedienteStatus } from "../services/mock/mockData";

const statusStyle: Record<ExpedienteStatus, string> = {
    "Pendiente":   "bg-gray-700/60 text-gray-300",
    "Urgente":     "bg-pink-600/30 text-pink-300 border border-pink-500/50",
    "En Revisión": "bg-blue-600/30 text-blue-300 border border-blue-500/50",
    "Baja":        "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50",
};

const observationStyle = (obs: string) => {
    const map: Record<string, string> = {
        "Firma Faltante":        "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
        "Fechas Inconsistentes": "bg-orange-500/20 text-orange-300 border border-orange-500/40",
        "Página Borrosa":        "bg-purple-500/20 text-purple-300 border border-purple-500/40",
        "Datos Ilegible":        "bg-gray-500/20 text-gray-300 border border-gray-500/40",
        "Formato Incorrecto":    "bg-blue-500/20 text-blue-300 border border-blue-500/40",
    };
    return map[obs] ?? "bg-gray-700 text-gray-300";
};

const observationIcon = (obs: string) => {
    if (obs === "Firma Faltante")        return "✍️";
    if (obs === "Fechas Inconsistentes") return "📅";
    if (obs === "Página Borrosa")        return "🔎";
    if (obs === "Datos Ilegible")        return "👁️";
    if (obs === "Formato Incorrecto")    return "⚠️";
    return "❓";
};

const ExpedientesPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = mockExpedientes.filter(
        (e) =>
            e.id.toLowerCase().includes(search.toLowerCase()) ||
            e.document.toLowerCase().includes(search.toLowerCase())
    );

    // Clic en "Atender" → Edición y Vista Previa
    const goToEdicion = () => navigate("/analisis/edicion");

    // Clic en ID de expediente → Detalle de Análisis
    const goToDetalle = () => navigate("/analisis/detalle");

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Expedientes Analizados</h1>
                    <p className="text-sm text-gray-400 mt-1 max-w-xl">
                        Gestione los documentos que han sido marcados automáticamente por la IA para revisión
                        manual debido a inconsistencias o falta de datos.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-[#1a2233] border border-gray-700 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <Download className="w-4 h-4" /> Exportar
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" /> Actualizar Lista
                    </button>
                </div>
            </div>

            <div className="flex gap-5">
                {/* ── Sidebar filtros ── */}
                <aside className="w-52 flex-shrink-0 space-y-4">
                    <div className="bg-[#1a2233] rounded-xl p-4 border border-gray-800">
                        <div className="flex items-center gap-2 mb-4">
                            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                            <h3 className="text-xs font-semibold text-white uppercase tracking-wide">Filtros</h3>
                        </div>

                        {/* Rango de fecha */}
                        <div className="mb-4">
                            <p className="text-xs text-gray-400 mb-2 font-medium">Rango de Fecha</p>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-[10px] text-gray-500 block mb-1">Desde</label>
                                    <input
                                        type="date"
                                        value={desde}
                                        onChange={(e) => setDesde(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-xs text-gray-300 px-2 py-1.5 rounded-lg outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 block mb-1">Hasta</label>
                                    <input
                                        type="date"
                                        value={hasta}
                                        onChange={(e) => setHasta(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-xs text-gray-300 px-2 py-1.5 rounded-lg outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* N° Expediente */}
                        <div className="mb-4">
                            <p className="text-[10px] text-gray-500 mb-1 font-medium">N° Expediente</p>
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Ej: 00011110"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-xs text-gray-300 pl-7 pr-2 py-1.5 rounded-lg outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => { setSearch(""); setDesde(""); setHasta(""); }}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-xs text-white px-3 py-2 rounded-lg transition-colors"
                        >
                            Limpiar Filtros
                        </button>
                    </div>

                    {/* IA activo */}
                    <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Bot className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-400">Análisis IA Activo</span>
                        </div>
                        <p className="text-[11px] text-gray-400">
                            El sistema está procesando documentos en tiempo real.
                        </p>
                    </div>
                </aside>

                {/* ── Contenido principal ── */}
                <div className="flex-1 min-w-0">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        {[
                            {
                                label: "ERRORES CRÍTICOS",
                                value: "2",
                                delta: "+1 hoy",
                                icon: <Shield className="w-8 h-8 text-red-400/50" />,
                                border: "border-red-500/40",
                                deltaColor: "text-red-400",
                            },
                            {
                                label: "POR REVISAR",
                                value: "14",
                                delta: "-3 resoluciones",
                                icon: <ClipboardList className="w-8 h-8 text-orange-400/50" />,
                                border: "border-orange-500/40",
                                deltaColor: "text-orange-400",
                            },
                            {
                                label: "TASA DE RESOLUCIÓN",
                                value: "94%",
                                delta: "Óptimo",
                                icon: <CheckCircle2 className="w-8 h-8 text-green-400/50" />,
                                border: "border-green-500/40",
                                deltaColor: "text-green-400",
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className={`bg-[#1a2233] border ${s.border} rounded-xl p-4 flex items-center justify-between`}
                            >
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
                                    <p className="text-3xl font-bold text-white">{s.value}</p>
                                    <p className={`text-[11px] mt-0.5 ${s.deltaColor}`}>{s.delta}</p>
                                </div>
                                {s.icon}
                            </div>
                        ))}
                    </div>

                    {/* Tabla */}
                    <div className="bg-[#1a2233] rounded-xl border border-gray-800 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    {["ID EXPEDIENTE", "DOCUMENTO", "OBSERVACIÓN IA", "FECHA", "ESTADO", "ACCIÓN"].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-4 py-3"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((exp) => (
                                    <tr
                                        key={exp.id}
                                        className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                                    >
                                        {/* ID */}
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={goToDetalle}
                                                className="text-blue-400 hover:text-blue-300 hover:underline text-xs font-semibold transition-colors"
                                            >
                                                {exp.id}
                                            </button>
                                        </td>

                                        {/* Documento */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-red-400 text-[9px] font-bold">PDF</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-white leading-tight">{exp.document}</p>
                                                    <p className="text-[10px] text-gray-500">{exp.size}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Observación IA */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium border ${observationStyle(exp.observation)}`}
                                            >
                                                <span>{observationIcon(exp.observation)}</span>
                                                {exp.observation}
                                            </span>
                                        </td>

                                        {/* Fecha */}
                                        <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                                            {exp.date}
                                        </td>

                                        {/* Estado */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyle[exp.status]}`}
                                            >
                                                {exp.status}
                                            </span>
                                        </td>

                                        {/* Acción — ATENDER → Edición y Vista Previa */}
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={goToEdicion}
                                                className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[11px] px-3 py-1.5 rounded-lg font-bold tracking-wide transition-all"
                                            >
                                                ATENDER
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Paginación */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
                            <span className="text-xs text-gray-500">
                                Mostrando 1-{filtered.length} de 45 resultados
                            </span>
                            <div className="flex items-center gap-1">
                                <button className="w-7 h-7 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center">
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                {[1, 2, 3].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                                            p === currentPage
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-400 hover:bg-gray-800"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button className="w-7 h-7 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center">
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpedientesPage;
