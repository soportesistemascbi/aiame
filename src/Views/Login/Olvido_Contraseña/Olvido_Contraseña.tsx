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
import { useState } from 'react';



export default function Olvido_Contraseña() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();


        const correo = document.getElementById('name').value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo)) {
            alert("Por favor ingresa un correo electrónico válido.");
            return;
        }
    }


    const enviarCorreo = async () => {
        setLoading(true); //COMIENZA LA ANIMACION DE CARGA

        const correo = document.getElementById('name').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(correo)) {
            alert("Por favor ingresa un correo electrónico válido.");
            setLoading(false); //DETIENE LA ANIMACION DE CARGA
            return;
        }
        console.log(correo)
        try {
            const response = await fetch(`https://instrudev.com/aiameapp/correo/olvidoContraseña.php?case=1&correo=${correo}`, {
                method: 'GET',

            });

            if (!response.ok) {
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data.rpta[0].id)
            localStorage.setItem('usuarios', data.rpta[0].id);


            if (data.rp === 'si') {
                alert('Correo enviado con éxito');
                navigate('/Codigo_Vef');
                setLoading(false); //DETIENE LA ANIMACION DE CARGA
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Ocurrió un error al procesar la solicitud.');
            setLoading(false); //DETIENE LA ANIMACION DE CARGA
        }
    };


    return (
        <>

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
                        <img src={Correo}
                            style={{
                                position: 'absolute',
                                top: '0px', left: '10px',
                                marginTop: '10px'
                            }} />
                        <label htmlFor="name"> Correo electronico</label>
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