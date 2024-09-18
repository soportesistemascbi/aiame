import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Flecha from './icon/Flecha.svg';
import PC from './icon/Pc.svg';
import Hola from './icon/icon.svg';
import Restaurar from '../../Icon/Enviar.svg'; // Icono de restaurar
import reportes from './icon/Reportes.svg';
import linea from './icon/linea.svg';
import persona from './icon/Ppersona.svg';
export default function Tabla_Equipos_SU() {
    //Modal que muestra la informacion unica de cada equipo
    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const AbrirCaracteristicas = () => {
        setcaracteristicas_pc(!caracteristicas_pc);
    };
    // CONEXIÓN A BASE DE DATOS PARA MOSTRAR LOS EQUIPOS
    const [equipos, setEquipos] = useState([]);
    const [Componentes, setComponentes] = useState([]);
    const [info, setInflo] = useState([]);
    const [caso, setCaso] = useState([]);
    const [noHayCasos, setNoHayCasos] = useState(false);
    console.log('aaaaaaaaaaaaaaa soy  equipos', equipos);
    const fetchData = async () => {
        try {
            const response = await fetch('https://instrudev.com/aiameapp/equipos/equiposquery.php?case=1');
            const data = await response.json();
            // Si la respuesta contiene [{"rp":"no"}], no hay casos
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setEquipos([]);
            }
            else {
                setEquipos(data.rpta);
            }
        }
        catch (error) {
            console.error('Error al obtener casos:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(equipos);
    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };
    // Filtrar los usuarios en función del término de búsqueda
    // Filtrar los equipos en función del término de búsqueda
    const equiposFiltrados = equipos.filter(item => (item.placaPc && item.placaPc.toLowerCase().includes(busqueda.toLowerCase())) ||
        (item.serial && item.serial.toLowerCase().includes(busqueda.toLowerCase())));
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
    async function Aceptarpeticion(id) {
        setcaracteristicas_pc(!caracteristicas_pc);
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=3&idEquipo=${id}`;
            const response = await fetch(url);
            const data1 = await response.json();
            setComponentes(data1.rpta);
        }
        catch (error) {
            console.log("Error al obtener componentes:", error);
        }
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data2 = await response.json();
            setInflo(data2.rpta);
        }
        catch (error) {
            console.log("Error al obtener información adicional:", error);
        }
        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data3 = await response.json();
            if (data3.rpta && data3.rpta[0].rp === "no") {
                setNoHayCasos(true); // Actualiza el estado si no hay casos
            }
            else {
                setNoHayCasos(false); // Si hay casos, desactiva la bandera de "no hay casos"
                setCaso(data3.rpta);
            }
        }
        catch (error) {
            console.log("Error al obtener casos:", error);
        }
    }
    const componenteMouse = Componentes.filter(item => item.tipoComponente === 'MOUSE');
    const componenteMonitor = Componentes.filter(item => item.tipoComponente === 'MONITOR');
    // Función para eliminar un usuario
    async function EliminarEquipos(id) {
        const estado = 2;
        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=3&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al actualizar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData(); // Recargar los datos después de eliminar
                alert('Estado actualizado con éxito.');
            }
            else {
                console.log("No se pudo actualizar el estado.");
            }
        }
        catch (error) {
            console.log("Error al eliminar usuario:", error);
        }
    }
    // Función para restaurar un usuario
    async function RestaurarEquipos(id) {
        const estado = 1;
        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=3&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al restaurar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData(); // Recargar los datos después de restaurar
                alert('Estado actualizado con éxito.');
            }
            else {
                console.log("No se pudo restaurar el usuario.");
            }
        }
        catch (error) {
            console.log("Error al restaurar usuario:", error);
        }
    }
    return (_jsxs(_Fragment, { children: [caracteristicas_pc && (_jsxs("div", { style: {
                    width: 'calc(11.5em + 80vw)',
                    height: '91.5%',
                    background: '#F5F7FA',
                    margin: 'auto',
                    boxShadow: '1px 1px 5px 1px #cccccc',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    bottom: '0px',
                    right: '0px',
                    zIndex: '4',
                    overflow: 'hidden',
                }, children: [_jsx("div", { style: {
                            width: 'auto',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                        }, children: _jsx("img", { src: Flecha, onClick: AbrirCaracteristicas, style: {
                                marginLeft: '25px',
                                marginTop: '10px',
                                cursor: 'pointer',
                            } }) }), _jsx("div", { style: {
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflowY: 'auto', // Permite el desplazamiento vertical
                        }, children: _jsxs("div", { style: {
                                width: '90%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                padding: '10px',
                                boxSizing: 'border-box',
                            }, children: [_jsx("div", { style: {
                                        width: 'calc(100% - 360px)', // Ajusta el ancho para dejar espacio para el banner lateral derecho
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        boxSizing: 'border-box',
                                        overflow: 'hidden',
                                    }, children: _jsxs("div", { style: {
                                            width: '100%',
                                            flex: '1', // Permite que el contenedor de información use el espacio restante
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                        }, children: [_jsxs("div", { style: {
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '10px',
                                                    marginBottom: '1rem',
                                                }, children: [info.length === 0 ? (_jsx("p", { children: "No hay informaci\u00F3n disponible." })) : (info.map((item, index) => (_jsxs("div", { style: {
                                                            width: '100%',
                                                            maxWidth: '300px',
                                                            background: 'white',
                                                            borderRadius: '10px',
                                                            boxShadow: '1px 1px 5px #d4d4d4',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            padding: '10px',
                                                            boxSizing: 'border-box',
                                                        }, children: [_jsx("img", { src: PC, style: {
                                                                    width: '60px',
                                                                    marginBottom: '10px',
                                                                } }), _jsxs("div", { children: [_jsx("b", { children: "Nombre:" }), " ", _jsx("p", { children: item.modelo }), _jsx("b", { children: "Tipo de equipo:" }), " ", _jsx("p", { children: item.tipo }), _jsx("b", { children: "Marca:" }), " ", _jsx("p", { children: item.marca })] }), _jsx("img", { src: Hola, style: {
                                                                    width: '60px',
                                                                    marginTop: '10px',
                                                                } })] }, index)))), _jsx("div", { style: {
                                                            width: '100%',
                                                            maxWidth: '300px',
                                                            background: 'white',
                                                            borderRadius: '10px',
                                                            boxShadow: '1px 1px 5px #d4d4d4',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '10px',
                                                            boxSizing: 'border-box',
                                                        }, children: componenteMonitor.length === 0 ? (_jsx("p", { children: "No hay monitores disponibles." })) : (componenteMonitor.map((item, index) => (_jsxs("div", { children: [_jsx("img", { src: item.urlIcon, style: {
                                                                        width: '100px',
                                                                        marginBottom: '10px',
                                                                    } }), _jsxs("div", { children: [_jsx("b", { children: item.tipoComponente }), _jsx("p", { children: "Serial monitor" })] }), _jsx("p", { children: item.serial })] }, index)))) }), _jsx("div", { style: {
                                                            width: '100%',
                                                            maxWidth: '300px',
                                                            background: 'white',
                                                            borderRadius: '10px',
                                                            boxShadow: '1px 1px 5px #d4d4d4',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '10px',
                                                            boxSizing: 'border-box',
                                                        }, children: componenteMouse.length === 0 ? (_jsx("p", { children: "No hay ratones disponibles." })) : (componenteMouse.map((item, index) => (_jsxs("div", { children: [_jsx("img", { src: item.urlIcon, style: {
                                                                        width: '100px',
                                                                        marginBottom: '10px',
                                                                    } }), _jsxs("div", { children: [_jsx("b", { children: item.tipoComponente }), _jsx("p", { children: "Serial mouse" })] }), _jsx("p", { children: item.serial })] }, index)))) })] }), _jsxs("div", { style: {
                                                    width: '100%',
                                                    height: '50%',
                                                    maxWidth: '922px',
                                                    background: 'white',
                                                    borderRadius: '10px',
                                                    boxShadow: '1px 1px 5px #d4d4d4',
                                                    padding: '10px',
                                                    boxSizing: 'border-box',
                                                    marginTop: '1rem',
                                                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }, children: [_jsx("img", { src: reportes, style: {
                                                                    width: '50px',
                                                                    marginRight: '10px',
                                                                } }), _jsx("p", { children: "Registro de reportes" }), _jsxs("div", { style: { display: 'flex', gap: '10px' }, children: [_jsx("button", { style: {
                                                                            padding: '8px',
                                                                            background: '#E8F0FF',
                                                                            color: 'black',
                                                                            border: 'none',
                                                                            borderRadius: '10px',
                                                                        }, children: "Mes" }), _jsx("img", { src: linea, style: {
                                                                            width: '10px',
                                                                        } }), _jsx("button", { style: {
                                                                            padding: '8px',
                                                                            background: '#E8F0FF',
                                                                            color: 'black',
                                                                            border: 'none',
                                                                            borderRadius: '10px',
                                                                        }, children: "A\u00F1o" })] })] }), _jsx("div", { children: noHayCasos ? (_jsx("div", { style: {
                                                                width: '100%',
                                                                height: '50%',
                                                                maxWidth: '922px',
                                                                background: 'white',
                                                                borderRadius: '10px',
                                                                boxShadow: '1px 1px 5px #d4d4d4',
                                                                padding: '10px',
                                                                boxSizing: 'border-box',
                                                                marginTop: '1rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }, children: _jsx("p", { children: "No hay casos disponibles." }) })) : (_jsx("div", { style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                padding: '10px',
                                                                boxSizing: 'border-box',
                                                                overflowY: 'auto',
                                                                maxHeight: '350px',
                                                            }, children: caso.map((item, index) => {
                                                                const color = item.color && item.color.startsWith('#') ? item.color : `#${item.color || '000000'}`;
                                                                const backgroundColor = hexToRgba(color, 0.4);
                                                                return (_jsxs("div", { style: {
                                                                        background: '#F8F9FA',
                                                                        borderRadius: '10px',
                                                                        boxShadow: '1px 1px 5px #d4d4d4',
                                                                        padding: '10px',
                                                                        marginBottom: '10px',
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                    }, children: [_jsxs("div", { style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'flex-start',
                                                                            }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("img", { src: persona, style: {
                                                                                                width: '30px',
                                                                                            } }), _jsx("p", { children: item.nombreSoporte })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'start' }, children: [_jsxs("p", { children: ["Cargo: ", _jsx("b", { children: item.rolSoporte })] }), _jsxs("p", { children: ["Correo: ", _jsx("b", { children: item.correoSoporte })] }), _jsxs("p", { children: ["Fecha: ", _jsx("b", { children: item.fecha })] }), _jsxs("p", { children: ["Caso: ", _jsx("b", { children: item.nomTipoCaso })] })] })] }), _jsxs("div", { style: {
                                                                                display: 'flex',
                                                                                flexDirection: 'column',
                                                                                alignItems: 'center',
                                                                            }, children: [_jsx("p", { children: "Estado" }), _jsx("button", { style: {
                                                                                        width: '120px', padding: '8px',
                                                                                        backgroundColor: backgroundColor,
                                                                                        color: color.startsWith('#') ? color : `#${color}`,
                                                                                        border: 'none', borderRadius: '20px'
                                                                                    }, children: item.estado })] })] }, index));
                                                            }) })) })] })] }) }), _jsxs("div", { style: {
                                        flex: '0 0 350px',
                                        maxWidth: '350px',
                                        minWidth: '300px',
                                        background: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '1px 1px 5px #d4d4d4',
                                        padding: '10px',
                                        boxSizing: 'border-box',
                                    }, children: [_jsx("div", { style: { borderBottom: '1px solid #EAEAEA', paddingBottom: '10px', marginBottom: '10px' }, children: "Otras caracter\u00EDsticas" }), _jsx("div", { style: {
                                                maxHeight: 'calc(100% - 40px)', // Ajusta la altura máxima para permitir espacio para el título
                                                overflowY: 'auto', // Permite el desplazamiento vertical
                                            }, children: Componentes.length === 0 ? (_jsx("p", { children: "No hay componentes adicionales disponibles." })) : (Componentes.map((item, index) => (_jsxs("div", { style: {
                                                    width: '100%',
                                                    backgroundColor: '#f5f7fa',
                                                    color: 'black',
                                                    fontSize: '18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    marginTop: '30px',
                                                    boxSizing: 'border-box',
                                                }, children: [_jsx("img", { src: item.urlIcon, style: {
                                                            width: '40px',
                                                            marginRight: '10px',
                                                        } }), _jsxs("div", { children: [_jsx("p", { style: { fontSize: '16px', margin: '0' }, children: item.tipoComponente }), _jsx("p", { style: { fontSize: '14px', margin: '0' }, children: item.serial })] })] }, index)))) })] })] }) })] })), _jsxs("table", { style: {
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
                        }, children: _jsx("div", { style: { width: '1555px', height: '50px', display: 'flex', justifyContent: 'space-between' }, children: _jsx("div", { style: { display: 'flex', alignItems: 'center' }, children: _jsx("input", { type: "text", placeholder: 'Buscar Equipos', value: busqueda, onChange: handleSearchChange, style: { width: '220px', padding: '9px', border: 'none', background: '#F5F7FA', borderRadius: '20px 20px 20px 20px ', outline: 'none', paddingLeft: '30px' } }) }) }) }), _jsx("div", { style: { width: '100%', overflowY: 'auto' }, children: _jsxs("table", { style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                            }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [_jsx("th", { style: { padding: '10px' }, children: "Id" }), _jsx("th", { style: { padding: '10px' }, children: "Modelo" }), _jsx("th", { style: { padding: '10px' }, children: "Marca" }), _jsx("th", { style: { padding: '10px' }, children: "Tipo" }), _jsx("th", { style: { padding: '10px' }, children: "Placa" }), _jsx("th", { style: { padding: '10px' }, children: "Aula" }), _jsx("th", { style: { padding: '10px' }, children: "Serial" }), _jsx("th", { style: { padding: '10px' }, children: "Estado" }), _jsx("th", { style: { padding: '10px' }, children: "Opciones" })] }) }), _jsx("tbody", { children: equiposFiltrados.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "5", style: { padding: '40px', textAlign: 'center' }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '300px' // Aumenta el alto para centrar mejor verticalmente
                                                }, children: [_jsx("img", { src: "https://img.icons8.com/ios/100/000000/nothing-found.png", alt: "No hay peticiones", style: { marginBottom: '20px', opacity: 0.8 } }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay equipos disponibles" }), _jsx("span", { style: { fontSize: '18px', color: '#777', marginTop: '10px' }, children: "Vueve a intentarlo mas tarde." })] }) }) })) : (equiposFiltrados.map((item, index) => (_jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, onClick: () => Aceptarpeticion(item.id), children: [_jsx("td", { style: { padding: '10px' }, children: item.id }), _jsx("td", { style: { padding: '10px' }, children: item.modelo }), _jsx("td", { style: { padding: '10px' }, children: item.marca }), _jsx("td", { style: { padding: '10px' }, children: item.tipo }), _jsx("td", { style: { padding: '10px' }, children: item.placaPc }), _jsx("td", { style: { padding: '10px' }, children: item.ubicacion }), _jsx("td", { style: { padding: '10px' }, children: item.serialPc }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: {
                                                        width: '100px',
                                                        padding: '8px',
                                                        backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                        color: getColor(item.color),
                                                        border: 'none',
                                                        borderRadius: '10px'
                                                    }, children: item.estado }) }), _jsx("td", { style: { padding: '10px' }, children: parseInt(item.idEstado) === 2 ? (_jsxs("button", { onClick: (e) => {
                                                        e.stopPropagation(); // Detener la propagación del evento
                                                        RestaurarEquipos(item.id);
                                                    }, style: {
                                                        backgroundColor: '#4CAF50',
                                                        color: 'white',
                                                        padding: '10px 15px',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        transition: 'background-color 0.3s ease'
                                                    }, children: [_jsx("img", { src: Restaurar, alt: "Restaurar", style: { marginRight: '5px', width: '20px', height: '20px' } }), "Restaurar"] })) : (_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation(); // Detener la propagación del evento
                                                        EliminarEquipos(item.id);
                                                    }, style: {
                                                        backgroundColor: '#F44336',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        transition: 'background-color 0.3s ease'
                                                    }, children: "Eliminar" })) })] }, index)))) })] }) })] })] }));
}
