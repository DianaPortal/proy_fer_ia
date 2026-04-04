const Navbar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Panel</h2>

      <button className="bg-red-500 px-4 py-1 rounded">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Navbar;