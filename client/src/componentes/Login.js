import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import LoginService from "../servicios/loginService";


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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

    const obtenerToken = async (e) => {
        e.preventDefault();

        try {
            await LoginService.getToken(state).then(
              (res) => {
                localStorage.setItem("token", res.token);
                navigate("/criptomonedas");
              },
              (error) => {
                alert(error.response.data.message)
              }
            );
          } catch (err) {
            console.log(err);
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
    
    
                                    <form >
                                        <h3>Ingreso</h3>
    
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
    
                                        <div>
                                            
                                        </div>
                                        
                                        <div>
                                            <br></br><br></br><br></br><br></br><br></br><br></br>
                                            
                                            
                                            <button type="submit" className="btn btn-primary" style={{width: "30vh"}} onClick={obtenerToken}>
                                                Iniciar Sesión
                                            </button>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            
                                            
                                            <button className="btn btn-success" style={{width: "30vh"}}>
                                                <NavLink to="/registro" style={{ textDecoration: 'none', color: 'inherit' }}>Registro</NavLink>
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

export default Login;