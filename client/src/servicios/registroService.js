import axios from "axios";

const crearUsuario = (data) => {

    return axios
    .post(`http://localhost:3000/api/users`, {
        username: data.username,
        password: data.password
    })
    .then((response => {
        return response.data;
    }));

}

const RegistroService = {
    crearUsuario,
  };

export default RegistroService;