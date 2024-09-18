import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import HomeAdmin from './Views/HomeAdmin/HomeAdmin';
import Login from './Views/Login/Iniciar_Sesion/Inicio_Sesion.js';
import Olvido_Contraseña from './Views/Login/Olvido_Contraseña/Olvido_Contraseña.js';
import Codigo_Vef from './Views/Login/Codigo_Vef/Codigo_Vef.js';
import NuevaContraseña from './Views/Login/Nueva_Contraseña/Nueva_Contraseña.js';
import Registro from './Views/Login/Registro/Registro.js';
import HomeIntructor from './Views/instructor/Navbar/HomeIntructor.js';
import HomeSoporte from './Views/Soporte_Sitio/Navbar/HomeSoporte';
import Anuncios from './Views/Soporte_Sitio/tablas/Anuncios.js';
import Error404 from './Views/Error404/Error404.js';
const ProtegerRuta = ({ allowRoutes }) => {
    const id = JSON.parse(localStorage.getItem('id_rol'));
    console.log(id);
    return allowRoutes.includes(id) ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/Error404" });
};
const AppRouter = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/Error404", element: _jsx(Error404, {}) }), _jsx(Route, { path: "Olvido_Contrase\u00F1a", element: _jsx(Olvido_Contraseña, {}) }), _jsx(Route, { path: "Codigo_Vef", element: _jsx(Codigo_Vef, {}) }), _jsx(Route, { path: "NuevaContrase\u00F1a", element: _jsx(NuevaContraseña, {}) }), _jsx(Route, { path: "Registro", element: _jsx(Registro, {}) }), _jsx(Route, { element: _jsx(ProtegerRuta, { allowRoutes: [1, 2] }), children: _jsx(Route, { path: '/HomeIntructor', element: _jsx(HomeIntructor, {}) }) }), _jsxs(Route, { element: _jsx(ProtegerRuta, { allowRoutes: [3] }), children: [_jsx(Route, { path: "HomeSoporte", element: _jsx(HomeSoporte, {}) }), _jsx(Route, { path: 'Anuncios', element: _jsx(Anuncios, {}) })] }), _jsx(Route, { element: _jsx(ProtegerRuta, { allowRoutes: [4] }), children: _jsx(Route, { path: '/HomeAdmin', element: _jsx(HomeAdmin, {}) }) })] }) }));
};
export default AppRouter;
