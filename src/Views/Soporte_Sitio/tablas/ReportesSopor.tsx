import { useEffect, useRef, useState } from 'react'; // Importing React hooks for state and lifecycle management.
import MoonLoader from 'react-spinners/MoonLoader'; // Importing a loading spinner component.
import Flecha from '../../Tablas/icon/Flecha.svg'; // Importing an icon.
import reportes from '../../Tablas/icon/Reportes.svg'; // Importing another icon.
import linea from '../../Tablas/icon/linea.svg'; // Importing another icon.
import persona from '../../Tablas/icon/Ppersona.svg'; // Importing another icon.
import PC from '../../Tablas/icon/Pc.svg'; // Importing another icon.
import Hola from '../../Tablas/icon/icon.svg'; // Importing another icon.

export default function ReportesSopor() { // Declaring the functional component.

    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false); // State for toggling PC characteristics visibility.
    const [hoveredRow, setHoveredRow] = useState(null); // State for tracking hovered row.
    const [Reportes, setReporetes] = useState(false); // State for toggling report visibility.
    const [usuarios, setUsuarios] = useState([]); // State for storing users.
    const [busqueda, setBusqueda] = useState(''); // State for search input.
    const [loading, setLoading] = useState(false); // State for loading status.
    const [Componentes, setComponentes] = useState([]); // State for storing components.
    const [info, setInflo] = useState([]); // State for storing additional info.
    const [caso, setCaso] = useState([]); // State for storing case data.
    const [noHayCasos, setNoHayCasos] = useState(false); // State for tracking if there are no cases.
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input element.
    const [TipoCaso, setCategorias] = useState([]); // State for storing case categories.
    const [TipoEstado, setEstado] = useState([]); // State for storing statuses.
    const [selectedEstado, setSelectedEstado] = useState([]); // State for selected statuses.
    const [selectedEstadoIds, setSelectedEstadoIds] = useState([]); // State for selected status IDs.
    const [selectedCategorias, setSelectedCategorias] = useState([]); // State for selected categories.
    const [showCategories, setShowCategories] = useState(false); // State for showing categories dropdown.
    const [showEstado, setShowEstado] = useState(false); // State for showing status dropdown.
    const [selectedCategoriaIds, setSelectedCategoriasIds] = useState([]); // State for selected category IDs.
    const [DatosCaso, setDatosCaso] = useState([]); // State for storing case data.
    const [idcaso, setIdCaso] = useState([]); // State for storing case ID.
    const [file, setFile] = useState(null); // State for storing uploaded file.
    const [CasoCaracteristicas, setDatosCasoCracteristicas] = useState([]); // State for storing case characteristics.

    const AbrirCaracteristicas = () => { // Function to toggle the visibility of PC characteristics.
        setcaracteristicas_pc(!caracteristicas_pc); // Toggle the state.
    }

    const AbrirReportes = async (id) => { // Function to toggle report visibility and fetch case data.
        setReporetes(!Reportes); // Toggle the report state.
        setIdCaso(id); // Set the case ID.

        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`; // URL to fetch case data.
            const response = await fetch(url); // Fetching data from the server.
            const data1 = await response.json(); // Parsing the response as JSON.
            setDatosCaso(data1.rpta); // Storing the response data in state.
        } catch (error) {
            console.log("Error al obtener componentes:", error); // Log error if fetching fails.
        }
    };

    useEffect(() => { // Hook to fetch categories on component mount.
        fetchCategorias(); // Call function to fetch categories.
    }, []);

    const fetchCategorias = () => { // Function to fetch case categories from the server.
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=2') // Fetching categories from the server.
            .then(response => { // Handling the response.
                if (!response.ok) { // Check if the response is okay.
                    throw new Error('Error al obtener las categorías'); // Throw an error if not.
                }
                return response.text(); // Return response as text.
            })
            .then(text => { // Handling the text response.
                try {
                    const data = JSON.parse(text); // Parse the text as JSON.
                    setCategorias(data.rpta); // Store the categories in state.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Log JSON parsing errors.
                    console.error('Respuesta recibida:', text); // Log the received response for debugging.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Log errors if fetching fails.
    };

    useEffect(() => { // Hook to fetch statuses on component mount.
        fetchEstados(); // Call function to fetch statuses.
    }, []);

    const fetchEstados = () => { // Function to fetch case statuses from the server.
        fetch('https://instrudev.com/aiameapp/caso/casos.php?case=7') // Fetching statuses from the server.
            .then(response => { // Handling the response.
                if (!response.ok) { // Check if the response is okay.
                    throw new Error('Error al obtener las categorías'); // Throw an error if not.
                }
                return response.text(); // Return response as text.
            })
            .then(text => { // Handling the text response.
                try {
                    const data = JSON.parse(text); // Parse the text as JSON.
                    setEstado(data.rpta); // Store the statuses in state.
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Log JSON parsing errors.
                    console.error('Respuesta recibida:', text); // Log the received response for debugging.
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error)); // Log errors if fetching fails.
    };

    const handleCategoriaChange = (e) => { // Function to handle category selection changes.
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Get selected category values.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Get selected category IDs.
        setSelectedCategorias(selectedOptions); // Update selected categories in state.
        setSelectedCategoriasIds(selectedOptionsIds); // Update selected category IDs in state.
    };

    const handleCategoriaChange2 = (e) => { // Function to handle status selection changes.
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Get selected status values.
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Get selected status IDs.
        setSelectedEstado(selectedOptions); // Update selected statuses in state.
        setSelectedEstadoIds(selectedOptionsIds); // Update selected status IDs in state.
    };

    const handleButtonClick = () => { // Function to handle button click for file input.
        if (fileInputRef.current) { // Check if the ref is set.
            fileInputRef.current.click(); // Trigger the file input click.
        }
    };

    const handleFileChange = (e) => { // Function to handle file input changes.
        setFile(e.target.files[0]); // Store the uploaded file in state.
    };

    const fetchData = async () => { // Function to fetch user cases from the server.
        setLoading(true); // Set loading state to true.
        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/casos.php?case=5'); // Fetching user cases.

            const data = await response.json(); // Parse response as JSON.

            // Check if there are no cases in the response.
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setUsuarios([]); // Clear users if no cases are found.
                setLoading(false); // Set loading state to false.
            } else {
                setUsuarios(data.rpta); // Store cases in state.
                setLoading(false); // Set loading state to false.
            }
        } catch (error) {
            console.error('Error al obtener casos:', error); // Log errors if fetching fails.
            setLoading(false); // Set loading state to false.
        }
    };

    useEffect(() => { // Hook to fetch user cases on component mount.
        fetchData(); // Call function to fetch cases.
    }, []);

    async function Aceptarpeticion(id) { // Function to accept a request and fetch associated data.
        setcaracteristicas_pc(!caracteristicas_pc); // Toggle visibility of PC characteristics.
        setLoading(true); // Set loading state to true.
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`; // URL to fetch case details.
            const response = await fetch(url); // Fetching case data.
            const data1 = await response.json(); // Parse response as JSON.
            const idEquipoCaso = await (data1.rpta[0].idEquipo); // Get the equipment ID from case data.
            setDatosCasoCracteristicas(data1.rpta); // Store case characteristics in state.

            // Fetch components related to the case.
            try {
                const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=3&idEquipo=${idEquipoCaso}`; // URL to fetch components.
                const response = await fetch(url); // Fetching components data.
                const data1 = await response.json(); // Parse response as JSON.
                if (data1.rpta && data1.rpta.length === 1 && data1.rpta[0].rp === "no") {
                    setComponentes([]); // Clear components if none found.
                } else {
                    setComponentes(data1.rpta); // Store components in state.
                }
            } catch (error) {
                console.log("Error al obtener componentes:", error); // Log errors if fetching fails.
            }

            // Fetch additional info related to the case.
            try {
                const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=2&idEquipo=${idEquipoCaso}`; // URL to fetch additional info.
                const response = await fetch(url); // Fetching additional info.
                const data2 = await response.json(); // Parse response as JSON.

                if (data2.rpta && data2.rpta.length === 1 && data2.rpta[0].rp === "no") {
                    setInflo([]); // Clear info if none found.
                } else {
                    setInflo(data2.rpta); // Store additional info in state.
                }
            } catch (error) {
                console.log("Error al obtener información adicional:", error); // Log errors if fetching fails.
            }

            // Fetch cases related to the equipment.
            try {
                const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=2&idEquipo=${idEquipoCaso}`; // URL to fetch equipment cases.
                const response = await fetch(url); // Fetching equipment cases.
                const data3 = await response.json(); // Parse response as JSON.

                if (data3.rpta && data3.rpta[0].rp === "no") {
                    setNoHayCasos(true); // Set no cases flag if none found.
                    setLoading(false); // Set loading state to false.
                } else {
                    setNoHayCasos(false); // Reset no cases flag if cases found.
                    setCaso(data3.rpta); // Store cases in state.
                    setLoading(false); // Set loading state to false.
                }
            } catch (error) {
                console.log("Error al obtener casos:", error); // Log errors if fetching fails.
                setLoading(false); // Set loading state to false.
            }
        } catch (error) {
            setLoading(false); // Set loading state to false on error.
            console.log("Error al obtener componentes:", error); // Log errors if fetching fails.
        }
    }

    const handleSearchChange = (event) => { // Function to handle search input changes.
        setBusqueda(event.target.value); // Update search input in state.
    }

    const usuariosFiltrados = usuarios.filter(item => // Filtering users based on search input.
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || // Filter by name.
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) || // Filter by code.
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase()) // Filter by serial number.
    );

    function hexToRgba(hex, opacity) { // Function to convert HEX color to RGBA.
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) { // Check for valid HEX format.
            return `rgba(0, 0, 0, ${opacity})`; // Return black color if invalid.
        }

        hex = hex.replace('#', ''); // Remove '#' from HEX.
        let r = parseInt(hex.substring(0, 2), 16); // Get red component.
        let g = parseInt(hex.substring(2, 4), 16); // Get green component.
        let b = parseInt(hex.substring(4, 6), 16); // Get blue component.
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Return RGBA string.
    }

    const getColor = (color) => { // Function to ensure a valid color value.
        if (!color || color.trim() === '') { // Check if color is empty.
            return '#000000'; // Return black as default.
        }
        return color.startsWith('#') ? color : `#${color}`; // Return color with '#' if not present.
    };

    const handleSubmitDetalle = async (e) => { // Function to handle form submission.
        e.preventDefault(); // Prevent default form submission behavior.
        setLoading(true); // Set loading state to true.

        const id = DatosCaso[0].idEquipo; // Get equipment ID from case data.
        const idCaso = idcaso; // Get case ID from state.
        const observacion = document.getElementById('descripcionCaso').value; // Get observation input value.
        const idUsuarioSoporte = localStorage.getItem('idUsuario'); // Get user ID from local storage.
        const tipoCaso = selectedCategoriaIds; // Get selected case types from state.
        const estado = selectedEstadoIds; // Get selected statuses from state.

        // Validations
        if (!observacion) { // Check if observation is empty.
            alert('No ha puesto una descripcion'); // Alert user to provide description.
            setLoading(false); // Set loading state to false.
            return; // Exit function.
        }
        if (!file) { // Check if file is not provided.
            alert('No ha puesto una imagen'); // Alert user to provide an image.
            setLoading(false); // Set loading state to false.
            return; // Exit function.
        }
        if (!tipoCaso) { // Check if case type is not selected.
            alert('No ha puesto un tipo de caso'); // Alert user to select a case type.
            setLoading(false); // Set loading state to false.
            return; // Exit function.
        }
        if (!estado) { // Check if status is not selected.
            alert('No ha puesto un estado para el caso'); // Alert user to select a status.
            setLoading(false); // Set loading state to false.
            return; // Exit function.
        }
        if (!id) { // Check if equipment ID is not available.
            alert('No ha puesto un equipo para el caso'); // Alert user to provide an equipment ID.
            setLoading(false); // Set loading state to false.
            return; // Exit function.
        }

        const formData = new FormData(); // Create a new FormData object to send form data.
        formData.append('case', '2'); // Append case type to form data.
        formData.append('idCaso', idCaso); // Append case ID to form data.
        formData.append('observacion', observacion); // Append observation to form data.
        formData.append('idEquipo', id); // Append equipment ID to form data.
        formData.append('idUsuarioSoporte', idUsuarioSoporte!); // Append user ID to form data.
        formData.append('tipoCaso', tipoCaso); // Append case types to form data.
        if (file) { // Check if a file is selected.
            formData.append('urlArchivo', file); // Append file to form data.
        }

        try {
            const response = await fetch('https://instrudev.com/aiameapp/caso/ReporteCasosWeb.php', { // Sending form data to server.
                method: 'POST', // Using POST method.
                body: formData, // Sending the form data.
            });

            if (!response.ok) { // Check if the response is okay.
                throw new Error('Error en la respuesta del servidor'); // Throw an error if not.
            }

            const text = await response.text(); // Parse response as text.
            let data; // Variable to store parsed data.

            try {
                data = JSON.parse(text); // Parse text as JSON.
            } catch (jsonError) {
                console.error('Error al parsear JSON:', jsonError); // Log JSON parsing errors.
                setLoading(false); // Set loading state to false.
                return; // Exit function.
            }

            if (!data) { // Check if data is empty.
                console.error('La respuesta del servidor está vacía'); // Log empty response.
                setLoading(false); // Set loading state to false.
                return; // Exit function.
            }

            if (data.rpta[0].rp === 'si') { // Check if the response indicates success.
                try {
                    const checkResponse = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=8&id=${idCaso}&estado=${estado}&idUsuarioSoporte=${idUsuarioSoporte}`); // Check case status.
                    if (!checkResponse.ok) { // Check if the response is okay.
                        throw new Error('Error en la respuesta del servidor'); // Throw an error if not.
                    }

                    const checkData = await checkResponse.json(); // Parse response as JSON.

                    if (checkData.rp === 'si') { // Check if the response indicates success.
                        fetchData(); // Fetch updated data.
                        AbrirReportes(false); // Close reports.
                        setLoading(false); // Set loading state to false.
                        setSelectedEstado([]); // Clear selected status.
                        setSelectedEstadoIds([]); // Clear selected status IDs.
                        setSelectedCategorias([]); // Clear selected categories.
                        setSelectedCategoriasIds([]); // Clear selected category IDs.
                        setFile(null); // Clear selected file.
                        alert("Caso reportado con éxito."); // Alert user of success.
                    } else {
                        alert('Error al guardar el caso'); // Alert user if saving the case fails.
                    }
                } catch (error) {
                    console.error("Error al guardar el caso:", error); // Log errors if saving fails.
                } finally {
                    setLoading(false); // Set loading state to false after attempt.
                }
            } else {
                console.log("No se pudo subir el caso:", data.mensaje); // Log case submission errors.
                setLoading(false); // Set loading state to false.
            }
        } catch (error) {
            console.error("Error al subir el caso:", error); // Log errors if submission fails.
            setLoading(false); // Set loading state to false.
        }
    };



    return (

        <>


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
                                        margin: '10px'
                                    }}>
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
                                        margin: '10px'
                                    }}>
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
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '300px' // Aumenta el alto para centrar mejor verticalmente
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
