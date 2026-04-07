import { useNavigate } from "react-router-dom";
import { 
   // Bell,
    FileText,
    Calendar,
    BarChart2, 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Clock } from "lucide-react";
import {
    mockNotifications,
    mockHourlyData,
    mockWeeklyAccuracy,
    mockDashboardFiles,
} from "../services/mock/mockData";

const statusColor: Record<string, string> = {
    Completado: "text-green-400",
    Procesando: "text-blue-400",
    Error: "text-red-400",
};

const notifIcon = (type: string) => {
    if (type === "success") return <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />;
    if (type === "warning") return <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
    if (type === "error")   return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
    return <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />;
};

const notifBorder: Record<string, string> = {
    success: "border-green-500",
    warning: "border-yellow-500",
    error:   "border-red-500",
    info:    "border-gray-600",
};

// Mini bar chart (SVG)
const BarChart = ({ data }: { data: { time: string; value: number }[] }) => {
    const max = Math.max(...data.map((d) => d.value));
    return (
        <svg viewBox="0 0 500 100" className="w-full h-28" preserveAspectRatio="none">
            <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            {data.map((d, i) => {
                const barW = 30;
                const gap = (500 - data.length * barW) / (data.length + 1);
                const x = gap + i * (barW + gap);
                const h = (d.value / max) * 90;
                const y = 100 - h;
                return (
                    <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barW}
                        height={h}
                        rx={3}
                        fill={i === 7 ? "#60a5fa" : "url(#barGrad)"}
                    />
                );
            })}
        </svg>
    );
};

// Accuracy bars
const AccuracyBars = ({ data }: { data: { week: string; value: number }[] }) => {
    const max = 100;
    return (
        <div className="flex items-end gap-3 h-20">
            {data.map((d, i) => {
                const isLast = i === data.length - 1;
                return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-full rounded-t" style={{
                            height: `${(d.value / max) * 80}px`,
                            background: isLast ? "#3b82f6" : "#f97316",
                        }} />
                        <span className="text-[10px] text-gray-500">{d.week}</span>
                    </div>
                );
            })}
        </div>
    );
};

const DashboardPage = () => {
   // const navigate = useNavigate();

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
                <p className="text-sm text-gray-400 mt-1">Resumen de actividad y análisis de documentos PDF a Word.</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                    { label: "DOCUMENTOS HOY",   value: "6",   delta: "+12%", icon: <FileText className="w-6 h-6" />,   color: "border-blue-500"   },
                    { label: "ESTA SEMANA",       value: "30",  delta: "+5%",  icon: <Calendar className="w-6 h-6" />,   color: "border-orange-500" },
                    { label: "ESTE MES",          value: "120", delta: "+8%",  icon: <BarChart2 className="w-6 h-6" />,  color: "border-blue-400"   },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1a2233] rounded-xl p-5 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400 font-medium tracking-wide">{stat.label}</span>
                            <span className="text-gray-600">{stat.icon}</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-white">{stat.value}</span>
                            <span className="text-green-400 text-sm mb-1 font-medium">↗ {stat.delta}</span>
                        </div>
                        <div className={`mt-3 h-1 rounded-full bg-gray-700`}>
                            <div className={`h-1 rounded-full ${i === 1 ? "bg-orange-500 w-3/5" : "bg-blue-500 w-4/5"}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
                {/* Documentos Procesados */}
                <div className="col-span-2 bg-[#1a2233] rounded-xl p-5 border border-gray-800">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Documentos Procesados</h3>
                            <p className="text-xs text-gray-500">Actividad de conversión en las últimas 24 horas</p>
                        </div>
                        <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">Hoy</span>
                    </div>
                    <BarChart data={mockHourlyData} />
                    <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        {["00:00", "06:00", "12:00", "18:00", "23:59"].map((t) => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                </div>

                {/* Notificaciones */}
                <div className="bg-[#1a2233] rounded-xl p-4 border border-gray-800 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
                        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">3 Nuevas</span>
                    </div>
                    <div className="space-y-2">
                        {mockNotifications.map((n) => (
                            <div key={n.id} className={`border-l-2 ${notifBorder[n.type]} pl-3 py-1`}>
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    {notifIcon(n.type)}
                                    <span className="text-xs font-semibold text-white">{n.title}</span>
                                </div>
                                <p className="text-[11px] text-gray-400">{n.message}</p>
                                <p className="text-[10px] text-gray-600 mt-0.5">{n.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Precisión */}
                <div className="bg-[#1a2233] rounded-xl p-5 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white">Precisión del Análisis</h3>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-white">98.5%</span>
                            <span className="text-green-400 text-xs ml-1">+1.2%</span>
                        </div>
                    </div>
                    <AccuracyBars data={mockWeeklyAccuracy} />
                </div>

                {/* Archivos recientes */}
                <div className="bg-[#1a2233] rounded-xl p-5 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white">Archivos Recientes</h3>
                        <button className="text-xs text-blue-400 hover:underline">Ver todo</button>
                    </div>
                    <div className="space-y-3">
                        {mockDashboardFiles.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-white truncate">{f.name}</p>
                                    <p className="text-[11px] text-gray-500">{f.size} • {f.time}</p>
                                </div>
                                <span className={`text-xs font-medium ${statusColor[f.status] || "text-gray-400"}`}>
                                    {f.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
