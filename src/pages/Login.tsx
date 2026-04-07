import bgImage from "../assets/img/fondo_login.jpg";

const Login = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex flex-col items-center">
                {/* Card */}
                <div className="bg-[#1f2937]/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[380px] text-white border border-gray-600">

                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Bienvenido de nuevo
                    </h2>

                    <p className="text-sm text-gray-300 text-center mb-6">
                        Ingresa tus credenciales para acceder al panel.
                    </p>

                    {/* Usuario */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-300">
                            <label>Usuario</label>
                            <span></span> {/* opcional para mantener alineación */}
                        </div>

                        <input
                            type="text"
                            placeholder="Usuario"
                            className="w-full mt-1 p-2 rounded bg-gray-200 text-black outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-300">
                            <label>Contraseña</label>
                            <span className="cursor-pointer hover:underline">
                                ¿Olvidaste tu contraseña?
                            </span>
                        </div>

                        <input
                            type="password"
                            placeholder="********"
                            className="w-full mt-1 p-2 rounded bg-gray-200 text-black outline-none"
                        />
                    </div>

                    {/* Botón */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium">
                        Entrar
                    </button>
                </div>

                <div className="mt-8 text-center text-gray-300 text-sm">
                    <p>
                        © 2026 FER.IA Todos los derechos reservados. <br />
                        Privacidad · Términos
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;