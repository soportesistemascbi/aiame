import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//--------------------------------------------------------------------------------------------
//Importaciones de CSS
import "./Inicio_Sesion.css";
import "../../../Components/Inputs/Inputs.tsx";
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from "../../../Img/Logo.png";
import Usuario from "./IS_Icon/Usuario.svg";
import Contraseña from "./IS_Icon/Contra.svg";
import MoonLoader from 'react-spinners/MoonLoader';
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from "react-router-dom";
import { Iniciar } from "../../../Components/Botones/Botones";
import { useState } from 'react';
{ /*         VALIDACION DE USUARIO         */ }
export default function Login() {
    // Importa el hook useNavigate de React Router para manejar la navegación.
    const navigate = useNavigate();
    // INICIAR LAS VARIABLES
    // Declara el estado para mostrar la alerta 1 (cuando hay campos vacíos).
    const [showAlert_inicio1, setShowAlert1] = useState(false);
    // Declara el estado para mostrar la alerta 2 (cuando hay un error en la respuesta).
    const [showAlert_inicio, setShowAlert] = useState(false);
    // Declara el estado de carga para indicar si se está procesando la solicitud.
    const [loading, setLoading] = useState(false);
    // Función para manejar el inicio de sesión.
    const handleLogin = async (e) => {
        e.preventDefault(); // Previene el envío del formulario de manera tradicional.
        setLoading(true); // Inicia el loader al comenzar el proceso de inicio de sesión.
        // Captura y procesa el valor del campo documento.
        const documento = e.target.elements.numero.value.trim().toLowerCase();
        // Captura y procesa el valor del campo contraseña.
        const contraseñaIngresada = e.target.elements.contraseña.value.trim();
        // Verifica si alguno de los campos está vacío.
        if (!documento || !contraseñaIngresada) {
            setShowAlert1(true); // Muestra la alerta 1 si hay campos vacíos.
            setTimeout(() => {
                setShowAlert1(false); // Oculta la alerta después de 3 segundos.
            }, 3000);
            setLoading(false); // Desactiva el loader.
            return; // Sale de la función si hay campos vacíos.
        }
        try {
            // Construye la URL de la API para la solicitud de inicio de sesión.
            const url = `https://instrudev.com/aiameapp/login/webserviceapp.php?case=4&usuarios=${documento}&contrasena=${contraseñaIngresada}`;
            console.log(url); // Imprime la URL en la consola para depuración.
            // Realiza la solicitud a la API.
            const response = await fetch(url, {
                method: 'GET', // Método GET para la solicitud.
            });
            // Verifica si la respuesta no fue exitosa.
            if (!response.ok) {
                setShowAlert(true); // Muestra la alerta 2 si hubo un error en la respuesta.
                setTimeout(() => {
                    setShowAlert(false); // Oculta la alerta después de 3 segundos.
                }, 3000);
                setLoading(false); // Desactiva el loader.
                return; // Sale de la función si hubo un error en la respuesta.
            }
            // Convierte la respuesta de la API a JSON.
            const data = await response.json();
            console.log(data); // Imprime los datos en la consola para depuración.
            // Verifica si el inicio de sesión fue exitoso.
            if (data.rp === 'si') {
                const { id_rol } = data.usuario; // Obtiene el id_rol del usuario.
                console.log(data); // Imprime nuevamente los datos para verificar.
                // Almacena información del usuario en localStorage.
                localStorage.setItem('idUsuario', data.usuario.id_usuario);
                localStorage.setItem('id_usuario', data.usuario.nombre);
                localStorage.setItem('id_rol', data.usuario.id_rol);
                localStorage.setItem('correo', data.usuario.correo);
                localStorage.setItem('rol', data.usuario.descripcion);
                // Redirige al usuario según su rol.
                if (id_rol === '1') {
                    navigate('/HomeIntructor'); // Navega a la página del instructor.
                    setLoading(false); // Desactiva el loader.
                }
                else if (id_rol === '2') {
                    navigate('/HomeIntructor'); // También para el rol '2', navega a la página del instructor.
                    setLoading(false); // Desactiva el loader.
                }
                else if (id_rol === '3') {
                    navigate('/HomeSoporte'); // Navega a la página de soporte para el rol '3'.
                    setLoading(false); // Desactiva el loader.
                }
                else if (id_rol === '4') {
                    navigate('/HomeAdmin'); // Navega a la página del administrador para el rol '4'.
                    setLoading(false); // Desactiva el loader.
                }
            }
            else {
                setShowAlert(true); // Muestra la alerta 2 si el inicio de sesión no fue exitoso.
                setTimeout(() => {
                    setShowAlert(false); // Oculta la alerta después de 3 segundos.
                }, 3000);
                setLoading(false); // Desactiva el loader.
            }
        }
        catch (error) {
            console.log("Error al iniciar sesión:", error); // Imprime el error en caso de que ocurra.
            setLoading(false); // Desactiva el loader.
        }
    };
    return (_jsxs(_Fragment, { children: [showAlert_inicio && (_jsx("div", { style: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', background: 'linear-gradient(145deg, #232323, #1e1e1e)', padding: '20px', borderRadius: '10px', zIndex: '9999', }, children: "Correo o contrase\u00F1a incorrectos. Por favor, int\u00E9ntalo de nuevo." })), showAlert_inicio1 && (_jsx("div", { style: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', background: 'linear-gradient(145deg, #232323, #1e1e1e)', padding: '20px', borderRadius: '10px', zIndex: '9999', }, children: "Por favor llene los campos" })), _jsx("div", { className: "fondo", style: {
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                }, children: _jsxs("div", { style: {
                        width: "calc(20em + 10vw)",
                        height: "600px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "fixed",
                        textAlign: "center",
                        flexDirection: "column",
                        marginLeft: "calc(0em + 10vw)",
                    }, children: [_jsx("img", { src: Logo, alt: "Logo de la aplicaci\u00F3n", style: {
                                width: "100px",
                                top: "0",
                                left: "0%",
                                position: "fixed",
                                zIndex: "1",
                            } }), _jsx("h1", { style: {
                                color: "#096ECB",
                                fontFamily: '"fredoka",sans-serif',
                                fontOpticalSizing: "auto",
                                fontWeight: "600",
                                fontVariationSettings: '"wdth" 100',
                                fontSize: "40px",
                            }, children: "Iniciar sesion" }), _jsxs("form", { onSubmit: handleLogin, style: { display: 'flex', width: '100%', alignItems: 'center', justifyItems: 'center', flexDirection: 'column' }, children: [_jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "text", required: true, autoComplete: "off", id: "numero", placeholder: "Ingrese su n\u00FAmero de documento" }), _jsx("img", { src: Usuario, alt: "\u00CDcono de usuario", style: {
                                                position: "absolute",
                                                top: "0px",
                                                left: "10px",
                                                marginTop: "10px",
                                            } }), _jsx("label", { htmlFor: "name", children: " Numero de documento" })] }), _jsxs("div", { className: "inputGroup", style: {}, children: [_jsx("input", { type: "password", required: true, autoComplete: "off", id: "contrase\u00F1a", placeholder: "Ingrese su contrase\u00F1a" }), _jsx("img", { src: Contraseña, alt: "\u00CDcono de contrase\u00F1a", style: {
                                                position: "absolute",
                                                top: "0px",
                                                left: "10px",
                                                marginTop: "10px",
                                            } }), _jsx("label", { htmlFor: "name", children: "Contrase\u00F1a" })] }), _jsx(Link, { to: "Olvido_Contraseña", style: { textDecoration: 'none' }, children: _jsx("p", { style: {
                                            fontSize: "12px",
                                            marginTop: "-5px",
                                            marginLeft: "-190%",
                                            cursor: "pointer", color: 'black'
                                        }, children: "\u00BFOlvido su contrase\u00F1a?" }) }), _jsx(Iniciar, {})] }), _jsx(Link, { to: "/Registro", style: { textDecoration: 'none' }, children: _jsx("p", { style: {
                                    fontSize: "12px",
                                    marginTop: "4px", color: 'black'
                                }, children: "Registrarse" }) })] }) }), loading && (_jsx("div", { style: {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }, children: _jsx(MoonLoader, { color: "#096ECB", loading: loading, size: 150, speedMultiplier: 1 }) }))] }));
}
