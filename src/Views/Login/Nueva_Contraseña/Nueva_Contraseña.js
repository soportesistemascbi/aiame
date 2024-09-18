import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../../../Components/Inputs/Inputs.css';
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from '../../../Img/Logo.png';
import Contra from './NC_icon/Contraseña.svg';
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from 'react-router-dom';
import { Cancelar } from '../../../Components/Botones/Botones';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import MoonLoader from 'react-spinners/MoonLoader';
import { useState } from 'react';
export default function NuevaContraseña() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const bcrypt1 = bcrypt;
    const cambiarContrasena = async (e) => {
        e.preventDefault();
        setLoading(true); //COMIENZA LA ANIMACION DE CARGA 
        const contraseña = document.getElementById('name').value;
        const contraseña1 = document.getElementById('name2').value;
        console.log('aaaaaaaaaaaaaaa', contraseña);
        const encryptedPassword = await bcrypt1.hash(contraseña, 10);
        const id = localStorage.getItem('usuarios');
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', id);
        if (contraseña.length < 8) {
            alert("La contraseña debe tener 8 dígitos.");
            setLoading(false); // Detiene el loader
            return;
        }
        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;
        const numeros = /\d/;
        if (!mayuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra mayúscula.");
            setLoading(false); // Detiene el loader
            return;
        }
        if (!minuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra minúscula.");
            setLoading(false); // Detiene el loader
            return;
        }
        if (!numeros.test(contraseña)) {
            alert("La contraseña debe contener al menos un número.");
            setLoading(false); // Detiene el loader
            return;
        }
        if (!especial.test(contraseña)) {
            alert("La contraseña debe contener al menos un carácter especial.");
            setLoading(false); // Detiene el loader
            return;
        }
        if (contraseña != contraseña1) {
            alert("La contraseña debe ser la misma en ambos campos.");
            setLoading(false); // Detiene el loader
            return;
        }
        try {
            const response = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=9&id=${id}&contrasena=${encryptedPassword}`, {
                method: 'GET',
            });
            if (!response.ok) {
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            if (data.rp === 'si') {
                alert('Contraseña cambiada con exito');
                navigate('/');
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            }
            else {
                alert(data.mensaje);
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
                            }, children: "Ingrese su nueva contrase\u00F1a " }), _jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "password", required: true, autoComplete: "off", id: "name" }), _jsx("img", { src: Contra, style: {
                                        position: 'absolute',
                                        top: '0px', left: '10px',
                                        marginTop: '10px'
                                    } }), _jsx("label", { htmlFor: "name", children: " Contrase\u00F1a Nueva" })] }), _jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "password", required: true, autoComplete: "off", id: "name2" }), _jsx("img", { src: Contra, style: {
                                        position: 'absolute',
                                        top: '0px', left: '10px',
                                        marginTop: '10px'
                                    } }), _jsx("label", { htmlFor: "name", children: " Confirmar contrase\u00F1a" })] }), _jsxs("div", { style: {
                                display: 'flex', gap: '1rem'
                            }, children: [_jsx(Link, { to: '/Olvido_Contraseña', children: _jsx(Cancelar, {}) }), _jsx("button", { onClick: cambiarContrasena, style: {
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
