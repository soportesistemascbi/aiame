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
import React from 'react';

// Define el tipo de las props para ProtegerRuta
interface ProtegerRutaProps {
  allowRoutes: number[];
}

const ProtegerRuta: React.FC<ProtegerRutaProps> = ({ allowRoutes }) => {
  const id = JSON.parse(localStorage.getItem('id_rol')!);
  console.log(id);

  return allowRoutes.includes(id) ? <Outlet /> : <Navigate to="/Error404" />;
}

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Error404" element={<Error404 />} />
        <Route path="Olvido_Contraseña" element={<Olvido_Contraseña />} />
        <Route path="Codigo_Vef" element={<Codigo_Vef />} />
        <Route path="NuevaContraseña" element={<NuevaContraseña />} />
        <Route path="Registro" element={<Registro />} />

        <Route element={<ProtegerRuta allowRoutes={[1, 2]} />} >
          <Route path='/HomeIntructor' element={<HomeIntructor />} />
        </Route>

        <Route element={<ProtegerRuta allowRoutes={[3]} />} >
          <Route path="HomeSoporte" element={<HomeSoporte />} />
          <Route path='Anuncios' element={<Anuncios />} />
        </Route>

        <Route element={<ProtegerRuta allowRoutes={[4]} />}>
          <Route path='/HomeAdmin' element={<HomeAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
