import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { dataContext } from "../context/dataContext";
import axios from "axios";
import { Button } from "react-bootstrap";

function usuarios() {

    const [nombreUser, setNombreUser] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [emailValido, SetEmailValido] = useState(false);

    const { emailActivo, usuarioActivo, setUsuarioActivo, setEmailActivo, setLogin } = useContext(dataContext);

    const guardarUsuario = () =>
    {
        console.log("Creo usuario:", nombreUser, contraseña, email);
        return axios.post('https://wilberger-verniere-laravel-zxwy.vercel.app/rest/usuarios/crear',
        {
            'Email': email,
            'Contraseña': contraseña,
            'Nombre': nombreUser
        })
        .then(function (response) {
            console.log(response);
            const { emailRespuesta, nombreRespuesta } = response.data;

            setEmailActivo(emailRespuesta);
            setUsuarioActivo(nombreRespuesta);
            setLogin(true);
            setError(null);
          })
        .catch(function (error) {
            console.log(error);
            setError(error);
          }); 
    }

    const handleTextNombreUser = (event) => 
    {
        event.preventDefault();
        console.log(event.target.value);
        setNombreUser(event.target.value);
    }

    const handleTextEmail = (event) => 
    {
        event.preventDefault();
        console.log(event.target.value);
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
        console.log(event.target.value);
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
            { emailValido && nombreUser && contraseña && <Button className="boton-enviar" onClick={ ()=>guardarUsuario() }>Confirmar</Button>}
        </div>
    )
}

export default usuarios
