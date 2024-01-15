import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { dataContext } from "../context/dataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function UsuariosRegistrar() {

    const [nombreUser, setNombreUser] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [emailValido, SetEmailValido] = useState(false);

    const { setLogin, setAuthToken } = useContext(dataContext);

    const navigate = useNavigate();

    const guardarUsuario = () =>
    {
        axios.get('https://wilberger-verniere-laravel-zxwy.vercel.app/sanctum/csrf-cookie')
            .then(() => {
                console.log("Creo usuario:", nombreUser, contraseña, email);
                return axios.post('https://wilberger-verniere-laravel-zxwy.vercel.app/rest/register', {
                    'email': email,
                    'password': contraseña,
                    'name': nombreUser
                });
            })
            .then(function (response) {
                console.log(response);
                setAuthToken(response.data.access_token);
                setLogin(true);
                setError(null);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
                setError(error);
            });
    }

    const handleTextNombreUser = (event) => 
    {
        event.preventDefault();
        setNombreUser(event.target.value);
    }

    const handleTextEmail = (event) => 
    {
        event.preventDefault();
        setEmail(event.target.value);
        if (esValidoEmail(event.target.value)){
            SetEmailValido(true);
          }
        else { SetEmailValido(false); }
    }

    const esValidoEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleTextContraseña = (event) => 
    {
        event.preventDefault();
        setContraseña(event.target.value);
    }

    return (
        <div>
            <div className="usuario">
                Nombre de Usuario: 
                <input type="text" className="input-user-nombreUser" value={nombreUser} onChange={handleTextNombreUser}/>
            </div>
            <div className="email">
                Email: 
                <input type="text" className="input-user-emailUser" value={email} onChange={handleTextEmail}/>
                { email && (!emailValido) && <div className='email-valido-text'>Este email no es valido!</div>}
            </div> 
            <div className="contraseña">
                Contraseña:
                <input type="text" className="input-user-contraseñaUser" value={contraseña} onChange={handleTextContraseña}/>
            </div>
            <div className="error-message">
                {error && <p>{error.message}</p>}
            </div>
            { emailValido && nombreUser && contraseña && <Button className="boton-enviar" onClick={ ()=>guardarUsuario() }>Confirmar</Button>}
        </div>
    )
}

export default UsuariosRegistrar
