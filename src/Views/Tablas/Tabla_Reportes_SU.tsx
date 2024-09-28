import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
export default function Tabla_Reportes_SU() {

    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('https://instrudev.com/aiameapp/caso/webserviceapp.php?case=6');
                const data = await response.json();

                // Si la respuesta contiene [{"rp":"no"}], no hay casos
                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setUsuarios([]);
                    setLoading(false);
                } else {
                    setUsuarios(data.rpta);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener casos:', error);
            }
        };

        fetchData();
    }, []);


    const handleSearchChange = (event) => {
        setBusqueda(event.target.value);
    }

    const usuariosFiltrados = usuarios.filter(item =>
        item.nombreReporte.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.nombreSoporte.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.serialPc.toLowerCase().includes(busqueda.toLowerCase())
    );
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
                        placeholder='Busca por nombre o codigo'
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
                                <th style={{ padding: '10px', }}>Código</th>
                                <th style={{ padding: '10px', }}>Fecha</th>
                                <th style={{ padding: '10px', }}>Remitente</th>
                                <th style={{ padding: '10px', }}>Nombre del encargado</th>
                                <th style={{ padding: '10px', }}>Cargo del encargado</th>
                                <th style={{ padding: '10px' }}>Serial del pc</th>
                                <th style={{ padding: '10px', }}>Lugar</th>
                                <th style={{ padding: '10px', }}>Descripción</th>
                                <th style={{ padding: '10px', }}>Estado</th>

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
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay casos reportados disponibles</span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vueve a intentarlo mas tarde.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                usuariosFiltrados.map((item, index) => {


                                    return (
                                        <tr key={index} style={{ height: '60px', textAlign: 'center' }}>
                                            <td style={{ padding: '10px' }}>{item.codigo}</td>
                                            <td style={{ padding: '10px' }}>{item.fecha}</td>
                                            <td style={{ padding: '10px' }}>
                                                {item.nombreReporte}
                                            </td>
                                            <td style={{ padding: '10px' }}>{item.nombreSoporte}</td>
                                            <td style={{ padding: '10px' }}>{item.rolSoporte}</td>
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
                                                    }}>
                                                    {item.estado}
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

