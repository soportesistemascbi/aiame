import { useEffect, useRef, useState } from 'react'; // Importing React hooks for state and lifecycle management.
import MoonLoader from 'react-spinners/MoonLoader'; // Importing a loading spinner component.
import Flecha from '../../Tablas/icon/Flecha.svg'; // Importing an icon.
import reportes from '../../Tablas/icon/Reportes.svg'; // Importing another icon.
import linea from '../../Tablas/icon/linea.svg'; // Importing another icon.
import persona from '../../Tablas/icon/Ppersona.svg'; // Importing another icon.
import PC from '../../Tablas/icon/Pc.svg'; // Importing another icon.
import Hola from '../../Tablas/icon/icon.svg'; // Importing another icon.
import Modal from '../../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../../Components/Alertas/alertaBuena.tsx'
export default function ReportesSopor() { // Declaring the functional component.

    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false); // Estado para alternar la visibilidad de las características de la PC.
    const [img, setimg] = useState(false); // Estado para alternar la visibilidad de la imagen.
    const [hoveredRow, setHoveredRow] = useState(null); // Estado para rastrear la fila sobre la que se pasa el mouse.
    const [Reportes, setReporetes] = useState(false); // Estado para alternar la visibilidad de los reportes.
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios.
    const [busqueda, setBusqueda] = useState(''); // Estado para la entrada de búsqueda.
    const [loading, setLoading] = useState(false); // Estado para el estado de carga.
    const [Componentes, setComponentes] = useState([]); // Estado para almacenar componentes.
    const [info, setInflo] = useState([]); // Estado para almacenar información adicional.
    const [caso, setCaso] = useState([]); // Estado para almacenar datos del caso.
    const [noHayCasos, setNoHayCasos] = useState(false); // Estado para rastrear si no hay casos.
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref para el elemento de entrada de archivo.
    const [TipoCaso, setCategorias] = useState([]); // Estado para almacenar categorías de casos.
    const [TipoEstado, setEstado] = useState([]); // Estado para almacenar estados.
    const [selectedEstado, setSelectedEstado] = useState([]); // Estado para estados seleccionados.
    const [selectedEstadoIds, setSelectedEstadoIds] = useState([]); // Estado para IDs de estados seleccionados.
    const [selectedCategorias, setSelectedCategorias] = useState([]); // Estado para categorías seleccionadas.
    const [showCategories, setShowCategories] = useState(false); // Estado para mostrar el desplegable de categorías.
    const [showEstado, setShowEstado] = useState(false); // Estado para mostrar el desplegable de estados.
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]); // Estado para IDs de categorías seleccionadas.
    const [DatosCaso, setDatosCaso] = useState([]); // Estado para almacenar datos del caso.
    const [idcaso, setIdCaso] = useState([]); // Estado para almacenar ID del caso.
    const [file, setFile] = useState(null); // Estado para almacenar archivo subido.
    const [CasoCaracteristicas, setDatosCasoCracteristicas] = useState([]); // Estado para almacenar características del caso.
    const [errorMessage, setErrorMessage] = useState('');
    const [Message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [Open, setOpen] = useState(false);



    const handleClose = () => {
        setIsOpen(false);
    };
    const handleClose1 = () => {
        setOpen(false);
    };

    // Manejo de cierre automático del modal
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 3000); // Cierra el modal después de 3 segundos

            return () => clearTimeout(timer); // Limpieza del timer
        }
    }, [isOpen]);

    // Manejo de cierre automático del modal
    useEffect(() => {
        if (Open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000); // Cierra el modal después de 3 segundos

            return () => clearTimeout(timer); // Limpieza del timer
        }
    }, [Open]);


    const AbrirCaracteristicas = () => { // Función para alternar la visibilidad de las características de la PC.
        setcaracteristicas_pc(!caracteristicas_pc); // Alternar el estado.
    }

    const AbrirImg = () => { // Función para alternar la visibilidad de la imagen.
        setimg(!img); // Alternar el estado.
    }

    const AbrirReportes = async (id) => { // Función para alternar la visibilidad de los reportes y obtener datos del caso.
        setReporetes(!Reportes); // Alternar el estado de los reportes.
        setIdCaso(id); // Establecer el ID del caso.

        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`; // URL para obtener datos del caso.
            const response = await fetch(url); // Obtener datos del servidor.
            const data1 = await response.json(); // Analizar la respuesta como JSON.
            setDatosCaso(data1.rpta); // Almacenar los datos de la respuesta en el estado.
        } catch (error) {
            console.log("Error al obtener componentes:", error); // Registrar error si la obtención falla.
        }
    };

    useEffect(() => { // Hook para obtener categorías al montar el componente.
        fetchCategorias(); // Llamar a la función para obtener categorías.
    }, []);

    const fetchCategorias = () => { // Función para obtener categorías de casos del servidor.
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2') // Obtener categorías del servidor.
            .then(response => { // Manejar la respuesta.
                if (!response.ok) { // Verificar si la respuesta es correcta.
                    throw new Error('Error al obtener las categorías'); // Lanzar un error si no es así.
                }
                return response.text(); // Devolver la respuesta como texto.
            })
            .then(text => { // Manejar la respuesta de texto.
                try {
                    const data = JSON.parse(text); // Analizar el texto como JSON.
                    setCategorias(data.rpta); // Almacenar las categorías en el estado.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Registrar errores de análisis JSON.
                    console.error('Respuesta recibida:', text); // Registrar la respuesta recibida para depuración.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Registrar errores si la obtención falla.
    };

    useEffect(() => { // Hook para obtener estados al montar el componente.
        fetchEstados(); // Llamar a la función para obtener estados.
    }, []);

    const fetchEstados = () => { // Función para obtener estados de casos del servidor.
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=7') // Obtener estados del servidor.
            .then(response => { // Manejar la respuesta.
                if (!response.ok) { // Verificar si la respuesta es correcta.
                    throw new Error('Error al obtener las categorías'); // Lanzar un error si no es así.
                }
                return response.text(); // Devolver la respuesta como texto.
            })
            .then(text => { // Manejar la respuesta de texto.
                try {
                    const data = JSON.parse(text); // Analizar el texto como JSON.
                    setEstado(data.rpta); // Almacenar los estados en el estado.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Registrar errores de análisis JSON.
                    console.error('Respuesta recibida:', text); // Registrar la respuesta recibida para depuración.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Registrar errores si la obtención falla.
    };

    const handleCategoriaChange = (e) => { // Función para manejar cambios en la selección de categorías.
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtener valores de categorías seleccionadas.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtener IDs de categorías seleccionadas.
        setSelectedCategorias(selectedOptions); // Actualizar categorías seleccionadas en el estado.
        setSelectedCategoriasIds(selectedOptionsIds); // Actualizar IDs de categorías seleccionadas en el estado.
    };

    const handleCategoriaChange2 = (e) => { // Función para manejar cambios en la selección de estados.
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtener valores de estados seleccionados.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtener IDs de estados seleccionados.
        setSelectedEstado(selectedOptions); // Actualizar estados seleccionados en el estado.
        setSelectedEstadoIds(selectedOptionsIds); // Actualizar IDs de estados seleccionados en el estado.
    };

    const handleButtonClick = () => { // Función para manejar clic en el botón para la entrada de archivo.
        if (fileInputRef.current) { // Verificar si el ref está establecido.
            fileInputRef.current.click(); // Disparar clic en la entrada de archivo.
        }
    };

    const handleFileChange = (e) => { // Función para manejar cambios en la entrada de archivo.
        setFile(e.target.files[0]); // Almacenar el archivo subido en el estado.
    };




    const fetchData = async () => { // Función para obtener casos de usuario del servidor.
        setLoading(true); // Establecer el estado de carga en verdadero.
        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/casos.php?case=5'); // Obteniendo casos de usuario.

            const data = await response.json(); // Analizar la respuesta como JSON.

            // Verificar si no hay casos en la respuesta.
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setUsuarios([]); // Limpiar usuarios si no se encuentran casos.
                setLoading(false); // Establecer el estado de carga en falso.
            } else {
                setUsuarios(data.rpta); // Almacenar casos en el estado.
                setLoading(false); // Establecer el estado de carga en falso.
            }
        } catch (error) {
            console.error('Error al obtener casos:', error); // Registrar errores si falla la obtención.
            setLoading(false); // Establecer el estado de carga en falso.
        }
    };

    useEffect(() => { // Hook para obtener casos de usuario al montar el componente.
        fetchData(); // Llamar a la función para obtener casos.
    }, []);

    async function Aceptarpeticion(id) { // Función para aceptar una solicitud y obtener datos asociados.
        setcaracteristicas_pc(!caracteristicas_pc); // Alternar la visibilidad de las características del PC.
        setLoading(true); // Establecer el estado de carga en verdadero.
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`; // URL para obtener detalles del caso.
            const response = await fetch(url); // Obteniendo datos del caso.
            const data1 = await response.json(); // Analizar la respuesta como JSON.
            const idEquipoCaso = await (data1.rpta[0].idEquipo); // Obtener el ID del equipo del caso.
            setDatosCasoCracteristicas(data1.rpta); // Almacenar características del caso en el estado.

            // Obtener componentes relacionados con el caso.
            try {
                const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=3&idEquipo=${idEquipoCaso}`; // URL para obtener componentes.
                const response = await fetch(url); // Obteniendo datos de componentes.
                const data1 = await response.json(); // Analizar la respuesta como JSON.
                if (data1.rpta && data1.rpta.length === 1 && data1.rpta[0].rp === "no") {
                    setComponentes([]); // Limpiar componentes si no se encuentran.
                } else {
                    setComponentes(data1.rpta); // Almacenar componentes en el estado.
                }
            } catch (error) {
                console.log("Error al obtener componentes:", error); // Registrar errores si falla la obtención.
            }

            // Obtener información adicional relacionada con el caso.
            try {
                const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=2&idEquipo=${idEquipoCaso}`; // URL para obtener información adicional.
                const response = await fetch(url); // Obteniendo información adicional.
                const data2 = await response.json(); // Analizar la respuesta como JSON.

                if (data2.rpta && data2.rpta.length === 1 && data2.rpta[0].rp === "no") {
                    setInflo([]); // Limpiar información si no se encuentra.
                } else {
                    setInflo(data2.rpta); // Almacenar información adicional en el estado.
                }
            } catch (error) {
                console.log("Error al obtener información adicional:", error); // Registrar errores si falla la obtención.
            }

            // Obtener casos relacionados con el equipo.
            try {
                const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=2&idEquipo=${idEquipoCaso}`; // URL para obtener casos del equipo.
                const response = await fetch(url); // Obteniendo casos del equipo.
                const data3 = await response.json(); // Analizar la respuesta como JSON.

                if (data3.rpta && data3.rpta[0].rp === "no") {
                    setNoHayCasos(true); // Establecer bandera de no casos si no se encuentran.
                    setLoading(false); // Establecer el estado de carga en falso.
                } else {
                    setNoHayCasos(false); // Restablecer la bandera de no casos si se encuentran.
                    setCaso(data3.rpta); // Almacenar casos en el estado.
                    setLoading(false); // Establecer el estado de carga en falso.
                }
            } catch (error) {
                console.log("Error al obtener casos:", error); // Registrar errores si falla la obtención.
                setLoading(false); // Establecer el estado de carga en falso.
            }
        } catch (error) {
            setLoading(false); // Establecer el estado de carga en falso en caso de error.
            console.log("Error al obtener componentes:", error); // Registrar errores si falla la obtención.
        }
    }

    const handleSearchChange = (event) => { // Función para manejar cambios en la entrada de búsqueda.
        setBusqueda(event.target.value); // Actualizar entrada de búsqueda en el estado.
    }

    const usuariosFiltrados = usuarios.filter(item => // Filtrando usuarios basado en la entrada de búsqueda.
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || // Filtrar por nombre.
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) || // Filtrar por código.
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase()) // Filtrar por número de serie.
    );

    function hexToRgba(hex, opacity) { // Función para convertir color HEX a RGBA.
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) { // Comprobar formato HEX válido.
            return `rgba(0, 0, 0, ${opacity})`; // Devolver color negro si no es válido.
        }

        hex = hex.replace('#', ''); // Eliminar '#' del HEX.
        let r = parseInt(hex.substring(0, 2), 16); // Obtener componente rojo.
        let g = parseInt(hex.substring(2, 4), 16); // Obtener componente verde.
        let b = parseInt(hex.substring(4, 6), 16); // Obtener componente azul.
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Devolver cadena RGBA.
    }

    const getColor = (color) => { // Función para asegurar un valor de color válido.
        if (!color || color.trim() === '') { // Comprobar si el color está vacío.
            return '#000000'; // Devolver negro como valor predeterminado.
        }
        return color.startsWith('#') ? color : `#${color}`; // Devolver color con '#' si no está presente.
    };

    const handleSubmitDetalle = async (e) => { // Función para manejar la presentación del formulario.
        e.preventDefault(); // Prevenir el comportamiento de envío predeterminado del formulario.
        setLoading(true); // Establecer el estado de carga en verdadero.

        const id = DatosCaso[0].idEquipo; // Obtener ID del equipo de los datos del caso.
        const idCaso = idcaso; // Obtener ID del caso del estado.
        const observacion = document.getElementById('descripcionCaso').value; // Obtener el valor de entrada de observación.
        const idUsuarioSoporte = localStorage.getItem('idUsuario'); // Obtener ID de usuario del almacenamiento local.
        const tipoCaso = selectedCategoriaIds; // Obtener tipos de caso seleccionados del estado.
        const estado = selectedEstadoIds; // Obtener estados seleccionados del estado.

        // Validaciones
        if (!observacion) { // Comprobar si la observación está vacía.
            setErrorMessage('No ha puesto una descripción'); // Alertar al usuario para que proporcione una descripción.
            setIsOpen(true)
            setLoading(false); // Establecer el estado de carga en falso.
            return; // Salir de la función.
        }
        if (!file) { // Comprobar si no se ha proporcionado un archivo.
            setErrorMessage('No ha puesto una imagen'); // Alertar al usuario para que proporcione una imagen.
            setIsOpen(true)
            setLoading(false); // Establecer el estado de carga en falso.
            return; // Salir de la función.
        }
        if (!tipoCaso) { // Comprobar si no se ha seleccionado un tipo de caso.
            setErrorMessage('No ha puesto un tipo de caso'); // Alertar al usuario para que seleccione un tipo de caso.
            setIsOpen(true)
            setLoading(false); // Establecer el estado de carga en falso.
            return; // Salir de la función.
        }
        if (!estado) { // Comprobar si no se ha seleccionado un estado.
            setErrorMessage('No ha puesto un estado para el caso'); // Alertar al usuario para que seleccione un estado.
            setIsOpen(true)
            setLoading(false); // Establecer el estado de carga en falso.
            return; // Salir de la función.
        }
        if (!id) { // Comprobar si no se ha proporcionado un ID de equipo.
            setErrorMessage('No ha puesto un equipo para el caso'); // Alertar al usuario para que proporcione un ID de equipo.
            setIsOpen(true)
            setLoading(false); // Establecer el estado de carga en falso.
            return; // Salir de la función.
        }

        const formData = new FormData(); // Crear un nuevo objeto FormData para enviar datos del formulario.
        formData.append('case', '2'); // Agregar tipo de caso a los datos del formulario.
        formData.append('idCaso', idCaso); // Agregar ID de caso a los datos del formulario.
        formData.append('observacion', observacion); // Agregar observación a los datos del formulario.
        formData.append('idEquipo', id); // Agregar ID de equipo a los datos del formulario.
        formData.append('idUsuarioSoporte', idUsuarioSoporte!); // Agregar ID de usuario a los datos del formulario.
        formData.append('tipoCaso', tipoCaso); // Agregar tipos de caso a los datos del formulario.
        if (file) { // Comprobar si se ha seleccionado un archivo.
            formData.append('urlArchivo', file); // Agregar archivo a los datos del formulario.
        }

        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/ReporteCasosWeb.php', { // Enviando datos del formulario al servidor.
                method: 'POST', // Usando el método POST.
                body: formData, // Enviando los datos del formulario.
            });

            if (!response.ok) { // Comprobar si la respuesta es correcta.
                throw new Error('Error en la respuesta del servidor'); // Lanzar un error si no es así.
            }

            const text = await response.text(); // Analizar la respuesta como texto.
            let data; // Variable para almacenar datos analizados.

            try {
                data = JSON.parse(text); // Analizar texto como JSON.
            } catch (jsonError) {
                console.error('Error al parsear JSON:', jsonError); // Registrar errores de análisis JSON.
                setLoading(false); // Establecer el estado de carga en falso.
                return; // Salir de la función.
            }

            if (!data) { // Comprobar si los datos están vacíos.
                console.error('La respuesta del servidor está vacía'); // Registrar respuesta vacía.
                setLoading(false); // Establecer el estado de carga en falso.
                return; // Salir de la función.
            }

            if (data.rpta[0].rp === 'si') { // Comprobar si la respuesta indica éxito.
                try {
                    const checkResponse = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=8&id=${idCaso}&estado=${estado}&idUsuarioSoporte=${idUsuarioSoporte}`); // Verificar el estado del caso.
                    if (!checkResponse.ok) { // Comprobar si la respuesta es correcta.
                        throw new Error('Error en la respuesta del servidor'); // Lanzar un error si no es así.
                    }

                    const checkData = await checkResponse.json(); // Analizar respuesta como JSON.

                    if (checkData.rp === 'si') { // Comprobar si la respuesta indica éxito.
                        fetchData(); // Obtener datos actualizados.
                        AbrirReportes(false); // Cerrar reportes.
                        setLoading(false); // Establecer el estado de carga en falso.
                        setSelectedEstado([]); // Limpiar estado seleccionado.
                        setSelectedEstadoIds([]); // Limpiar IDs de estado seleccionados.
                        setSelectedCategorias([]); // Limpiar categorías seleccionadas.
                        setSelectedCategoriasIds([]); // Limpiar IDs de categorías seleccionadas.
                        setFile(null); // Limpiar archivo seleccionado.
                        setMessage("Caso reportado con éxito."); // Alertar al usuario del éxito.
                        setOpen(true);
                    } else {
                        setErrorMessage('Error al guardar el caso'); // Alertar al usuario si falla el guardado del caso.
                        setIsOpen(true)
                    }
                } catch (error) {
                    console.error("Error al guardar el caso:", error); // Registrar errores si falla el guardado.
                } finally {
                    setLoading(false); // Establecer el estado de carga en falso después del intento.
                }
            } else {
                console.log("No se pudo subir el caso:", data.mensaje); // Registrar errores de envío del caso.
                setLoading(false); // Establecer el estado de carga en falso.
            }
        } catch (error) {
            console.error("Error al subir el caso:", error); // Registrar errores si falla la presentación.
            setLoading(false); // Establecer el estado de carga en falso.
        }
    };




    return (

        <>
            {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}
            {isOpen && <Modal message={errorMessage} onClose={handleClose} />}
            {Open && <Modal1 message={Message} onClose={handleClose1} />}


            {img && (
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
                    zIndex: '10'
                }}>
                    {CasoCaracteristicas.length === 0 ? (
                        <p>No hay informacion disponibles.</p>
                    ) : (
                        CasoCaracteristicas.map((item, index) => (
                            <div key={index} style={{
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
                                    <h2>Descripción y imagen completa</h2>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={item.urlArchivo} alt="Noticia" style={{ width: '100%', maxWidth: '5000px', height: 'auto', borderRadius: '5px' }} />
                                    </div>
                                    <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                        {item.descripcion}
                                    </p>
                                </div>
                                <button onClick={() => setimg(false)} style={{
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
                        )))}
                </div>
            )}

            {caracteristicas_pc && (
                <div style={{
                    width: 'calc(11.5em + 80vw)',
                    height: '91.5%',
                    background: '#F5F7FA',
                    margin: 'auto',
                    boxShadow: '1px 1px 5px 1px #cccccc',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    bottom: '0px',
                    right: '0px',
                    zIndex: '4',
                    overflow: 'hidden', // Prevent overall overflow
                }}>
                    <div style={{
                        width: 'auto',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                        padding: '10px',
                    }}>
                        <img src={Flecha} onClick={AbrirCaracteristicas} style={{
                            marginLeft: '25px',
                            cursor: 'pointer',
                        }} />
                    </div>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'hidden',
                    }}>
                        <div style={{
                            width: '90%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                            overflowX: 'auto', // Allow horizontal scrolling
                            padding: '10px',
                            boxSizing: 'border-box',
                            marginLeft: '5%'
                        }}>
                            {/* Main Content Area */}
                            <div style={{
                                flex: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                padding: '10px',
                                boxSizing: 'border-box',
                            }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', }}>
                                    <div style={{
                                        flex: '1 1 auto',
                                        background: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '1px 1px 5px #d4d4d4',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        margin: '10px'
                                    }}>
                                        {/* Info Container */}
                                        {info.length === 0 ? (
                                            <p>No hay información disponible.</p>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                {info.map((item, index) => (
                                                    <div key={index} style={{
                                                        display: 'flex', flexDirection: 'column', width: '100%', height: '100%'
                                                    }}>
                                                        <img src={PC} style={{
                                                            width: '60px',
                                                            marginBottom: '10px',
                                                        }} />
                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <div style={{ display: 'flex', paddingBottom: '15px' }}>
                                                                    <b style={{ marginRight: '10px' }}>Nombre:</b>
                                                                    <p style={{ margin: '0' }}>{item.modelo}</p>
                                                                </div>
                                                                <div><b>Tipo de equipo:</b> <p style={{ margin: '0' }}>{item.tipo}</p></div>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <div style={{ display: 'flex', paddingBottom: '15px' }}>
                                                                    <b style={{ marginRight: '10px' }}>Marca:</b>
                                                                    <p style={{ margin: '0' }}>{item.marca}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <img src={Hola} style={{
                                                            width: '60px',
                                                            marginTop: '10px',
                                                        }} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Case Evidence Image */}
                                    <div style={{
                                        flex: '1 1 auto',
                                        background: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '1px 1px 5px #d4d4d4',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        margin: '10px',
                                        cursor: 'pointer'
                                    }} onClick={AbrirImg}>
                                        {CasoCaracteristicas.length === 0 ? (
                                            <p>No hay imágenes disponibles.</p>
                                        ) : (
                                            CasoCaracteristicas.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                    <p>Imagen de evidencia del caso</p>
                                                    <img src={item.urlArchivo} style={{
                                                        width: '100px',
                                                        marginBottom: '10px',
                                                    }} />
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Case Description */}
                                    <div style={{
                                        flex: '1 1 auto',
                                        background: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '1px 1px 5px #d4d4d4',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        margin: '10px',
                                        cursor: 'pointer'
                                    }} onClick={AbrirImg}>
                                        {CasoCaracteristicas.length === 0 ? (
                                            <p>No hay descripciones disponibles.</p>
                                        ) : (
                                            CasoCaracteristicas.map((item, index) => (
                                                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                    <p>Descripción del caso</p>
                                                    <div>
                                                        <b>{item.descripcion}</b>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                                {/* Reports Section */}
                                <div style={{
                                    width: '100%',
                                    maxWidth: '1500px',
                                    background: 'white',
                                    borderRadius: '10px',
                                    boxShadow: '1px 1px 5px #d4d4d4',
                                    padding: '10px',
                                    boxSizing: 'border-box',
                                    marginTop: '2rem',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <img src={reportes} style={{
                                            width: '50px',
                                            marginRight: '10px',
                                        }} />
                                        <p>Registro de reportes</p>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button style={{
                                                padding: '8px',
                                                background: '#E8F0FF',
                                                color: 'black',
                                                border: 'none',
                                                borderRadius: '10px',
                                            }}>Mes</button>
                                            <img src={linea} style={{
                                                width: '10px',
                                            }} />
                                            <button style={{
                                                padding: '8px',
                                                background: '#E8F0FF',
                                                color: 'black',
                                                border: 'none',
                                                borderRadius: '10px',
                                            }}>Año</button>
                                        </div>
                                    </div>
                                    <div>
                                        {noHayCasos ? (
                                            <div style={{
                                                width: '100%',
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
                                            }}>
                                                <p>No hay casos disponibles.</p>
                                            </div>
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '10px',
                                                boxSizing: 'border-box',
                                                overflowY: 'auto',
                                                maxHeight: '420px',
                                            }}>
                                                {caso.map((item, index) => {
                                                    const color = item.color && item.color.startsWith('#') ? item.color : `#${item.color || '000000'}`;
                                                    const backgroundColor = hexToRgba(color, 0.4);

                                                    return (
                                                        <div key={index} style={{
                                                            background: '#F8F9FA',
                                                            borderRadius: '10px',
                                                            boxShadow: '1px 1px 5px #d4d4d4',
                                                            padding: '10px',
                                                            marginBottom: '10px',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                            }}>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <img src={persona} style={{
                                                                        width: '30px',
                                                                    }} />
                                                                    <p>{item.nombreSoporte}</p>
                                                                </div>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                                                    <p>Cargo: <b>{item.rolSoporte}</b></p>
                                                                    <p>Correo: <b>{item.correoSoporte}</b></p>
                                                                    <p>Fecha: <b>{item.fecha}</b></p>
                                                                    <p>Caso: <b>{item.nomTipoCaso}</b></p>
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                            }}>
                                                                <p>Estado</p>
                                                                <button style={{
                                                                    width: '120px',
                                                                    padding: '8px',
                                                                    backgroundColor: backgroundColor,
                                                                    color: color.startsWith('#') ? color : `#${color}`,
                                                                    border: 'none',
                                                                    borderRadius: '20px'
                                                                }}>
                                                                    {item.estado}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Side Banner */}
                            <div style={{
                                flex: '0 0 350px',
                                maxWidth: '350px',
                                minWidth: '300px',
                                background: 'white',
                                borderRadius: '10px',
                                boxShadow: '1px 1px 5px #d4d4d4',
                                padding: '10px',
                                boxSizing: 'border-box',
                                overflowY: 'auto',
                            }}>
                                <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '10px', marginBottom: '10px' }}>
                                    Otras características
                                </div>
                                <div style={{
                                    maxHeight: 'calc(100% - 40px)', // Adjusted for title space
                                    overflowY: 'auto',
                                }}>
                                    {Componentes.length === 0 ? (
                                        <p>No hay componentes adicionales disponibles.</p>
                                    ) : (
                                        Componentes.map((item, index) => (
                                            <div key={index} style={{
                                                width: '100%',
                                                backgroundColor: '#f5f7fa',
                                                color: 'black',
                                                fontSize: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                marginTop: '10px',
                                                boxSizing: 'border-box',
                                            }}>
                                                <img src={item.urlIcon} style={{
                                                    width: '40px',
                                                    marginRight: '10px',
                                                }} />
                                                <div>
                                                    <p style={{ fontSize: '16px', margin: '0' }}>{item.tipoComponente}</p>
                                                    <p style={{ fontSize: '14px', margin: '0' }}>{item.serial}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}





            {Reportes && (
                <div style={{
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
                    left: '96%',  // Centrar la tabla en el eje horizontal
                    transform: 'translateX(-98%) translateX(-4px)',  // Corremos a la izquierda
                    zIndex: '5'
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




            {/* fin del modal */}



            <div style={{
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
                left: '96%',  // Centrar la tabla en el eje horizontal
                transform: 'translateX(-98%) translateX(-4px)',  // Corremos a la izquierda
                zIndex: '3'
            }}>


                {/* CONTENEDOR DEL INPUT DE BÚSQUEDA */}


                <div style={{ width: '100%', padding: '20px', paddingLeft: '10px', display: 'flex' }}>
                    <input
                        type="text"
                        placeholder='Buscar casos'
                        value={busqueda}
                        onChange={handleSearchChange}
                        style={{ width: '220px', padding: '9px', border: 'none', background: '#F5F7FA', borderRadius: '20px', outline: 'none', paddingLeft: '30px' }}
                    />
                </div>


                {/* TABLA */}


                <div style={{ width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ height: '60px', }}>
                                <th style={{ padding: '10px' }}>Código</th>
                                <th style={{ padding: '10px' }}>Tipo del caso</th>
                                <th style={{ padding: '10px' }}>Fecha</th>
                                <th style={{ padding: '10px' }}>Nombre</th>
                                <th style={{ padding: '10px' }}>Cargo</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>

                                <th style={{ padding: '10px' }}>Lugar</th>
                                <th style={{ padding: '10px' }}>Descripción</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                                <th style={{ padding: '10px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usuariosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="10" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '150px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%' // Aumenta el alto para centrar mejor verticalmente
                                        }}>
                                            <img src="https://img.icons8.com/ios/100/000000/nothing-found.png" alt="No hay peticiones" style={{ marginBottom: '20px', opacity: 0.8 }} />
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay casos disponibles</span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vueve a intentarlo mas tarde.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (usuariosFiltrados.map((item, index) => {


                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            height: '60px',
                                            borderTop: 'solid 2px #f0f0f0',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: hoveredRow === index ? '#f0f0f0' : 'transparent', // Cambia el color cuando el mouse pasa
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onClick={() => Aceptarpeticion(item.id)}
                                        onMouseEnter={() => setHoveredRow(index)} // Cambiar estado al pasar el mouse
                                        onMouseLeave={() => setHoveredRow(null)}  // Limpiar el estado cuando el mouse se va
                                    >
                                        <td style={{ padding: '10px' }}>{item.codigo}</td>
                                        <td style={{ padding: '10px' }}>{item.nomTipoCaso}</td>
                                        <td style={{ padding: '10px' }}>{item.fecha}</td>
                                        <td style={{ padding: '10px' }}>{item.nombre}</td>
                                        <td style={{ padding: '10px' }}>{item.rolReporte}</td>
                                        <td style={{ padding: '10px' }}>{item.serialPc}</td>
                                        <td style={{ padding: '10px' }}>{item.ubicacion}</td>
                                        <td style={{ padding: '10px' }}>{item.descripcion}</td>
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                style={{
                                                    width: '120px',
                                                    padding: '8px',
                                                    backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                    color: getColor(item.color),
                                                    border: 'none',
                                                    borderRadius: '20px'
                                                }}
                                            >
                                                {item.estado}
                                            </button>
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                style={{
                                                    width: '120px',
                                                    padding: '8px',
                                                    background: '#1874B7',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Detener la propagación del evento
                                                    AbrirReportes(item.id);
                                                }}
                                            >
                                                Gestionar caso
                                            </button>
                                        </td>
                                    </tr>

                                );
                            }))}
                        </tbody>
                    </table>
                </div>

            </div>

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
