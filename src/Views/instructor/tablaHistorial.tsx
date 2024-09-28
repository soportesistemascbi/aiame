import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

export default function tablaHistorial() {
    const [casos, setCasos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [casosFiltrados, setCasosFiltrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const id = localStorage.getItem('idUsuario');

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://instrudev.com/aiameapp/caso/webserviceapp.php?case=7&id=${id}`);
                const data = await response.json();

                // Si la respuesta contiene [{"rp":"no"}], no hay casos
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setCasos([]);
                    setLoading(false);
                    setCasosFiltrados([]);
                } else {
                    setCasos(data.rpta);
                    setCasosFiltrados(data.rpta); // Inicialmente muestra todos los casos
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener casos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);




    useEffect(() => {
        const resultados = casos.filter(item => {
            // Verificamos si item.id y item.nombreSoporte no están vacíos o indefinidos antes de aplicar toLowerCase()
            const id = item.id ? item.id.toLowerCase() : '';
            const nombreSoporte = item.nombreSoporte ? item.nombreSoporte.toLowerCase() : '';
            const serialPc = item.serialPc ? item.serialPc.toLowerCase() : '';

            // Filtramos los casos basándonos en la búsqueda
            return id.includes(busqueda.toLowerCase()) || nombreSoporte.includes(busqueda.toLowerCase()) || serialPc.includes(busqueda.toLowerCase());
        });

        setCasosFiltrados(resultados);
    }, [busqueda, casos]);

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
