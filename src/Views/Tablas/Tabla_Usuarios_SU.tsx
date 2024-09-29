import React, { useState, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

export default function Tabla_Usuarios_SU() {
    // Inicializa los estados necesarios
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
    const [busqueda, setBusqueda] = useState(''); // Estado para almacenar el término de búsqueda
    const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]); // Estado para almacenar los usuarios filtrados
    console.log(usuarios); // Imprime la lista de usuarios en la consola para depuración

    // Función que obtiene los datos de los usuarios
    const fetchData = async () => {
        setLoading(true); // Establece 'loading' a true para indicar que se está cargando
        try {
            // Realiza una solicitud HTTP a la API para obtener usuarios
            const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=9');
            const data = await response.json(); // Convierte la respuesta en formato JSON

            // Verifica si la respuesta contiene un objeto con "rp" igual a "no"
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setUsuarios([]); // Si no hay usuarios, establece 'usuarios' como un array vacío
                setLoading(false); // Detiene la animación de carga
                setUsuariosFiltrados([]); // Asegura que 'usuariosFiltrados' también esté vacío
            } else {
                setUsuarios(data.rpta); // Si hay usuarios, establece 'usuarios' con los datos recibidos
                setLoading(false); // Detiene la animación de carga
                setUsuariosFiltrados(data.rpta); // Inicializa 'usuariosFiltrados' con los datos de usuarios
            }
        } catch (error) {
            // Maneja errores en la solicitud
            console.error('Error al obtener casos:', error);
            setLoading(false); // Detiene la animación de carga en caso de error
        }
    };

    // useEffect para cargar datos cuando el componente se monta
    useEffect(() => {
        fetchData(); // Llama a la función fetchData
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    // useEffect para filtrar usuarios cuando cambian 'busqueda' o 'usuarios'
    useEffect(() => {
        const resultados = usuarios.filter(item => {
            const nombre = item.nombre ? item.nombre.toLowerCase() : ''; // Obtiene el nombre en minúsculas
            const correo = item.correo ? item.correo.toLowerCase() : ''; // Obtiene el correo en minúsculas

            // Filtra los usuarios que coincidan con el término de búsqueda en nombre o correo
            return nombre.includes(busqueda.toLowerCase()) || correo.includes(busqueda.toLowerCase());
        });

        setUsuariosFiltrados(resultados); // Actualiza el estado 'usuariosFiltrados' con los resultados
    }, [busqueda, usuarios]); // Dependencias para ejecutar el efecto

    // Función para convertir un color hexadecimal a formato RGBA
    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            return `rgba(0, 0, 0, ${opacity})`; // Retorna un color negro si el formato no es válido
        }
        hex = hex.replace('#', ''); // Elimina el carácter '#' si está presente
        let r = parseInt(hex.substring(0, 2), 16); // Extrae el valor rojo
        let g = parseInt(hex.substring(2, 4), 16); // Extrae el valor verde
        let b = parseInt(hex.substring(4, 6), 16); // Extrae el valor azul
        return `rgba(${r}, ${g}, ${b}, ${opacity})`; // Retorna el color en formato RGBA
    }

    // Función para obtener un color válido
    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000'; // Color negro predeterminado
        }
        return color.startsWith('#') ? color : `#${color}`; // Agrega '#' si el color no lo tiene
    };

    // Función para eliminar un usuario
    async function EliminarUsuarios(id) {
        const estado = 2; // Define el estado para "eliminar"
        try {
            // Construye la URL para la solicitud de eliminación
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud GET
            if (!response.ok) {
                console.log("Error al actualizar el estado"); // Maneja errores en la respuesta
            }
            const data = await response.json(); // Convierte la respuesta en formato JSON
            if (data.rp === 'si') {
                alert('Estado actualizado con éxito.'); // Muestra un mensaje de éxito
                fetchData(); // Recarga los datos después de eliminar
            } else {
                console.log("No se pudo actualizar el estado."); // Muestra un mensaje de error
            }
        } catch (error) {
            console.log("Error al eliminar usuario:", error); // Maneja errores en la solicitud
        }
    }

    // Función para restaurar un usuario
    async function RestaurarUsuario(id) {
        const estado = 1; // Define el estado para "restaurar"
        try {
            // Construye la URL para la solicitud de restauración
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud GET
            if (!response.ok) {
                console.log("Error al restaurar el estado"); // Maneja errores en la respuesta
            }
            const data = await response.json(); // Convierte la respuesta en formato JSON
            if (data.rp === 'si') {
                alert('Estado actualizado con éxito.'); // Muestra un mensaje de éxito
                fetchData(); // Recarga los datos después de restaurar
            } else {
                console.log("No se pudo restaurar el usuario."); // Muestra un mensaje de error
            }
        } catch (error) {
            console.log("Error al restaurar usuario:", error); // Maneja errores en la solicitud
        }
    }


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
                left: '96%',
                transform: 'translateX(-98%) translateX(-4px)',
                zIndex: '3'
            }}>
                <div style={{ width: '100%', padding: '20px', paddingLeft: '10px', display: 'flex' }}>
                    <input
                        type="text"
                        placeholder='Buscar Usuarios'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{
                            width: '220px', padding: '9px', border: 'none',
                            background: '#F5F7FA', borderRadius: '20px', outline: 'none',
                            paddingLeft: '30px'
                        }}
                    />
                </div>

                <div style={{ width: '100%', height: '650px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ height: '60px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <th style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Nombre completo</th>
                                <th style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Correo</th>
                                <th style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cargo</th>
                                <th style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Estado</th>
                                <th style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Opciones</th>
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
                                            marginTop: '130px',
                                            height: '100%'
                                        }}>
                                            <img src="https://img.icons8.com/ios/100/000000/nothing-found.png" alt="No hay peticiones" style={{ marginBottom: '20px', opacity: 0.8 }} />
                                            <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay usuarios disponibles</span>
                                            <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vuelve a intentarlo mas tarde.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                usuariosFiltrados.map((item, index) => (
                                    <tr key={index} style={{ height: '60px', textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <td style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.nombre}</td>
                                        <td style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.correo}</td>
                                        <td style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.rol}</td>
                                        <td style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <button
                                                style={{
                                                    width: '120px', padding: '8px',
                                                    backgroundColor: hexToRgba(getColor(item.color), 0.4),
                                                    color: getColor(item.color),
                                                    border: 'none', borderRadius: '20px'
                                                }}
                                            >
                                                {item.nombreEs}
                                            </button>
                                        </td>
                                        <td style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {parseInt(item.estado) === 2 ? (
                                                <button onClick={() => RestaurarUsuario(item.id)} style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    width: '90px',
                                                    padding: '10px 20px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'background-color 0.3s ease'
                                                }}>
                                                    Restaurar
                                                </button>
                                            ) : (
                                                <button onClick={() => EliminarUsuarios(item.id)} style={{
                                                    backgroundColor: '#F44336',
                                                    color: 'white',
                                                    width: '90px',
                                                    padding: '10px 20px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'background-color 0.3s ease'
                                                }}>
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
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
    );
}
