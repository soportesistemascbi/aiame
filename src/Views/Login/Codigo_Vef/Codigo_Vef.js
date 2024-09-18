import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './Codigo_vef.css';
import '../../../Components/Inputs/Inputs.css';
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from '../../../Img/Logo.png';
import Seguridad from './CV_icon/Seguridad.svg';
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from 'react-router-dom';
import { Cancelar } from '../../../Components/Botones/Botones';
import MoonLoader from 'react-spinners/MoonLoader';
import { useState } from 'react';
export default function Codigo_Vef() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const correo = document.getElementById('name').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo)) {
            alert("Por favor ingresa un correo electrónico válido.");
            return;
        }
    };
    const verificarCodigo = async (e) => {
        e.preventDefault();
        setLoading(true); //COMIENZA LA ANIMACION DE CARGA 
        const codigo = document.getElementById('name').value;
        try {
            const response = await fetch(`https://instrudev.com/aiameapp/correo/olvidoContraseña.php?case=2&codigo=${encodeURIComponent(codigo)}`, {
                method: 'GET',
            });
            if (!response.ok) {
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            if (data.rp === 'si') {
                alert('Código verificado con éxito');
                navigate('/NuevaContraseña');
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            }
            else {
                alert(data.mensaje);
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            }
        }
        catch (error) {
            console.error('Error al verificar el código:', error);
            alert('Ocurrió un error al procesar la solicitud.');
            setLoading(false); //DETIENE LA ANIMACION DE CARGA
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fondo1", children: _jsxs("div", { style: {
                        width: 'calc(20em + 10vw)', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', textAlign: 'center',
                        flexDirection: 'column',
                        marginLeft: 'calc(0em + 10vw)'
                    }, children: [_jsx("img", { src: Logo, style: {
                                width: '100px', top: '0', left: '0%',
                                position: 'fixed', zIndex: '1'
                            } }), _jsx("h1", { style: {
                                color: '#096ECB',
                                fontFamily: '"fredoka",sans-serif',
                                fontOpticalSizing: 'auto',
                                fontWeight: '600',
                                fontVariationSettings: '"wdth" 100',
                                fontSize: '40px'
                            }, children: "Ingrese su c\u00F3digo de verificaci\u00F3n " }), _jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "e-mail", required: true, autoComplete: "off", id: "name", onSubmit: handleSubmit }), _jsx("img", { src: Seguridad, style: {
                                        position: 'absolute',
                                        top: '0px', left: '10px',
                                        marginTop: '10px'
                                    } }), _jsx("label", { htmlFor: "name", children: " C\u00F3digo verificaci\u00F3n " })] }), _jsxs("div", { style: {
                                display: 'flex', gap: '1rem'
                            }, children: [_jsx(Link, { to: '/Olvido_Contraseña', children: _jsx(Cancelar, {}) }), _jsx("button", { onClick: verificarCodigo, style: {
                                        width: '130px', padding: '12px',
                                        borderRadius: '5px', border: 'none',
                                        background: '#096ECB', color: 'white',
                                        marginTop: '25px', cursor: 'pointer'
                                    }, children: "Aceptar" })] })] }) }), loading && (_jsx("div", { style: {
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
