import { useEffect, useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';


export default function Tabla_Peticiones_Ingreso() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=8');
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
        setLoading(true); //COMIENZA LA ANIMACION DE CARGA 

        const estado = 1;
        try {
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData();
                alert("Estado actualizado con éxito.");
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            } else {
                alert("No se pudo actualizar el estado.");
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            }
        } catch (error) {
            alert("Error al actualizar estado:", error);
            setLoading(false); //DETIENE LA ANIMACION DE CARGA
        }
    }

    async function Rechazarpeticion(id) {
        setLoading(true); //COMIENZA LA ANIMACION DE CARGA 

        const estado = 2;
        try {
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (data.rp === 'si') {
                fetchData();
                alert("Estado actualizado con éxito.");
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            } else {
                alert("No se pudo actualizar el estado.");
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            }
        } catch (error) {
            alert("Error al actualizar estado:", error);
            setLoading(false); //DETIENE LA ANIMACION DE CARGA
        }
    }

    return (
        <div style={{
            width: 'calc(3em + 80vw)',
            height: '85%',
            background: 'white',
            boxShadow: '1px 1px 5px 1px #cccccc',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            position: 'fixed',
            bottom: '30px',
            left: '96%',  // Centramos la tabla en el eje horizontal

            transform: 'translateX(-98%) translateX(-4px)',  // Corremos 180px a la izquierda
            zIndex: '3',
            borderCollapse: 'collapse',
            maxWidth: '100vw',  // Evitar que la tabla exceda el ancho de la pantalla
        }}>

            {/* CONTENEDOR DEL INPUT DE BÚSQUEDA */}
            <div style={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '40px'
            }}>
                <input type="text" placeholder='Buscar peticiones'
                    style={{
                        width: '220px',
                        padding: '9px',
                        border: 'none',
                        background: '#F5F7FA',
                        borderRadius: '20px 20px 20px 20px',
                        paddingLeft: '40px'
                    }} />

            </div>

            {/* CONTENEDOR DE LA TABLA */}
            <div style={{
                width: '100%',
                height: '750px',
                overflowY: 'auto',
                overflowX: 'auto'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{
                            height: '60px',


                        }}>
                            <th style={{ padding: '10px' }}>Nombre Completo</th>
                            <th style={{ padding: '10px' }}>Cargo</th>
                            <th style={{ padding: '10px' }}>Correo electrónico</th>
                            <th style={{ padding: '10px', }}>Telefono</th>
                            <th style={{ padding: '10px', }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length === 0 ? (
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
                                        <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay peticiones de acceso</span>
                                        <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vuelve más tarde para ver nuevas solicitudes.</span>
                                    </div>
                                </td>
                            </tr>


                        ) : (
                            usuarios.map((item, index) => (
                                <tr key={index} style={{
                                    height: '60px',
                                    textAlign: 'center',
                                    borderTop: 'solid 2px #f0f0f0'
                                }}>
                                    <td style={{ padding: '10px' }}>{item.nombre}</td>
                                    <td style={{ padding: '10px' }}>{item.descripcion}</td>
                                    <td style={{ padding: '10px' }}>{item.correo}</td>
                                    <td style={{ padding: '10px' }}>
                                        {item.telefono}
                                    </td>
                                    <td style={{ padding: '10px' }}>
                                        <button onClick={() => Aceptarpeticion(item.id)}
                                            style={{
                                                width: '90px',
                                                height: '50px',
                                                padding: '9px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                background: '#096ECB',
                                                color: 'white',
                                                fontSize: '13px',
                                                marginRight: '5px',
                                                cursor: 'pointer'
                                            }}>Aceptar</button>
                                        <button onClick={() => Rechazarpeticion(item.id)}
                                            style={{
                                                width: '90px',
                                                height: '50px',
                                                padding: '9px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                background: 'red',
                                                color: 'white',
                                                fontSize: '13px',
                                                marginRight: '5px',
                                                cursor: 'pointer',
                                            }}>Rechazar</button>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
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
                    zIndex: 9999
                }}>
                    <MoonLoader
                        color="#096ECB"
                        loading={loading}
                        size={150}
                        speedMultiplier={1}

                    />
                </div>
            )}

        </div>
    );
}
