import axios from "axios";

const altaCriptomoneda = (data) => {

    console.log("CRIPTOMONEDAS SERVICE");
    console.log(data);

    return axios
    .post(`http://localhost:3000/api/criptomonedas`, {
        nombre: data.nombre,
        simbolo: data.simbolo,
        creacion: data.creacion,
        esStablecoin: data.esStablecoin.toString()
    }, 
    {
        headers: {
            'Authorization':'Bearer '+(localStorage.getItem("token")).toString()
        }
    })
    .then((response => {
        return response.data;
    }));
};

const modificacionCriptomoneda = (data) => {

    console.log(data)

    return axios
    .put(`http://localhost:3000/api/criptomonedas/`, {
        nombre: data.nombre,
        simbolo: data.simbolo,
        creacion: data.creacion,
        esStablecoin: data.esStablecoin.toString(),
        id: data.id
    },  
    {
        headers: {
            'Authorization':'Bearer '+(localStorage.getItem("token")).toString()
        }
    })

};

const bajaCriptomoneda = (data) => {

    console.log(data)

    return axios
    .delete(`http://localhost:3000/api/criptomonedas/`+data.id,  
    {
        headers: {
            'Authorization':'Bearer '+(localStorage.getItem("token")).toString()
        }
    })

};

const CriptomonedasService = {
    altaCriptomoneda,
    modificacionCriptomoneda,
    bajaCriptomoneda
};

export default CriptomonedasService;