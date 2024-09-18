import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import Flecha from '../../Tablas/icon/Flecha.svg';
import reportes from '../../Tablas/icon/Reportes.svg';
import linea from '../../Tablas/icon/linea.svg';
import persona from '../../Tablas/icon/Ppersona.svg';
import PC from '../../Tablas/icon/Pc.svg';
import Hola from '../../Tablas/icon/icon.svg';
export default function ReportesSopor() {
    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false);
    const [Reportes, setReporetes] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    const [Componentes, setComponentes] = useState([]);
    const [info, setInflo] = useState([]);
    const [caso, setCaso] = useState([]);
    const [noHayCasos, setNoHayCasos] = useState(false);
    const fileInputRef = useRef(null);
    const [TipoCaso, setCategorias] = useState([]);
    const [TipoEstado, setEstado] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState([]);
    const [selectedEstadoIds, setSelectedEstadoIds] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showEstado, setShowEstado] = useState(false);
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]);
    const [DatosCaso, setDatosCaso] = useState([]);
    const [idcaso, setIdCaso] = useState([]);
    const [file, setFile] = useState(null);
    const AbrirCaracteristicas = () => {
        setcaracteristicas_pc(!caracteristicas_pc);
    };
    const AbrirReportes = async (id) => {
        setReporetes(!Reportes);
        setIdCaso(id);
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`;
            const response = await fetch(url);
            const data1 = await response.json();
            setDatosCaso(data1.rpta);
        }
        catch (error) {
            console.log("Error al obtener componentes:", error);
        }
    };
    useEffect(() => {
        fetchCategorias();
    }, []);
    const fetchCategorias = () => {
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2')
            .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            return response.text();
        })
            .then(text => {
            try {
                const data = JSON.parse(text);
                setCategorias(data.rpta);
            }
            catch (error) {
                console.error('Error al parsear JSON:', error);
                console.error('Respuesta recibida:', text);
            }
        })
            .catch(error => console.error('Error al obtener las categorías:', error));
    };
    useEffect(() => {
        fetchEstados();
    }, []);
    const fetchEstados = () => {
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=7')
            .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            return response.text();
        })
            .then(text => {
            try {
                const data = JSON.parse(text);
                setEstado(data.rpta);
            }
            catch (error) {
                console.error('Error al parsear JSON:', error);
                console.error('Respuesta recibida:', text);
            }
        })
            .catch(error => console.error('Error al obtener las categorías:', error));
    };
    const handleCategoriaChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id'));
        setSelectedCategorias(selectedOptions);
        setSelectedCategoriasIds(selectedOptionsIds);
    };
    const handleCategoriaChange2 = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id'));
        setSelectedEstado(selectedOptions);
        setSelectedEstadoIds(selectedOptionsIds);
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const fetchData = async () => {
        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/casos.php?case=5');
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
    useEffect(() => {
        fetchData();
    }, []);
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
    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    };
    const usuariosFiltrados = usuarios.filter(item => item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase()));
    const componenteMouse = Componentes.filter(item => item.tipoComponente === 'MOUSE');
    const componenteMonitor = Componentes.filter(item => item.tipoComponente === 'MONITOR');
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
    const handleSubmitDetalle = async (e) => {
        e.preventDefault();
        setLoading(true);
        const id = DatosCaso[0].idEquipo;
        const idCaso = idcaso;
        const observacion = document.getElementById('descripcionCaso').value;
        const idUsuarioSoporte = localStorage.getItem('idUsuario');
        const tipoCaso = selectedCategoriaIds;
        const estado = selectedEstadoIds;
        // Validaciones
        if (!observacion) {
            alert('No ha puesto una descripcion');
            setLoading(false);
            return;
        }
        if (!file) {
            alert('No ha puesto una imagen');
            setLoading(false);
            return;
        }
        if (!tipoCaso) {
            alert('No ha puesto un tipo de caso');
            setLoading(false);
            return;
        }
        if (!estado) {
            alert('No ha puesto un estado para el caso');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('case', '2');
        formData.append('idCaso', idCaso);
        formData.append('observacion', observacion);
        formData.append('idEquipo', id);
        formData.append('idUsuarioSoporte', idUsuarioSoporte);
        formData.append('tipoCaso', tipoCaso);
        if (file) {
            formData.append('urlArchivo', file);
        }
        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/ReporteCasosWeb.php', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            }
            catch (jsonError) {
                console.error('Error al parsear JSON:', jsonError);
                setLoading(false);
                return;
            }
            if (!data) {
                console.error('La respuesta del servidor está vacía');
                setLoading(false);
                return;
            }
            if (data.rpta[0].rp === 'si') {
                try {
                    const checkResponse = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=8&id=${idCaso}&estado=${estado}&idUsuarioSoporte=${idUsuarioSoporte}`);
                    if (!checkResponse.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    const checkData = await checkResponse.json();
                    if (checkData.rp === 'si') {
                        fetchData();
                        AbrirReportes(false);
                        setLoading(false);
                        setSelectedEstado([]);
                        setSelectedEstadoIds([]);
                        setSelectedCategorias([]);
                        setSelectedCategoriasIds([]);
                        setFile(null);
                        alert("Caso reportado con éxito.");
                    }
                    else {
                        alert('Error al guardar el caso');
                    }
                }
                catch (error) {
                    console.error("Error al guardar el caso:", error);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                console.log("No se pudo subir el caso:", data.mensaje);
                setLoading(false);
            }
        }
        catch (error) {
            console.error("Error al subir el caso:", error);
            setLoading(false);
        }
    };
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
                                                                } }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'row', paddingBottom: '15px' }, children: [" ", _jsx("b", { style: { marginRight: '10px' }, children: "Nombre:" }), " ", _jsx("p", { style: { margin: '0' }, children: item.modelo })] }), _jsxs("div", { children: [_jsx("b", { children: "Tipo de equipo:" }), " ", _jsx("p", { style: { margin: '0' }, children: item.tipo })] })] }), _jsx("div", { style: { display: 'flex', justifyContent: 'center' }, children: _jsxs("div", { style: { display: 'flex', flexDirection: 'row' }, children: [_jsx("b", { style: { marginRight: '10px' }, children: "Marca:" }), " ", _jsx("p", { style: { margin: '0' }, children: item.marca })] }) })] }), _jsx("img", { src: Hola, style: {
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
                                                        } }), _jsxs("div", { children: [_jsx("p", { style: { fontSize: '16px', margin: '0' }, children: item.tipoComponente }), _jsx("p", { style: { fontSize: '14px', margin: '0' }, children: item.serial })] })] }, index)))) })] })] }) })] })), Reportes && (_jsx("div", { style: {
                    width: 'calc(11.5em + 80vw)',
                    height: '91.5%',
                    background: '#F5F7FA',
                    boxShadow: '1px 1px 5px 1px #cccccc',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    bottom: '0px',
                    right: '0px',
                    zIndex: '4',
                    overflow: 'hidden',
                }, children: _jsx("div", { style: {
                        width: 'calc(3em + 80vw)',
                        height: '85%',
                        background: 'white',
                        boxShadow: '1px 1px 5px 1px #cccccc',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'fixed',
                        bottom: '30px',
                        left: '96%',
                        transform: 'translateX(-98%) translateX(-4px)',
                        borderCollapse: 'collapse',
                        maxWidth: '100vw',
                    }, children: _jsxs("div", { style: {
                            width: '100%', height: '100%', background: 'white', boxShadow: '1px 1px 5px 1px #cccccc',
                            borderRadius: '10px', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'space-between', position: 'relative'
                        }, children: [_jsx("h1", { style: { color: '#096ECB', textAlign: 'center', marginBottom: '20px' }, children: "Reporte de Caso" }), _jsx("form", { style: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: _jsxs("div", { style: {
                                        width: '100%', display: 'flex', flexDirection: 'row', gap: '20px', boxSizing: 'border-box'
                                    }, children: [_jsxs("div", { style: { height: '100%', width: '100%', flex: 'flex', justifyContent: 'center', alignItems: 'center' }, children: [_jsxs("div", { style: {
                                                        display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'center', width: '100%',
                                                        flexWrap: 'wrap'
                                                    }, children: [_jsxs("div", { style: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }, children: [_jsx("label", { children: "Tipo De Caso" }), _jsxs("div", { style: { width: '70%', position: 'relative' }, children: [_jsx("input", { type: "text", placeholder: 'Categorias', onFocus: () => setShowCategories(true), readOnly: true, value: selectedCategorias.join(', '), style: {
                                                                                width: '100%', padding: '10px', marginBottom: '10px',
                                                                                borderRadius: '10px', border: '2px solid blue', outline: 'none', textAlign: 'center'
                                                                            }, id: "clase_categoria" }), showCategories && (_jsx("select", { multiple: true, onChange: handleCategoriaChange, onClick: () => setShowCategories(false), style: {
                                                                                position: 'absolute', top: '100%', left: '0', zIndex: '1', width: '100%',
                                                                                display: showCategories ? 'block' : 'none', textAlign: 'center', scrollbarWidth: 'none'
                                                                            }, children: TipoCaso.map(caso => (_jsx("option", { value: caso.descripcion, "data-id": caso.id, children: caso.descripcion }, caso.id))) }))] })] }), _jsxs("div", { style: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }, children: [_jsx("label", { children: "Estado " }), _jsxs("div", { style: { width: '70%', position: 'relative' }, children: [_jsx("input", { type: "text", placeholder: 'Estado', onFocus: () => setShowEstado(true), readOnly: true, value: selectedEstado.join(', '), style: {
                                                                                width: '200px',
                                                                                padding: '10px',
                                                                                marginRight: '40px',
                                                                                borderRadius: '10px',
                                                                                border: '2px solid blue',
                                                                                outline: 'none',
                                                                                display: 'flex',
                                                                                textAlign: 'center',
                                                                            }, id: "clase_categoria", className: "placeholder-style" }), _jsx("style", { jsx: true, children: `
                                     .placeholder-style::placeholder {
                                         color: rgba(0, 0, 0); 
                                     }
                                 ` }), _jsx("select", { multiple: true, onChange: handleCategoriaChange2, onClick: () => setShowEstado(false), id: "descripcion", style: {
                                                                                position: 'absolute',
                                                                                top: '100%',
                                                                                left: '0',
                                                                                zIndex: '1',
                                                                                width: '100%',
                                                                                display: showEstado ? 'block' : 'none',
                                                                                textAlign: 'center',
                                                                                scrollbarWidth: 'none',
                                                                                color: 'black'
                                                                            }, children: TipoEstado.map(caso => (_jsx("option", { value: caso.estado, "data-id": caso.id, children: caso.estado }, caso.id))) })] })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', }, children: [_jsx("label", { children: "Descripci\u00F3n" }), _jsx("textarea", { id: "descripcionCaso", style: {
                                                                width: '84%', height: '200px', padding: '10px',
                                                                border: '2px solid blue', borderRadius: '10px', marginBottom: '20px'
                                                            } })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }, children: [_jsx("h2", { style: { fontSize: '24px', color: '#096ECB' }, children: "Adjuntar Imagen" }), _jsx("div", { style: {
                                                        width: '100%', maxWidth: '350px', height: '200px', backgroundColor: '#ddd',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc',
                                                        marginBottom: '20px'
                                                    }, children: file ? (_jsx("img", { src: URL.createObjectURL(file), alt: "Vista previa de la imagen", style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (_jsx("div", { style: { textAlign: 'center', padding: '10px' }, children: _jsx("p", { children: "No se ha seleccionado ninguna imagen." }) })) }), _jsx("button", { type: "button", onClick: handleButtonClick, style: {
                                                        padding: '10px 20px', backgroundColor: '#096ECB', color: 'white',
                                                        border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px'
                                                    }, children: "Seleccionar Imagen" }), _jsx("input", { ref: fileInputRef, type: "file", onChange: handleFileChange, style: { display: 'none' }, accept: ".jpeg, .jpg, .png" })] })] }) }), _jsxs("div", { style: {
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    marginBottom: '20px'
                                }, children: [_jsx("button", { style: {
                                            width: '120px',
                                            height: '40px',
                                            backgroundColor: '#007BFF',
                                            borderRadius: '8px',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            transition: 'background-color 0.3s, transform 0.2s',
                                        }, onClick: AbrirReportes, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#0056b3', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#007BFF', onFocus: (e) => e.currentTarget.style.transform = 'scale(1.05)', onBlur: (e) => e.currentTarget.style.transform = 'scale(1)', children: "Volver" }), _jsx("button", { onClick: handleSubmitDetalle, style: {
                                            width: '120px',
                                            height: '40px',
                                            backgroundColor: '#FF4D4D',
                                            borderRadius: '8px',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            transition: 'background-color 0.3s, transform 0.2s',
                                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#cc0000', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#FF4D4D', onFocus: (e) => e.currentTarget.style.transform = 'scale(1.05)', onBlur: (e) => e.currentTarget.style.transform = 'scale(1)', children: "Enviar" })] })] }) }) })), _jsxs("div", { style: {
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
                }, children: [_jsx("div", { style: { width: '100%', padding: '20px', paddingLeft: '10px', display: 'flex' }, children: _jsx("input", { type: "text", placeholder: 'Buscar casos', value: busqueda, onChange: handleSearchChange, style: { width: '220px', padding: '9px', border: 'none', background: '#F5F7FA', borderRadius: '20px', outline: 'none', paddingLeft: '30px' } }) }), _jsx("div", { style: { width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }, children: _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { height: '60px', }, children: [_jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "C\u00F3digo" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Fecha" }), _jsx("th", { style: { padding: '10px', minWidth: '200px' }, children: "Nombre" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Cargo" }), _jsx("th", { style: { padding: '10px' }, children: "Serial del pc" }), _jsx("th", { style: { padding: '10px', minWidth: '150px' }, children: "Lugar" }), _jsx("th", { style: { padding: '10px', minWidth: '250px' }, children: "Descripci\u00F3n" }), _jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "Estado" }), _jsx("th", { style: { padding: '10px', minWidth: '100px' }, children: "Acciones" })] }) }), _jsx("tbody", { children: usuariosFiltrados.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "5", style: { padding: '40px', textAlign: 'center' }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '300px' // Aumenta el alto para centrar mejor verticalmente
                                                }, children: [_jsx("img", { src: "https://img.icons8.com/ios/100/000000/nothing-found.png", alt: "No hay peticiones", style: { marginBottom: '20px', opacity: 0.8 } }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay casos disponibles" }), _jsx("span", { style: { fontSize: '18px', color: '#777', marginTop: '10px' }, children: "Vueve a intentarlo mas tarde." })] }) }) })) : (usuariosFiltrados.map((item, index) => {
                                        return (_jsxs("tr", { style: { height: '60px', borderTop: 'solid 2px #f0f0f0', textAlign: 'center', cursor: 'pointer' }, onClick: () => Aceptarpeticion(item.idEquipo), children: [_jsx("td", { style: { padding: '10px' }, children: item.codigo }), _jsx("td", { style: { padding: '10px' }, children: item.fecha }), _jsx("td", { style: { padding: '10px' }, children: item.nombre }), _jsx("td", { style: { padding: '10px' }, children: item.rolReporte }), _jsx("td", { style: { padding: '10px' }, children: item.serialPc }), _jsx("td", { style: { padding: '10px' }, children: item.ubicacion }), _jsx("td", { style: { padding: '10px' }, children: item.descripcion }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: {
                                                            width: '120px',
                                                            padding: '8px',
                                                            backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                            color: getColor(item.color),
                                                            border: 'none',
                                                            borderRadius: '20px'
                                                        }, children: item.estado }) }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: { width: '120px', padding: '8px', background: '#1874B7', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }, onClick: (e) => {
                                                            e.stopPropagation(); // Detener la propagación del evento
                                                            AbrirReportes(item.id);
                                                        }, children: "Gestionar caso" }) })] }, index));
                                    })) })] }) })] }), loading && (_jsx("div", { style: {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999999999999999
                }, children: _jsx(MoonLoader, { color: "#096ECB", loading: loading, size: 150, speedMultiplier: 1 }) }))] }));
}
