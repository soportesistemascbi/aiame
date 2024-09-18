//--------------------------------------------------------------------------------------------
//Importaciones de Imagenes e iconos
import Usuario from './Icon_inputs/Usuario.svg'
import T_documento from './Icon_inputs/T_documento.svg'
import Contraseñas from './Icon_inputs/Contra.svg'

import Correo from './Icon_inputs/Gmail.svg'
import Cedula from './Icon_inputs/Cedula.svg'
import Numero from './Icon_inputs/Number.svg'

//--------------------------------------------------------------------------------------------
//Importaciones de Componentes
import { useState } from 'react';
//--------------------------------------------------------------------------------------------
export function Nombre() {
    const handleKeyDown = (event) => {
        const regex = /^[A-Za-z\s]*$/; // Permite letras y espacios
        if (!regex.test(event.key) && event.key !== ' ') {
            event.preventDefault();
        }
    };

    return (
        <div className="inputGroup">
            <input type="text" required autoComplete="off" id="name" name="nombre" onKeyDown={handleKeyDown} />
            <img
                src={Usuario}
                alt="Icono de usuario"
                style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                }}
            />
            <label htmlFor="name">Nombre</label>
        </div>
    );
}

//--------------------------------------------------------------------------------------------
export function TipoDocumento() {
    const [tipoDocumento, setTipoDocumento] = useState<string>('Tipo de Documento');
    const tiposDocumento: string[] = ['Cedula', 'Carnet de Extranjería', 'Pasaporte', 'Otro'];
    const handleTipoDocumentoClick = (tipo: string) => {
        setTipoDocumento(tipo);
    };
    const [mostrarPanel, setMostrarPanel] = useState<boolean>(false);

    const togglePanel = () => {
        setMostrarPanel(!mostrarPanel);
    };

    return (
        <div 
        style={{
            width:'400px',height:'40px'
        }}>
            <input
                type="text"
                required
                autoComplete="off"
                id="name"
                name="nombre"
                readOnly
                placeholder={tipoDocumento}
                onClickCapture={togglePanel}
                onClick={(e) => e.currentTarget.nextSibling?.classList.toggle('show')}

                style={{
                    width:'calc(15em + 8.3vw)',paddingTop:'13px',paddingBottom:'13px',paddingLeft:'40px',
                    borderRadius:'8px',border:'none',outline:'none'
                }}
            />
            
            <img
                src={Cedula}
                alt="Icono de usuario"
                style={{
                    position:'relative',
                    top: '-33px',
                    left: '10px',
                }}
            />
            {mostrarPanel && (
                <div className="dropdown-content">
                {tiposDocumento.map((tipo, index) => (
                    <span key={index} onClick={() => handleTipoDocumentoClick(tipo)} >
                        <div onClick={togglePanel}
                            style={{
                                color: 'black', 
                                padding:'7px', fontOpticalSizing: 'auto', fontWeight: '600',
                                display:'flex',justifyContent:'start',transition:'all ease-in-out 300ms',
                                

                            }}>{tipo}</div> 
                    </span>
                ))}
            </div>
            )}
        </div>
    );
}

//--------------------------------------------------------------------------------------------
export function NDocumento() {
    const handleKeyDown = (event) => {
        // Código ASCII de los números del 0 al 9: 48-57
        const key = event.key;
        const isNumber = (key >= '0' && key <= '9') || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
        if (!isNumber) {
            event.preventDefault();
        }
    };

    return (
        <div className="inputGroup">
            <input
                type="text"
                required
                autoComplete="off"
                id="NumeroDoc"
                name="nombre"
                onKeyDown={handleKeyDown}
            />
            <img
                src={Numero}
                alt="Icono de usuario"
                style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                }}
            />
            <label htmlFor="name">Numero de documento</label>
        </div>
    );
}


export function Gmail() {

    return (
        <div className="inputGroup"
        style={{
            marginTop:'2px'
        }}>
            <input type="e-mail" required autoComplete="off" id="e-mail" name="e-mail"  />
            <img
                src={Correo}
                alt="Icono de usuario"
                style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                }}
            />
            <label htmlFor="name">Correo electronico</label>
        </div>
    );
}

//--------------------------------------------------------------------------------------------
export function NumeroTelefono() {
    const handleKeyDown = (event) => {
        // Código ASCII de los números del 0 al 9: 48-57
        const key = event.key;
        const isNumber = (key >= '0' && key <= '9') || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight';
        if (!isNumber) {
            event.preventDefault();
        }
    };

    return (
        <div className="inputGroup">
            <input
                type="text"
                required
                autoComplete="off"
                id="telefono"
                name="nombre"
                onKeyDown={handleKeyDown}
            />
            <img
                src={Numero}
                alt="Icono de usuario"
                style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                }}
            />
            <label htmlFor="name">Numero de telefono</label>
        </div>
    );
}


//--------------------------------------------------------------------------------------------
export function Contraseña() {
    
    return (
        <div className="inputGroup">
            <input
                type="password"
                required
                autoComplete="off"
                id="contraseña"
                name="nombre"
               
            />
            <img
                src={Contraseñas}
                alt="Icono de usuario"
                style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '10px',
                    marginTop: '10px'
                }}
            />
            <label htmlFor="name">Contraseña</label>
        </div>
    );
}

//--------------------------------------------------------------------------------------------
