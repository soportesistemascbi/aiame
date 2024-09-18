import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function Tabla_Reportes_SU() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://instrudev.com/aiameapp/caso/webserviceapp.php?case=6');
                const data = await response.json();
                // Si la respuesta contiene [{"rp":"no"}], no hay casos
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setUsuarios([]);
                }
                else {
                    setUsuarios(data.rpta);
                }
            }
            catch (error) {
                console.error('Error al obtener casos:', error);
            }
        };
        fetchData();
    }, []);
    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };
    const usuariosFiltrados = usuarios.filter(item => item.nombreReporte.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.nombreSoporte.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase()));
    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            // Si hex es vacío, no tiene el formato adecuado, o no tiene el tamaño adecuado
            return `rgba(0, 0, 0, ${opacity})`; // Retorna un color negro con la opacidad deseada como valor predeterminado
        }
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000'; // Color negro predeterminado
        }
        return color.startsWith('#') ? color : `#${color}`;
    };
    return (_jsxs("div", { style: {
            width: 'calc(3em + 80vw)',
            height: '85%',
            background: 'white',
            margin: 'auto',
            boxShadow: '1px 1px 5px 1px #cccccc',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            bottom: '30px',
            left: '96%', // Centrar la tabla en el eje horizontal
            transform: 'translateX(-98%) translateX(-4px)', // Corremos a la izquierda
            zIndex: '3'
        }, children: [_jsx("div", { style: { width: '100%', padding: '20px', paddingLeft: '10px', display: 'flex' }, children: _jsx("input", { type: "text", placeholder: 'Busca por nombre o codigo', value: busqueda, onChange: handleSearchChange, style: { width: '220px', padding: '9px', border: 'none', background: '#F5F7FA', borderRadius: '20px', outline: 'none', paddingLeft: '30px' } }) }), _jsx("div", { style: { width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }, children: _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { height: '60px', }, children: [_jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "C\u00F3digo" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Fecha" }), _jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "Remitente" }), _jsx("th", { style: { padding: '10px', minWidth: '200px' }, children: "Nombre del encargado" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Cargo del encargado" }), _jsx("th", { style: { padding: '10px' }, children: "Serial del pc" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Lugar" }), _jsx("th", { style: { padding: '10px', minWidth: '250px' }, children: "Descripci\u00F3n" }), _jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "Estado" })] }) }), _jsx("tbody", { children: usuariosFiltrados.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "5", style: { padding: '40px', textAlign: 'center' }, children: _jsxs("div", { style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '300px' // Aumenta el alto para centrar mejor verticalmente
                                        }, children: [_jsx("img", { src: "https://img.icons8.com/ios/100/000000/nothing-found.png", alt: "No hay peticiones", style: { marginBottom: '20px', opacity: 0.8 } }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay casos reportados disponibles" }), _jsx("span", { style: { fontSize: '18px', color: '#777', marginTop: '10px' }, children: "Vueve a intentarlo mas tarde." })] }) }) })) : (usuariosFiltrados.map((item, index) => {
                                return (_jsxs("tr", { style: { height: '60px', borderTop: 'solid 2px #f0f0f0', textAlign: 'center' }, children: [_jsx("td", { style: { padding: '10px' }, children: item.codigo }), _jsx("td", { style: { padding: '10px' }, children: item.fecha }), _jsx("td", { style: { padding: '10px' }, children: item.nombreReporte }), _jsx("td", { style: { padding: '10px' }, children: item.nombreSoporte }), _jsx("td", { style: { padding: '10px' }, children: item.rolSoporte }), _jsx("td", { style: { padding: '10px' }, children: item.serialPc }), _jsx("td", { style: { padding: '10px' }, children: item.ubicacion }), _jsx("td", { style: { padding: '10px' }, children: item.descripcion }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: {
                                                    width: '120px',
                                                    padding: '8px',
                                                    backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                    color: getColor(item.color),
                                                    border: 'none',
                                                    borderRadius: '20px'
                                                }, children: item.estado }) })] }, index));
                            })) })] }) })] }));
}
