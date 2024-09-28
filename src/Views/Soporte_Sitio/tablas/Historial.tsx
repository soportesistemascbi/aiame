import { useEffect, useRef, useState } from 'react';
import Enviar from '../../../Icon/Enviar.svg';
import { MoonLoader } from 'react-spinners';

export default function Historial() {

    // Manejo del estado usando el hook useState de React.
    const [casos, setCasos] = useState([]); // Almacena una lista de casos.
    const [busqueda, setBusqueda] = useState(''); // Almacena la consulta de búsqueda.
    const [casosFiltrados, setCasosFiltrados] = useState([]); // Almacena casos filtrados según la búsqueda.
    const [loading, setLoading] = useState(false); // Indica si se están cargando datos.
    const fileInputRef = useRef<HTMLInputElement>(null); // Referencia para el elemento de entrada de archivos.
    const [TipoCaso, setCategorias] = useState([]); // Almacena categorías de casos.
    const [TipoEstado, setEstado] = useState([]); // Almacena estados de casos.
    const [selectedEstado, setSelectedEstado] = useState([]); // Almacena estados seleccionados.
    const [selectedEstadoIds, setSelectedEstadoIds] = useState([]); // Almacena IDs de estados seleccionados.
    const [selectedCategorias, setSelectedCategorias] = useState([]); // Almacena categorías seleccionadas.
    const [showCategories, setShowCategories] = useState(false); // Controla la visibilidad del dropdown de categorías.
    const [showEstado, setShowEstado] = useState(false); // Controla la visibilidad del dropdown de estados.
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]); // Almacena IDs de categorías seleccionadas.
    const [DatosCaso, setDatosCaso] = useState([]); // Almacena detalles de un caso específico.
    const [idcaso, setIdCaso] = useState([]); // Almacena el ID del caso que se está viendo/editar.
    const [file, setFile] = useState(null); // Almacena el archivo subido.
    const [Reportes, setReporetes] = useState(false); // Controla la visibilidad de los reportes.

    const AbrirReportes = async (id) => {
        // Función para abrir reportes para un ID de caso específico.
        setReporetes(!Reportes); // Alterna el estado de visibilidad de los reportes.
        setIdCaso(id); // Establece el ID del caso actual.

        try {
            // Obtiene detalles del caso desde la API.
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`;
            const response = await fetch(url);
            const data1 = await response.json();
            setDatosCaso(data1.rpta); // Almacena los detalles del caso en el estado.
        } catch (error) {
            console.log("Error al obtener componentes:", error); // Registra cualquier error.
        }
    };
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', casos)
    // useEffect para obtener categorías cuando el componente se monta.
    useEffect(() => {
        fetchCategorias();
    }, []);

    // Función para obtener categorías desde la API.
    const fetchCategorias = () => {
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías'); // Lanza un error si la respuesta no es correcta.
                }
                return response.text(); // Devuelve el texto de la respuesta.
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Parsea los datos JSON.
                    setCategorias(data.rpta); // Actualiza las categorías en el estado.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Registra errores de parsing.
                    console.error('Respuesta recibida:', text); // Registra el texto recibido para depuración.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Registra errores de fetch.
    };

    // useEffect para obtener estados cuando el componente se monta.
    useEffect(() => {
        fetchEstados();
    }, []);

    // Función para obtener estados desde la API.
    const fetchEstados = () => {
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=7')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las categorías'); // Lanza un error si la respuesta no es correcta.
                }
                return response.text(); // Devuelve el texto de la respuesta.
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Parsea los datos JSON.
                    setEstado(data.rpta); // Actualiza los estados en el estado.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Registra errores de parsing.
                    console.error('Respuesta recibida:', text); // Registra el texto recibido para depuración.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Registra errores de fetch.
    };

    // Maneja los cambios en las categorías seleccionadas.
    const handleCategoriaChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtiene los valores seleccionados.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtiene los IDs seleccionados.
        setSelectedCategorias(selectedOptions); // Actualiza las categorías seleccionadas en el estado.
        setSelectedCategoriasIds(selectedOptionsIds); // Actualiza los IDs de categorías seleccionadas en el estado.
    };

    // Maneja los cambios en los estados seleccionados.
    const handleCategoriaChange2 = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtiene los valores seleccionados.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtiene los IDs seleccionados.
        setSelectedEstado(selectedOptions); // Actualiza los estados seleccionados en el estado.
        setSelectedEstadoIds(selectedOptionsIds); // Actualiza los IDs de estados seleccionados en el estado.
    };

    // Función para manejar el clic en el botón de carga de archivos.
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simula un clic en el input de archivos.
        }
    };

    // Función para manejar el cambio en el archivo seleccionado.
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Almacena el archivo seleccionado en el estado.
    };

    const id = localStorage.getItem('idUsuario'); // Obtiene el ID del usuario desde el almacenamiento local.
    console.log(id); // Registro del ID de usuario.

    const fetchData = async () => {
        setLoading(true);
        // Función para obtener casos desde la API.
        try {
            const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=5&id=${id}`);
            const data = await response.json();

            // Si la respuesta contiene [{"rp":"no"}], no hay casos.
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setCasos([]); // Establece casos como vacío.
                setCasosFiltrados([]); // Establece casos filtrados como vacío.
                setLoading(false);
            } else {
                setCasos(data.rpta); // Almacena los casos en el estado.
                setCasosFiltrados(data.rpta); // Inicialmente muestra todos los casos.
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener casos:', error); // Registra errores al obtener casos.
        }
    };

    // useEffect para obtener datos cuando el componente se monta o el ID cambia.
    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        // Filtra los casos basándose en la búsqueda.
        const resultados = casos.filter(item => {
            // Verificamos si item.id y item.nombreSoporte no están vacíos o indefinidos antes de aplicar toLowerCase().
            const id = item.id ? item.id.toLowerCase() : '';
            const nombreSoporte = item.nombreReporte ? item.nombreReporte.toLowerCase() : '';
            const serialPc = item.serialPc ? item.serialPc.toLowerCase() : '';

            // Filtramos los casos basándonos en la búsqueda.
            return id.includes(busqueda.toLowerCase()) || nombreSoporte.includes(busqueda.toLowerCase()) || serialPc.includes(busqueda.toLowerCase());
        });

        setCasosFiltrados(resultados); // Actualiza los casos filtrados en el estado.
    }, [busqueda, casos]);

    // Función para convertir colores hexadecimales a RGBA.
    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            // Si hex es vacío, no tiene el formato adecuado, o no tiene el tamaño adecuado.
            return `rgba(0, 0, 0, ${opacity})`;  // Retorna un color negro con la opacidad deseada como valor predeterminado.
        }

        hex = hex.replace('#', ''); // Elimina el símbolo '#' si está presente.
        let r = parseInt(hex.substring(0, 2), 16); // Obtiene el valor rojo.
        let g = parseInt(hex.substring(2, 4), 16); // Obtiene el valor verde.
        let b = parseInt(hex.substring(4, 6), 16); // Obtiene el valor azul.
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Retorna el color en formato RGBA.
    }

    // Función para obtener un color válido.
    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000';  // Color negro predeterminado.
        }
        return color.startsWith('#') ? color : `#${color}`; // Retorna el color, asegurando que esté en formato hexadecimal.
    };

    // Función para manejar el envío del detalle del caso.

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
        if (!id) {
            alert('No ha puesto un equipo para el caso');
            setLoading(false);
            return;
        }



        const formData = new FormData();
        formData.append('case', '2');
        formData.append('idCaso', idCaso);
        formData.append('observacion', observacion);
        formData.append('idEquipo', id);
        formData.append('idUsuarioSoporte', idUsuarioSoporte!);
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
            } catch (jsonError) {
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
                    } else {
                        alert('Error al guardar el caso');
                    }
                } catch (error) {
                    console.error("Error al guardar el caso:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("No se pudo subir el caso:", data.mensaje);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error al subir el caso:", error);
            setLoading(false);
        }
    };


    return (
        <>

            {Reportes && (
                <div style={{
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
                    left: '96%',  // Centramos la tabla en el eje horizontal
                    transform: 'translateX(-98%) translateX(-4px)',  // Corremos 180px a la izquierda
                    zIndex: '5',
                    borderCollapse: 'collapse',
                    maxWidth: '100vw',  // Evitar que la tabla exceda el ancho de la pantalla
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto', // Mantén esta línea
                        background: '#ffffff',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start', // Cambia a flex-start
                        textAlign: 'center',

                    }}>
                        <h1 style={{ color: '#096ECB', marginBottom: '15px' }}>Reporte de Caso</h1>
                        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                                width: '100%', display: 'flex', gap: '15px', boxSizing: 'border-box', flexWrap: 'wrap'
                            }}>
                                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label>Tipo De Caso</label>
                                    <div style={{ position: 'relative', width: '70%' }}>
                                        <input
                                            type="text"
                                            placeholder='Categorías'
                                            onFocus={() => setShowCategories(true)}
                                            readOnly
                                            value={selectedCategorias.join(', ')}
                                            style={{
                                                padding: '8px', marginBottom: '5px',
                                                borderRadius: '10px', outline: 'none', textAlign: 'center',
                                                width: '100%', cursor: 'pointer'
                                            }}
                                        />
                                        {showCategories && (
                                            <select
                                                multiple
                                                onChange={handleCategoriaChange}
                                                onClick={() => setShowCategories(false)}
                                                style={{
                                                    position: 'absolute', zIndex: '1', width: '100%',
                                                    display: showCategories ? 'block' : 'none', textAlign: 'center',
                                                    borderRadius: '10px', marginTop: '3px'
                                                }}
                                            >
                                                {TipoCaso.map(caso => (
                                                    <option key={caso.id} value={caso.descripcion} data-id={caso.id} style={{ padding: '5px' }}>
                                                        {caso.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label>Estado</label>
                                    <div style={{ position: 'relative', width: '70%' }}>
                                        <input
                                            type="text"
                                            placeholder='Estado'
                                            onFocus={() => setShowEstado(true)}
                                            readOnly
                                            value={selectedEstado.join(', ')}
                                            style={{
                                                padding: '8px', marginBottom: '5px',
                                                borderRadius: '10px', outline: 'none', textAlign: 'center',
                                                width: '100%', cursor: 'pointer'
                                            }}
                                        />
                                        {showEstado && (
                                            <select
                                                multiple
                                                onChange={handleCategoriaChange2}
                                                onClick={() => setShowEstado(false)}
                                                style={{
                                                    position: 'absolute', zIndex: '1', width: '100%',
                                                    display: showEstado ? 'block' : 'none', textAlign: 'center',
                                                    borderRadius: '10px', marginTop: '3px'
                                                }}
                                            >
                                                {TipoEstado.map(caso => (
                                                    <option key={caso.id} value={caso.estado} data-id={caso.id} style={{ padding: '5px' }}>
                                                        {caso.estado}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <label>Descripción</label>
                            <textarea
                                id="descripcionCaso"
                                style={{
                                    width: '84%', height: '180px', padding: '8px',
                                    borderRadius: '10px', marginBottom: '15px'
                                }}
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', color: '#096ECB' }}>Adjuntar Imagen</h2>
                                <div style={{
                                    width: '100%', maxWidth: '350px', height: '180px', backgroundColor: '#ddd',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc',
                                    marginBottom: '15px'
                                }}>
                                    {file ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Vista previa de la imagen"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '5px' }}>
                                            <p>No se ha seleccionado ninguna imagen.</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    style={{
                                        padding: '8px 16px', backgroundColor: '#096ECB', color: 'white',
                                        border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px'
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

                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                                marginBottom: '15px'
                            }}>
                                <button
                                    onClick={AbrirReportes}
                                    style={{
                                        width: '120px', height: '40px', backgroundColor: '#007BFF',
                                        borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer',
                                        fontSize: '16px', fontWeight: '600', transition: 'background-color 0.3s',
                                    }}
                                >
                                    Volver
                                </button>

                                <button
                                    onClick={handleSubmitDetalle}
                                    style={{
                                        width: '120px', height: '40px', backgroundColor: '#FF4D4D',
                                        borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer',
                                        fontSize: '16px', fontWeight: '600', transition: 'background-color 0.3s',
                                    }}
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Fin modal */}

            {/* TABLA GENERAL DE CONTENIDO */}
            <table
                style={{
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
                    left: '96%',  // Centramos la tabla en el eje horizontal
                    transform: 'translateX(-98%) translateX(-4px)',  // Corremos 180px a la izquierda
                    zIndex: '3',
                    borderCollapse: 'collapse',
                    maxWidth: '100vw',  // Evitar que la tabla exceda el ancho de la pantalla
                }}
            >
                <div
                    style={{
                        width: '100%',
                        padding: '20px',
                        paddingLeft: '80px',
                        display: 'flex',
                        maxWidth: '100%',  // Mantiene el contenedor dentro de la pantalla
                    }}
                >
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
                                    paddingLeft: '30px',
                                    height: '22px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ENCABEZADO DE LA TABLA */}
                <div style={{ width: '100%', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <th style={{ padding: '10px' }}>Codigo del caso</th>
                                <th style={{ padding: '10px' }}>Tipo del caso</th>

                                <th style={{ padding: '10px' }}>Remitente</th>
                                <th style={{ padding: '10px' }}>Cargo</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>
                                <th style={{ padding: '10px' }}>Lugar</th>
                                <th style={{ padding: '10px' }}>Fecha</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {casosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '300px'
                                        }}>
                                            <img src="https://img.icons8.com/ios/100/000000/nothing-found.png" alt="No hay peticiones" style={{ marginBottom: '20px', opacity: 0.8 }} />
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay historial disponibles</span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vueve a intentarlo mas tarde.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (casosFiltrados.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '10px' }}>{item.codigo}</td>
                                    <td style={{ padding: '10px' }}>{item.nomTipoCaso}</td>

                                    <td style={{ padding: '10px' }}>{item.nombreReporte}</td>
                                    <td style={{ padding: '10px' }}>{item.rolReporte}</td>
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
                                            }}
                                        >
                                            {item.estado}
                                        </button>
                                    </td>
                                    {item.idEstado === '3' && (
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                style={{ width: '120px', padding: '8px', background: '#1874B7', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    AbrirReportes(item.id);
                                                }}
                                            >
                                                Gestionar caso
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )))}
                        </tbody>
                    </table>

                </div>
            </table>

            {/*   LOADER O PANTALLA DE CARGA   */}

            {loading && (
                <div style={{
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
                }}>
                    <MoonLoader
                        color="#096ECB"
                        loading={loading}
                        size={150}
                        speedMultiplier={1}

                    />
                </div>
            )}
        </>
    )
}
