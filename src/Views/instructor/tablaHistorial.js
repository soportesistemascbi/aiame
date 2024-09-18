import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function tablaHistorial() {
    const [casos, setCasos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [casosFiltrados, setCasosFiltrados] = useState([]);
    const id = localStorage.getItem('idUsuario');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=7&id=${id}`);
                const data = await response.json();
                // Si la respuesta contiene [{"rp":"no"}], no hay casos
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setCasos([]);
                    setCasosFiltrados([]);
                }
                else {
                    setCasos(data.rpta);
                    setCasosFiltrados(data.rpta); // Inicialmente muestra todos los casos
                }
            }
            catch (error) {
                console.error('Error al obtener casos:', error);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        const resultados = casos.filter(item => {
            // Verificamos si item.id y item.nombreSoporte no están vacíos o indefinidos antes de aplicar toLowerCase()
            const id = item.id ? item.id.toLowerCase() : '';
            const nombreSoporte = item.nombreSoporte ? item.nombreSoporte.toLowerCase() : '';
            const serialPc = item.serialPc ? item.serialPc.toLowerCase() : '';
            // Filtramos los casos basándonos en la búsqueda
            return id.includes(busqueda.toLowerCase()) || nombreSoporte.includes(busqueda.toLowerCase()) || serialPc.includes(busqueda.toLowerCase());
        });
        setCasosFiltrados(resultados);
    }, [busqueda, casos]);
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
    return (_jsx(_Fragment, { children: _jsxs("table", { style: {
                width: 'calc(3em + 80vw)',
                height: '85%',
                background: 'white',
                boxShadow: '1px 1px 5px 1px #cccccc',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                textAlign: 'center',
                flexDirection: 'column',
                position: 'fixed',
                bottom: '30px',
                left: '96%', // Centramos la tabla en el eje horizontal
                transform: 'translateX(-98%) translateX(-4px)', // Corremos 180px a la izquierda
                zIndex: '3',
                borderCollapse: 'collapse',
                maxWidth: '100vw', // Evitar que la tabla exceda el ancho de la pantalla
            }, children: [_jsx("div", { style: {
                        width: '100%',
                        padding: '20px',
                        paddingLeft: '80px',
                        display: 'flex',
                        maxWidth: '100%', // Mantiene el contenedor dentro de la pantalla
                    }, children: _jsx("div", { style: { width: '1555px', height: '50px', display: 'flex', justifyContent: 'space-between' }, children: _jsx("div", { style: { display: 'flex', alignItems: 'center' }, children: _jsx("input", { type: "text", placeholder: 'Buscar por N\u00FAmero de Caso o Encargado', value: busqueda, onChange: (e) => setBusqueda(e.target.value), style: {
                                    width: '220px',
                                    padding: '9px',
                                    border: 'none',
                                    background: '#F5F7FA',
                                    borderRadius: '20px',
                                    outline: 'none',
                                    paddingLeft: '30px',
                                    height: '22px'
                                } }) }) }) }), _jsx("div", { style: { width: '100%', overflowY: 'auto' }, children: _jsxs("table", { style: {
                            width: '100%',
                            borderCollapse: 'collapse',
                        }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [_jsx("th", { style: { padding: '10px' }, children: "Tipo del caso" }), _jsx("th", { style: { padding: '10px' }, children: "N\u00FAmero del caso" }), _jsx("th", { style: { padding: '10px' }, children: "Encargado" }), _jsx("th", { style: { padding: '10px' }, children: "Aula" }), _jsx("th", { style: { padding: '10px' }, children: "Serial del pc" }), _jsx("th", { style: { padding: '10px' }, children: "Fecha" }), _jsx("th", { style: { padding: '10px' }, children: "Estado" })] }) }), _jsxs("tbody", { children: [casosFiltrados.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "5", style: { padding: '40px', textAlign: 'center' }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '300px' // Aumenta el alto para centrar mejor verticalmente
                                                }, children: [_jsx("img", { src: "https://img.icons8.com/ios/100/000000/nothing-found.png", alt: "No hay peticiones", style: { marginBottom: '20px', opacity: 0.8 } }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay historial disponibles" }), _jsx("span", { style: { fontSize: '18px', color: '#777', marginTop: '10px' }, children: "Vueve a intentarlo mas tarde." })] }) }) })) : (casosFiltrados.map((item, index) => (_jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [_jsx("td", { style: { padding: '10px' }, children: item.descripcion }), _jsx("td", { style: { padding: '10px' }, children: item.id }), _jsx("td", { style: { padding: '10px' }, children: item.nombreSoporte }), _jsx("td", { style: { padding: '10px' }, children: item.ubicacion }), _jsx("td", { style: { padding: '10px' }, children: item.serialPc }), _jsx("td", { style: { padding: '10px' }, children: item.fecha }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: {
                                                        width: '100%',
                                                        maxWidth: '120px',
                                                        padding: '8px',
                                                        backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                        color: getColor(item.color),
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                    }, children: item.estado }) })] }, index)))), ","] })] }) })] }) }));
}
