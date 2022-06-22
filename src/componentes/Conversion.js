import React, {useState, useEffect} from 'react'
import { NavLink, useLocation } from "react-router-dom"


const Conversion = () => {

    const [costo, setCosto] = useState("")
    const location = useLocation()
    const { state } = location

    // console.log(state.criptomoneda)

    const calcCosto = (e) => {
        setCosto(e.target.value * state.criptomoneda.market_data.current_price.usd)
    }
    


  return (
    <>
    <table className='table table-dark table-hover mt-3'>
        <NavLink to="/">Volver al listado</NavLink>

        <div className="container">
            <div className="row">
                <div className="panel panel-primary text-center">
                    <div className="panel-heading">
                    <h4>{state.criptomoneda.name}</h4>
                    <img src={state.criptomoneda.image.large}/>
                    </div>

                    <br></br>
                    
                    <div className="panel-body">
                    <form className="form-vertical">

                        <div className="form-group center">
                        <label>Cantidad de {state.criptomoneda.symbol} a comprar</label>
                        <input type="number" className="amount form-control" placeholder="Ingresar valor..." onChange={calcCosto}/>
                        </div>

                        <br></br>

                        <div className="form-group inline-block">
                        <label>Precio {state.criptomoneda.symbol}</label>
                        <input readOnly="yes" className="currency-list form-control" placeholder={state.criptomoneda.market_data.current_price.usd}/>
                        </div>

                        <br></br>

                        <div className="form-group inline-block">
                        <label>Vas a gastar</label>
                        <input readOnly="yes" className="currency-list form-control" placeholder={costo}/>
                        </div>

                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
        </table>
    </>
  )
}

export default Conversion