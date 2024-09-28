import { useEffect, useState } from 'react'; // Importa hooks de React para manejo de estado y efectos
import { MoonLoader } from 'react-spinners'; // Importa un componente de carga

export default function tablaHistorial() { // Define el componente funcional
    const [casos, setCasos] = useState([]); // Estado para almacenar los casos obtenidos
    const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda
    const [casosFiltrados, setCasosFiltrados] = useState([]); // Estado para casos filtrados
    const [loading, setLoading] = useState(false); // Estado de carga
    const id = localStorage.getItem('idUsuario'); // Obtiene el ID de usuario del almacenamiento local

    useEffect(() => { // Hook para ejecutar efectos secundarios
        setLoading(true); // Activa el estado de carga
        const fetchData = async () => { // Función asíncrona para obtener datos
            try {
                // Realiza una solicitud a la API con el ID de usuario
                const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=7&id=${id}`);
                const data = await response.json(); // Convierte la respuesta a JSON

                // Verifica si la respuesta indica que no hay casos
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setCasos([]); // Establece casos como un array vacío
                    setLoading(false); // Desactiva el estado de carga
                    setCasosFiltrados([]); // Establece casos filtrados como un array vacío
                } else {
                    setCasos(data.rpta); // Almacena los casos obtenidos
                    setCasosFiltrados(data.rpta); // Muestra todos los casos inicialmente
                    setLoading(false); // Desactiva el estado de carga
                }
            } catch (error) { // Manejo de errores
                console.error('Error al obtener casos:', error); // Imprime el error en consola
                setLoading(false); // Desactiva el estado de carga
            }
        };

        fetchData(); // Llama a la función para obtener datos
    }, [id]); // Se ejecuta cuando el componente se monta o cuando cambia 'id'

    useEffect(() => { // Otro hook para filtrar los casos
        const resultados = casos.filter(item => { // Filtra los casos basados en la búsqueda
            // Verifica si id y nombreSoporte existen y aplica toLowerCase() para comparación
            const id = item.id ? item.id.toLowerCase() : '';
            const nombreSoporte = item.nombreSoporte ? item.nombreSoporte.toLowerCase() : '';
            const serialPc = item.serialPc ? item.serialPc.toLowerCase() : '';

            // Filtra según el término de búsqueda
            return id.includes(busqueda.toLowerCase()) ||
                nombreSoporte.includes(busqueda.toLowerCase()) ||
                serialPc.includes(busqueda.toLowerCase());
        });

        setCasosFiltrados(resultados); // Actualiza los casos filtrados con los resultados
    }, [busqueda, casos]); // Se ejecuta cuando cambia 'busqueda' o 'casos'

    function hexToRgba(hex, opacity) { // Función para convertir hex a RGBA
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
    return (
        <>
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
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <th style={{ padding: '10px' }}>Codigo del caso</th>
                                <th style={{ padding: '10px' }}>Tipo del caso</th>

                                <th style={{ padding: '10px' }}>Encargado</th>
                                <th style={{ padding: '10px' }}>Aula</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>
                                <th style={{ padding: '10px' }}>Fecha</th>
                                <th style={{ padding: '10px' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {casosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ padding: '40px', textAlign: 'center', verticalAlign: 'middle', width: '100%', height: '150px' }}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%', // Asegúrate de que ocupe todo el alto
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
                                        <td style={{ padding: '10px' }}>{item.ubicacion}</td>
                                        <td style={{ padding: '10px' }}>{item.serialPc}</td>
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
                                    </tr>
                                ))
                            )}


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
    );
}
