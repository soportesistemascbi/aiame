import { useEffect, useRef, useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import Flecha from '../../Tablas/icon/Flecha.svg'
import reportes from '../../Tablas/icon/Reportes.svg'
import linea from '../../Tablas/icon/linea.svg'
import persona from '../../Tablas/icon/Ppersona.svg'
import PC from '../../Tablas/icon/Pc.svg'
import Hola from '../../Tablas/icon/icon.svg'

export default function ReportesSopor() {

    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [Reportes, setReporetes] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    const [Componentes, setComponentes] = useState([]);
    const [info, setInflo] = useState([]);
    const [caso, setCaso] = useState([]);
    const [noHayCasos, setNoHayCasos] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
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
    }

    const AbrirReportes = async (id) => {
        setReporetes(!Reportes);
        setIdCaso(id);
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=8&id=${id}`;
            const response = await fetch(url);
            const data1 = await response.json();
            setDatosCaso(data1.rpta);
        } catch (error) {
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
                } catch (error) {
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
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                    console.error('Respuesta recibida:', text);
                }
            })
            .catch(error => console.error('Error al obtener las categorías:', error));
    };


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

            } else {
                setUsuarios(data.rpta);

            }
        } catch (error) {
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
        } catch (error) {
            console.log("Error al obtener componentes:", error);
        }

        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data2 = await response.json();
            setInflo(data2.rpta);
        } catch (error) {
            console.log("Error al obtener información adicional:", error);
        }

        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data3 = await response.json();

            if (data3.rpta && data3.rpta[0].rp === "no") {
                setNoHayCasos(true); // Actualiza el estado si no hay casos
            } else {
                setNoHayCasos(false); // Si hay casos, desactiva la bandera de "no hay casos"
                setCaso(data3.rpta);
            }
        } catch (error) {
            console.log("Error al obtener casos:", error);
        }
    }



    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    }

    const usuariosFiltrados = usuarios.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase())
    );


    const componenteMouse = Componentes.filter(item => item.tipoComponente === 'MOUSE');
    const componenteMonitor = Componentes.filter(item => item.tipoComponente === 'MONITOR');

    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            // Si hex es vacío, no tiene el formato adecuado, o no tiene el tamaño adecuado
            return `rgba(0, 0, 0, ${opacity})`;  // Retorna un color negro con la opacidad deseada como valor predeterminado
        }

        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000';  // Color negro predeterminado
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


            {caracteristicas_pc && (
                <div
                    style={{
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


                    }}
                >


                    <div
                        style={{
                            width: 'auto',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                        }}>

                        <img src={Flecha} onClick={AbrirCaracteristicas}
                            style={{
                                marginLeft: '25px',
                                marginTop: '10px',
                                cursor: 'pointer',
                            }} />
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflowY: 'auto', // Permite el desplazamiento vertical
                        }}>
                        <div
                            style={{
                                width: '90%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                padding: '10px',
                                boxSizing: 'border-box',
                            }}>

                            {/* Contenedor de componentes */}
                            <div
                                style={{
                                    width: 'calc(100% - 360px)', // Ajusta el ancho para dejar espacio para el banner lateral derecho
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                }}>
                                <div
                                    style={{
                                        width: '100%',
                                        flex: '1', // Permite que el contenedor de información use el espacio restante
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            marginBottom: '1rem',
                                        }}>
                                        {info.length === 0 ? (
                                            <p>No hay información disponible.</p>
                                        ) : (
                                            info.map((item, index) => (
                                                <div key={index}
                                                    style={{
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
                                                    }}>
                                                    <img src={PC}
                                                        style={{
                                                            width: '60px',
                                                            marginBottom: '10px',
                                                        }} />
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '15px' }}> <b style={{ marginRight: '10px' }}>Nombre:</b> <p style={{ margin: '0' }}>{item.modelo}</p></div>
                                                            <div ><b >Tipo de equipo:</b> <p style={{ margin: '0' }}>{item.tipo}</p></div></div>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row' }} ><b style={{ marginRight: '10px' }}>Marca:</b> <p style={{ margin: '0' }}>{item.marca}</p></div>
                                                        </div>
                                                    </div>
                                                    <img src={Hola}
                                                        style={{
                                                            width: '60px',
                                                            marginTop: '10px',
                                                        }} />
                                                </div>
                                            ))
                                        )}

                                        <div
                                            style={{
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
                                            }}>
                                            {componenteMonitor.length === 0 ? (
                                                <p>No hay monitores disponibles.</p>
                                            ) : (
                                                componenteMonitor.map((item, index) => (
                                                    <div key={index}>
                                                        <img src={item.urlIcon}
                                                            style={{
                                                                width: '100px',
                                                                marginBottom: '10px',
                                                            }} />
                                                        <div>
                                                            <b>{item.tipoComponente}</b>
                                                            <p>Serial monitor</p>
                                                        </div>
                                                        <p>{item.serial}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div
                                            style={{
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
                                            }}>
                                            {componenteMouse.length === 0 ? (
                                                <p>No hay ratones disponibles.</p>
                                            ) : (
                                                componenteMouse.map((item, index) => (
                                                    <div key={index}>
                                                        <img src={item.urlIcon}
                                                            style={{
                                                                width: '100px',
                                                                marginBottom: '10px',
                                                            }} />
                                                        <div>
                                                            <b>{item.tipoComponente}</b>
                                                            <p>Serial mouse</p>
                                                        </div>
                                                        <p>{item.serial}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Registro de reportes */}
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '50%',
                                            maxWidth: '922px',
                                            background: 'white',
                                            borderRadius: '10px',
                                            boxShadow: '1px 1px 5px #d4d4d4',
                                            padding: '10px',
                                            boxSizing: 'border-box',
                                            marginTop: '1rem',
                                        }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <img src={reportes}
                                                style={{
                                                    width: '50px',
                                                    marginRight: '10px',
                                                }} />
                                            <p>Registro de reportes</p>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    style={{
                                                        padding: '8px',
                                                        background: '#E8F0FF',
                                                        color: 'black',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                    }}>Mes</button>
                                                <img src={linea}
                                                    style={{
                                                        width: '10px',
                                                    }} />
                                                <button
                                                    style={{
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
                                                <div
                                                    style={{
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
                                                    }}>
                                                    <p>No hay casos disponibles.</p>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        padding: '10px',
                                                        boxSizing: 'border-box',
                                                        overflowY: 'auto',
                                                        maxHeight: '350px',
                                                    }}>
                                                    {caso.map((item, index) => {
                                                        const color = item.color && item.color.startsWith('#') ? item.color : `#${item.color || '000000'}`;
                                                        const backgroundColor = hexToRgba(color, 0.4);

                                                        return (
                                                            <div key={index}
                                                                style={{
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
                                                                        <img src={persona}
                                                                            style={{
                                                                                width: '30px',
                                                                            }} />
                                                                        <p>{item.nombreSoporte}</p>
                                                                    </div>

                                                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'start' }}>
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
                                                                    <button
                                                                        style={{
                                                                            width: '120px', padding: '8px',
                                                                            backgroundColor: backgroundColor,
                                                                            color: color.startsWith('#') ? color : `#${color}`,
                                                                            border: 'none', borderRadius: '20px'
                                                                        }}
                                                                    >
                                                                        {item.estado}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Banner lateral derecho */}
                            <div
                                style={{
                                    flex: '0 0 350px',
                                    maxWidth: '350px',
                                    minWidth: '300px',
                                    background: 'white',
                                    borderRadius: '10px',
                                    boxShadow: '1px 1px 5px #d4d4d4',
                                    padding: '10px',
                                    boxSizing: 'border-box',
                                }}>
                                <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '10px', marginBottom: '10px' }}>
                                    Otras características
                                </div>

                                <div
                                    style={{
                                        maxHeight: 'calc(100% - 40px)', // Ajusta la altura máxima para permitir espacio para el título
                                        overflowY: 'auto', // Permite el desplazamiento vertical
                                    }}>
                                    {Componentes.length === 0 ? (
                                        <p>No hay componentes adicionales disponibles.</p>
                                    ) : (
                                        Componentes.map((item, index) => (
                                            <div key={index}
                                                style={{
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
                                                }}>
                                                <img src={item.urlIcon}
                                                    style={{
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
                                <th style={{ padding: '10px', minWidth: '100px' }}>Código</th>
                                <th style={{ padding: '10px', minWidth: '150px' }}>Fecha</th>
                                <th style={{ padding: '10px', minWidth: '200px' }}>Nombre</th>
                                <th style={{ padding: '10px', minWidth: '150px' }}>Cargo</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>

                                <th style={{ padding: '10px', minWidth: '150px' }}>Lugar</th>
                                <th style={{ padding: '10px', minWidth: '250px' }}>Descripción</th>
                                <th style={{ padding: '10px', minWidth: '100px' }}>Estado</th>
                                <th style={{ padding: '10px', minWidth: '100px' }}>Acciones</th>
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
                                    onClick={() => Aceptarpeticion(item.idEquipo)}
                                    onMouseEnter={() => setHoveredRow(index)} // Cambiar estado al pasar el mouse
                                    onMouseLeave={() => setHoveredRow(null)}  // Limpiar el estado cuando el mouse se va
                                  >
                                    <td style={{ padding: '10px' }}>{item.codigo}</td>
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
