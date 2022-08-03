import axios from "axios";

const getToken = (data) => {

    return axios
    .post(`http://localhost:3000/api/login`, {
            username: data.username,
            password: data.password  
    })
    .then((response => {
        return response.data;
    }));

};

const LoginService = {
    getToken,
  };

export default LoginService;