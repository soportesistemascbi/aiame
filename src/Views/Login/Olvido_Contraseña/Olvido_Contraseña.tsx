import './Olvido_Contraseña.css'
import '../../../Components/Inputs/Inputs.css'
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from '../../../Img/Logo.png';
import Correo from './OC_icon/Correo.svg'
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from "react-router-dom";
import { Cancelar } from '../../../Components/Botones/Botones';
import MoonLoader from 'react-spinners/MoonLoader';
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../../Components/Alertas/alertaBuena.tsx'



export default function Olvido_Contraseña() {

    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas
    const [loading, setLoading] = useState(false); // Estado para manejar la animación de carga

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
    

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        const correo = document.getElementById('name').value; // Obtiene el valor del input con ID 'name'

        // Expresión regular para validar el formato de correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo)) { // Verifica si el correo es válido
            setErrorMessage("Por favor ingresa un correo electrónico válido."); // Muestra alerta si el correo no es válido
            setIsOpen(true)
            return; // Termina la función si el correo no es válido
        }
    }

    // Función para enviar el correo de recuperación de contraseña
    const enviarCorreo = async () => {
        setLoading(true); // Inicia la animación de carga

        const correo = document.getElementById('name').value; // Obtiene el valor del input con ID 'name'
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo

        // Verifica si el correo es válido
        if (!emailPattern.test(correo)) {
            setErrorMessage("Por favor ingresa un correo electrónico válido."); // Muestra alerta si el correo no es válido
            setIsOpen(true)
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        console.log(correo); // Imprime el correo en la consola para depuración

        try {
            // Realiza una solicitud HTTP GET para enviar el correo
            const response = await fetch(`https://instrudev.com/aiameapp/correo/olvidoContraseña.php?case=1&correo=${correo}`, {
                method: 'GET', // Especifica el método HTTP
            });

            if (!response.ok) { // Verifica si la respuesta no es OK
                setLoading(false); // Detiene la animación de carga
                throw new Error(`Error HTTP: ${response.status}`); // Lanza un error si la respuesta no es válida
            }

            const data = await response.json(); // Convierte la respuesta en formato JSON


            localStorage.setItem('usuarios', data.rpta[0].id); // Almacena el ID del usuario en el almacenamiento local

            // Verifica si el envío del correo fue exitoso
            if (data.rp === 'si') {
                setMessage('Correo enviado con éxito'); // Muestra un mensaje de éxito
                setOpen(true)
                navigate('/Codigo_Vef'); // Navega a la ruta de verificación de código
                setLoading(false); // Detiene la animación de carga
            } else {
                setErrorMessage(data.mensaje); // Muestra el mensaje de error recibido del servidor
                setIsOpen(true)
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error); // Imprime el error en la consola
            setErrorMessage('Ocurrió un error al procesar la solicitud.'); // Muestra un mensaje de error al usuario
            setIsOpen(true)
            setLoading(false); // Detiene la animación de carga
        }
    };


    return (
        <>

        {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}

        {isOpen && <Modal message={errorMessage} onClose={handleClose}/>}
        {Open && <Modal1 message={Message} onClose={handleClose1}/>}


            <div className="fondo1">
                <div className="container"
                    style={{
                        width: 'calc(20em + 10vw)', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', textAlign: 'center',
                        flexDirection: 'column',

                    }}>
                    <img src={Logo}
                        style={{
                            width: '100px', top: '0', left: '0%',
                            position: 'fixed', zIndex: '1'
                        }} />
                    <h1
                        style={{
                            color: '#096ECB',
                            fontFamily: '"fredoka",sans-serif',
                            fontOpticalSizing: 'auto',
                            fontWeight: '600',
                            fontVariationSettings: '"wdth" 100',
                            fontSize: '40px'
                        }}>¿Ólvidaste tu contraseña?</h1>
                    <div className="inputGroup">
                        <input type="e-mail" required autoComplete="off" id="name" onSubmit={handleSubmit} />
                        
                        <label htmlFor="name"> Correo electrónico</label>
                    </div>
                    <div
                        style={{
                            display: 'flex', gap: '1rem'
                        }}>
                        <Link to={'/'}>
                            <Cancelar />
                        </Link>

                        <button onClick={enviarCorreo}
                            style={{
                                width: '130px', height: '41px', padding: '12px',
                                borderRadius: '5px', border: 'none',
                                background: '#096ECB', color: 'white',
                                marginTop: '34px', cursor: 'pointer'
                            }}>Aceptar</button>

                    </div>




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
    )
}