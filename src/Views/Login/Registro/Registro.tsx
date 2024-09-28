// Importaciones
import './Registro.css';
import Logo from '../../../Img/Logo.png';
import Mujer from './Img/Mujer.svg';
import { Contraseña, Gmail, NDocumento, Nombre, NumeroTelefono, RContraseña } from '../../../Components/Inputs/Inputs';
import { Registrarme, Atras } from '../../../Components/Botones/Botones';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import MoonLoader from 'react-spinners/MoonLoader';


export default function Registro() {

    const [tipoDocumento, setDocumento] = useState([]); // Estado para los tipos de documento
    const [selectedDocumento, setSelectedDocumento] = useState([]); // Estado para el documento seleccionado
    const [showDocumentos, setShowDocumentos] = useState(false); // Estado para mostrar la lista de documentos
    const [selectedDocumentoIds, setSelectedDocumentosIds] = useState([]); // IDs de documentos seleccionados
    const [error, setError] = useState(""); // Estado para manejar errores
    const [loading, setLoading] = useState(false); // Estado para controlar el loader

    const [tipoCargo, setCargo] = useState([]); // Estado para los tipos de cargo
    const [selectedCargo, setSelectedCargo] = useState([]); // Estado para el cargo seleccionado
    const [showCargo, setShowCargos] = useState(false); // Estado para mostrar la lista de cargos
    const [selectedCargoId, setSelectedCargoIds] = useState([]); // IDs de cargos seleccionados
    const navigate = useNavigate(); // Hook para navegación
    const bcrypt1 = bcrypt; // Importación de bcrypt para la encriptación de contraseñas

    // useEffect para cargar los tipos de documento y cargo al montar el componente
    useEffect(() => {
        fetchDocumento(); // Llama a la función para obtener documentos
        fetchCargo(); // Llama a la función para obtener cargos
    }, []);

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
            alert("Por favor completa todos los campos."); // Alerta si falta algún campo
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        // Validaciones de longitud del número de documento
        if (tipoDocumento === "1" && noDoc.length !== 10) {
            alert("Su número de documento debe tener una longitud de 10 dígitos."); // Alerta si la longitud es incorrecta
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (tipoDocumento === "3" && noDoc.length !== 6) {
            alert("Su número de documento debe tener una longitud de 6 dígitos."); // Alerta si la longitud es incorrecta
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (tipoDocumento === "2" && noDoc.length !== 9) {
            alert("Su número de documento debe tener una longitud de 9 dígitos."); // Alerta si la longitud es incorrecta
            setLoading(false); // Detiene el loader
            return; // Termina la función
        } else if (!tipoDocumento) {
            alert("Debe de elegir un tipo de documento"); // Alerta si no se selecciona un tipo de documento
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!idRol) {
            alert("Debe de elegir un cargo"); // Alerta si no se selecciona un cargo
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }
        if (telefono.length !== 10) {
            alert("El teléfono debe tener 10 dígitos."); // Alerta si la longitud del teléfono es incorrecta
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
        if (!emailPattern.test(correo)) {
            alert("Por favor ingresa un correo electrónico válido."); // Alerta si el correo no es válido
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (contraseña.length < 8) {
            alert("La contraseña debe tener al menos 8 dígitos."); // Alerta si la contraseña es demasiado corta
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        // Validaciones de complejidad de contraseña
        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;
        const numeros = /\d/;

        if (!mayuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra mayúscula."); // Alerta si falta una letra mayúscula
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!minuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra minúscula."); // Alerta si falta una letra minúscula
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!numeros.test(contraseña)) {
            alert("La contraseña debe contener al menos un número."); // Alerta si falta un número
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (!especial.test(contraseña)) {
            alert("La contraseña debe contener al menos un carácter especial."); // Alerta si falta un carácter especial
            setLoading(false); // Detiene el loader
            return; // Termina la función
        }

        if (contraseña !== contraseña1) { // Comparación correcta de contraseñas
            alert("Las contraseñas no coinciden."); // Alerta si las contraseñas no coinciden
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
                alert("El correo o documento ya están registrados. Por favor utiliza otros datos."); // Alerta si ya están registrados
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

                        // Maneja la respuesta del envío de correo
                        if (correoRespuesta.rp === "si") {
                            alert("El correo se ha enviado con éxito. Revise su bandeja de entrada."); // Alerta de éxito
                            setLoading(false); // Detiene el loader
                        } else {
                            alert("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario."); // Alerta si no se envió el correo
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
            setError("Error al verificar el correo y documento en la base de datos"); // Establece mensaje de error
            setLoading(false); // Detiene el loader
        }
    };







    return (
        <>
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
                                    position: 'absolute',
                                    top: '100%',
                                    left: '0',
                                    zIndex: '1',
                                    width: '100%',
                                    display: showDocumentos ? 'block' : 'none',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    scrollbarWidth: 'none',
                                    color: 'black'
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
                                    display: showCargo ? 'block' : 'none',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    scrollbarWidth: 'none',
                                    color: 'black'
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
                            <input type="password" id="name1" required placeholder="Confirmar Contraseña" />
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
