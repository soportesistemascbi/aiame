import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export default function EditarUsuario() {
    return (_jsx(_Fragment, { children: _jsx("table", { style: {
                width: 'calc(5em + 80vw)', height: '85%', background: 'white', margin: 'auto',
                boxShadow: '1px 1px 5px 1px #cccccc', borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'start', textAlign: 'center', flexDirection: 'column',
                position: 'fixed', bottom: '30px', right: '50px', zIndex: '3'
            }, children: _jsx("thead", { children: _jsx("div", { style: {
                        width: '100%',
                        height: '60px',
                        display: 'flex', alignItems: 'center'
                    }, children: _jsx("tr", { children: _jsx("th", { style: { color: '#096ECB', fontSize: '20px' }, children: "Editar usuario" }) }) }) }) }) }));
}
