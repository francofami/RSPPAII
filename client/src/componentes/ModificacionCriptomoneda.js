import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CriptomonedasService from '../servicios/criptomonedasService';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ModificacionCriptomoneda = (criptomoneda) => {

    const [nombre, setNombre] = useState(criptomoneda.data.nombre)
    const [simbolo, setSimbolo] = useState(criptomoneda.data.simbolo)
    const [creacion, setCreacion] = useState(criptomoneda.data.creacion)
    const [esStablecoin, setEsStablecoin] = useState(criptomoneda.data.esStablecoin)

    const navigate = useNavigate();

    console.log("MODIFICACION CRIPTOMONEDA")
    console.log(criptomoneda.data)

    const state  = {
        nombre: nombre,
        simbolo: simbolo,
        creacion: creacion,
        esStablecoin: esStablecoin,
        id: criptomoneda.data.id,
    };

    const nom = (e) => {
        setNombre(e.target.value);
    }

    const sim = (e) => {
        setSimbolo(e.target.value.toUpperCase());
    }

    const crea = (e) => {
        setCreacion(e.target.value);
    }

    const stab = (e) => {
        console.log(e);
        esStablecoin ? setEsStablecoin(false): setEsStablecoin(true);
        console.log(state.esStablecoin);
    }

    const modificacionCriptomoneda = async (e) => {
        e.preventDefault();

        if (state.nombre!=null && state.simbolo!=null && state.creacion!=null && esStablecoin!=null) {

            console.log("STATE")
            console.log(state)

            try {
                await CriptomonedasService.modificacionCriptomoneda(state).then(
                  () => {
                    alert("Criptomoneda modificada satisfactioriamente.");
                    navigate(0);
                  },
                  (error) => {
                    alert(error.response.data.message)
                  }
                );
              } catch (err) {
                console.log(err);
              }
            
        } else {
            alert("Hay campos sin rellenar.");         
        }
    }


    
        return(
            <>
                <table className='table table-dark table-hover mt-3'>
                    <div className="container">
                        <div className="row">
                            <div className="panel panel-primary text-center">
                                
                                <br></br>
                                
                                <div className="panel-body" style={{ display: "flex", justifyContent: 'center' }}>
    
    
                                    <form>    
                                        <br></br>
    
                                        <div className="mb-3">
                                        <label>Nombre</label>
                                        
                                        <input
                                            type="text"
                                            className="form-control"
                                            
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="nombre"
                                            value={nombre}
                                            onChange={nom}
                                        />
                                        
                                        </div>
    
                                        <div className="mb-3">
                                        <label>Simbolo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="simbolo"
                                            value={simbolo}
                                            onChange={sim}
                                        />
                                        </div>

                                        <div className="mb-3">
                                        <label>Fecha de Creación</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="creacion"
                                            value={creacion}
                                            onChange={crea}
                                        />
                                        </div>

                                        <div className="mb-3">
                                        <label>¿Es Stablecoin?</label><br></br>
                                            {/*<Switch onClick={stab}/>{ esStablecoin ? 'Si' : 'No' }*/}
                                            <ToggleButton onClick={stab}>{ esStablecoin ? 'Si' : 'No' }</ToggleButton>
                                        </div>

    
                                        <div>

                                        <button type="submit" className="btn btn-success" style={{width: "30vh"}} onClick={modificacionCriptomoneda}>
                                                Guardar cambios
                                        </button>
                                            
                                        </div>
                                        
                                    
                                    </form>

                                            
                                
                                </div>
    
                                <br></br>
    
                            </div>
                        </div>
                    </div>
                </table>
            </>
        )
    
    
}

export default ModificacionCriptomoneda;