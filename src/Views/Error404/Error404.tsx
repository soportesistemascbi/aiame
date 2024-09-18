import React from 'react';

const Error404: React.FC = () => {
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f4f6'
            }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    color: '#fca5a5',
                    marginBottom: '1rem'
                }}>
                    404
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: '#374151',
                    marginBottom: '2rem'
                }}>
                    Oops! Página no encontrada
                </p>
                <a
                    href="/"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '0.25rem',
                        textDecoration: 'none',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                    Volver al inicio
                </a>
            </div>
        </>
    );
};

export default Error404;