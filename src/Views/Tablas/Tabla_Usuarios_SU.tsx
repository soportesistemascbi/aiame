import React, { useState, useEffect } from 'react';
import Basura from '../../Icon/Basura.svg'; // Asegúrate de que el icono existe
import Restaurar from '../../Icon/Enviar.svg'; // Icono de restaurar

export default function Tabla_Usuarios_SU() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    console.log(usuarios);

    // Función que obtiene los datos de los usuarios
    const fetchData = async () => {
        try {
            const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=9');
            const data = await response.json();

            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setUsuarios([]);
                setUsuariosFiltrados([]);
            } else {
                setUsuarios(data.rpta);
                setUsuariosFiltrados(data.rpta);
            }
        } catch (error) {
            console.error('Error al obtener casos:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Cargar los datos cuando se monta el componente
    }, []);

    useEffect(() => {
        const resultados = usuarios.filter(item => {
            const nombre = item.nombre ? item.nombre.toLowerCase() : '';
            const correo = item.correo ? item.correo.toLowerCase() : '';

            return nombre.includes(busqueda.toLowerCase()) || correo.includes(busqueda.toLowerCase());
        });

        setUsuariosFiltrados(resultados);
    }, [busqueda, usuarios]);

    function hexToRgba(hex, opacity) {
        if (!hex || hex.length < 6 || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
            return `rgba(0, 0, 0, ${opacity})`;
        }
        hex = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    const getColor = (color) => {
        if (!color || color.trim() === '') {
            return '#000000';
        }
        return color.startsWith('#') ? color : `#${color}`;
    };

    // Función para eliminar un usuario
    async function EliminarUsuarios(id) {
        const estado = 2;
        try {
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al actualizar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                alert('Estado actualizado con éxito.');
                fetchData(); // Recargar los datos después de eliminar
            } else {
                console.log("No se pudo actualizar el estado.");
            }
        } catch (error) {
            console.log("Error al eliminar usuario:", error);
        }
    }

    // Función para restaurar un usuario
    async function RestaurarUsuario(id) {
        const estado = 1;
        try {
            const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
            const response = await fetch(url, { method: 'GET' });
            if (!response.ok) {
                console.log("Error al restaurar el estado");
            }
            const data = await response.json();
            if (data.rp === 'si') {
                alert('Estado actualizado con éxito.');
                fetchData(); // Recargar los datos después de restaurar
            } else {
                console.log("No se pudo restaurar el usuario.");
            }
        } catch (error) {
            console.log("Error al restaurar usuario:", error);
        }
    }

    return (
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
                                        height: '300px' // Aumenta el alto para centrar mejor verticalmente
                                    }}>
                                        <img src="https://img.icons8.com/ios/100/000000/nothing-found.png" alt="No hay peticiones" style={{ marginBottom: '20px', opacity: 0.8 }} />
                                        <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>No hay usuarios disponibles</span>
                                        <span style={{ fontSize: '18px', color: '#777', marginTop: '10px' }}>Vuelve a intentarlo mas tarde.</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            usuariosFiltrados.map((item, index) => (
                                <tr key={index} style={{ height: '60px', borderTop: 'solid 2px #f0f0f0', textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
    );
}
