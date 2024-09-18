import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';



export default function Anuncios() {


  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert_inicio, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://instrudev.com/aiameapp/anuncio/anuncio.php?case=2');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setOptions(data.rpta);
        if (data.rpta.length > 0) {
          setSelectedOption(data.rpta[0]); // Establecer la primera opción como seleccionada
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selected = options.find(option => option.id === selectedValue);
    setSelectedOption(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); //COMIENZA LA ANIMACION DE CARGA

    const descripcion = document.getElementById('descripcion').value;
    const estado = '1';
    const imgId = selectedOption.id;


    try {
      const checkResponse = await fetch(`https://instrudev.com/aiameapp/anuncio/anuncio.php?case=1&descripcion=${descripcion}&img=${imgId}&estado=${estado}`);
      if (!checkResponse.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const checkData = await checkResponse.json();
      console.log(checkData);
      if (checkData.rp === 'si') {
        alert('El anuncio ha sido enviado con éxito');
        window.location.reload()
        setLoading(false); //DETIENE LA ANIMACION DE CARGA
      } else {
        setShowAlert(true);
        setLoading(false); //DETIENE LA ANIMACION DE CARGA
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      console.error("Error al guardar el anuncio :", error);
      setLoading(false); //DETIENE LA ANIMACION DE CARGA
    }
  };
  const handleCancel = () => {
    window.location.reload(); // Recarga la página al hacer clic en el botón "Rechazar"
  };
  return (
    <>
      {showAlert_inicio && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', background: 'linear-gradient(145deg, #232323, #1e1e1e)', padding: '20px', borderRadius: '10px', zIndex: '9999', }}>
          Equipo no encontrado, vuelva a intentar.
        </div>
      )}

      <body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <table
          style={{
            width: 'calc(5em + 80vw)', height: '85%', background: 'white', margin: 'auto',
            boxShadow: '1px 1px 5px 1px #cccccc', borderRadius: '10px', display: 'flex', alignItems: 'start',
            justifyContent: 'start', textAlign: 'center',
            position: 'fixed', bottom: '30px', zIndex: '3', flexDirection: 'column', right: '50px'
          }}
        >
          {/* TITULOS */}
          <div style={{ marginLeft: '85px' }}>
            <h1 style={{ color: '#096ECB' }}>Crear anuncios</h1>
          </div>

          {/* CONTENEDOR DONDE ESTÁN EL TEXTBOX Y EL DESPLEGABLE */}
          <div style={{ marginTop: '30px', marginLeft: '133px', display: 'flex', flexDirection: 'row' }}>
            {/* TEXTBOX */}
            <div style={{ textAlign: 'start', justifyContent: 'start' }}>
              <p>Descripcion</p>
              <input
                type="text"
                className='descripcion'
                id='descripcion'
                style={{
                  width: '800px', height: '350px', padding: '9px', border: 'none',
                  background: '#F5F7FA', borderRadius: '20px', outline: 'none',
                  paddingLeft: '30px'
                }}
              />
            </div>

            {/* DESPLEGABLE CON IMAGEN Y NOMBRE */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '50px' }}>
              <select
                value={selectedOption ? selectedOption.id : ''}
                onChange={handleChange}
                style={{
                  width: '200px',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  marginBottom: '20px'
                }}
              >
                {options.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.descripcion}
                  </option>
                ))}
              </select>
              {selectedOption && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={selectedOption.urlImagen}
                    alt={selectedOption.descripcion}
                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                  />
                  <p>{selectedOption.descripcion}</p>
                </div>
              )}
            </div>
          </div>

          {/* CONTENEDOR DE LOS BOTONES ACEPTAR - RECHAZAR */}
          <div style={{ display: 'flex', flexDirection: 'row-reverse', marginLeft: '600px', marginTop: '50px' }}>
            <button onClick={handleSubmit}
              style={{
                width: '130px', height: '50px',
                border: 'none', borderRadius: '20px',
                background: '#096ECB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '50px', cursor: 'pointer'
              }}
            >
              Aceptar
            </button>


            <button

              style={{
                width: '130px', height: '50px',
                border: 'none', borderRadius: '20px',
                background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer'
              }} onClick={handleCancel}
            >
              Rechazar
            </button>

          </div>
        </table>
      </body>

      {/* Aquí viene el estilo para responsividad sin cambiar body ni tabla */}
      <style>
        {`
          @media (max-width: 768px) {
            input {
              width: calc(100% - 20px); /* Ajuste del ancho del input para móviles */
            }

            select {
              width: calc(100% - 20px); /* Ajuste del ancho del select para móviles */
            }

            img {
              width: 100%;
              height: auto;
            }

            table {
              width: 90vw; /* Ajuste del ancho de la tabla para móviles */
              right: 10px; /* Ajuste de la posición de la tabla */
            }

            .descripcion {
              width: 100%; /* Ajuste del ancho del textbox para móviles */
              height: auto; /* Ajuste de la altura del textbox para móviles */
            }

            .button-container {
              flex-direction: column; /* Ajuste de la dirección del flex en los botones */
              align-items: center; /* Alineación central de los botones */
            }

            .button-container button {
              margin: 10px 0; /* Espaciado vertical entre los botones */
            }
          }
        `}
      </style>

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
