import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Usuarios", path: "/users" },
    { name: "Documentos", path: "/documents" },
    { name: "Análisis", path: "/analysis" },
  ];

  return (
    <aside className="w-64 bg-[#020617] p-4">
      <h1 className="text-lg font-bold mb-6 text-white">FER.IA</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded ${
              pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;