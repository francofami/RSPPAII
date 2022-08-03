import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import CriptomonedasService from '../servicios/criptomonedasService';
import ToggleButton from 'react-bootstrap/ToggleButton'
import BarraNavegacion from './BarraNavegacion';


const AltaCriptomoneda = () => {

    const [nombre, setNombre] = useState(null)
    const [simbolo, setSimbolo] = useState(null)
    const [creacion, setCreacion] = useState(null)
    const [esStablecoin, setEsStablecoin] = useState(false)

    const navigate = useNavigate();

    const state  = {
        nombre: nombre,
        simbolo: simbolo,
        creacion: creacion,
        esStablecoin: esStablecoin,
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

    const altaCriptomoneda = async (e) => {
        e.preventDefault();

        if (state.nombre!=null && state.simbolo!=null && state.creacion!=null && esStablecoin!=null) {

            console.log("STATE")
            console.log(state)

            try {
                await CriptomonedasService.altaCriptomoneda(state).then(
                  () => {
                    alert("Criptomoneda añadida satisfactioriamente.");
                    navigate("/criptomonedas");
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
                <BarraNavegacion></BarraNavegacion>

                <table className='table table-dark table-hover mt-3'>
                    <div className="container">
                        <div className="row">
                            <div className="panel panel-primary text-center">
                                
                                <br></br>
                                
                                <div className="panel-body" style={{ display: "flex", justifyContent: 'center' }}>
    
    
                                    <form>
                                        <h3>Alta Crimtomoneda</h3>
    
                                        <br></br>
    
                                        <div className="mb-3">
                                        <label>Nombre</label>
                                        
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese nombre de criptomoneda"
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
                                            placeholder="Ingrese símbolo"
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
                                            placeholder="Ingrese fecha de creación"
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
                                            
                                        </div>
                                        
                                        <div>
                                            <br></br><br></br><br></br><br></br><br></br><br></br>
                                            
                                            
                                            <button className="btn btn-secondary" style={{width: "30vh"}}>
                                                <NavLink to="/criptomonedas" style={{ textDecoration: 'none', color: 'inherit' }}>Volver</NavLink>
                                            </button>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-success" style={{width: "30vh"}} onClick={altaCriptomoneda}>
                                                Enviar
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

export default AltaCriptomoneda;