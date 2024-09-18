import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Error404 = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6'
            }, children: [_jsx("h1", { style: {
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        color: '#fca5a5',
                        marginBottom: '1rem'
                    }, children: "404" }), _jsx("p", { style: {
                        fontSize: '1.5rem',
                        color: '#374151',
                        marginBottom: '2rem'
                    }, children: "Oops! P\u00E1gina no encontrada" }), _jsx("a", { href: "/", style: {
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '0.25rem',
                        textDecoration: 'none',
                        transition: 'background-color 0.3s'
                    }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#2563eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#3b82f6', children: "Volver al inicio" })] }) }));
};
export default Error404;
