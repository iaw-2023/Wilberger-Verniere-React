import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from '../../Services/api';


function UsuariosIniciar() {

    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const submitLogin = () =>
    {
        console.log("Busco usuario:",email, contraseña);
        const data = {
            email: email,
            password: contraseña,
        };

        return apiClient.post("/rest/login",data)
        .then(function (response) {
            console.log(response);
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('authToken', response.data.access_token);
            sessionStorage.setItem('userNombre', response.data.user_name);
            sessionStorage.setItem('userEmail', response.data.user_email);
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
            { email && contraseña && <button className="boton-enviar" onClick={ ()=>submitLogin() }>Confirmar</button>}
        </div>
    )
}

export default UsuariosIniciar
