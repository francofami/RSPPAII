import React, {useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import RegistroService from "../servicios/registroService";


const Registro = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const navigate = useNavigate();

    const state  = {
        username: username,
        password: password,
    };


    const usrn = (e) => {
        setUsername(e.target.value);
    }

    const psswd = (e) => {
        setPassword(e.target.value);
    }

    const psswdConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const crearUsuario = async (e) => {
        e.preventDefault();

        if (state.password !== passwordConfirm) {
            alert("Las contraseñas no coinciden.");
        } else {
            try {
                await RegistroService.crearUsuario(state).then(
                  () => {
                    alert("Cuenta creada satisfactioriamente.");
                    navigate("/");
                  },
                  (error) => {
                    alert(error.response.data.message)
                  }
                );
              } catch (err) {
                console.log(err);
              }
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
                                        <h3>Registro</h3>
    
                                        <br></br>
    
                                        <div className="mb-3">
                                        <label>Usuario</label>
                                        
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ingrese nombre de usuario"
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="username"
                                            value={username}
                                            onChange={usrn}
                                        />
                                        
                                        </div>
    
                                        <div className="mb-3">
                                        <label>Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Ingrese contraseña"
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="password"
                                            value={password}
                                            onChange={psswd}
                                        />
                                        </div>

                                        <div className="mb-3">
                                        <label>Confirmar contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Reingrese contraseña"
                                            style={{width: "80vh", height:"4vh", textAlign:"center", justifyContent:"center", alignItems: "center"}}
                                            name="passwordConfirm"
                                            onChange={psswdConfirm}
                                        />
                                        </div>
    
                                        <div>
                                            
                                        </div>
                                        
                                        <div>
                                            <br></br><br></br><br></br><br></br><br></br><br></br>
                                            
                                            
                                            <button className="btn btn-secondary" style={{width: "30vh"}}>
                                                <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Volver</NavLink>
                                            </button>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-success" style={{width: "30vh"}} onClick={crearUsuario}>
                                                Registrarme
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

export default Registro;