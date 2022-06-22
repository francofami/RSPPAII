import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom"

const Criptomonedas = () => {

    const [busqueda, setBusqueda] = useState("")
    const [criptomonedas, setCriptomonedas] = useState([])

    const URL = 'https://api.coingecko.com/api/v3/coins'
    
    const traerDatos = () => {
        axios.get(URL).then( (res) => {
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

    const resultados = !busqueda ? criptomonedas : criptomonedas.filter((val) => val.name.toLowerCase().includes(busqueda.toLowerCase()))
    console.log(resultados)

  return (
    <>
    <input value={busqueda} onChange={buscador} type='text' placeholder='Buscar criptomonedas...' className='form-control'/>
    <table className='table table-dark table-hover mt-3'>
        <thead>
            <tr>
                <th>Ranking</th>
                <th>Nombre</th>
                <th>Símbolo</th>
                <th>Precio</th>
                <th>Precio 24hs</th>
            </tr>
        </thead>
        <tbody>
            { resultados.map( (resultado) => (
                <tr key={resultado.id}>
                    <td>{resultado.market_data.market_cap_rank}</td>
                    <td>
                        <small><img src={resultado.image.small}/></small>  
                        <NavLink 
                            to={{pathname: '/conversion'}}
                            state={{criptomoneda: resultado}}
                        > {resultado.name} 
                        </NavLink>
                    </td>
                    <td>{resultado.symbol.toUpperCase()}</td>
                    <td>{resultado.market_data.current_price.bmd.toFixed(2)}</td>
                    <td>
                        { resultado.market_data.price_change_percentage_24h < 0 ? (
                            <span className='badge bg-danger'> {resultado.market_data.price_change_percentage_24h.toFixed(2)} % </span>
                        ):(
                            <span className='badge bg-success'> {resultado.market_data.price_change_percentage_24h.toFixed(2)} % </span>
                        ) }
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default Criptomonedas