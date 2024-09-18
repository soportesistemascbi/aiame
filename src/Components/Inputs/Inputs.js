import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Usuario from './Icon_inputs/Usuario.svg';
import Contraseñas from './Icon_inputs/Contra.svg';
import Correo from './Icon_inputs/Gmail.svg';
import Cedula from './Icon_inputs/Cedula.svg';
import Numero from './Icon_inputs/Number.svg';
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { useState } from 'react';
//--------------------------------------------------------------------------------------------
export function Nombre() {
    const handleKeyDown = (event) => {
        const regex = /^[A-Za-z\s]*$/; // Permite letras y espacios
        if (!regex.test(event.key) && event.key !== ' ') {
            event.preventDefault();
        }
    };
    return (_jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "text", required: true, autoComplete: "off", id: "name", name: "nombre", onKeyDown: handleKeyDown }), _jsx("img", { src: Usuario, alt: "Icono de usuario", style: {
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                } }), _jsx("label", { htmlFor: "name", children: "Nombre" })] }));
}
//--------------------------------------------------------------------------------------------
export function TipoDocumento() {
    const [tipoDocumento, setTipoDocumento] = useState('Tipo de Documento');
    const tiposDocumento = ['Cedula', 'Carnet de Extranjería', 'Pasaporte', 'Otro'];
    const handleTipoDocumentoClick = (tipo) => {
        setTipoDocumento(tipo);
    };
    const [mostrarPanel, setMostrarPanel] = useState(false);
    const togglePanel = () => {
        setMostrarPanel(!mostrarPanel);
    };
    return (_jsxs("div", { style: {
            width: '400px', height: '40px'
        }, children: [_jsx("input", { type: "text", required: true, autoComplete: "off", id: "name", name: "nombre", readOnly: true, placeholder: tipoDocumento, onClickCapture: togglePanel, onClick: (e) => e.currentTarget.nextSibling?.classList.toggle('show'), style: {
                    width: 'calc(15em + 8.3vw)', paddingTop: '13px', paddingBottom: '13px', paddingLeft: '40px',
                    borderRadius: '8px', border: 'none', outline: 'none'
                } }), _jsx("img", { src: Cedula, alt: "Icono de usuario", style: {
                    position: 'relative',
                    top: '-33px',
                    left: '10px',
                } }), mostrarPanel && (_jsx("div", { className: "dropdown-content", children: tiposDocumento.map((tipo, index) => (_jsx("span", { onClick: () => handleTipoDocumentoClick(tipo), children: _jsx("div", { onClick: togglePanel, style: {
                            color: 'black',
                            padding: '7px', fontOpticalSizing: 'auto', fontWeight: '600',
                            display: 'flex', justifyContent: 'start', transition: 'all ease-in-out 300ms',
                        }, children: tipo }) }, index))) }))] }));
}
//--------------------------------------------------------------------------------------------
export function NDocumento() {
    const handleKeyDown = (event) => {
        // Código ASCII de los números del 0 al 9: 48-57
        const key = event.key;
        const isNumber = (key >= '0' && key <= '9') || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
        if (!isNumber) {
            event.preventDefault();
        }
    };
    return (_jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "text", required: true, autoComplete: "off", id: "NumeroDoc", name: "nombre", onKeyDown: handleKeyDown }), _jsx("img", { src: Numero, alt: "Icono de usuario", style: {
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                } }), _jsx("label", { htmlFor: "name", children: "Numero de documento" })] }));
}
export function Gmail() {
    return (_jsxs("div", { className: "inputGroup", style: {
            marginTop: '2px'
        }, children: [_jsx("input", { type: "e-mail", required: true, autoComplete: "off", id: "e-mail", name: "e-mail" }), _jsx("img", { src: Correo, alt: "Icono de usuario", style: {
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                } }), _jsx("label", { htmlFor: "name", children: "Correo electronico" })] }));
}
//--------------------------------------------------------------------------------------------
export function NumeroTelefono() {
    const handleKeyDown = (event) => {
        // Código ASCII de los números del 0 al 9: 48-57
        const key = event.key;
        const isNumber = (key >= '0' && key <= '9') || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
        if (!isNumber) {
            event.preventDefault();
        }
    };
    return (_jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "text", required: true, autoComplete: "off", id: "telefono", name: "nombre", onKeyDown: handleKeyDown }), _jsx("img", { src: Numero, alt: "Icono de usuario", style: {
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                } }), _jsx("label", { htmlFor: "name", children: "Numero de telefono" })] }));
}
//--------------------------------------------------------------------------------------------
export function Contraseña() {
    return (_jsxs("div", { className: "inputGroup", children: [_jsx("input", { type: "password", required: true, autoComplete: "off", id: "contrase\u00F1a", name: "nombre" }), _jsx("img", { src: Contraseñas, alt: "Icono de usuario", style: {
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                } }), _jsx("label", { htmlFor: "name", children: "Contrase\u00F1a" })] }));
}
