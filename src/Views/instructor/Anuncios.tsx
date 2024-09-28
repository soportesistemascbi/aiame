import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrusel.css";
import { MoonLoader } from 'react-spinners';

export default function Anuncios() {
    const [noticias, setNoticias] = useState([]);
    const [descripcion, setDescripcion] = useState(false);
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
    const [loading, setLoading] = useState(false);






    useEffect(() => {
        setLoading(true);
        const fetchNoticias = async () => {
            try {
                const response = await fetch('https://instrudev.com/aiameapp/anuncio/anuncio.php?case=3');
                const data = await response.json();
                console.log('Datos obtenidos:', data);

                if (data.rpta && data.rpta.length === 1 && data.rpta[0].rp === "no") {
                    setNoticias([]);
                    setLoading(false);
                } else {
                    setNoticias(data.rpta);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener noticias:', error);
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    const carouselSettings = {
        dots: true,
        infinite: false, // Si es 'true', el carrusel podría repetirse infinitamente
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const handleNoticiaClick = (noticia) => {
        setNoticiaSeleccionada(noticia);
        setDescripcion(true);
    };

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


            <div style={{
                width: 'calc(3em + 80vw)',
                height: '85%',
                background: 'white',
                boxShadow: '1px 1px 5px 1px #cccccc',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                textAlign: 'center',
                position: 'fixed',
                bottom: '30px',
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
