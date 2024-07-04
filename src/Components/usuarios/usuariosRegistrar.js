import styles from "./usuarios.module.css";
import "../../master.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import apiClient from '../../Services/api';
import { Navigate } from "react-router-dom";

function UsuariosRegistrar() {

    const [nombreUser, setNombreUser] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [respuesta, setRespuesta] = useState(null);
    const [emailValido, SetEmailValido] = useState(false);

    const submitRegister = () =>
    {
        apiClient.get("/sanctum/csrf-cookie")
            .then(() => {
                console.log("Creo usuario:", nombreUser, contraseña, email);
                return apiClient.post("/rest/register", {
                    'email': email,
                    'password': contraseña,
                    'name': nombreUser
                })
                .then(function (response) {
                    console.log(response);
                    setNombreUser("");
                    setContraseña("");
                    setEmail("");
                    setRespuesta(response.data.message);
                    Navigate("/usuariosIniciar");
                })
                .catch(function (response) {
                    console.log(response);
                    setRespuesta(response.data.message);
                });
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
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Registrar usuario</h2>
                <div className="usuario">
                    Nombre de Usuario:
                    <input type="text" className={styles.input} value={nombreUser} onChange={handleTextNombreUser} />
                </div>
                <div className="email">
                    Email:
                    <input type="text" className={styles.input} value={email} onChange={handleTextEmail} />
                    {email && (!emailValido) && <div className={styles.emailValidText}>Este email no es valido!</div>}
                </div>
                <div className="contraseña">
                    Contraseña:
                    <input type="text" className={styles.input} value={contraseña} onChange={handleTextContraseña} />
                </div>
                <div className={styles.responseMessage}>
                    {respuesta && <p>{respuesta.message}</p>}
                </div>
                {emailValido && nombreUser && contraseña && <Button className={styles.button} onClick={() => submitRegister()}>Confirmar</Button>}
            </div>
        </div>
    )
}

export default UsuariosRegistrar
