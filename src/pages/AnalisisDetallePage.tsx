import { useNavigate } from "react-router-dom";
import { Download, RefreshCw, ChevronLeft, ChevronRight, AlertTriangle, XCircle, CheckCircle2, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

const dataCriticos = {
    expediente: "INFORME N  6354-SUSAUD.IID",
    codigoRenipress: "00011110",
    fechaExpediente: "23 de Octubre, 2025",
    tipoDocumento: "SETI IPRESS",
};

const anomalias = [
    {
        type: "warning",
        title: "Cláusula de Renovación Ambigua",
        desc: "El texto en la sección 4.2 sugiere una renovación automática sin especificar el porcentaje de incremento anual.",
    },
    {
        type: "error",
        title: "Firma Faltante",
        desc: "No se detectó firma digital ni manuscrita en la página final del anexo técnico.",
    },
];

const discrepancias = [
    { norma: "ISO 27001",       hallazgo: "Falta mención explícita sobre encriptación de datos en reposo.", estado: "Revisar"   },
    { norma: "GDPR Art. 28",    hallazgo: "Sub-procesadores definidos correctamente en Anexo B.",           estado: "Conforme"  },
    { norma: "Ley local 34/2002", hallazgo: "Dirección fiscal no coincide con registros públicos.",         estado: "Crítico"   },
];

const estadoStyle: Record<string, string> = {
    Revisar:  "bg-orange-500/20 text-orange-400 border border-orange-500/40",
    Conforme: "bg-green-500/20 text-green-400 border border-green-500/40",
    Crítico:  "bg-red-500/20 text-red-400 border border-red-500/40",
};

// Mock PDF preview page
const PDFPreview = () => (
    <div className="bg-white rounded-lg p-6 min-h-[480px] flex flex-col gap-3">
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-5/6" />
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="grid grid-cols-2 gap-4 my-3">
            <div className="h-16 bg-yellow-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
        </div>
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-4/5" />
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-16 bg-red-200 rounded w-2/3 mx-auto mt-4" />
        <div className="h-2 bg-gray-200 rounded w-full mt-2" />
        <div className="h-2 bg-gray-200 rounded w-5/6" />
    </div>
);

const AnalisisDetallePage = () => {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(100);
    const [page, setPage] = useState(1);

    return (
        <div className="p-6 min-h-screen">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <button onClick={() => navigate("/dashboard")} className="hover:text-white">Inicio</button>
                <span>/</span>
                <button onClick={() => navigate("/expedientes")} className="hover:text-white">Documentos</button>
                <span>/</span>
                <span className="text-white bg-gray-700 px-2 py-0.5 rounded">Contrato_V3.pdf</span>
            </nav>

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Detalle de Análisis</h1>
                    <p className="text-sm text-gray-500 mt-1">Procesado el 25 Feb, 2025 • 15:30 PM</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-[#1a2233] border border-gray-700 text-sm text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <Download className="w-4 h-4" /> Exportar
                    </button>
                    <button className="flex items-center gap-2 bg-[#1a2233] border border-blue-500/50 text-sm text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600/10 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Reanalizar con IA
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-lg transition-colors">
                        Subir Nuevo
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-5">
                {/* Left: PDF Preview */}
                <div className="col-span-2 bg-[#1a2233] rounded-xl border border-gray-800 overflow-hidden">
                    {/* Viewer toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-blue-400">📄</span>
                            <span className="text-sm font-medium text-white">Vista Previa</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-gray-400 hover:text-white">
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-gray-400 w-10 text-center">{zoom}%</span>
                            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-gray-400 hover:text-white">
                                <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <PDFPreview />
                    </div>
                    {/* Page controls */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="text-gray-400 hover:text-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-400">Página {page} de 12</span>
                        <button
                            onClick={() => setPage((p) => Math.min(12, p + 1))}
                            className="text-gray-400 hover:text-white"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right: Data */}
                <div className="col-span-3 space-y-4">
                    {/* Datos críticos */}
                    <div className="bg-[#1a2233] rounded-xl border border-gray-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <h3 className="text-sm font-semibold text-white">Datos Críticos Extraídos</h3>
                            </div>
                            <span className="text-[11px] bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded-full font-medium">
                                ALTA CONFIANZA
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "EXPEDIENTE",         value: dataCriticos.expediente },
                                { label: "CÓDIGO RENIPRESS",   value: dataCriticos.codigoRenipress },
                                { label: "FECHA DE EXPEDIENTE",value: dataCriticos.fechaExpediente },
                                { label: "TIPO DE DOCUMENTO",  value: dataCriticos.tipoDocumento },
                            ].map((d) => (
                                <div key={d.label} className="bg-gray-800/40 rounded-lg p-3">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">{d.label}</p>
                                    <p className="text-sm font-semibold text-white">{d.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Anomalías */}
                    <div className="bg-[#1a2233] rounded-xl border border-gray-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-sm font-semibold text-white">Anomalías y Alertas</h3>
                            </div>
                            <span className="text-[11px] bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 rounded-full font-medium">
                                2 DETECTADAS
                            </span>
                        </div>
                        <div className="space-y-3">
                            {anomalias.map((a, i) => (
                                <div
                                    key={i}
                                    className={`rounded-lg p-3 border ${
                                        a.type === "warning"
                                            ? "bg-yellow-500/10 border-yellow-500/30"
                                            : "bg-red-500/10 border-red-500/30"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-start gap-2">
                                            {a.type === "warning"
                                                ? <span className="text-yellow-400 text-sm mt-0.5">!</span>
                                                : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                            }
                                            <div>
                                                <p className="text-xs font-semibold text-white">{a.title}</p>
                                                <p className="text-[11px] text-gray-400 mt-0.5">{a.desc}</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-400 text-[11px] hover:underline flex-shrink-0">
                                            Ver en PDF
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discrepancias */}
                    <div className="bg-[#1a2233] rounded-xl border border-gray-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">📋</span>
                                <h3 className="text-sm font-semibold text-white">Discrepancias Normativas</h3>
                            </div>
                        </div>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left text-gray-500 pb-2 font-medium">Norma</th>
                                    <th className="text-left text-gray-500 pb-2 font-medium">Hallazgo</th>
                                    <th className="text-left text-gray-500 pb-2 font-medium">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {discrepancias.map((d, i) => (
                                    <tr key={i} className="border-b border-gray-800/50">
                                        <td className="py-3 text-white font-medium pr-4">{d.norma}</td>
                                        <td className="py-3 text-gray-400 pr-4">{d.hallazgo}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${estadoStyle[d.estado]}`}>
                                                {d.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalisisDetallePage;
