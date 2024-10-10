import suma from '../../Views/Tablas/icon/suma.svg'; // Importa una imagen SVG
import { useEffect, useRef, useState } from 'react'; // Importa hooks de React
import "slick-carousel/slick/slick.css"; // Importa estilos para el carrusel
import "slick-carousel/slick/slick-theme.css"; // Importa estilos temáticos para el carrusel
import "./carrusel.css"; // Importa estilos personalizados para el carrusel
import { MoonLoader } from 'react-spinners'; // Importa un componente de carga
import Modal from '../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../Components/Alertas/alertaBuena.tsx'




export default function TablaInstructor() { // Define el componente funcional
    const [casos, setCasos] = useState([]); // Estado para almacenar casos
    const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda
    const [casosFiltrados, setCasosFiltrados] = useState([]); // Estado para casos filtrados
    const id = localStorage.getItem('idUsuario'); // Obtiene el ID de usuario del almacenamiento local
    const [loading, setLoading] = useState(false); // Estado de carga
    const [TipoCaso, setCategorias] = useState([]); // Estado para almacenar categorías de casos
    const [selectedCategorias, setSelectedCategorias] = useState([]); // Estado para categorías seleccionadas
    const [showCategories, setShowCategories] = useState(false); // Estado para mostrar/ocultar categorías
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]); // IDs de categorías seleccionadas
    const [showAlert_inicio, setShowAlert] = useState(false); // Estado para mostrar alerta
    const [Reporte, setReporte] = useState(false); // Estado para mostrar reporte
    const fileInputRef = useRef(null); // Referencia para el input de archivo
    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado

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


    const fetchCasos = async () => { // Función asíncrona para obtener casos
        setLoading(true); // Activa el estado de carga
        try {
            // Realiza una solicitud a la API con el ID de usuario
            const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=4&id=${id}`);
            const data = await response.json(); // Convierte la respuesta a JSON

            // Verifica si no hay casos
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setCasos([]); // Establece casos como un array vacío
                setCasosFiltrados([]); // Establece casos filtrados como un array vacío
                setLoading(false); // Desactiva el estado de carga
            } else {
                setCasos(data.rpta); // Almacena los casos obtenidos
                setCasosFiltrados(data.rpta); // Inicialmente muestra todos los casos
                setLoading(false); // Desactiva el estado de carga
            }
        } catch (error) { // Manejo de errores
            console.error('Error al obtener casos:', error); // Imprime el error en consola
            setLoading(false); // Desactiva el estado de carga
        }
    };
    useEffect(() => { // Hook para cargar datos al montar el componente
        fetchCasos(); // Llama a la función para obtener casos
    }, [id]); // Se ejecuta cuando el componente se monta o cuando cambia 'id'

    useEffect(() => { // Hook para filtrar los casos
        const resultados = casos.filter(item => { // Filtra los casos basados en la búsqueda
            const id = item.id ? item.id.toLowerCase() : ''; // Obtiene el ID en minúsculas
            const nombreSoporte = item.nombreSoporte ? item.nombreSoporte.toLowerCase() : ''; // Obtiene el nombre del soporte en minúsculas
            const SerialPc = item.serialPc ? item.serialPc.toLowerCase() : ''; // Obtiene el serial del PC en minúsculas

            // Filtra según el término de búsqueda
            return id.includes(busqueda.toLowerCase()) ||
                nombreSoporte.includes(busqueda.toLowerCase()) ||
                SerialPc.includes(busqueda.toLowerCase());
        });

        setCasosFiltrados(resultados); // Actualiza los casos filtrados con los resultados
    }, [busqueda, casos]); // Se ejecuta cuando cambia 'busqueda' o 'casos'

    function hexToRgba(hex, opacity) { // Función para convertir un color hex a RGBA
        // Verifica si el hex es válido
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            return `rgba(0, 0, 0, ${opacity})`; // Retorna negro por defecto con la opacidad especificada
        }
        hex = hex.replace('#', ''); // Elimina el símbolo '#' si está presente
        let r = parseInt(hex.substring(0, 2), 16); // Extrae el componente rojo
        let g = parseInt(hex.substring(2, 4), 16); // Extrae el componente verde
        let b = parseInt(hex.substring(4, 6), 16); // Extrae el componente azul
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Retorna el color en formato RGBA
    }

    const getColor = (color) => { // Función para obtener un color válido
        if (!color || color.trim() === '') { // Verifica si el color es válido
            return '#000000'; // Retorna negro como color por defecto
        }
        return color.startsWith('#') ? color : `#${color}`; // Retorna el color formateado
    };

    const carouselSettings = { // Configuraciones para el carrusel
        dots: true, // Muestra puntos de navegación
        infinite: false, // Si es 'true', el carrusel podría repetirse infinitamente
        speed: 500, // Velocidad de transición
        slidesToShow: 1, // Número de slides a mostrar
        slidesToScroll: 1, // Número de slides a desplazar
        arrows: true, // Muestra flechas de navegación
        autoplay: true, // Activa el autoplay
        autoplaySpeed: 5000, // Velocidad de autoplay
    };

    useEffect(() => { // Hook para cargar categorías al montar el componente
        fetchCategorias(); // Llama a la función para obtener categorías
    }, []);

    const fetchCategorias = () => { // Función para obtener categorías
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2') // Realiza una solicitud para obtener categorías
            .then(response => response.ok ? response.text() : Promise.reject('Error al obtener las categorías')) // Verifica la respuesta
            .then(text => { // Si la respuesta es correcta
                try {
                    const data = JSON.parse(text); // Intenta parsear la respuesta a JSON
                    setCategorias(data.rpta); // Almacena las categorías obtenidas
                } catch (error) { // Manejo de errores al parsear
                    console.error('Error al parsear JSON:', error); // Imprime el error en consola
                    console.error('Respuesta recibida:', text); // Imprime la respuesta recibida
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Manejo de errores en la solicitud
    };

    const handleCategoriaChange = (e) => { // Maneja el cambio en la selección de categorías
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtiene las opciones seleccionadas
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtiene los IDs de las opciones seleccionadas
        setSelectedCategorias(selectedOptions); // Actualiza las categorías seleccionadas
        setSelectedCategoriasIds(selectedOptionsIds); // Actualiza los IDs de categorías seleccionadas
    };

    const handleButtonClick = () => { // Maneja el clic en el botón para seleccionar archivo
        if (fileInputRef.current) { // Verifica si la referencia del input de archivo es válida
            fileInputRef.current.click(); // Dispara el clic en el input de archivo
        }
    };

    const handleFileChange = (e) => { // Maneja el cambio en el input de archivo
        setFile(e.target.files[0]); // Almacena el archivo seleccionado
    };

    const handleSubmit = async (e) => { // Maneja el envío del formulario
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setLoading(true); // Activa el estado de carga

        const dato = document.getElementById('serial_pc').value; // Obtiene el valor del serial del PC

        if (!dato) { // Verifica si se ingresó un serial
            setErrorMessage("Por favor ingrese el serial o la placa del equipo o componente "); // Alerta si falta el serial
            setIsOpen(true)
            setLoading(false); // Desactiva el estado de carga
            return; // Sale de la función
        }

        try {
            // Realiza una solicitud para verificar el serial
            const checkResponse = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=4&dato=${dato}`);
            if (!checkResponse.ok) { // Verifica si la respuesta es correcta
                throw new Error('Error en la respuesta del servidor'); // Lanza un error si la respuesta no es correcta
            }
            const checkData = await checkResponse.json(); // Convierte la respuesta a JSON

            if (checkData.rpta[0].rp === 'si') { // Si el serial existe
                const descripcion = document.getElementById('descripcionCaso').value; // Obtiene la descripción del caso
                const idUsuarioReporte = localStorage.getItem('idUsuario'); // Obtiene el ID del usuario que reporta
                const idEquipo = checkData.rpta[0].id; // Obtiene el ID del equipo
                const idLugar = checkData.rpta[0].idLugar; // Obtiene el ID del lugar
                const tipoCaso = selectedCategoriaIds[0] || ""; // Obtiene el tipo de caso seleccionado
                const estado = '1'; // Establece el estado

                // Verifica si faltan datos requeridos
                if (!tipoCaso || !idEquipo || !descripcion || !file) {
                    setErrorMessage("Faltan datos requeridos. Revise los datos que usted ha ingresado."); // Alerta si faltan datos
                    setIsOpen(true)
                    setLoading(false); // Desactiva el estado de carga
                    return; // Sale de la función
                }

                const formData = new FormData(); // Crea un objeto FormData para enviar los datos
                formData.append('case', '1'); // Agrega el caso al FormData
                formData.append('descripcion', descripcion); // Agrega la descripción
                formData.append('idUsuarioReporte', idUsuarioReporte); // Agrega el ID del usuario que reporta
                formData.append('idEquipo', idEquipo); // Agrega el ID del equipo
                formData.append('tipoCaso', tipoCaso); // Agrega el tipo de caso
                formData.append('idLugar', idLugar); // Agrega el ID del lugar
                formData.append('estado', estado); // Agrega el estado
                formData.append('urlArchivo', file); // Agrega el archivo

                try {
                    // Envía el reporte de caso
                    const response = await fetch('https://instrudev.com/aiameapp/caso/ReporteCasosWeb.php', {
                        method: 'POST', // Método de la solicitud
                        body: formData, // Cuerpo de la solicitud
                    });

                    const text = await response.text(); // Obtiene la respuesta como texto
                    try {
                        const data = JSON.parse(text); // Intenta parsear la respuesta a JSON
                        if (data.rpta[0].rp === 'si') { // Si el reporte fue exitoso
                            setMessage("Caso reportado con éxito."); // Alerta de éxito
                            setOpen(true)
                            AbrirCaracteristicas(); // Llama a la función para abrir características
                            const correo = localStorage.getItem('correo'); // Obtiene el correo del usuario
                            fetchCasos(); //recargamos la consulta

                            // Envía un correo de respuesta
                            const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/caso.php?correo=${correo}&descripcion=${descripcion}&codigo=${selectedCategorias}`, {
                                method: 'GET',
                            });

                            const correoRespuesta = await correorespuesta.json(); // Convierte la respuesta a JSON

                            // Verifica la respuesta del envío de correo
                            if (correoRespuesta.rp === "si") {
                                setMessage("El correo se ha enviado con éxito. Revise su bandeja de entrada."); // Alerta de éxito
                                setOpen(true)
                                setLoading(false); // Desactiva el estado de carga
                            } else {
                                setMessage("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario."); // Alerta de fallo en el envío
                                setOpen(true)
                                setLoading(false); // Desactiva el estado de carga
                            }
                            setSelectedCategorias([]); // Reinicia categorías seleccionadas
                            setSelectedCategoriasIds([]); // Reinicia IDs de categorías seleccionadas
                            setFile(null); // Reinicia el archivo
                        } else {
                            console.log("No se pudo subir el caso:", data.mensaje); // Imprime mensaje de error
                        }
                    } catch (error) {
                        console.error('Error al parsear JSON:', error); // Manejo de errores al parsear
                    }
                } catch (error) {
                    console.error("Error al subir el caso:", error); // Manejo de errores al enviar el caso
                }
            } else {
                setErrorMessage("El equipo no se encuentra")
                setIsOpen(true)
                setTimeout(() => setShowAlert(false), 3000); // Oculta la alerta después de 3 segundos
            }
        } catch (error) {
            console.error("Error al guardar el caso:", error); // Manejo de errores al guardar el caso
        } finally {
            setLoading(false); // Desactiva el estado de carga
        }
    };

    const AbrirCaracteristicas = () => { // Función para alternar el estado de Reporte
        setReporte(!Reporte); // Cambia el estado de Reporte
    };


    return (
        <>

        {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}

        {isOpen && <Modal message={errorMessage} onClose={handleClose}/>}
        {Open && <Modal1 message={Message} onClose={handleClose1}/>}


            

            {Reporte && (
                <div style={{
                    width: 'calc(3em + 80vw)',
                    height: '80%',
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
                    zIndex: '5',
                    borderCollapse: 'collapse',
                    maxWidth: '100vw',
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
                        <h1 style={{ color: '#1E90FF', marginBottom: '20px' }}>Reporte de Caso</h1>
                        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Tipo De Caso</label>
                                    <div style={{ width: '70%', position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder='Categorías'
                                            onFocus={() => setShowCategories(true)}
                                            readOnly
                                            value={selectedCategorias.join(', ')}
                                            style={{
                                                width: '100%', padding: '12px', marginBottom: '10px',
                                                borderRadius: '10px', outline: 'none', textAlign: 'center', border: '1px solid #ccc',
                                                cursor: 'pointer'
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
                                                    display: showCategories ? 'block' : 'none', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px'
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
                                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Serial PC</label>
                                    <input
                                        type="text"
                                        placeholder='SerialPc'
                                        style={{
                                            width: '70%', padding: '12px', marginBottom: '10px',
                                            borderRadius: '10px', outline: 'none', textAlign: 'center', border: '1px solid #ccc'
                                        }}
                                        id="serial_pc"
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Descripción</label>
                                <textarea
                                    id="descripcionCaso"
                                    style={{
                                        width: '84%', height: '200px', padding: '12px',
                                        borderRadius: '10px', marginBottom: '20px', border: '1px solid #ccc'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', color: '#1E90FF' }}>Adjuntar Imagen</h2>
                                <div style={{
                                    width: '100%', maxWidth: '350px', height: '200px', backgroundColor: '#f7f7f7',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc',
                                    marginBottom: '20px', borderRadius: '10px'
                                }}>
                                    {file ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Vista previa de la imagen"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
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
                                        padding: '10px 20px', backgroundColor: '#1E90FF', color: 'white',
                                        border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px',
                                        transition: 'background-color 0.3s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0a74d4'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E90FF'}
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
                        </form>
                    </div>
                </div>


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

                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '100px', cursor: 'pointer' }} onClick={AbrirCaracteristicas}>
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






                <div style={{ width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <th style={{ padding: '10px' }}>Codigo del caso</th>
                                <th style={{ padding: '10px' }}>Tipo del caso</th>

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
                                            marginTop: '130px',
                                            height: '100%'
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
                                        <td style={{ padding: '10px' }}>{item.codigo}</td>
                                        <td style={{ padding: '10px' }}>{item.descripcion}</td>

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
    );
}
