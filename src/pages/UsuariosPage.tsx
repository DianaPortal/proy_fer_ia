import { useState } from "react";
import { Search, Plus, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { mockUsers, type UserRole, type UserStatus } from "../services/mock/mockData";

const roleBadge: Record<UserRole, string> = {
    Admin:  "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    Editor: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
    Viewer: "text-gray-400",
};

const statusBadge: Record<UserStatus, string> = {
    Activo:    "bg-green-500/20 text-green-400 border border-green-500/40",
    Inactivo:  "bg-red-500/20 text-red-400 border border-red-500/40",
    Pendiente: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
};

const avatarColors = [
    "bg-blue-600", "bg-teal-600", "bg-purple-600", "bg-orange-600",
    "bg-pink-600", "bg-indigo-600", "bg-green-600", "bg-rose-600",
];

const UsuariosPage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"Todos" | UserStatus>("Todos");
    const [page, setPage] = useState(1);

    const filtered = mockUsers.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "Todos" || u.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Mantenimiento de Usuarios</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Gestiona el acceso, permisos y los roles de los usuarios registrados en la plataforma.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Nuevo Usuario
                </button>
            </div>

            {/* Filters */}
            <div className="bg-[#1a2233] rounded-xl border border-gray-800 p-4 mb-5">
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o correo..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-sm text-white pl-9 pr-3 py-2 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Slider icon */}
                    <button className="w-9 h-9 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    {/* Mostrar filter */}
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-gray-400">Mostrar:</span>
                        <div className="relative">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as typeof filter)}
                                className="appearance-none bg-[#0f1623] border border-gray-700 text-sm text-white pl-3 pr-8 py-2 rounded-lg outline-none cursor-pointer"
                            >
                                <option value="Todos">Todos</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a2233] rounded-xl border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800">
                            {["NOMBRE", "USER", "ROL", "ESTADO", "ACCIONES"].map((h) => (
                                <th key={h} className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user, idx) => (
                            <tr key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                {/* Nombre */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                                            {user.initials}
                                        </div>
                                        <span className="text-sm font-medium text-white">{user.name}</span>
                                    </div>
                                </td>

                                {/* Username */}
                                <td className="px-5 py-4 text-xs text-gray-400 font-mono">{user.username}</td>

                                {/* Rol */}
                                <td className="px-5 py-4">
                                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${roleBadge[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>

                                {/* Estado */}
                                <td className="px-5 py-4">
                                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusBadge[user.status]}`}>
                                        <span className="mr-1">●</span>{user.status}
                                    </span>
                                </td>

                                {/* Acciones */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors">
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">
                        Mostrando 1-{filtered.length} de 24 usuarios
                    </span>
                    <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center">
                            <ChevronLeft className="w-3 h-3" />
                        </button>
                        {[1, 2, 3, "...", 10].map((p, i) => (
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

export default UsuariosPage;
