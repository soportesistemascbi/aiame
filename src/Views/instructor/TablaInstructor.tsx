import { Link, useNavigate } from 'react-router-dom';
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
                } else {
                    setCasos(data.rpta);
                    setCasosFiltrados(data.rpta);
                }
            } catch (error) {
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

                } else {
                    setNoticias(data.rpta);

                }
            } catch (error) {
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
                } catch (error) {
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
                            } else {
                                alert("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario.");
                                setLoading(false);
                            }
                            setSelectedCategorias([]);
                            setSelectedCategoriasIds([]);
                            setFile(null);
                        } else {
                            console.log("No se pudo subir el caso:", data.mensaje);
                        }
                    } catch (error) {
                        console.error('Error al parsear JSON:', error);
                    }
                } catch (error) {
                    console.error("Error al subir el caso:", error);
                }
            } else {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error("Error al guardar el caso:", error);
        } finally {
            setLoading(false);
        }
    };
    const AbrirCaracteristicas = () => {
        setReporte(!Reporte);
    }

    return (
        <>


            {descripcion && noticiaSeleccionada && Object.keys(noticiaSeleccionada).length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',  // Fondo opaco
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '2'
                }}>
                    <div style={{
                        width: '80%', // Puedes ajustar este valor según tu diseño
                        maxWidth: '800px',
                        background: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h2>Descripción Completa</h2>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={noticiaSeleccionada.urlImagen} alt="Noticia" style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '5px' }} />
                            </div>
                            <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                {noticiaSeleccionada.descripcion}
                            </p>
                        </div>
                        <button onClick={() => setDescripcion(false)} style={{
                            padding: '10px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            alignSelf: 'center'
                        }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}




            {showAlert_inicio && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'white', background: 'linear-gradient(145deg, #232323, #1e1e1e)', padding: '20px',
                    borderRadius: '10px', zIndex: '9999', textAlign: 'center'
                }}>
                    Equipo no encontrado, vuelva a intentar.
                </div>
            )}

            {Reporte && (
                <div
                    style={{
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


                    }}
                >
                    <div style={{
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
                    }}>
                        <div style={{
                            width: '100%', height: '100%', background: 'white', boxShadow: '1px 1px 5px 1px #cccccc',
                            borderRadius: '10px', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'space-between', position: 'relative'
                        }}>
                            <h1 style={{ color: '#096ECB', textAlign: 'center', marginBottom: '20px' }}>Reporte de Caso</h1>
                            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                <div style={{
                                    width: '100%', display: 'flex', flexDirection: 'row', gap: '20px', boxSizing: 'border-box'
                                }}>
                                    <div style={{ height: '100%', width: '100%', flex: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{
                                            display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'center', width: '100%',
                                            flexWrap: 'wrap'
                                        }}>
                                            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
                                                <label>Tipo De Caso</label>
                                                <div style={{ width: '70%', position: 'relative' }}>
                                                    <input
                                                        type="text"
                                                        placeholder='Categorias'
                                                        onFocus={() => setShowCategories(true)}
                                                        readOnly
                                                        value={selectedCategorias.join(', ')}
                                                        style={{
                                                            width: '100%', padding: '10px', marginBottom: '10px',
                                                            borderRadius: '10px',  outline: 'none', textAlign: 'center'
                                                        }}
                                                        id="clase_categoria"
                                                    />
                                                    {showCategories && (
                                                        <select
                                                            multiple
                                                            onChange={handleCategoriaChange}
                                                            onClick={() => setShowCategories(false)}
                                                            style={{
                                                                position: 'absolute', top: '100%', left: '0', zIndex: '1', width: '100%',
                                                                display: showCategories ? 'block' : 'none', textAlign: 'center', scrollbarWidth: 'none'
                                                            }}
                                                        >
                                                            {TipoCaso.map(caso => (
                                                                <option key={caso.id} value={caso.descripcion} data-id={caso.id}>
                                                                    {caso.descripcion}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
                                                <label>SerialPc</label>
                                                <input
                                                    type="text"
                                                    placeholder='SerialPc'
                                                    style={{
                                                        width: '70%', padding: '10px', marginBottom: '10px',
                                                        borderRadius: '10px', outline: 'none', textAlign: 'center'
                                                    }}
                                                    id="serial_pc"
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                            <label>Descripción</label>
                                            <textarea
                                                id="descripcionCaso"
                                                style={{
                                                    width: '84%', height: '200px', padding: '10px',
                                                     borderRadius: '10px', marginBottom: '20px'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                                        <h2 style={{ fontSize: '24px', color: '#096ECB' }}>Adjuntar Imagen</h2>
                                        <div style={{
                                            width: '100%', maxWidth: '350px', height: '200px', backgroundColor: '#ddd',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc',
                                            marginBottom: '20px'
                                        }}>
                                            {file ? (
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="Vista previa de la imagen"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ textAlign: 'center', padding: '10px' }}>
                                                    <p>No se ha seleccionado ninguna imagen.</p>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleButtonClick}
                                            style={{
                                                padding: '10px 20px', backgroundColor: '#096ECB', color: 'white',
                                                border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px'
                                            }}
                                        >
                                            Seleccionar Imagen
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            accept=".jpeg, .jpg, .png"
                                        />
                                    </div>
                                </div>


                            </form>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                                marginBottom: '20px'
                            }}>
                                <button
                                    style={{
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
                                    }}
                                    onClick={AbrirCaracteristicas}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                                    onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Volver
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    style={{
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
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#cc0000'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF4D4D'}
                                    onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Enviar
                                </button>
                            </div>

                        </div>
                    </div>
                </div >
            )}



            {/* FIN MODALES  */}


            <div style={{
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
            }}>
                <div style={{
                    width: '100%',
                    padding: '20px',
                    paddingLeft: '80px',
                    paddingBottom: '50px',
                    display: 'flex',
                    maxWidth: '100%',
                }}>
                    <div style={{ width: '1555px', height: '50px', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder='Buscar por Número de Caso o Encargado'
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                style={{
                                    width: '220px',
                                    padding: '9px',
                                    border: 'none',
                                    background: '#F5F7FA',
                                    borderRadius: '20px',
                                    outline: 'none',
                                    margin: '0',
                                    height: '22px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '100px' }} onClick={AbrirCaracteristicas}>
                            <img
                                src={suma}
                                alt="Agregar"
                                style={{
                                    width: '60px',
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'end'
                                }}
                            />
                            <p style={{ margin: '0' }}>Agregar</p>
                        </div>

                    </div>
                </div>



                 


                <div style={{ width: '100%', overflowY: 'auto' }}>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <th style={{ padding: '10px' }}>Tipo del caso</th>
                                <th style={{ padding: '10px' }}>Número del caso</th>
                                <th style={{ padding: '10px' }}>Encargado</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>
                                <th style={{ padding: '10px' }}>Aula</th>
                                <th style={{ padding: '10px' }}>Fecha</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>


                           {/*                 DATOS DE LA TABLA               */}


                            {casosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ padding: '40px', textAlign: 'center', verticalAlign: 'middle' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100px' // Puedes ajustar la altura según tus necesidades
                                        }}>
                                            <img
                                                src="https://img.icons8.com/ios/100/000000/nothing-found.png"
                                                alt="No hay peticiones"
                                                style={{ marginBottom: '20px', opacity: 0.8 }}
                                            />
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>
                                                No hay casos en proceso disponibles
                                            </span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>
                                                Vuelve a intentarlo más tarde.
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                casosFiltrados.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '10px' }}>{item.descripcion}</td>
                                        <td style={{ padding: '10px' }}>{item.id}</td>
                                        <td style={{ padding: '10px' }}>{item.nombreSoporte}</td>
                                        <td style={{ padding: '10px' }}>{item.serialPc}</td>
                                        <td style={{ padding: '10px' }}>{item.ubicacion}</td>
                                        <td style={{ padding: '10px' }}>{item.fecha}</td>
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '120px',
                                                    padding: '8px',
                                                    backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                    color: getColor(item.color),
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',  // Sombra del botón
                                                }}
                                            >
                                                {item.estado}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>


                               {/*                 LOADER O ANIMACIÓN DE CARGA               */}


            {loading && (
                <div style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'white',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
                }}>
                    <MoonLoader color="#096ECB" loading={loading} size={150} speedMultiplier={1} />
                </div>
            )}
        </>
    );
}
