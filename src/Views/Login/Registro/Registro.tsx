// Importaciones
import './Registro.css';
import Logo from '../../../Img/Logo.png';
import Mujer from './Img/Mujer.svg';
import { Contraseña, Gmail, NDocumento, Nombre, NumeroTelefono } from '../../../Components/Inputs/Inputs';
import { Registrarme, Atras } from '../../../Components/Botones/Botones.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import MoonLoader from 'react-spinners/MoonLoader';
import Modal from '../../../Components/Alertas/alertaMala.tsx';
import Modal1 from '../../../Components/Alertas/alertaBuena.tsx'


export default function Registro() {

    const [tipoDocumento, setDocumento] = useState([]); // Estado para los tipos de documento
    const [selectedDocumento, setSelectedDocumento] = useState([]); // Estado para el documento seleccionado
    const [showDocumentos, setShowDocumentos] = useState(false); // Estado para mostrar la lista de documentos
    const [selectedDocumentoIds, setSelectedDocumentosIds] = useState([]); // IDs de documentos seleccionados
    const [error, setError] = useState(""); // Estado para manejar errores
    const [loading, setLoading] = useState(false); // Estado para controlar el loader
    const [errorMessage, setErrorMessage] = useState('');
    const [Message, setMessage] = useState('');

    const [tipoCargo, setCargo] = useState([]); // Estado para los tipos de cargo
    const [selectedCargo, setSelectedCargo] = useState([]); // Estado para el cargo seleccionado
    const [showCargo, setShowCargos] = useState(false); // Estado para mostrar la lista de cargos
    const [selectedCargoId, setSelectedCargoIds] = useState([]); // IDs de cargos seleccionados
    const navigate = useNavigate(); // Hook para navegación
    const bcrypt1 = bcrypt; // Importación de bcrypt para la encriptación de contraseñas
    const [isOpen, setIsOpen] = useState(false);
    const [Open, setOpen] = useState(false);

    // useEffect para cargar los tipos de documento y cargo al montar el componente
    useEffect(() => {
        fetchDocumento(); // Llama a la función para obtener documentos
        fetchCargo(); // Llama a la función para obtener cargos
    }, []);

    //CONSTANTES QUE PERMITEN EL CIERRE DE LOS MODALES DE LAS ALERTAS

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };

    // Función para obtener tipos de documentos
    const fetchDocumento = () => {
        fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=2') // Llama a la API
            .then(response => {
                if (!response.ok) { // Verifica si la respuesta no es OK
                    throw new Error('Error al obtener los documentos'); // Lanza un error
                }
                return response.text(); // Devuelve la respuesta como texto
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Intenta parsear la respuesta a JSON
                    setDocumento(data.rpta); // Establece los documentos en el estado
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Maneja errores de parseo
                    console.error('Respuesta recibida:', text); // Muestra la respuesta original
                }
            })
            .catch(error => console.error('Error al obtener los documentos:', error)); // Maneja errores de fetch
    };

    // Función para obtener tipos de cargo
    const fetchCargo = () => {
        fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=6') // Llama a la API
            .then(response => {
                if (!response.ok) { // Verifica si la respuesta no es OK
                    throw new Error('Error al obtener los cargos'); // Lanza un error
                }
                return response.text(); // Devuelve la respuesta como texto
            })
            .then(text => {
                try {
                    const data = JSON.parse(text); // Intenta parsear la respuesta a JSON
                    setCargo(data.rpta); // Establece los cargos en el estado
                } catch (error) {
                    console.error('Error al parsear JSON:', error); // Maneja errores de parseo
                    console.error('Respuesta recibida:', text); // Muestra la respuesta original
                }
            })
            .catch(error => console.error('Error al obtener los cargos:', error)); // Maneja errores de fetch
    };

    // Función para manejar el cambio de selección de documentos
    const handleDocumentoChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtiene valores seleccionados
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtiene IDs seleccionados
        setSelectedDocumento(selectedOptions); // Actualiza el estado de documentos seleccionados
        setSelectedDocumentosIds(selectedOptionsIds); // Actualiza el estado de IDs seleccionados
    };

    // Función para manejar el cambio de selección de cargos
    const handleCargoChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value); // Obtiene valores seleccionados
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id')); // Obtiene IDs seleccionados
        setSelectedCargo(selectedOptions); // Actualiza el estado de cargos seleccionados
        setSelectedCargoIds(selectedOptionsIds); // Actualiza el estado de IDs seleccionados
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setLoading(true); // Inicia el loader

        // Obtiene valores de los campos del formulario
        const nombre = document.getElementById('name').value;
        const noDoc = document.getElementById('NumeroDoc').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('e-mail').value;
        const tipoDocumento = selectedDocumentoIds[0] || ""; // Toma el primer ID seleccionado o vacío
        const contraseña = document.getElementById('contraseña').value;
        const idRol = selectedCargoId[0] || ""; // Toma el primer ID de cargo seleccionado o vacío
        const contraseña1 = document.getElementById("name1").value; // Toma el valor del campo de confirmación de contraseña

        // Validaciones de entrada
        if (!nombre || !noDoc || !telefono || !correo || !contraseña) {
            setErrorMessage("Por favor completa todos los campos."); // Alerta si falta algún campo
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        // Validaciones de longitud del número de documento
        if (tipoDocumento === "1" && noDoc.length !== 10) {
            setErrorMessage("Su número de documento debe tener una longitud de 10 dígitos."); // Alerta si la longitud es incorrecta
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (tipoDocumento === "3" && noDoc.length !== 6) {
            setErrorMessage("Su número de documento debe tener una longitud de 6 dígitos."); // Alerta si la longitud es incorrecta
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (tipoDocumento === "2" && noDoc.length !== 9) {
            setErrorMessage("Su número de documento debe tener una longitud de 9 dígitos."); // Alerta si la longitud es incorrecta
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (!tipoDocumento) {
            setErrorMessage("Debe de elegir un tipo de documento"); // Alerta si no se selecciona un tipo de documento
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!idRol) {
            setErrorMessage("Debe de elegir un cargo"); // Alerta si no se selecciona un cargo
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }
        if (telefono.length !== 10) {
            setErrorMessage("El teléfono debe tener 10 dígitos."); // Alerta si la longitud del teléfono es incorrecta
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
        if (!emailPattern.test(correo)) {
            setErrorMessage("Por favor ingresa un correo electrónico válido."); // Alerta si el correo no es válido
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (contraseña.length < 8) {
            setErrorMessage("La contraseña debe tener al menos 8 dígitos."); // Alerta si la contraseña es demasiado corta
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        // Validaciones de complejidad de contraseña
        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;
        const numeros = /\d/;

        if (!mayuscula.test(contraseña)) {
            setErrorMessage("La contraseña debe contener al menos una letra mayúscula."); // Alerta si falta una letra mayúscula
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!minuscula.test(contraseña)) {
            setErrorMessage("La contraseña debe contener al menos una letra minúscula."); // Alerta si falta una letra minúscula
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!numeros.test(contraseña)) {
            setErrorMessage("La contraseña debe contener al menos un número."); // Alerta si falta un número
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!especial.test(contraseña)) {
            setErrorMessage("La contraseña debe contener al menos un carácter especial."); // Alerta si falta un carácter especial
            setIsOpen(true); // Alerta si ya están registrados
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (contraseña !== contraseña1) { // Comparación correcta de contraseñas
            setErrorMessage('Las contraseñas no coinciden');

            setIsOpen(true); // Alerta si las contraseñas no coinciden
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        try {
            // Verifica si el correo y documento ya están registrados
            const checkResponse = await fetch(`https://instrudev.com/aiameapp/login/webserviceapp.php?case=7&correo=${encodeURIComponent(correo)}&documento=${encodeURIComponent(noDoc)}`, {
                method: 'GET', // Método GET
            });

            const checkData = await checkResponse.json(); // Convierte la respuesta a JSON

            if (checkData.rp === "si") {
                setErrorMessage('Los datos ya existen en la base de datos. Vuelva a inicio de sesión');
                setIsOpen(true); // Alerta si ya están registrados
                setLoading(false); // Detiene el loader
                return; // Termina la función
            } else {
                setError(""); // Limpia el estado de error
                const encryptedPassword = await bcrypt.hash(contraseña, 10); // Encripta la contraseña

                const formData = {
                    'nombre': nombre,
                    'correo': correo,
                    'documento': noDoc,
                    'tipoDocumento': tipoDocumento,
                    'contrasena': encryptedPassword,
                    'telefono': telefono,
                    'idRol': idRol
                };

                console.log("Formulario válido. Enviar datos al backend:", formData); // Imprime el formulario en la consola

                try {
                    // Envía los datos al backend
                    const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=5', {
                        method: 'POST', // Método POST
                        headers: {
                            'Content-Type': 'application/json', // Indica el tipo de contenido
                        },
                        body: JSON.stringify(formData), // Convierte los datos a JSON
                    });

                    const data = await response.json(); // Convierte la respuesta a JSON

                    if (data.rp === "si") {
                        console.log("Datos guardados correctamente en el backend."); // Imprime éxito en la consola

                        // Envía un correo de confirmación
                        const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/registro.php?&correo=${correo}`, {
                            method: 'GET', // Método GET
                        });

                        const correoRespuesta = await correorespuesta.json(); // Convierte la respuesta a JSON

                        console.log(correoRespuesta)
                        // Maneja la respuesta del envío de correo
                        if (correoRespuesta.rp === "si") {
                            5
                            setMessage('Se ha enviado un correo al e-mail otorgado. Revise su bandeja de entrada.');
                            setOpen(true); // Alerta de éxito
                            setLoading(false); // Detiene el loader
                        } else {
                            setMessage('El correo no se pudo enviar, pero su registro existe. Consulte con el Super Usuario o administrador.');
                            setOpen(true); // Alerta si no se envió el correo
                            setLoading(false); // Detiene el loader
                        }

                        setLoading(false); // Detiene el loader
                        navigate('/'); // Navega a la ruta principal
                    } else {
                        console.error("Error al guardar los datos en el backend:", data.mensaje); // Imprime error en la consola
                        setLoading(false); // Detiene el loader
                    }
                } catch (error) {
                    console.error("Error al conectar con el servidor:", error); // Imprime error en la consola
                    setLoading(false); // Detiene el loader
                }
            }
        } catch (error) {
            console.error("Error al verificar el correo y documento en la base de datos:", error); // Imprime error en la consola
            setErrorMessage('Error al verificar el correo y documento en la base de datos:');
            setIsOpen(true); // Establece mensaje de error
            setLoading(false); // Detiene el loader
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



    return (
        <>

            {/*        ALERTAS/RESPUESTAS DE LAS VALIDACIONES        */}

            {isOpen && <Modal message={errorMessage} onClose={handleClose}/>}
            {Open && <Modal1 message={Message} onClose={handleClose1}/>}





            <div className="Registro"
                style={{
                    width: '100%', height: '100vh',
                    display: 'flex'
                }}>
                {/* Diseño donde se registra la información del usuario */}
                <div
                    className="form-container">
                    <form onSubmit={handleSubmit} style={{ zIndex: '10' }}>
                        <h1>Registro</h1>
                        <p>Accede a todos los reportes y anuncios</p>

                        <Nombre />


                        {/* Document and Role Selectors */}
                        <div className="inputGroup">

                            <input
                                type="text"
                                placeholder='Tipo de documento'
                                onFocus={() => setShowDocumentos(true)}
                                readOnly
                                value={selectedDocumento.join(', ')}
                                style={{
                                    width: '95%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s',
                                    outline: 'none',
                                    cursor:'pointer'
                                }}
                                id="clase_categoria"
                                className="placeholder-style"
                            />
                            <style jsx>{`
                                            .placeholder-style::placeholder {
                                                color: rgba(0, 0, 0); 
                                            }
                                        `}</style>
                            <select
                                multiple
                                onChange={handleDocumentoChange}
                                onClick={() => setShowDocumentos(false)}
                                id="tipoDocumento"
                                style={{
                                    display: showDocumentos ? 'block' : 'none',
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    zIndex: '1',
                                    width: '100%',
                                    height: '75px',
                                    textAlign: 'start',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    margin: '0',
                                    listStyle: 'none',
                                    flexDirection: 'column',
                                    overflowY: 'auto',
                                    whiteSpace: 'nowrap',
                                    color: 'black',
                                    
                                }}
                            >
                                {tipoDocumento.map(Caso => (
                                    <option key={Caso.id} value={Caso.tipoDocumento} data-id={Caso.id}>
                                        {Caso.tipoDocumento}
                                    </option>
                                ))}
                            </select>


                        </div>



                        <div className="inputGroup">

                            <input
                                type="text"
                                placeholder='Cargo'
                                onFocus={() => setShowCargos(true)}
                                readOnly
                                value={selectedCargo.join(', ')}
                                id="clase_categoria"
                                className="placeholder-style"
                                style={{
                                    width: '95%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s',
                                    outline: 'none',
                                    cursor:'pointer'
                                }}
                            />
                            <select
                                multiple
                                onChange={handleCargoChange}
                                onClick={() => setShowCargos(false)}
                                id="tipo de cargo"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    zIndex: '1',
                                    width: '100%',
                                    height: '75px',
                                    display: showCargo ? 'block' : 'none',
                                    textAlign: 'start',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    margin: '0',
                                    listStyle: 'none',
                                    flexDirection: 'column',
                                    overflowY: 'auto',
                                    whiteSpace: 'nowrap',
                                    color: 'black',
                                }}
                            >
                                {tipoCargo.map(Caso => (
                                    <option key={Caso.id} value={Caso.descripcion} data-id={Caso.id}>
                                        {Caso.descripcion}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <NDocumento />
                        <NumeroTelefono />
                        <Gmail />
                        <Contraseña />

                        <div className="inputGroup">
                            <input
                         style={{
                             padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            transition: 'border-color 0.3s',
                            outline: 'none',
                            cursor: 'auto'
                        }}
                                type="password"
                                required
                                autoComplete="off"
                                id="name1"
                                name="nombre"
                            />
                            <label htmlFor="name" >Confirmar contraseña</label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={'/'}>
                                <Atras />
                            </Link>
                            <Registrarme />
                        </div>
                    </form>

                    {/*   LOADER O ANIMACION DE CARGA  */}

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

                {/* Diseño para el lado derecho de la página de registro */}

                <div
                    style={{
                        width: '60%', height: '100%',
                    }}>
                    <div className='circule'
                        style={{
                            width: '1280px', height: '1280px',
                            borderRadius: '50%', position: 'fixed',
                            bottom: '-440px', right: '-300px',
                        }}></div>
                    <div className='contenedorImagenLogo'
                        style={{
                            width: '500px', height: '500px',
                            background: 'white', borderRadius: '50%', position: 'fixed',
                            bottom: '-150px', right: '-150px', zIndex: '2',
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <img src={Logo} alt="Logo" className='imgLogo'
                            style={{
                                width: '200px',
                                marginRight: '80px', marginBottom: '80px'
                            }} />
                    </div>
                    <img src={Mujer} className='imagenMujer'
                        style={{
                            position: 'fixed',
                            bottom: '0px', left: '36%'
                        }} />
                </div>
            </div>
        </>
    );
}
