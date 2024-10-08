import './Codigo_vef.css'
import '../../../Components/Inputs/Inputs.css';
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from '../../../Img/Logo.png';
import Seguridad from './CV_icon/Seguridad.svg'
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from 'react-router-dom';
import { Aceptar, Cancelar } from '../../../Components/Botones/Botones';
import MoonLoader from 'react-spinners/MoonLoader';
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../../Components/Alertas/alertaBuena.tsx'





export default function Codigo_Vef() {

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

    // Función para verificar el código ingresado
    const verificarCodigo = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setLoading(true); // Establece 'loading' a true para iniciar la animación de carga

        const codigo = document.getElementById('name').value; // Obtiene el valor del input con ID 'name'

        try {
            // Realiza una solicitud HTTP GET para verificar el código
            const response = await fetch(`https://instrudev.com/aiameapp/correo/olvidoContraseña.php?case=2&codigo=${encodeURIComponent(codigo)}`, {
                method: 'GET', // Especifica el método HTTP
            });

            if (!response.ok) { // Verifica si la respuesta no es OK
                setLoading(false); // Detiene la animación de carga
                throw new Error(`Error HTTP: ${response.status}`); // Lanza un error si la respuesta no es válida
            }

            const data = await response.json(); // Convierte la respuesta en formato JSON
            console.log("Respuesta del servidor:", data); // Imprime la respuesta del servidor en la consola

            if (data.rp === 'si') { // Verifica si el código fue verificado con éxito
                setMessage('Código verificado con éxito'); // Muestra un mensaje de éxito
                setOpen(true)
                navigate('/NuevaContraseña'); // Navega a la ruta para establecer una nueva contraseña
                setLoading(false); // Detiene la animación de carga
            } else {
                setErrorMessage(data.mensaje); // Muestra el mensaje de error recibido del servidor
                setIsOpen(true)
                setLoading(false); // Detiene la animación de carga
            }
        } catch (error) {
            console.error('Error al verificar el código:', error); // Imprime el error en la consola
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
                <div className='container'
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
                        }}>Ingrese su código de verificación </h1>
                    <div className="inputGroup">
                        <input type="e-mail" required autoComplete="off" id="name" onSubmit={handleSubmit} />
                       
                        <label htmlFor="name"> Código verificación </label>
                    </div>
                    <div
                        style={{
                            display: 'flex', gap: '1rem'
                        }}>
                        <Link to={'/Olvido_Contraseña'}>
                            <Cancelar />
                        </Link>

                        <button onClick={verificarCodigo}
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