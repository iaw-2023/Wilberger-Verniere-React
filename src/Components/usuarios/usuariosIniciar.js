import "./usuarios.css";
import "../../master.css";
import { useContext, useState } from "react";
import { dataContext } from "../context/dataContext";

function usuarios() {

    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const { setUsuarioActivo, setEmailActivo } = useContext(dataContext);

    const fetchUsuario = () =>
    {
        console.log("Busco usuario:",contraseña, email);
        /* return axios.get('https://wilberger-verniere-laravel-zxwy.vercel.app/rest/usuarios/iniciar', 
        {
            params: {
                'Email': email,
                'Contraseña': contraseña,
            }
        })
        .then((response) => {
            setUsuarioActivo(response.data.data);
            setEmailActivo(response.data.data);
            setError(null);
        }).catch(setError); */
    }

    const handleTextEmail = (event) => 
    {
        event.preventDefault();
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const handleTextContraseña = (event) => 
    {
        event.preventDefault();
        console.log(event.target.value);
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
            { email && contraseña && <button className="boton-enviar" onClick={ ()=>fetchUsuario() }>Confirmar</button>}
        </div>
    )
}

export default usuarios
