
import '../../../Components/Inputs/Inputs.css';
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from '../../../Img/Logo.png';
import Contra from './NC_icon/Contraseña.svg'
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from 'react-router-dom';
import { Cancelar } from '../../../Components/Botones/Botones';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import MoonLoader from 'react-spinners/MoonLoader';
import { useState } from 'react';



export default function NuevaContraseña() {

    const [loading, setLoading] = useState(false); // Estado para manejar la animación de carga
    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas
    const bcrypt1 = bcrypt; // Asigna bcrypt a una variable para usar en la función

    // Función que se ejecuta al enviar el formulario para cambiar la contraseña
    const cambiarContrasena = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setLoading(true); // Inicia la animación de carga

        // Obtiene los valores de las contraseñas ingresadas en los campos
        const contraseña = document.getElementById('name').value;
        const contraseña1 = document.getElementById('name2').value;
        console.log('Contraseña ingresada:', contraseña); // Imprime la contraseña en la consola para depuración

        // Encripta la contraseña ingresada
        const encryptedPassword = await bcrypt1.hash(contraseña, 10);
        const id = localStorage.getItem('usuarios'); // Obtiene el ID del usuario desde el almacenamiento local
        console.log('ID del usuario:', id); // Imprime el ID en la consola

        // Valida la longitud de la contraseña
        if (contraseña.length < 8) {
            alert("La contraseña debe tener 8 dígitos."); // Muestra un mensaje si la contraseña es corta
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        // Expresiones regulares para validar los requisitos de la contraseña
        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;
        const numeros = /\d/;

        // Verifica si la contraseña contiene al menos una letra mayúscula
        if (!mayuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra mayúscula.");
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        // Verifica si la contraseña contiene al menos una letra minúscula
        if (!minuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra minúscula.");
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        // Verifica si la contraseña contiene al menos un número
        if (!numeros.test(contraseña)) {
            alert("La contraseña debe contener al menos un número.");
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        // Verifica si la contraseña contiene al menos un carácter especial
        if (!especial.test(contraseña)) {
            alert("La contraseña debe contener al menos un carácter especial.");
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        // Verifica si las contraseñas ingresadas en ambos campos son iguales
        if (contraseña != contraseña1) {
            alert("La contraseña debe ser la misma en ambos campos.");
            setLoading(false); // Detiene la animación de carga
            return; // Termina la función
        }

        try {
            // Realiza una solicitud HTTP para cambiar la contraseña
            const response = await fetch(`https://instrudev.com/aiameapp/caso/casos.php?case=9&id=${id}&contrasena=${encryptedPassword}`, {
                method: 'GET', // Especifica el método HTTP
            });

            if (!response.ok) { // Verifica si la respuesta no es OK
                setLoading(false); // Detiene la animación de carga
                throw new Error(`Error HTTP: ${response.status}`); // Lanza un error si la respuesta no es válida
            }

            const data = await response.json(); // Convierte la respuesta en formato JSON
            console.log("Respuesta del servidor:", data); // Imprime la respuesta en la consola

            if (data.rp === 'si') { // Verifica si la operación fue exitosa
                alert('Contraseña cambiada con éxito'); // Muestra un mensaje de éxito
                navigate('/'); // Navega a la ruta principal
                setLoading(false); // Detiene la animación de carga
            } else {
                alert(data.mensaje); // Muestra el mensaje de error recibido del servidor
            }
        } catch (error) {
            console.error('Error al verificar el código:', error); // Imprime el error en la consola
            alert('Ocurrió un error al procesar la solicitud.'); // Muestra un mensaje de error al usuario
            setLoading(false); // Detiene la animación de carga
        }
    };


    return (
        <>

            <div className="fondo1">
                <div className='container'
                    style={{
                        width: 'calc(20em + 10vw)', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', textAlign: 'center',
                        flexDirection: 'column',
                        marginLeft: 'calc(0em + 10vw)'
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
                        }}>Ingrese su nueva contraseña </h1>
                    <div className="inputGroup">
                        <input type="password" required autoComplete="off" id="name" />
                        <img src={Contra}
                            style={{
                                position: 'absolute',
                                top: '0px', left: '10px',
                                marginTop: '10px'
                            }} />
                        <label htmlFor="name"> Contraseña Nueva</label>
                    </div>
                    <div className="inputGroup">
                        <input type="password" required autoComplete="off" id="name2" />
                        <img src={Contra}
                            style={{
                                position: 'absolute',
                                top: '0px', left: '10px',
                                marginTop: '10px'
                            }} />
                        <label htmlFor="name"> Confirmar contraseña</label>
                    </div>
                    <div
                        style={{
                            display: 'flex', gap: '1rem'
                        }}>
                        <Link to={'/Olvido_Contraseña'}>
                            <Cancelar />
                        </Link>
                        <button onClick={cambiarContrasena}
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