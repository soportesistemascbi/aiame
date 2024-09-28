import { useEffect, useState } from 'react';
import Flecha from './icon/Flecha.svg'
import PC from './icon/Pc.svg'
import Hola from './icon/icon.svg'
import reportes from './icon/Reportes.svg'
import linea from './icon/linea.svg'
import persona from './icon/Ppersona.svg'
import { MoonLoader } from 'react-spinners';

export default function Tabla_Equipos_SU() {

    // Modal que muestra la información única de cada equipo
    const [caracteristicas_pc, setcaracteristicas_pc] = useState(false);
    // Estado para controlar la visibilidad del modal de características del PC
    const [hoveredRow, setHoveredRow] = useState(null);
    // Estado para almacenar la fila actualmente en la que se está pasando el mouse
    const [busqueda, setBusqueda] = useState('');
    // Estado para almacenar el término de búsqueda
    const [loading, setLoading] = useState(false);
    // Estado para controlar si se está cargando información

    // Función para abrir o cerrar el modal de características
    const AbrirCaracteristicas = () => {
        setcaracteristicas_pc(!caracteristicas_pc);
    }

    // CONEXIÓN A BASE DE DATOS PARA MOSTRAR LOS EQUIPOS

    const [equipos, setEquipos] = useState([]);
    // Estado para almacenar la lista de equipos
    const [Componentes, setComponentes] = useState([]);
    // Estado para almacenar los componentes de un equipo
    const [info, setInflo] = useState([]);
    // Estado para almacenar información adicional
    const [caso, setCaso] = useState([]);
    // Estado para almacenar casos relacionados con los equipos
    const [noHayCasos, setNoHayCasos] = useState(false);
    // Estado para indicar si no hay casos disponibles

    // Función para obtener los datos de equipos desde la base de datos
    const fetchData = async () => {
        setLoading(true); // Indica que se está cargando información
        try {
            const response = await fetch('https://instrudev.com/aiameapp/equipos/equiposquery.php?case=1');
            const data = await response.json();

            // Si la respuesta contiene [{"rp":"no"}], no hay casos
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setEquipos([]); // Si no hay casos, establece la lista de equipos como vacía
                setLoading(false);
            } else {
                setEquipos(data.rpta); // Establece la lista de equipos con los datos recibidos
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener casos:', error);
            setLoading(false); // Detiene el estado de carga en caso de error
        }
    };

    // useEffect para ejecutar fetchData al montar el componente
    useEffect(() => {
        fetchData();
    }, []); // El array vacío significa que solo se ejecuta una vez al inicio

    // Maneja el cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        setBusqueda(event.target.value); // Actualiza el término de búsqueda
    }

    // Filtrar los equipos en función del término de búsqueda
    const equiposFiltrados = equipos.filter(item =>
        (item.placaPc && item.placaPc.toLowerCase().includes(busqueda.toLowerCase())) ||
        (item.serial && item.serial.toLowerCase().includes(busqueda.toLowerCase()))
    );

    // Función para convertir un color hexadecimal a RGBA
    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            // Retorna un color negro con la opacidad deseada como valor predeterminado
            return `rgba(0, 0, 0, ${opacity})`;
        }

        hex = hex.replace('#', ''); // Quita el símbolo '#' si está presente
        let r = parseInt(hex.substring(0, 2), 16); // Extrae el componente rojo
        let g = parseInt(hex.substring(2, 4), 16); // Extrae el componente verde
        let b = parseInt(hex.substring(4, 6), 16); // Extrae el componente azul
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Retorna el color en formato RGBA
    }

    // Función para obtener un color válido
    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000'; // Color negro predeterminado si no se proporciona un color
        }
        return color.startsWith('#') ? color : `#${color}`; // Asegura que el color tenga el formato adecuado
    };

    // Función para aceptar una petición y obtener datos del equipo
    async function Aceptarpeticion(id) {
        setLoading(true); // Indica que se está cargando información
        setcaracteristicas_pc(!caracteristicas_pc); // Alterna la visibilidad del modal
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=3&idEquipo=${id}`;
            const response = await fetch(url);
            const data1 = await response.json();
            if (data1.rpta && data1.rpta.length === 1 && data1.rpta[0].rp === "no") {
                setComponentes([]); // No hay componentes, establece como vacío
            } else {
                setComponentes(data1.rpta); // Establece la lista de componentes
            }
        } catch (error) {
            console.log("Error al obtener componentes:", error);
        }

        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data2 = await response.json();
            if (data2.rpta && data2.rpta.length === 1 && data2.rpta[0].rp === "no") {
                setInflo([]); // No hay información, establece como vacío
            } else {
                setInflo(data2.rpta); // Establece la información adicional
            }
        } catch (error) {
            console.log("Error al obtener información adicional:", error);
        }

        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=2&idEquipo=${id}`;
            const response = await fetch(url);
            const data3 = await response.json();

            if (data3.rpta && data3.rpta[0].rp === "no") {
                setLoading(false);
                setNoHayCasos(true); // Marca que no hay casos
            } else {
                setNoHayCasos(false); // Si hay casos, desactiva la bandera de "no hay casos"
                setLoading(false);
                setCaso(data3.rpta); // Establece la lista de casos
            }
        } catch (error) {
            setLoading(false);
            console.log("Error al obtener casos:", error);
        }
    }

    // Filtra los componentes de tipo 'MOUSE' y 'MONITOR'
    const componenteMouse = Componentes.filter(item => item.tipoComponente === 'MOUSE');
    const componenteMonitor = Componentes.filter(item => item.tipoComponente === 'MONITOR');

    // Función para eliminar un equipo
    async function EliminarEquipos(id) {
        setLoading(true); // Indica que se está cargando información
        const estado = 2; // Estado para indicar que el equipo está eliminado
        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=3&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al actualizar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData(); // Recarga los datos después de eliminar
                setLoading(false);
            } else {
                console.log("No se pudo actualizar el estado.");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error al eliminar usuario:", error);
            setLoading(false);
        }
    }

    // Función para restaurar un equipo
    async function RestaurarEquipos(id) {
        setLoading(true); // Indica que se está cargando información
        const estado = 1; // Estado para indicar que el equipo está restaurado
        try {
            const url = `https://instrudev.com/aiameapp/equipos/equiposquery.php?case=3&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al restaurar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData(); // Recarga los datos después de restaurar
                setLoading(false);
            } else {
                console.log("No se pudo restaurar el usuario.");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error al restaurar usuario:", error);
            setLoading(false);
        }
    }

    return (
        <>
            {/* Modal de características únicas de cada pc */}

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



            {/* Fin del modal */}


            <table
                style={{
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
                }}
            >

                <div style={{ width: '100%', padding: '20px', paddingLeft: '10px', display: 'flex' }}>
                    <input
                        type="text"
                        placeholder='Buscar Equipos'
                        value={busqueda}
                        onChange={handleSearchChange}
                        style={{ width: '220px', padding: '9px', border: 'none', background: '#F5F7FA', borderRadius: '20px 20px 20px 20px ', outline: 'none', paddingLeft: '30px' }}
                    />
                </div>


                {/* ENCABEZADO DE LA TABLA */}
                <div style={{ width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>

                                <th style={{ padding: '10px' }}>Modelo</th>
                                <th style={{ padding: '10px' }}>Marca</th>
                                <th style={{ padding: '10px' }}>Tipo</th>
                                <th style={{ padding: '10px' }}>Placa</th>
                                <th style={{ padding: '10px' }}>Aula</th>
                                <th style={{ padding: '10px' }}>Serial</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                                <th style={{ padding: '10px' }}>Opciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {equiposFiltrados.length === 0 ? (
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
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay equipos disponibles</span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vueve a intentarlo mas tarde.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                equiposFiltrados.map((item, index) => (
                                    <tr key={index} style={{ backgroundColor: hoveredRow === index ? '#f0f0f0' : 'transparent', textAlign: 'center' }}
                                        onClick={() => Aceptarpeticion(item.id)}
                                        onMouseEnter={() => setHoveredRow(index)} // Cambiar estado al pasar el mouse
                                        onMouseLeave={() => setHoveredRow(null)}  // Limpiar el estado cuando el mouse se va
                                    >

                                        <td style={{ padding: '10px' }}>{item.modelo}</td>
                                        <td style={{ padding: '10px' }}>{item.marca}</td>
                                        <td style={{ padding: '10px' }}>{item.tipo}</td>
                                        <td style={{ padding: '10px' }}>{item.placaPc}</td>
                                        <td style={{ padding: '10px' }}>{item.ubicacion}</td>
                                        <td style={{ padding: '10px' }}>{item.serialPc}</td>
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                style={{
                                                    width: '100px',
                                                    padding: '8px',
                                                    backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                    color: getColor(item.color),
                                                    border: 'none',
                                                    borderRadius: '10px'
                                                }}>{item.estado}
                                            </button>
                                        </td>
                                        <td style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                            {parseInt(item.idEstado) === 2 ? (
                                                <button onClick={(e) => {
                                                    e.stopPropagation(); // Detener la propagación del evento
                                                    RestaurarEquipos(item.id);
                                                }} style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    width: '90px',
                                                    padding: '10px 15px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'background-color 0.3s ease',

                                                }}>

                                                    Restaurar
                                                </button>
                                            ) : (
                                                <button onClick={(e) => {
                                                    e.stopPropagation(); // Detener la propagación del evento
                                                    EliminarEquipos(item.id);
                                                }} style={{
                                                    backgroundColor: '#F44336',
                                                    width: '90px',
                                                    color: 'white',
                                                    padding: '10px 20px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'background-color 0.3s ease',

                                                }}>
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
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

