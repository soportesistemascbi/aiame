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
import RContraseñas from '../../../Components/Inputs/Icon_inputs/RContraseña.svg'

export default function Registro() {

    const [tipoDocumento, setDocumento] = useState([]);
    const [selectedDocumento, setSelectedDocumento] = useState([]);
    const [showDocumentos, setShowDocumentos] = useState(false);
    const [selectedDocumentoIds, setSelectedDocumentosIds] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controlar el loader


    const [tipoCargo, setCargo] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState([]);
    const [showCargo, setShowCargos] = useState(false);
    const [selectedCargoId, setSelectedCargoIds] = useState([]);
    const navigate = useNavigate();
    const bcrypt1 = bcrypt;

    useEffect(() => {
        fetchDocumento();
        fetchCargo();
    }, []);


    const fetchDocumento = () => {
        fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=2')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los documentos');
                }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setDocumento(data.rpta);
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                    console.error('Respuesta recibida:', text);
                }
            })
            .catch(error => console.error('Error al obtener los documentos:', error));
    };

    const fetchCargo = () => {
        fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=6')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los cargos');
                }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setCargo(data.rpta);
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                    console.error('Respuesta recibida:', text);
                }
            })
            .catch(error => console.error('Error al obtener los cargos:', error));
    };

    const handleDocumentoChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id'));
        setSelectedDocumento(selectedOptions);
        setSelectedDocumentosIds(selectedOptionsIds);
    };

    const handleCargoChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        const selectedOptionsIds = Array.from(e.target.selectedOptions, option => option.getAttribute('data-id'));
        setSelectedCargo(selectedOptions);
        setSelectedCargoIds(selectedOptionsIds);
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia el loader

        const nombre = document.getElementById('name').value;
        const noDoc = document.getElementById('NumeroDoc').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('e-mail').value;
        const tipoDocumento = selectedDocumentoIds[0] || "";
        const contraseña = document.getElementById('contraseña').value;
        const idRol = selectedCargoId[0] || "";
        const contraseña1 = document.getElementById("name1").value

        if (!nombre || !noDoc || !telefono || !correo || !contraseña) {
            alert("Por favor completa todos los campos.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (tipoDocumento === "1") {
            if (noDoc.length !== 10) {
                alert("Su número de documento debe tener una longitud de 10 dígitos.");
                setLoading(false); // Detiene el loader
                return;
            }
        } else if (tipoDocumento === "3") {
            if (noDoc.length !== 6) {
                alert("Su número de documento debe tener una longitud de 6 dígitos.");
                setLoading(false); // Detiene el loader
                return;
            }
        } else if (tipoDocumento === "2") {
            if (noDoc.length !== 9) {
                alert("Su número de documento debe tener una longitud de 9 dígitos.");
                setLoading(false); // Detiene el loader
                return;
            }
        } else {
            alert("Error al validar el documento. Vuelva más tarde.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (!tipoDocumento) {
            alert("Debe de elegir un tipo de documento");
            setLoading(false); // Detiene el loader
            return;
        }

        if (!idRol) {
            alert("Debe de elegir un cargo");
            setLoading(false); // Detiene el loader
            return;
        }
        if (telefono.length !== 10) {
            alert("El teléfono debe tener 10 dígitos.");
            setLoading(false); // Detiene el loader
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo)) {
            alert("Por favor ingresa un correo electrónico válido.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (contraseña.length < 8) {
            alert("La contraseña debe tener al menos 8 dígitos.");
            setLoading(false); // Detiene el loader
            return;
        }

        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const especial = /[!@#$%^&*(),.?":{}|<>]/;
        const numeros = /\d/;

        if (!mayuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra mayúscula.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (!minuscula.test(contraseña)) {
            alert("La contraseña debe contener al menos una letra minúscula.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (!numeros.test(contraseña)) {
            alert("La contraseña debe contener al menos un número.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (!especial.test(contraseña)) {
            alert("La contraseña debe contener al menos un carácter especial.");
            setLoading(false); // Detiene el loader
            return;
        }

        if (contraseña !== contraseña1) { // Corregido para comparación correcta
            alert("Las contraseñas no coinciden.");
            setLoading(false); // Detiene el loader
            return;
        }


        try {
            const checkResponse = await fetch(`https://instrudev.com/aiameapp/login/webserviceapp.php?case=7&correo=${encodeURIComponent(correo)}&documento=${encodeURIComponent(noDoc)}`, {
                method: 'GET',
            });

            const checkData = await checkResponse.json();

            if (checkData.rp === "si") {
                alert("El correo o documento ya están registrados. Por favor utiliza otros datos.");
                setLoading(false); // Detiene el loader
                return;
            } else {
                setError("");
                const encryptedPassword = await bcrypt.hash(contraseña, 10);

                const formData = {
                    'nombre': nombre,
                    'correo': correo,
                    'documento': noDoc,
                    'tipoDocumento': tipoDocumento,
                    'contrasena': encryptedPassword,
                    'telefono': telefono,
                    'idRol': idRol
                };

                console.log("Formulario válido. Enviar datos al backend:", formData);

                try {
                    const response = await fetch('https://instrudev.com/aiameapp/login/webserviceapp.php?case=5', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    const data = await response.json();

                    if (data.rp === "si") {
                        console.log("Datos guardados correctamente en el backend.");

                        const correorespuesta = await fetch(`https://instrudev.com/aiameapp/correo/registro.php?&correo=${correo}`, {
                            method: 'GET',
                        });

                        const correoRespuesta = await correorespuesta.json();

                        if (correoRespuesta.rp === "si") {
                            alert("El correo se ha enviado con éxito. Revise su bandeja de entrada.");
                            setLoading(false);
                        } else {
                            alert("El correo no se ha podido enviar, pero su registro existe. Consulte con el Super Usuario.");
                            setLoading(false);
                        }

                        setLoading(false); // Detiene el loader
                        navigate('/'); // Asegúrate de tener la función navigate definida
                    } else {
                        console.error("Error al guardar los datos en el backend:", data.mensaje);
                        setLoading(false); // Detiene el loader
                    }
                } catch (error) {
                    console.error("Error al conectar con el servidor:", error);
                    setLoading(false); // Detiene el loader
                }
            }
        } catch (error) {
            console.error("Error al verificar el correo y documento en la base de datos:", error);
            setError("Error al verificar el correo y documento en la base de datos");
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
