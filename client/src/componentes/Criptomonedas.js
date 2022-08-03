import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import BarraNavegacion from './BarraNavegacion'
import Button from 'react-bootstrap/Button';
import CriptomonedasService from '../servicios/criptomonedasService';
import Modal from 'react-bootstrap/Modal';
import ModificacionCriptomoneda from './ModificacionCriptomoneda';

const Criptomonedas = () => {


    const [busqueda, setBusqueda] = useState("")
    const [criptomonedas, setCriptomonedas] = useState([])
    const [crpMod, setCriptoAModificar] = useState([])

    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const URL = 'http://localhost:3000/api/criptomonedas'
    
    const traerDatos = () => {
        axios.get(URL, {
            headers: {
                'Authorization':'Bearer '+(localStorage.getItem("token")).toString()
            }
        }).then( (res) => {
            console.log(res.data)
            setCriptomonedas(res.data)
        } )
    }

    useEffect( () => {
        traerDatos()
    }, [] )

    const buscador = (e) => {
        setBusqueda(e.target.value)
    }

    const eliminarCriptomoneda = async (e, param) => {
        try {
            await CriptomonedasService.bajaCriptomoneda(param).then(
                () => {
                    alert("Criptomoneda eliminada satisfactioriamente.");
                    navigate(0);
                },
                (error) => {
                alert(error.response.data.message)
                }
            );
        } catch(err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        setShow(false);
    } 

    const handleShow = (e, res) => {

        setCriptoAModificar(res);        

        setShow(true);

    } 

    const resultados = !busqueda ? criptomonedas : criptomonedas.filter((val) => val.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    console.log(resultados)

  return (
    <>
    <div>
        <BarraNavegacion></BarraNavegacion>
    </div>
    <input value={busqueda} onChange={buscador} type='text' placeholder='Buscar criptomonedas...' className='form-control'/>
    <table className='table table-dark table-hover mt-3'>
        <thead>
            <tr>
                <th>Símbolo</th>
                <th>Nombre</th>
                <th>Año de lanzamiento</th>
                <th>¿Es Stablecoin?</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            { resultados.map( (resultado) => (
                <tr key={resultado.simbolo}>
                    <td>{resultado.simbolo}</td>
                    <td>
                        {/* <small><img src={resultado.image.small}/></small> */}
                        <NavLink 
                            to={{pathname: '/conversion'}}
                            state={{criptomoneda: resultado}}
                        > {resultado.nombre} 
                        </NavLink>
                    </td>
                    
                    <td>{resultado.creacion}</td>

                    <td>
                        { resultado.esStablecoin !== true ? (
                            <span className='badge bg-danger'> {resultado.esStablecoin} No </span>
                        ):(
                            <span className='badge bg-success'> {resultado.esStablecoin} Si </span>
                        ) }
                    </td>

                    <td>

                        <Button variant="warning" onClick={event => handleShow(event, resultado)}>Modificar</Button>{' '}
                        <Button variant="danger" onClick={event => eliminarCriptomoneda(event, resultado)}>Eliminar</Button>{' '}
                        
                    </td>
                </tr>
            ))}
        </tbody>
    </table>


    <Modal show={show} onHide={handleClose} size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Criptomoneda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ModificacionCriptomoneda data={crpMod}></ModificacionCriptomoneda>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          
                        </Modal.Footer>
    </Modal>


    </>
  )
}

export default Criptomonedas