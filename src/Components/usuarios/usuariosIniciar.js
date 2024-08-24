import styles from "./usuarios.module.css";
import { useState } from "react";
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
            console.log("Response: ",response);
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('authToken', response.data.access_token);
            sessionStorage.setItem('userNombre', response.data.user_name);
            sessionStorage.setItem('userEmail', response.data.user_email);
            setError(null);
            navigate('/');
          })
        .catch(function (error) {
            console.log("Error: ",error.response);
            setError(error.response.data.message);
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
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Iniciar sesion</h2>
                <label for="email" className="requiredLabel">
                    Email: <span className="requiredAsterisco">*</span>
                    <input type="text" className={styles.input} id="email" value={email} onChange={handleTextEmail} />
                </label>
                <label for="contraseña" className="requiredLabel">
                    Contraseña: <span className="requiredAsterisco">*</span>
                    <input type="password" className={styles.input} id="contraseña"  value={contraseña} onChange={handleTextContraseña} />
                </label>
                <div className={styles.errorMessage}>
                    {error && <p>{error}</p>}
                </div>
                <button className={`button button_login`} onClick={() => submitLogin()} disabled={!email || !contraseña}>Confirmar</button>
                <p className="requiredNota">Los campos marcados con * son obligatorios</p>
            </div>
        </div>
    )
}

export default UsuariosIniciar
