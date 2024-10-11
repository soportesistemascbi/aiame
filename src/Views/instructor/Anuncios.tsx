import { useEffect, useRef, useState } from 'react'; // Importa hooks de React
import Slider from 'react-slick'; // Importa el componente Slider para carruseles
import "slick-carousel/slick/slick.css"; // Importa estilos para el carrusel
import "slick-carousel/slick/slick-theme.css"; // Importa tema para el carrusel
import "./carrusel.css"; // Importa estilos personalizados
import { MoonLoader } from 'react-spinners'; // Importa un loader de react-spinners

export default function Anuncios() { // Definición del componente Anuncios
    const [noticias, setNoticias] = useState([]); // Estado para almacenar noticias
    const [descripcion, setDescripcion] = useState(false); // Estado para controlar la visualización de la descripción
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null); // Estado para almacenar la noticia seleccionada
    const [loading, setLoading] = useState(false); // Estado para controlar la carga de datos

    useEffect(() => { // Efecto para cargar noticias al montar el componente
        setLoading(true); // Inicia el estado de carga
        const fetchNoticias = async () => { // Función asíncrona para obtener noticias
            try {
                const response = await fetch('https://instrudev.com/aiameapp/anuncio/anuncio.php?case=3'); // Solicitud a la API
                const data = await response.json(); // Convierte la respuesta a JSON
                console.log('Datos obtenidos:', data); // Imprime los datos obtenidos en consola

                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") { // Verifica si no hay noticias
                    setNoticias([]); // Establece un array vacío si no hay noticias
                    setLoading(false); // Finaliza el estado de carga
                } else {
                    setNoticias(data.rpta); // Establece las noticias en el estado
                    setLoading(false); // Finaliza el estado de carga
                }
            } catch (error) {
                console.error('Error al obtener noticias:', error); // Manejo de errores
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchNoticias(); // Llama a la función para obtener noticias
    }, []); // Dependencias vacías para que se ejecute solo al montar

    const carouselSettings = { // Configuraciones para el carrusel
        dots: true, // Muestra puntos de navegación
        infinite: false, // Carrusel no infinito
        speed: 500, // Velocidad de transición
        slidesToShow: 1, // Muestra un slide a la vez
        slidesToScroll: 1, // Desplaza un slide a la vez
        arrows: true, // Muestra flechas de navegación
        autoplay: true, // Activa el autoplay
        autoplaySpeed: 5000, // Velocidad del autoplay
    };

    const handleNoticiaClick = (noticia) => { // Maneja el clic en una noticia
        setNoticiaSeleccionada(noticia); // Establece la noticia seleccionada
        setDescripcion(true); // Muestra la descripción de la noticia
    };

    const isMobile = window.innerWidth < 860; // Cambia el valor según tus necesidades

    return (
        <>


            {descripcion && noticiaSeleccionada && Object.keys(noticiaSeleccionada).length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',  // Fondo opaco
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '2'
                }}>
                    <div style={{
                        width: '80%', // Puedes ajustar este valor según tu diseño
                        maxWidth: '800px',
                        background: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h2>Descripción Completa</h2>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={noticiaSeleccionada.urlImagen} alt="Noticia" style={{ width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '5px' }} />
                            </div>
                            <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                {noticiaSeleccionada.descripcion}
                            </p>
                        </div>
                        <button onClick={() => setDescripcion(false)} style={{
                            padding: '10px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            alignSelf: 'center'
                        }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}


            {/* FIN MODALES  */}


            {/*     TABLA DE ANUNCIOS      */}


            <div style={{
                width: 'calc(3em + 80vw)',
                maxHeight: isMobile ? '70vh' : 'calc(80vh - 50px)', // Ajustar según el tamaño
                background: 'white',
                boxShadow: '1px 1px 5px 1px #cccccc',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                textAlign: 'center',
                position: 'fixed',
                bottom: isMobile ? '7%' : 'calc(20vh - 100px)', // Ajustar según el tamaño
                left: '96%',
                transform: 'translateX(-98%) translateX(-4px)',
                zIndex: '1',
                borderCollapse: 'collapse',
                maxWidth: '100vw',
            }}>


                <div style={{ width: '100%', overflowY: 'auto', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                    
                    {/*                 BLOQUE PARA LAS NOTICIAS               */}



                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', maxHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {noticias.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#333' }}>
                                    No hay anuncios disponibles.
                                </span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <div style={{ width: '1500px', height: '750px', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <Slider {...carouselSettings}>
                                        {noticias.map((noticia) => (
                                            <div key={noticia.id} className="slider-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => handleNoticiaClick(noticia)}>
                                                <img src={noticia.urlImagen} alt={`Imagen de noticia ${noticia.id}`} className="slider-image" style={{ width: '100%', height: '750px', borderRadius: '5px' }} />
                                                <div className="slider-text" style={{ padding: '10px', textAlign: 'center', width: '100%' }}>
                                                    <h3 style={{ margin: '0', fontSize: '16px' }}>{noticia.descripcion}</h3>
                                                    <p style={{ margin: '5px 0', fontSize: '14px' }}>{noticia.fecha}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </div>


                    {/*                 FIN DE ANUNCIOS Y COMIENZO DE LA TABLA               */}
                </div>
            </div>


            {/*                 LOADER O ANIMACIÓN DE CARGA               */}


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
                    zIndex: 999999999999999
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
