import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Upload, X, FileText, CheckCircle2, AlertTriangle,
    XCircle, RefreshCw, ChevronRight,
} from "lucide-react";
import { mockRecentFiles, type FileStatus } from "../services/mock/mockData";

interface UploadItem {
    id: number;
    name: string;
    size: string;
    progress: number;
    status: "uploading" | "processing" | "done" | "error";
}

const statusBadge = (status: FileStatus) => {
    const map: Record<FileStatus, { label: string; className: string; icon: React.ReactNode }> = {
        "Procesando": {
            label: "Procesando",
            className: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
            icon: <RefreshCw className="w-3 h-3 animate-spin" />,
        },
        "Completado": {
            label: "Completado",
            className: "bg-green-500/20 text-green-400 border border-green-500/40",
            icon: <CheckCircle2 className="w-3 h-3" />,
        },
        "Alerta: Formato inusual": {
            label: "Alerta: Formato inusual",
            className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
            icon: <AlertTriangle className="w-3 h-3" />,
        },
        "Error": {
            label: "Error",
            className: "bg-red-500/20 text-red-400 border border-red-500/40",
            icon: <XCircle className="w-3 h-3" />,
        },
    };
    const s = map[status];
    return (
        <span className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${s.className}`}>
            {s.icon} {s.label}
        </span>
    );
};

const fileIconStyle = (status: FileStatus) => {
    if (status === "Error")                   return { bg: "bg-red-500/20",    text: "text-red-400"    };
    if (status === "Completado")              return { bg: "bg-green-500/20",  text: "text-green-400"  };
    if (status === "Procesando")              return { bg: "bg-blue-500/20",   text: "text-blue-400"   };
    if (status === "Alerta: Formato inusual") return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
    return { bg: "bg-gray-500/20", text: "text-gray-400" };
};

const DocumentosPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [activeUploads, setActiveUploads] = useState<UploadItem[]>([
        { id: 1, name: "INFORME N 001484-2023-SUSALUD-IID.pdf", size: "2.4 MB", progress: 65, status: "uploading" },
        { id: 2, name: "INFORME N 001485-2023-SUSALUD-IID.pdf", size: "2.4 MB", progress: 25, status: "uploading" },
        { id: 3, name: "INFORME N 001486-2023-SUSALUD-IID.pdf", size: "2.4 MB", progress: 10, status: "uploading" },
    ]);

    // Simula progreso de subida automáticamente
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUploads((prev) =>
                prev.map((u) => {
                    if (u.status !== "uploading") return u;
                    const next = Math.min(u.progress + Math.random() * 6, 100);
                    return {
                        ...u,
                        progress: next,
                        status: next >= 100 ? "processing" : "uploading",
                    };
                })
            );
        }, 900);
        return () => clearInterval(interval);
    }, []);

    const removeUpload = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveUploads((prev) => prev.filter((u) => u.id !== id));
    };

    const addFiles = (files: File[]) => {
        const newItems: UploadItem[] = files.map((f, i) => ({
            id: Date.now() + i,
            name: f.name,
            size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
            progress: 0,
            status: "uploading",
        }));
        setActiveUploads((prev) => [...prev, ...newItems]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
        addFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        addFiles(Array.from(e.target.files ?? []));
    };

    // Navegar a Detalle de Análisis al clic en cualquier archivo
    const goToDetalle = () => navigate("/analisis/detalle");

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Subir Documentos PDF</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Sube tus archivos PDF aquí para convertirlos a Word con tecnología IA.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {/* ── Izquierda ── */}
                <div className="col-span-2 space-y-4">

                    {/* Drop zone */}
                    <div
                        className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                            isDragging
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-gray-700 bg-[#1a2233] hover:border-blue-500/60"
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                            <Upload className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="text-white font-semibold text-base mb-1">
                            Arrastra y suelta tus archivos aquí
                        </p>
                        <p className="text-gray-500 text-sm mb-5">
                            o haz clic para explorar. Solo archivos PDF (máx. 10MB).
                        </p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors"
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        >
                            Explorar archivos
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            multiple
                            className="hidden"
                            onChange={handleFileInput}
                        />
                    </div>

                    {/* Subidas activas — clic → Detalle de Análisis */}
                    {activeUploads.length > 0 && (
                        <div className="bg-[#1a2233] rounded-xl p-5 border border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-white">Subidas activas</h3>
                                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                                    {activeUploads.length} archivo{activeUploads.length > 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {activeUploads.map((u) => (
                                    <div
                                        key={u.id}
                                        className="group cursor-pointer rounded-lg hover:bg-gray-800/50 transition-colors -mx-2 px-2 pt-2 pb-1"
                                        onClick={goToDetalle}
                                        title="Ver detalle de análisis"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            {/* Icono PDF */}
                                            <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-4 h-4 text-red-400" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                                                    {u.name}
                                                </p>
                                                <p className="text-[11px] text-gray-500">
                                                    {u.size} •{" "}
                                                    {u.status === "processing"
                                                        ? "Analizando con IA..."
                                                        : `${Math.round(u.progress)}%`}
                                                </p>
                                            </div>

                                            {/* Acciones */}
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                                                <button
                                                    onClick={(e) => removeUpload(u.id, e)}
                                                    className="text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Barra de progreso */}
                                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-700 ${
                                                    u.status === "processing"
                                                        ? "bg-orange-500 w-full animate-pulse"
                                                        : "bg-blue-500"
                                                }`}
                                                style={
                                                    u.status === "uploading"
                                                        ? { width: `${u.progress}%` }
                                                        : undefined
                                                }
                                            />
                                        </div>
                                        <p className="text-[10px] text-gray-500 text-right mt-0.5">
                                            {u.status === "processing" ? "Procesando con IA..." : "Subiendo..."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Derecha: Archivos Recientes — clic → Detalle de Análisis ── */}
                <div className="bg-[#1a2233] rounded-xl p-4 border border-gray-800 h-fit">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white">Archivos Recientes</h3>
                        <button className="text-xs text-blue-400 hover:underline">Ver todo</button>
                    </div>

                    <div className="space-y-1">
                        {mockRecentFiles.map((f) => {
                            const { bg, text } = fileIconStyle(f.status);
                            return (
                                <button
                                    key={f.id}
                                    onClick={goToDetalle}
                                    className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/60 transition-colors text-left group"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                                        <FileText className={`w-4 h-4 ${text}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                                            {f.name}
                                        </p>
                                        <p className="text-[10px] text-gray-500 mb-1">{f.time}</p>
                                        {statusBadge(f.status)}
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
                                </button>
                            );
                        })}
                    </div>

                    <button className="w-full mt-3 text-xs text-gray-500 hover:text-white text-center py-2 border-t border-gray-800 transition-colors">
                        Cargar más documentos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentosPage;
