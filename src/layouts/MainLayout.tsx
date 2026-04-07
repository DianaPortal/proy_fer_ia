import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    BarChart2,
    Settings,
    HelpCircle,
    Bell,
   // LogOut,
   // ChevronRight,
} from "lucide-react";

// Layout con sidebar (usado en Dashboard/Panel de Control)
export const SidebarLayout = () => {
   // const navigate = useNavigate();
   // const [notifCount] = useState(3);

    const navItems = [
        { to: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Panel de Control" },
        { to: "/documentos", icon: <FileText className="w-5 h-5" />, label: "Documentos" },
        { to: "/analisis", icon: <BarChart2 className="w-5 h-5" />, label: "Análisis" },
        { to: "/configuracion", icon: <Settings className="w-5 h-5" />, label: "Configuración" },
    ];

    return (
        <div className="flex min-h-screen bg-[#0f1623] text-white">
            {/* Sidebar */}
            <aside className="w-56 bg-[#131c2e] flex flex-col border-r border-gray-800 fixed h-full z-20">
                {/* Logo */}
                <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-800">
                    <div className="w-7 h-7 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">+</span>
                    </div>
                    <span className="text-white font-bold text-base tracking-wide">FER.IA</span>
                </div>

                {/* User info */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        AG
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400 truncate">Admin User</p>
                        <p className="text-xs font-semibold truncate">ANA GARCÍA</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                    isActive
                                        ? "bg-blue-600 text-white font-medium"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="px-3 pb-5 space-y-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors">
                        <HelpCircle className="w-5 h-5" />
                        Ayuda
                    </button>
                </div>
            </aside>

            {/* Content */}
            <div className="flex-1 ml-56">
                <Outlet />
            </div>
        </div>
    );
};

// TopNav Layout (usado en Documentos, Usuarios, etc.)
export const TopNavLayout = () => {
    const navigate = useNavigate();
    const [notifCount] = useState(3);

    const navItems = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/documentos", label: "Documentos" },
        { to: "/expedientes", label: "Expedientes" },
        { to: "/analisis", label: "Análisis" },
        { to: "/configuracion", label: "Configuración" },
    ];

    return (
        <div className="min-h-screen bg-[#0f1623] text-white">
            {/* Top Nav */}
            <header className="bg-[#131c2e] border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">+</span>
                    </div>
                    <span className="text-white font-bold text-base tracking-wide">FER.IA</span>
                </div>

                {/* Nav links */}
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded text-sm transition-colors ${
                                    isActive
                                        ? "text-blue-400 font-medium"
                                        : "text-gray-400 hover:text-white"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/usuarios")}
                        className="bg-red-500 hover:bg-red-600 transition-colors text-sm px-4 py-1.5 rounded-lg font-medium"
                    >
                        Cerrar sesión
                    </button>
                    <button className="relative text-gray-400 hover:text-white">
                        <Bell className="w-5 h-5" />
                        {notifCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {notifCount}
                            </span>
                        )}
                    </button>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                        AG
                    </div>
                </div>
            </header>

            {/* Content */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};
