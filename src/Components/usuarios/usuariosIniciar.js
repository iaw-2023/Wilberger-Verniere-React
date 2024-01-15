import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { dataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

function UsuariosIniciar() {

    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const { setLogin, setAuthToken } = useContext(dataContext);
    const API_URL = "https://wilberger-verniere-laravel-zxwy.vercel.app";

    const navigate = useNavigate();

    const fetchUsuario = () =>
    {
        console.log("Busco usuario:",email, contraseña);
        const data = {
            email: email,
            password: contraseña,
        };

        return axios.post(API_URL+"/rest/login",data)
        .then(function (response) {
            console.log(response);
            setAuthToken(response.data.access_token);

            setLogin(true);
            setError(null);

            navigate('/');
          })
        .catch(function (error) {
            console.log(error);
            setError(error);
          });
    }

    const handleTextEmail = (event) => 
    {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const handleTextContraseña = (event) => 
    {
        event.preventDefault();
        setContraseña(event.target.value);
    }

    return (
        <div>
            <div className="email">
                Email: 
                <input type="text" className="input-user-emailUser" value={email} onChange={handleTextEmail}/>
            </div> 
            <div className="contraseña">
                Contraseña: 
                <input type="text" className="input-user-contraseñaUser" value={contraseña} onChange={handleTextContraseña}/>
            </div>
            <div className="error-message">
                {error && <p>{error.message}</p>}
            </div>
            { email && contraseña && <button className="boton-enviar" onClick={ ()=>fetchUsuario() }>Confirmar</button>}
        </div>
    )
}

export default UsuariosIniciar
