import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { dataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UsuariosIniciar() {

    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const { setLogin, setAuthToken, API_URL } = useContext(dataContext);

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
            setError(response.error);
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
