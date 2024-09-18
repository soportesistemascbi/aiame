import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import suma from '../../Views/Tablas/icon/suma.svg';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrusel.css";
import { MoonLoader } from 'react-spinners';
export default function TablaInstructor() {
    const [casos, setCasos] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [casosFiltrados, setCasosFiltrados] = useState([]);
    const [descripcion, setDescripcion] = useState(false);
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
    const id = localStorage.getItem('idUsuario');
    const [loading, setLoading] = useState(false);
    const [TipoCaso, setCategorias] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]);
    const [showAlert_inicio, setShowAlert] = useState(false);
    const [Reporte, setReporte] = useState(false);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        const fetchCasos = async () => {
            try {
                const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=4&id=${id}`);
                const data = await response.json();
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setCasos([]);
                    setCasosFiltrados([]);
                }
                else {
                    setCasos(data.rpta);
                    setCasosFiltrados(data.rpta);
                }
            }
            catch (error) {
                console.error('Error al obtener casos:', error);
            }
        };
        fetchCasos();
    }, [id]);
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch('https://instrudev.com/aiameapp/anuncio/anuncio.php?case=3');
                const data = await response.json();
                console.log('Datos obtenidos:', data);
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setNoticias([]);
                }
                else {
                    setNoticias(data.rpta);
                }
            }
            catch (error) {
                console.error('Error al obtener noticias:', error);
            }
        };
        fetchNoticias();
    }, []);
    useEffect(() => {
        const resultados = casos.filter(item => {
            const id = item.id ? item.id.toLowerCase() : '';
            const nombreSoporte = item.nombreSoporte ? item.nombreSoporte.toLowerCase() : '';
            const SerialPc = item.serialPc ? item.serialPc.toLowerCase() : '';
            return id.includes(busqueda.toLowerCase()) || nombreSoporte.includes(busqueda.toLowerCase()) || SerialPc.includes(busqueda.toLowerCase());
        });
        setCasosFiltrados(resultados);
    }, [busqueda, casos]);
    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            return `rgba(0, 0, 0, ${opacity})`;
        }
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000';
        }
        return color.startsWith('#') ? color : `#${color}`;
    };
    const carouselSettings = {
        dots: true,
        infinite: false, // Si es 'true', el carrusel podría repetirse infinitamente
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    const handleNoticiaClick = (noticia) => {
        setNoticiaSeleccionada(noticia);
        setDescripcion(true);
    };
    useEffect(() => {
        fetchCategorias();
    }, []);
    const fetchCategorias = () => {
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2')
            .then(response => response.ok ? response.text() : Promise.reject('Error al obtener las categorías'))
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
    const handleCategoriaChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id'));
        setSelectedCategorias(selectedOptions);
        setSelectedCategoriasIds(selectedOptionsIds);
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dato = document.getElementById('serial_pc').value;
        if (!dato) {
            alert("Por favor ingrese el serial o la placa del equipo o componente ");
            setLoading(false);
            return;
        }
        try {
            const checkResponse = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=4&dato=${dato}`);
            if (!checkResponse.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const checkData = await checkResponse.json();
            if (checkData.rpta[0].rp === 'si') {
                const descripcion = document.getElementById('descripcionCaso').value;
                const idUsuarioReporte = localStorage.getItem('idUsuario');
                const idEquipo = checkData.rpta[0].id;
                const idLugar = checkData.rpta[0].idLugar;
                const tipoCaso = selectedCategoriaIds[0] || "";
                const estado = '1';
                if (!tipoCaso || !idEquipo || !descripcion || !file) {
                    alert("Faltan datos requeridos. Revise los datos que usted ha ingresado.");
                    setLoading(false);
                    return;
                }
                const formData = new FormData();
                formData.append('case', '1');
                formData.append('descripcion', descripcion);
                formData.append('idUsuarioReporte', idUsuarioReporte);
                formData.append('idEquipo', idEquipo);
                formData.append('tipoCaso', tipoCaso);
                formData.append('idLugar', idLugar);
                formData.append('estado', estado);
                formData.append('urlArchivo', file);
                try {
                    const response = await fetch('https://instrudev.com/aiameapp/caso/ReporteCasosWeb.php', {
                        method: 'POST',
                        body: formData,
                    });
                    const text = await response.text();
                    try {
                        const data = JSON.parse(text);
                        if (data.rpta[0].rp === 'si') {
                            alert("Caso reportado con éxito.");
                            AbrirCaracteristicas();
                            const correo = localStorage.getItem('correo');
                            const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/caso.php?correo=${correo}&descripcion=${descripcion}&codigo=${selectedCategorias}`, {
                                method: 'GET',
                            });
                            const correoRespuesta = await correorespuesta.json();
                            if (correoRespuesta.rp === "si") {
                                alert("El correo se ha enviado con éxito. Revise su bandeja de entrada.");
                                setLoading(false);
                            }
                            else {
                                alert("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario.");
                                setLoading(false);
                            }
                            setSelectedCategorias([]);
                            setSelectedCategoriasIds([]);
                            setFile(null);
                        }
                        else {
                            console.log("No se pudo subir el caso:", data.mensaje);
                        }
                    }
                    catch (error) {
                        console.error('Error al parsear JSON:', error);
                    }
                }
                catch (error) {
                    console.error("Error al subir el caso:", error);
                }
            }
            else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        }
        catch (error) {
            console.error("Error al guardar el caso:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const AbrirCaracteristicas = () => {
        setReporte(!Reporte);
    };
    return (_jsxs(_Fragment, { children: [descripcion && noticiaSeleccionada && Object.keys(noticiaSeleccionada).length > 0 && (_jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)', // Fondo opaco
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '2'
                }, children: _jsxs("div", { style: {
                        width: '80%', // Puedes ajustar este valor según tu diseño
                        maxWidth: '800px',
                        background: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }, children: [_jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h2", { children: "Descripci\u00F3n Completa" }), _jsx("div", { style: { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }, children: _jsx("img", { src: noticiaSeleccionada.urlImagen, alt: "Noticia", style: { width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '5px' } }) }), _jsx("p", { style: { wordWrap: 'break-word', overflowWrap: 'break-word' }, children: noticiaSeleccionada.descripcion })] }), _jsx("button", { onClick: () => setDescripcion(false), style: {
                                padding: '10px',
                                border: 'none',
                                backgroundColor: '#007bff',
                                color: 'white',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                alignSelf: 'center'
                            }, children: "Cerrar" })] }) })), showAlert_inicio && (_jsx("div", { style: {
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'white', background: 'linear-gradient(145deg, #232323, #1e1e1e)', padding: '20px',
                    borderRadius: '10px', zIndex: '9999', textAlign: 'center'
                }, children: "Equipo no encontrado, vuelva a intentar." })), Reporte && (_jsx("div", { style: {
                    width: 'calc(11.5em + 80vw)',
                    height: '91.5%',
                    background: '#F5F7FA',
                    boxShadow: '1px 1px 5px 1px #cccccc',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'fixed',
                    bottom: '0px',
                    right: '0px',
                    zIndex: '2',
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
                                                                            }, children: TipoCaso.map(caso => (_jsx("option", { value: caso.descripcion, "data-id": caso.id, children: caso.descripcion }, caso.id))) }))] })] }), _jsxs("div", { style: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }, children: [_jsx("label", { children: "SerialPc" }), _jsx("input", { type: "text", placeholder: 'SerialPc', style: {
                                                                        width: '70%', padding: '10px', marginBottom: '10px',
                                                                        borderRadius: '10px', border: '2px solid blue', outline: 'none', textAlign: 'center'
                                                                    }, id: "serial_pc" })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', }, children: [_jsx("label", { children: "Descripci\u00F3n" }), _jsx("textarea", { id: "descripcionCaso", style: {
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
                                        }, onClick: AbrirCaracteristicas, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#0056b3', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#007BFF', onFocus: (e) => e.currentTarget.style.transform = 'scale(1.05)', onBlur: (e) => e.currentTarget.style.transform = 'scale(1)', children: "Volver" }), _jsx("button", { onClick: handleSubmit, style: {
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
                    boxShadow: '1px 1px 5px 1px #cccccc',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start',
                    textAlign: 'center',
                    position: 'fixed',
                    bottom: '30px',
                    left: '96%',
                    transform: 'translateX(-98%) translateX(-4px)',
                    zIndex: '1',
                    borderCollapse: 'collapse',
                    maxWidth: '100vw',
                }, children: [_jsx("div", { style: {
                            width: '100%',
                            padding: '20px',
                            paddingLeft: '80px',
                            paddingBottom: '50px',
                            display: 'flex',
                            maxWidth: '100%',
                        }, children: _jsxs("div", { style: { width: '1555px', height: '50px', display: 'flex', justifyContent: 'space-between' }, children: [_jsx("div", { style: { display: 'flex', alignItems: 'center' }, children: _jsx("input", { type: "text", placeholder: 'Buscar por N\u00FAmero de Caso o Encargado', value: busqueda, onChange: (e) => setBusqueda(e.target.value), style: {
                                            width: '220px',
                                            padding: '9px',
                                            border: 'none',
                                            background: '#F5F7FA',
                                            borderRadius: '20px',
                                            outline: 'none',
                                            margin: '0',
                                            height: '22px'
                                        } }) }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', marginRight: '100px' }, onClick: AbrirCaracteristicas, children: [_jsx("img", { src: suma, alt: "Agregar", style: {
                                                width: '60px',
                                                display: 'flex',
                                                alignItems: 'end',
                                                justifyContent: 'end'
                                            } }), _jsx("p", { style: { margin: '0' }, children: "Agregar" })] })] }) }), noticias.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "7", style: { padding: '40px', textAlign: 'center', verticalAlign: 'middle' }, children: _jsx("div", { style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100px' // Puedes ajustar la altura según tus necesidades
                                }, children: _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay anuncios disponibles." }) }) }) })) : (noticias.length > 0 && (_jsx("div", { style: { width: '100%', maxWidth: '600px', marginTop: '-10px', marginBottom: '0px', background: '#f9f9f9', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', boxSizing: 'border-box' }, children: _jsx(Slider, { ...carouselSettings, children: noticias.map((noticia) => (_jsxs("div", { className: "slider-container", style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, onClick: () => handleNoticiaClick(noticia), children: [_jsx("img", { src: noticia.urlImagen, alt: `Imagen de noticia ${noticia.id}`, className: "slider-image", style: { width: '100%', height: '100px', borderRadius: '5px' } }), _jsxs("div", { className: "slider-text", style: { padding: '10px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }, children: [_jsx("h3", { style: { margin: '0', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: noticia.descripcion }), _jsx("p", { style: { margin: '5px 0', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: noticia.fecha })] })] }, noticia.id))) }) }))), _jsx("div", { style: { width: '100%', overflowY: 'auto' }, children: _jsxs("table", { style: {
                                width: '100%',
                                borderCollapse: 'collapse',
                            }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [_jsx("th", { style: { padding: '10px' }, children: "Tipo del caso" }), _jsx("th", { style: { padding: '10px' }, children: "N\u00FAmero del caso" }), _jsx("th", { style: { padding: '10px' }, children: "Encargado" }), _jsx("th", { style: { padding: '10px' }, children: "Serial del pc" }), _jsx("th", { style: { padding: '10px' }, children: "Aula" }), _jsx("th", { style: { padding: '10px' }, children: "Fecha" }), _jsx("th", { style: { padding: '10px' }, children: "Estado" })] }) }), _jsx("tbody", { children: casosFiltrados.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "7", style: { padding: '40px', textAlign: 'center', verticalAlign: 'middle' }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '100px' // Puedes ajustar la altura según tus necesidades
                                                }, children: [_jsx("img", { src: "https://img.icons8.com/ios/100/000000/nothing-found.png", alt: "No hay peticiones", style: { marginBottom: '20px', opacity: 0.8 } }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '24px', color: '#333' }, children: "No hay casos en proceso disponibles" }), _jsx("span", { style: { fontSize: '18px', color: '#777', marginTop: '10px' }, children: "Vuelve a intentarlo m\u00E1s tarde." })] }) }) })) : (casosFiltrados.map((item, index) => (_jsxs("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [_jsx("td", { style: { padding: '10px' }, children: item.descripcion }), _jsx("td", { style: { padding: '10px' }, children: item.id }), _jsx("td", { style: { padding: '10px' }, children: item.nombreSoporte }), _jsx("td", { style: { padding: '10px' }, children: item.serialPc }), _jsx("td", { style: { padding: '10px' }, children: item.ubicacion }), _jsx("td", { style: { padding: '10px' }, children: item.fecha }), _jsx("td", { style: { padding: '10px' }, children: _jsx("button", { style: {
                                                        width: '100%',
                                                        maxWidth: '120px',
                                                        padding: '8px',
                                                        backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                        color: getColor(item.color),
                                                        border: 'none',
                                                        borderRadius: '20px',
                                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Sombra del botón
                                                    }, children: item.estado }) })] }, index)))) })] }) })] }), loading && (_jsx("div", { style: {
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'white',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
                }, children: _jsx(MoonLoader, { color: "#096ECB", loading: loading, size: 150, speedMultiplier: 1 }) }))] }));
}
