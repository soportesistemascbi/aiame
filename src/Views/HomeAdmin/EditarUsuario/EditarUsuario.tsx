
export default function EditarUsuario(){
    return(
        <>
            <table
                style={{
                    width: 'calc(5em + 80vw)', height: '85%', background: 'white', margin: 'auto',
                    boxShadow: '1px 1px 5px 1px #cccccc', borderRadius: '10px', display: 'flex', alignItems: 'center',
                    justifyContent: 'start', textAlign: 'center', flexDirection: 'column', 
                    position:'fixed',bottom:'30px',right:'50px',zIndex:'3'
                }}>
                <thead>
                    <div
                        style={{
                            width: '100%',
                            height: '60px',
                            display: 'flex', alignItems: 'center'
                        }}>
                        <tr>
                            <th style={{color: '#096ECB', fontSize: '20px'}}>Editar usuario</th>
                        </tr>
                    </div>
                    
                    
                </thead>
            </table>
            
        </>
    )
}