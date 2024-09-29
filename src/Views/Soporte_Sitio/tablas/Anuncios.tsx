import React, { useState, useEffect } from 'react'; // Importa React y hooks de estado y efecto
import MoonLoader from 'react-spinners/MoonLoader'; // Importa un componente de carga

export default function Anuncios() { // Define el componente funcional

  const [options, setOptions] = useState([]); // Estado para almacenar opciones
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const [showAlert_inicio, setShowAlert] = useState(false); // Estado para mostrar alerta
  const [loading, setLoading] = useState(false); // Estado de carga

  useEffect(() => { // Hook para cargar datos al montar el componente
    setLoading(true); // Comienza la animación de carga
    const fetchData = async () => { // Función asíncrona para obtener datos
      try {
        // Realiza una solicitud a la API
        const response = await fetch('https://instrudev.com/aiameapp/anuncio/anuncio.php?case=2');
        if (!response.ok) { // Verifica si la respuesta es correcta
          throw new Error('Error al obtener los datos'); // Lanza un error si la respuesta no es correcta
        }
        const data = await response.json(); // Convierte la respuesta a JSON
        setOptions(data.rpta); // Almacena las opciones obtenidas
        setLoading(false); // Detiene la animación de carga
        if (data.rpta.length > 0) { // Verifica si hay opciones disponibles
          setSelectedOption(data.rpta[0]); // Establece la primera opción como seleccionada
          setLoading(false); // Detiene la animación de carga
        }
      } catch (error) { // Manejo de errores
        console.error('Error al obtener los datos:', error); // Imprime el error en consola
        setLoading(false); // Detiene la animación de carga
      }
    };

    fetchData(); // Llama a la función para obtener datos
  }, []); // Se ejecuta una vez al montar el componente

  const handleChange = (event) => { // Maneja el cambio en la selección de opciones
    const selectedValue = event.target.value; // Obtiene el valor seleccionado
    const selected = options.find(option => option.id === selectedValue); // Busca la opción seleccionada
    setSelectedOption(selected); // Actualiza la opción seleccionada
  };

  const handleSubmit = async (e) => { // Maneja el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setLoading(true); // Comienza la animación de carga

    const descripcion = document.getElementById('descripcion').value; // Obtiene la descripción ingresada
    const estado = '1'; // Establece el estado
    const imgId = selectedOption.id; // Obtiene el ID de la imagen seleccionada

    try {
      // Realiza una solicitud para guardar el anuncio
      const checkResponse = await fetch(`https://instrudev.com/aiameapp/anuncio/anuncio.php?case=1&descripcion=${descripcion}&img=${imgId}&estado=${estado}`);
      if (!checkResponse.ok) { // Verifica si la respuesta es correcta
        throw new Error('Error en la respuesta del servidor'); // Lanza un error si no es correcta
      }
      const checkData = await checkResponse.json(); // Convierte la respuesta a JSON
      console.log(checkData); // Imprime la respuesta en consola
      if (checkData.rp === 'si') { // Si el anuncio se guardó exitosamente
        alert('El anuncio ha sido enviado con éxito'); // Alerta de éxito
        window.location.reload(); // Recarga la página
        setLoading(false); // Detiene la animación de carga
      } else {
        setShowAlert(true); // Muestra alerta si hubo un error
        setLoading(false); // Detiene la animación de carga
        setTimeout(() => setShowAlert(false), 3000); // Oculta la alerta después de 3 segundos
      }
    } catch (error) {
      console.error("Error al guardar el anuncio :", error); // Manejo de errores al guardar el anuncio
      setLoading(false); // Detiene la animación de carga
    }
  };

  const handleCancel = () => { // Maneja el clic en el botón "Rechazar"
    window.location.reload(); // Recarga la página
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
            width: 'calc(3em + 80vw)',
            height: '85%',
            background: 'white',
            boxShadow: '1px 1px 5px 1px #cccccc',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            textAlign: 'start',
            flexDirection: 'column',
            position: 'fixed',
            bottom: '30px',
            left: '96%',  // Centramos la tabla en el eje horizontal
            transform: 'translateX(-98%) translateX(-4px)',  // Corremos 180px a la izquierda
            zIndex: '3',
            borderCollapse: 'collapse',
            maxWidth: '100vw',  // Evitar que la tabla exceda el ancho de la pantalla
            overflow: 'auto'
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
              <p>Descripción</p>
              <textarea
                className='descripcion'
                id='descripcion'
                maxLength={500}
                placeholder='Solo 500 caracteres para la descripcion'
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
