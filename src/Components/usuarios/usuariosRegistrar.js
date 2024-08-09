import styles from "./usuarios.module.css";
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
                    console.log("Response: ",response);
                    setNombreUser("");
                    setContraseña("");
                    setEmail("");
                    setRespuesta(response.data.message);
                    Navigate("/usuariosIniciar");
                })
                .catch(function (response) {
                    console.log("Response: ",response);
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
                <label for="nombre-usuario" className="requiredLabel">
                    Nombre de Usuario: <span className="requiredAsterisco">*</span>
                    <input id="nombre-usuario" type="text" className={styles.input} value={nombreUser} onChange={handleTextNombreUser} />
                </label>
                <label for="email-usuario" className="requiredLabel">
                    Email: <span className="requiredAsterisco">*</span>
                    <input id="email-usuario" type="text" className={styles.input} value={email} onChange={handleTextEmail} />
                    {email && (!emailValido) && <div className={styles.emailValidText}>Este email no tiene formato valido!</div>}
                </label>
                <label for="contraseña" className="requiredLabel">
                    Contraseña: <span className="requiredAsterisco">*</span>
                    <input id="contraseña" type="password" className={styles.input} value={contraseña} onChange={handleTextContraseña} />
                </label>
                <div className={styles.responseMessage}>
                    {respuesta && <p>{respuesta.message}</p>}
                </div>
                <Button className={`button button_login`} onClick={() => submitRegister()} disabled={!nombreUser || !emailValido || !contraseña}>Confirmar</Button>
                <p className="requiredNota">Los campos marcados con * son obligatorios</p>
            </div>
        </div>
    )
}

export default UsuariosRegistrar
