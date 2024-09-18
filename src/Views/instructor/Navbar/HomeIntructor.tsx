//--------------------------------------------------------------------------------------------
//Importaciones de CSS
import './HomeAdmin.css'
//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes
import Logo from '../../../Img/Logo.png'
import ejemplo from '../../../Img/Ejemplo.png'
import Noti from '../../../Icon/Noti.svg'
import Confi from '../../../Icon/Confi.svg'
import Menu from '../../../Icon/Menu.svg'
import Cerrar from '../../../Icon/Cerrar.svg'
import Reporte from './icon_Home_Admin/Reporte.svg'
import TablaHistorial from '../tablaHistorial.js'

import { useState, useEffect } from 'react';
import TablaInstructor from '../TablaInstructor.js'
import { Cerrar_Sesion } from '../../../Components/Botones/Botones.js'



export default function HomeIntructor() {
    //--------------------------------------------------------------------------------------------
    // para que se esconda la caja lateral
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [showSearchIcon, setShowSearchIcon] = useState(true);

    const handleResize = () => {
        if (window.innerWidth <= 1500) {
            setShowSearchIcon(false);
        } else {
            setShowSearchIcon(true);
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //--------------------------------------------------------------------------------------------
    // caja lateral 
    const [MCL, setMCL] = useState(false);
    const CMCL = () => {
        setMCL(prevState => !prevState)
    }
    //--------------------------------------------------------------------------------------------
    // caja de cerrar sesión
    const [MCS, setMCS] = useState(false);
    const AMCS = () => {
        setMCS(prevState => !prevState)
    }
    //--------------------------------------------------------------------------------------------
    /* Metodo de activacion de los botones y enlazar el modal correspondiente de 
       de cada uno */


    const [botonActivo, setBotonActivo] = useState<string | null>(null);
    const [botonClickCount, setBotonClickCount] = useState<{ [key: string]: number }>({});

    const handleClick = (index: string) => {
        if (botonActivo === index && botonClickCount[index] === 1) {
            // Desactivar el botón actual
            setBotonActivo(null);
            setBotonClickCount((prevState) => ({
                ...prevState,
                [index]: 0,
            }));
            switch (index) {
                case 'Reportes':
                    CerrarUsuarios();
                    break;
                case 'Historial':
                    CerrarHistorial();
                    break;
                default:
                    break;
            }
        } else {
            // Activar el botón
            setBotonActivo(index);
            setBotonClickCount((prevState) => ({
                ...prevState,
                [index]: (prevState[index] || 0) + 1,
            }));
            switch (index) {
                case 'Reportes':
                    AbrirUsuarios();
                    CerrarHistorial();
                    break;
                case 'Historial':
                    AbrirHistorial();
                    CerrarUsuarios();
                    break;
                default:
                    break;
            }
        }
    };
    // Llamado de los iconos para los botones
    const Imagenes = [
        { icono: Reporte },
        { icono: Reporte },

    ];
    //--------------------------------------------------------------------------------------------
    //Modal de usuarios
    const [Reportes, setReportes] = useState(false);
    const [Historiall, setHisotrial] = useState(false);

    const AbrirUsuarios = () => {
        setReportes(!Reportes);
    };
    const CerrarUsuarios = () => {
        setReportes(false);
    };

    const AbrirHistorial = () => {
        setHisotrial(!Historiall);
    };
    const CerrarHistorial = () => {
        setHisotrial(false);
    };




    const idUsuario = localStorage.getItem('id_usuario');
    const correo = localStorage.getItem('correo');
    const cargo = localStorage.getItem('rol');
    // Obtener ID de usuario desde localStorage


    return (
        <>



            <style>
                {`
                .AMCL{
                    width:200px;   
                    height:100%;
                    background-color:white;
                    position:fixed;   
                    top:0px;   
                    left:0px;
                    z-index:10;
                    margin-left:-300px;  
                    display:flex;   
                    align-item:center;
                    flex-direction:column;
                    justify-content:start;
                    transition: all ease-in-out 1s;
                }
                .AMCL.ALCL{
                    margin-left:-2px;
                    transition:all ease-in-out 1s;
                    border:solid 1px rgba(0,0,0,12%);
                }
                .MPCS{
                    width: 300px;
                    height: 261px;
                    position: fixed;
                    top: 90px;
                    right: 10px;
                    z-index: 3;
                    background-image: linear-gradient(180deg, #E7EFF7 38%, white 38%);
                    border-radius: 10px;
                    border: solid 2px rgba(20, 20, 20, 0.05);
                    margin-right: -1000px;
                    transition: all ease-in-out 1s;
                }
                .MPCS.ALCS{
                    margin-right:000px;
                    transition:all ease-in-out 1s;
                }
            `}
            </style>

            <div className={`MPCS ${MCS ? 'ALCS' : ''}`}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    zIndex: '4'
                }}>


                <h2 style={{ fontSize: '18px', marginTop: '-5px' }}>{cargo}</h2>
                <img src={ejemplo}
                    style={{
                        borderRadius: '50%', width: '80px',

                    }} />
                <h2
                    style={{
                        fontSize: '14px'
                    }}>{idUsuario}</h2>
                <p
                    style={{
                        fontSize: '14px', color: '#ABA5A5',
                        marginTop: '-5px', marginBottom: '-10px'
                    }}>{correo}</p>

                <a href="/">
                    <Cerrar_Sesion />
                </a>
                <p style={{ margin: '0', fontSize: '11px', cursor:'pointer' }} onClick={AMCS}>cancelar</p>
            </div>
            <div className={`AMCL ${MCL ? 'ALCL' : ''}`}>
                <img src={Cerrar} onClick={CMCL}
                    style={{
                        width: '40px',
                        cursor: 'pointer'
                    }} />
                <img src={Logo}
                    style={{
                        width: '110px', margin: '10px auto'
                    }} />
                {['Reportes', 'Historial'].map((text, index) => (
                    <button
                        key={text}
                        style={{
                            backgroundColor: botonActivo === text ? '#F5F7FA' : 'white',
                            border: 'none',
                            borderLeft: botonActivo === text ? 'solid 4px #2D60FF' : 'none',
                            color: botonActivo === text ? '#096ECB' : '#B1B1B1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            width: '100%',
                            padding: '15px', cursor: 'pointer'
                        }}
                        onClick={() => handleClick(text)}
                    >
                        <img
                            src={Imagenes[index].icono}
                            style={{
                                marginRight: '20px',
                                transition: 'fill 0.3s ease',
                            }}
                        />
                        <b>{text}</b>
                    </button>
                ))}
            </div>
            {Reportes && (
                <TablaInstructor />
            )};
            {Historiall && (
                <TablaHistorial />
            )};
            {showSearchIcon && (
                <div className='Lateral'
                    style={{
                        width: '200px', height: '100vh', position: 'fixed', zIndex: '4',
                        background: 'white', borderRight: 'solid 1px rgba(0,0,0,12%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'column',
                        marginTop: '-20px'
                    }}>
                    <img src={Logo}
                        style={{
                            width: '110px', marginTop: '20px',
                        }} />



                    {['Reportes', 'Historial'].map((text, index) => (
                        <button
                            key={text}
                            style={{
                                backgroundColor: botonActivo === text ? '#F5F7FA' : 'white',
                                border: 'none',
                                borderLeft: botonActivo === text ? 'solid 4px #2D60FF' : 'none',
                                color: botonActivo === text ? '#096ECB' : '#B1B1B1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                width: '100%',
                                padding: '15px', cursor: 'pointer'
                            }}
                            onClick={() => handleClick(text)}
                        >
                            <img
                                src={Imagenes[index].icono}
                                style={{
                                    marginRight: '20px',
                                    transition: 'fill 0.3s ease',
                                }}
                            />
                            <b>{text}</b>

                        </button>
                    ))}

                </div>)}
            <div
                style={{
                    width: windowWidth >= 1500 ? '89.5%' : '100%', height: '100vh', position: 'fixed', top: '0', right: '1px',
                    display: 'flex', alignItems: 'end', justifyContent: 'end', flexDirection: 'column'
                }}>

                <div
                    style={{
                        width: '98%', height: '80px',
                        background: 'white', borderBottom: 'solid 1px rgba(0,0,0,12%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '2%',
                        gap: '1rem',
                        position: 'fixed', top: '0px', right: '0px'
                    }}>
                    <img src={Menu} onClick={CMCL}
                        style={{
                            width: '40px', position: 'fixed', top: 'auto', left: '30px',
                            cursor: 'pointer'
                        }} />
                    <div
                        style={{
                            width: '40px', height: '40px',
                            background: '#F5F7FA', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                        <img src={Confi} />

                    </div>
                    <div
                        style={{
                            width: '40px', height: '40px',
                            background: '#F5F7FA', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                        <img src={Noti} />
                    </div>
                    <img src={ejemplo} onClick={AMCS}
                        style={{
                            width: '50px', borderRadius: '50%', cursor: 'pointer'
                        }} />


                </div>


            </div>

        </>
    )
}