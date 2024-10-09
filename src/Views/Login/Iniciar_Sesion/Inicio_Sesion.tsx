//--------------------------------------------------------------------------------------------
//Importaciones de CSS
import "./Inicio_Sesion.css";
import "../../../Components/Inputs/Inputs.tsx";
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Logo from "../../../Img/Logo.png";

import MoonLoader from 'react-spinners/MoonLoader';
//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { Link, useNavigate } from "react-router-dom";
import { Iniciar } from "../../../Components/Botones/Botones.tsx";
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../../Components/Alertas/alertaBuena.tsx'

{/*         VALIDACION DE USUARIO         */ }
export default function Login() {


  // Importa el hook useNavigate de React Router para manejar la navegación.
  const navigate = useNavigate();

  // INICIAR LAS VARIABLES

  // Declara el estado de carga para indicar si se está procesando la solicitud.
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);

  //CONSTANTES QUE PERMITEN EL CIERRE DE LOS MODALES DE LAS ALERTAS

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };




  // Función para manejar el inicio de sesión.
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el envío del formulario de manera tradicional.

    setLoading(true); // Inicia el loader al comenzar el proceso de inicio de sesión.

    // Captura y procesa el valor del campo documento.
    const documento = e.target.elements.numero.value.trim().toLowerCase();
    // Captura y procesa el valor del campo contraseña.
    const contraseñaIngresada = e.target.elements.contraseña.value.trim();

    // Verifica si alguno de los campos está vacío.
    if (!documento || !contraseñaIngresada) {
      setErrorMessage('Ambos campos están vacíos. Ingrese sus datos.');//le pasamos el mensaje a la alerta 
      setIsOpen(true);//Activamos la alerta 
      setLoading(false); // Desactiva el loader.
      return; // Sale de la función si hay campos vacíos.
    }

    try {
      // Construye la URL de la API para la solicitud de inicio de sesión.
      const url = `https://instrudev.com/aiameapp/login/webserviceapp.php?case=4&usuarios=${documento}&contrasena=${contraseñaIngresada}`;
      console.log(url); // Imprime la URL en la consola para depuración.

      // Realiza la solicitud a la API.
      const response = await fetch(url, {
        method: 'GET', // Método GET para la solicitud.
      });

      // Verifica si la respuesta no fue exitosa.
      if (!response.ok) {
       
        setLoading(false); // Desactiva el loader.
        return; // Sale de la función si hubo un error en la respuesta.
      }

      // Convierte la respuesta de la API a JSON.
      const data = await response.json();
      console.log(data); // Imprime los datos en la consola para depuración.

      // Verifica si el inicio de sesión fue exitoso.
      if (data.rp === 'si') {
        const { id_rol } = data.usuario; // Obtiene el id_rol del usuario.



        // Almacena información del usuario en localStorage.
        localStorage.setItem('idUsuario', data.usuario.id_usuario);
        localStorage.setItem('id_usuario', data.usuario.nombre);
        localStorage.setItem('id_rol', data.usuario.id_rol);
        localStorage.setItem('correo', data.usuario.correo);
        localStorage.setItem('rol', data.usuario.descripcion);

        // Redirige al usuario según su rol.
        if (id_rol === '1') {
          navigate('/HomeIntructor'); // Navega a la página del instructor.
          setLoading(false); // Desactiva el loader.
        } else if (id_rol === '2') {
          navigate('/HomeIntructor'); // También para el rol '2', navega a la página del instructor.
          setLoading(false); // Desactiva el loader.
        } else if (id_rol === '3') {
          navigate('/HomeSoporte'); // Navega a la página de soporte para el rol '3'.
          setLoading(false); // Desactiva el loader.
        } else if (id_rol === '4') {
          navigate('/HomeAdmin'); // Navega a la página del administrador para el rol '4'.
          setLoading(false); // Desactiva el loader.
        }
        setErrorMessage('No se pudo iniciar sesión. Verifique sus datos o regístrese.');
        setOpen(true);
      } else {
        setErrorMessage('Error: Los datos son incorrectos');
        setIsOpen(true);
        setLoading(false); // Desactiva el loader.
      }
    } catch (error) {
      setErrorMessage('Error en la conexión. Inténtelo más tarde.');
      setIsOpen(true);
      console.log("Error al iniciar sesión:", error); // Imprime el error en caso de que ocurra.

      setLoading(false); // Desactiva el loader.
    }
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


  const handleKeyDown = (event) => {
    // Código ASCII de los números del 0 al 9: 48-57
    const key = event.key;
    const isNumber = (key >= '0' && key <= '9') || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
    if (!isNumber) {
        event.preventDefault();
    }
};
  return (
    <>

      {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}

      {isOpen && <Modal message={errorMessage} onClose={handleClose}/>}

      {Open && <Modal1 message={errorMessage} onClose={handleClose1}/>}


      <div
        className="fondo"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          margin: '0',
          padding: '0',
        }}
      >
        <div className="login-container"
          style={{
            width: "calc(20em + 10vw)",
            height: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            textAlign: "center",
            flexDirection: "column",

          }}
        >
          <img
            src={Logo}
            style={{
              width: "100px",
              top: "0",
              left: "0%",
              position: "fixed",
              zIndex: "1",
            }}
          />

          <h1
            style={{
              color: "#096ECB",
              fontFamily: '"fredoka",sans-serif',
              fontOpticalSizing: "auto",
              fontWeight: "600",
              fontVariationSettings: '"wdth" 100',
              fontSize: "40px",
            }}

          >
            Iniciar sesion
          </h1>
          <form onSubmit={handleLogin} style={{ width: '100%', textAlign: 'center' }}>

            <div className="inputGroup">

              <input type="numero" required autoComplete="off" id="numero"  onKeyDown={handleKeyDown}
               />



              <label htmlFor="name" style={{paddingLeft:'3rem'}}> Número de documento</label>

            </div>

            <div className="inputGroup">

              <input type="password" required autoComplete="off" id="contraseña"
              />

              
              <label htmlFor="name" style={{paddingLeft:'3rem'}}>Contraseña</label>
            </div>
            <Link to={"Olvido_Contraseña"} style={{ textDecoration: 'none' }} >
              <p
                style={{
                  fontSize: "12px",

                  marginLeft: "-60%",
                  cursor: "pointer", color: 'black'
                }}
              >
                ¿Olvido su contraseña?
              </p>
            </Link>


            <Iniciar />



          </form>

          <Link to={"/Registro"} style={{ textDecoration: 'none' }}>
            <p
              style={{
                fontSize: "12px",
                marginTop: "4px", color: 'black'
              }}
            >
              Registrarse
            </p>
          </Link>
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
