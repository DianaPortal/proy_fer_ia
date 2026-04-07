import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import DocumentosPage from "../pages/DocumentosPage";
import ExpedientesPage from "../pages/ExpedientesPage";
import AnalisisDetallePage from "../pages/AnalisisDetallePage";
import EdicionVistaPrevia from "../pages/EdicionVistaPrevia";
import BorradoresConcluidos from "../pages/BorradoresConcluidos";
import UsuariosPage from "../pages/UsuariosPage";
import { SidebarLayout, TopNavLayout } from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    // Dashboard usa SidebarLayout
    {
        element: <SidebarLayout />,
        children: [
            { path: "/dashboard", element: <DashboardPage /> },
        ],
    },
    // Resto usa TopNavLayout
    {
        element: <TopNavLayout />,
        children: [
            { path: "/documentos",        element: <DocumentosPage /> },
            { path: "/expedientes",       element: <ExpedientesPage /> },
            { path: "/analisis/detalle",  element: <AnalisisDetallePage /> },
            { path: "/analisis/edicion",  element: <EdicionVistaPrevia /> },
            { path: "/analisis/borradores", element: <BorradoresConcluidos /> },
            { path: "/usuarios",          element: <UsuariosPage /> },
            // placeholder pages
            { path: "/analisis",          element: <ExpedientesPage /> },
            { path: "/configuracion",     element: <UsuariosPage /> },
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;


