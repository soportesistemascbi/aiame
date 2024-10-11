import { useEffect, useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import Modal from '../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../Components/Alertas/alertaBuena.tsx'

export default function Tabla_Peticiones_Ingreso() {

    // Importamos useState y useEffect desde React
    const [usuarios, setUsuarios] = useState([]); // Inicializa el estado 'usuarios' como un array vacío
    const [loading, setLoading] = useState(false); // Inicializa el estado 'loading' como false
    const [usuario, setUsuario] = useState([]); // Estado para almacenar usuarios.
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
    // Función asíncrona para obtener datos
    const fetchData = async () => {
        setLoading(true); // Establece 'loading' a true para indicar que se está cargando

        try {
            // Realiza una solicitud HTTP a la API
            const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=8');
            const data = await response.json(); // Convierte la respuesta en formato JSON

            // Verifica si la respuesta contiene un objeto con "rp" igual a "no"
            if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                setUsuarios([]); // Si no hay casos, establece 'usuarios' como un array vacío
                setLoading(false); // Detiene la animación de carga
            } else {
                setUsuarios(data.rpta); // Si hay casos, establece 'usuarios' con los datos recibidos
                setLoading(false); // Detiene la animación de carga
            }
        } catch (error) {
            // Maneja errores en la solicitud
            console.error('Error al obtener casos:', error);
        }
    };

    // useEffect para llamar a fetchData cuando el componente se monta
    useEffect(() => {
        fetchData(); // Llama a la función fetchData
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    // Función para aceptar una petición
    async function Aceptarpeticion(id) {
        setLoading(true); // Establece 'loading' a true para indicar que se está cargando

        const estado = 1; // Define el estado para "aceptar"
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=9&id=${id}`; // URL para obtener componentes.
            const response = await fetch(url); // Obteniendo datos de componentes.
            const data1 = await response.json(); // Analizar la respuesta como JSON.

            if (data1.rpta && data1.rpta.length === 1 && data1.rpta[0].rp === "no") {
                setUsuario([]); // Limpiar componentes si no se encuentran.
                setLoading(false); // Detiene la animación de carga
            } else {
                setUsuario(data1.rpta); // Almacenar componentes en el estado.
                try {
                    // Construye la URL para la solicitud
                    const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
                    const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud GET
                    const data = await response.json(); // Convierte la respuesta en formato JSON

                    // Verifica si la respuesta indica que la operación fue exitosa
                    if (data.rp === 'si') {
                        const correo = await (data1.rpta[0].correo); // Obtener el ID del equipo del caso.
                        fetchData(); // Llama a fetchData para refrescar los datos
                        setMessage("Estado actualizado con éxito."); // Muestra un mensaje de éxito
                        setOpen(true);
                        setLoading(false); // Detiene la animación de carga


                        try {
                            // Realiza una solicitud GET a la API para enviar un correo
                            const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/peticionAceptado.php?&correo=${correo}`, {
                                method: 'GET', // Especifica que el método de la solicitud es GET
                            });


                            // Verifica si la respuesta de la solicitud es exitosa
                            if (!correorespuesta.ok) {
                                // Si la respuesta no es exitosa, lanza un error con el estado HTTP
                                throw new Error(`Error HTTP! Estado: ${correorespuesta.status}`);
                            }

                            // Convierte la respuesta en formato JSON
                            const correoRespuesta = await correorespuesta.json();


                            // Verifica el campo 'rp' en la respuesta para determinar el resultado
                            if (correoRespuesta.rp === "si") {
                                // Si 'rp' es "si", muestra un mensaje de éxito
                                setMessage("El correo se ha enviado con éxito al usuario correspondiente");
                                setOpen(true);
                            } else {
                                // Si 'rp' no es "si", muestra un mensaje de error indicando que el registro existe
                                setErrorMessage("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario.");
                                setIsOpen(true)
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la solicitud
                            setErrorMessage(`Ocurrió un error: ${error.message}`);
                            setIsOpen(true)
                        } finally {
                            // Detiene el loader siempre que termina la operación
                            setLoading(false);
                        }
                    } else {
                        setErrorMessage("No se pudo actualizar el estado."); // Muestra un mensaje de error
                        setIsOpen(true)
                        setLoading(false); // Detiene la animación de carga
                    }
                } catch (error) {
                    // Maneja errores en la solicitud
                    setErrorMessage("Error al actualizar estado:", error); // Muestra un mensaje de error
                    setIsOpen(true)
                    setLoading(false); // Detiene la animación de carga
                }
            }
        } catch (error) {
            console.log("Error al obtener componentes:", error); // Registrar errores si falla la obtención.
            setLoading(false); // Detiene la animación de carga
        }

    }

    // Función para rechazar una petición
    async function Rechazarpeticion(id) {
        setLoading(true); // Establece 'loading' a true para indicar que se está cargando

        const estado = 2; // Define el estado para "aceptar"
        try {
            const url = `https://instrudev.com/aiameapp/caso/webserviceapp.php?case=9&id=${id}`; // URL para obtener componentes.
            const response = await fetch(url); // Obteniendo datos de componentes.
            const data1 = await response.json(); // Analizar la respuesta como JSON.

            if (data1.rpta && data1.rpta.length === 1 && data1.rpta[0].rp === "no") {
                setUsuario([]); // Limpiar componentes si no se encuentran.
                setLoading(false); // Detiene la animación de carga
            } else {
                setUsuario(data1.rpta); // Almacenar componentes en el estado.
                try {
                    // Construye la URL para la solicitud
                    const url = `https://instrudev.com/aiameapp/caso/casos.php?case=6&id=${id}&estado=${estado}`;
                    const response = await fetch(url, { method: 'GET' }); // Realiza la solicitud GET
                    const data = await response.json(); // Convierte la respuesta en formato JSON

                    // Verifica si la respuesta indica que la operación fue exitosa
                    if (data.rp === 'si') {
                        const correo = await (data1.rpta[0].correo); // Obtener el ID del equipo del caso.
                        fetchData(); // Llama a fetchData para refrescar los datos
                        setMessage("Estado actualizado con éxito."); // Muestra un mensaje de éxito
                        setOpen(true);
                        setLoading(false); // Detiene la animación de carga


                        try {
                            // Realiza una solicitud GET a la API para enviar un correo
                            const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/peticionRechazo.php?&correo=${correo}`, {
                                method: 'GET', // Especifica que el método de la solicitud es GET
                            });

                            // Verifica si la respuesta de la solicitud es exitosa
                            if (!correorespuesta.ok) {
                                // Si la respuesta no es exitosa, lanza un error con el estado HTTP
                                throw new Error(`Error HTTP! Estado: ${correorespuesta.status}`);
                            }

                            // Convierte la respuesta en formato JSON
                            const correoRespuesta = await correorespuesta.json();

                            // Verifica el campo 'rp' en la respuesta para determinar el resultado
                            if (correoRespuesta.rp === "si") {
                                // Si 'rp' es "si", muestra un mensaje de éxito
                                setMessage("El correo se ha enviado con éxito al usuario correspondiente");
                                setOpen(true);
                            } else {
                                // Si 'rp' no es "si", muestra un mensaje de error indicando que el registro existe
                                setErrorMessage("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario.");
                                setIsOpen(true)
                            }
                        } catch (error) {
                            // Maneja cualquier error que ocurra durante la solicitud
                            setErrorMessage(`Ocurrió un error: ${error.message}`);
                            setIsOpen(true)
                        } finally {
                            // Detiene el loader siempre que termina la operación
                            setLoading(false);
                        }
                    } else {
                        setErrorMessage("No se pudo actualizar el estado."); // Muestra un mensaje de error
                        setIsOpen(true)
                        setLoading(false); // Detiene la animación de carga
                    }
                } catch (error) {
                    // Maneja errores en la solicitud
                    setErrorMessage("Error al actualizar estado:", error); // Muestra un mensaje de error
                    setIsOpen(true)
                    setLoading(false); // Detiene la animación de carga
                }
            }
        } catch (error) {
            console.log("Error al obtener componentes:", error); // Registrar errores si falla la obtención.
            setLoading(false); // Detiene la animación de carga
        }
    }


    return (
        <>
            {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}
            {isOpen && <Modal message={errorMessage} onClose={handleClose} />}
            {Open && <Modal1 message={Message} onClose={handleClose1} />}
            <div style={{
                width: 'calc(3em + 80vw)',
                height: '80%',
                background: 'white',
                boxShadow: '1px 1px 5px 1px #cccccc',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexDirection: 'column',
                position: 'fixed',
                bottom: 'calc(40px + (101vh - 100%))',
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
                                            marginTop: '130px',
                                            height: '100%'
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
        </>
    );
}
