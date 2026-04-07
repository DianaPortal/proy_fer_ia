import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Download, ZoomIn, ZoomOut, Wand2, ChevronLeft, ChevronRight } from "lucide-react";

const EdicionVistaPrevia = () => {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(100);
    const [page, setPage] = useState(1);
    const [plantilla, setPlantilla] = useState("Contrato Estándar ES");

    const [fields, setFields] = useState({
        nombre: "Acuerdo de Servicios Tecnológicos",
        fecha: "10/25/2023",
        dni: "48293041-K",
        descripcion: "Servicios de consultoría especializada en integración de modelos de lenguaje para optimización de flujos operativos en el sector logístico.",
        clausulas: "El prestador se compromete a mantener la confidencialidad de los datos. La propiedad intelectual de los desarrollos personalizados pertenecerá íntegramente al cliente tras el pago final.",
    });

    const handleField = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };

    // Mock PDF preview
    const PDFPreview = () => (
        <div className="bg-white rounded-lg p-8 min-h-[520px] flex flex-col gap-3 shadow-inner">
            <div className="h-3 bg-gray-300 rounded w-1/2" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-5/6" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="grid grid-cols-2 gap-4 my-4">
                <div className="h-16 bg-yellow-200 rounded flex items-center justify-center">
                    <span className="text-yellow-700 text-xs truncate px-2">{fields.nombre}</span>
                </div>
                <div className="h-16 bg-gray-100 rounded" />
            </div>
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-4/5" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-2 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-full" />
            <div className="h-20 bg-red-100 rounded w-2/3 mx-auto mt-6 flex items-center justify-center">
                <span className="text-red-400 text-xs">Firma pendiente</span>
            </div>
            <div className="h-2 bg-gray-200 rounded w-full mt-2" />
            <div className="h-2 bg-gray-200 rounded w-5/6" />
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="px-6 pt-5">
                <nav className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                    <button onClick={() => navigate("/dashboard")} className="hover:text-white">Inicio</button>
                    <span>/</span>
                    <button onClick={() => navigate("/documentos")} className="hover:text-white">Documentos</button>
                    <span>/</span>
                    <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
                        INFORME N 6354-SUSAUD.IID
                    </span>
                </nav>

                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edición y Vista Previa</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-green-400">
                                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                                Listo para revisión
                            </span>
                            <span className="text-gray-600 text-xs">•</span>
                            <span className="text-xs text-gray-500">Procesado el 25 Feb, 2025 - 15:30 PM</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-lg transition-colors">
                        + Subir Nuevo
                    </button>
                </div>
            </div>

            {/* Main split */}
            <div className="flex gap-0 mt-4" style={{ minHeight: "calc(100vh - 160px)" }}>
                {/* Left: Form */}
                <div className="w-[480px] flex-shrink-0 border-r border-gray-800 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Wand2 className="w-5 h-5 text-orange-400" />
                            <h2 className="text-base font-bold text-white">Campos del Documento Generado</h2>
                        </div>

                        {/* Nombre */}
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">Nombre</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={fields.nombre}
                                    onChange={handleField("nombre")}
                                    className="w-full bg-gray-800 border border-gray-700 text-sm text-white px-3 py-2.5 pr-10 rounded-lg outline-none focus:border-blue-500"
                                />
                                <Wand2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                            </div>
                        </div>

                        {/* Fecha */}
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">Fecha</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={fields.fecha}
                                    onChange={handleField("fecha")}
                                    className="w-full bg-gray-800 border border-gray-700 text-sm text-white px-3 py-2.5 pr-10 rounded-lg outline-none focus:border-blue-500"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400">✏️</span>
                            </div>
                        </div>

                        {/* DNI */}
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">DNI / Identificación</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={fields.dni}
                                    onChange={handleField("dni")}
                                    className="w-full bg-gray-800 border border-gray-700 text-sm text-white px-3 py-2.5 pr-10 rounded-lg outline-none focus:border-blue-500"
                                />
                                <Wand2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">Descripción</label>
                            <div className="relative">
                                <textarea
                                    value={fields.descripcion}
                                    onChange={handleField("descripcion")}
                                    rows={4}
                                    className="w-full bg-gray-800 border border-gray-700 text-sm text-white px-3 py-2.5 pr-10 rounded-lg outline-none focus:border-blue-500 resize-none"
                                />
                                <Wand2 className="absolute right-3 top-3 w-4 h-4 text-purple-400" />
                            </div>
                        </div>

                        {/* Cláusulas */}
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">Cláusulas</label>
                            <div className="relative">
                                <textarea
                                    value={fields.clausulas}
                                    onChange={handleField("clausulas")}
                                    rows={4}
                                    className="w-full bg-gray-800 border border-gray-700 text-sm text-white px-3 py-2.5 pr-10 rounded-lg outline-none focus:border-blue-500 resize-none"
                                />
                                <Wand2 className="absolute right-3 top-3 w-4 h-4 text-purple-400" />
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 border border-gray-600 text-sm text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                            <RefreshCw className="w-4 h-4" /> Actualizar Previsualización
                        </button>
                    </div>
                </div>

                {/* Right: PDF Preview */}
                <div className="flex-1 flex flex-col bg-[#111827]">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#1a2233]">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">PLANTILLA:</span>
                            <select
                                value={plantilla}
                                onChange={(e) => setPlantilla(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-xs text-white px-2 py-1 rounded outline-none"
                            >
                                <option>Contrato Estándar ES</option>
                                <option>Contrato Estándar EN</option>
                                <option>Informe Técnico</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="text-gray-400 hover:text-white">
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-gray-400 w-10 text-center">{zoom}%</span>
                            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-gray-400 hover:text-white">
                                <ZoomIn className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-gray-500">Página {page} de 12</span>
                        </div>
                    </div>

                    {/* Preview area */}
                    <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", width: "100%", maxWidth: 560 }}>
                            <PDFPreview />
                        </div>
                    </div>

                    {/* Page nav */}
                    <div className="flex items-center justify-center gap-4 py-2 border-t border-gray-800">
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="text-gray-400 hover:text-white">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-500">Página {page} de 12</span>
                        <button onClick={() => setPage((p) => Math.min(12, p + 1))} className="text-gray-400 hover:text-white">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Footer actions */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a2233]">
                        <button
                            onClick={() => navigate("/expedientes")}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Cancelar y Volver
                        </button>
                        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2.5 rounded-lg font-semibold transition-colors">
                            <Download className="w-4 h-4" /> Confirmar y Descargar Word (.docx)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EdicionVistaPrevia;
