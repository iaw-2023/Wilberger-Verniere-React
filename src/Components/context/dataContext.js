import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../Services/api';
import OPENAI_API_KEY from '../../config/openai'; 
import OPEN_DATABASE_API_KEY from '../../config/openDatabase'; 
import axios from 'axios';

export const dataContext = createContext([]);

const DataProvider = ( {children} ) => {
    const [respuestaChatGPT, setRespuestaChatGPT] = useState('');
    const [errorRespuestaChatGPT, seterrorRespuestaChatGPT] = useState('');
    const [respuestaOpenMovie, setRespuestaOpenMovie] = useState('');
    const [errorRespuestaOpenMovie, seterrorRespuestaOpenMovie] = useState('');

    const navigate = useNavigate();

    const promptComprar = (compra) => 
    {    
        if (!sessionStorage.getItem('authToken')){ //Si no esta logueado lo redirecciona a pantalla de login
            navigate('/usuariosIniciar');
            return;
        }

        var valorValido = true;
        var p = prompt("Ingrese la cantidad de tickets que desea comprar, hay "+compra.AsientosDisponible+" asientos disponibles");
        var cantTickets = parseInt(p);
        if (cantTickets>compra.AsientosDisponible || cantTickets<=0 || isNaN(cantTickets)) { valorValido=false; }
        while (!valorValido && p){
            p = prompt("Error: no ingreso una cantidad de tickets valida, ingrese un nuevo valor, hay "+compra.AsientosDisponible+" asientos disponibles");
            cantTickets = parseInt(p);
            if (cantTickets<=compra.AsientosDisponible && cantTickets>0) { valorValido=true; }
            else { console.log("El valor insertado no es valido, ingrese uno nuevo"); }
        }
        if (p){
            console.log("se va a llamar a comprar");
            comprar(compra, cantTickets);
            console.log("se completo comprar");
            console.log("Carrito JSON: ", JSON.parse(sessionStorage.getItem('carrito')));
        }
        console.log("Se cancelo comprar tickets");
    }

    const comprar = (compra, tickets) => 
    {
        compra.NroTickets = tickets;
        let CARRITO_JSON = JSON.parse(sessionStorage.getItem('carrito')) || [];
        let found = false;
        let index = 0;
        console.log("Buscando compra en carrito");

        while (!found && index < CARRITO_JSON.length){
            let aux = CARRITO_JSON[index];
            if (comprasIguales(aux,compra)){
                aux.NroTickets += compra.NroTickets;
                found = true;
                console.log("Se encontro compra en carrito y se sumaron tickets");
            }
            index++;
        }
        if (!found){
            console.log("No se encontro, se agrego nueva compra al carrito");
            CARRITO_JSON.push(compra);
        }
        sessionStorage.setItem('carrito', JSON.stringify(CARRITO_JSON));
    }
 
    const comprasIguales = (compra1, compra2) => 
    {
        return (
            compra1.Pelicula == compra2.Pelicula && 
            compra1.Fecha == compra2.Fecha && 
            compra1.NroSala == compra2.NroSala && 
            compra1.Hora == compra2.Hora
        )
    }

    const cancelarOrden = (index) =>
    {
        let CARRITO_JSON = JSON.parse(sessionStorage.getItem('carrito')) || [];
        let nuevoCarrito = [];
        for (let i=0; i<CARRITO_JSON.length; i++){
            if (i != index){
                nuevoCarrito.push(CARRITO_JSON[i]);
            }
        }
        sessionStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

        CARRITO_JSON = JSON.parse(sessionStorage.getItem('carrito'));
        console.log("Compra cancelada, carrito JSON: ", CARRITO_JSON);
    }

    const confirmarCompra = (observaciones, email, fechaCompra) =>
    {
        let obvs = observaciones === "" ? "-" : observaciones;
        let CARRITO_JSON = JSON.parse(sessionStorage.getItem('carrito'))

        apiClient.post("/rest/compras/crear",
        { 
            'Observaciones': obvs, 
            'Email': email, 
            'FechaCompra': fechaCompra, 
            'Compras': CARRITO_JSON 
        },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
        .then(function (response) {
            console.log("Response: ",response);
            limpiarCompra();
          })
        .catch(function (error) {
            console.log("Error: ",error);
          }); 
    }

    const limpiarCompra = () => { 
        sessionStorage.setItem('carrito', JSON.stringify([]));
    }

    const handleLogOut = () =>
    {
      console.log("Mi authToken es (en handleLogOut): ",sessionStorage.getItem('authToken'));
      apiClient.post("/rest/logout", {},
        {
            
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
            },
        })
        .then(function (response) {
            console.log("Response: ",response);
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('login');
            sessionStorage.removeItem('userNombre');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('carrito');
            sessionStorage.removeItem('compraElegida');
            sessionStorage.removeItem('peliculaElegida');
            navigate("/usuariosIniciar");
        })
        .catch(function (error) {
            console.log("Error: ",error);
            return null;
        });
    } 

    const obtenerInfoPeliculaChatGPT = (nombre) => 
    {
        setRespuestaChatGPT('');
        const consulta = "¿Can you give me a short plot description of the movie: "+nombre+"?. If not posible respond 'Error al buscar una sinopsis en ChatGPT'";
        preguntarChatGptAPI(consulta);
    }

    const preguntarChatGptAPI = async (consulta) =>
    {
        try {
            const response = await axios.get(
                'https://api.openai.com/v1/chat/completions',
              {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: consulta },
                ],
                max_tokens: 250,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
              }
            );
            console.log('Respuesta ChatGPT: ',response);
            if (response.data && response.data.choices && response.data.choices.length > 0){
                setRespuestaChatGPT(response.data.choices[0].message.content);
                seterrorRespuestaChatGPT('');
            }
          } catch (error) { 
                console.error('Error:', error);
                seterrorRespuestaChatGPT('ERROR: solicitud ChatGPT');
            }
    }

    const obtenerInfoPeliculaOpenMovie = (nombre) =>
    {
        setRespuestaOpenMovie('');
        let nombreFormateado = nombre.replace(/\s/g, '+');
        console.log("nombreFormateado: ",nombreFormateado);        
        preguntarOpenMovie(nombreFormateado);
    }

    const preguntarOpenMovie = async (nombre) =>
    {
        try {
            const response = await axios.get(
                'https://www.omdbapi.com/?apikey='+OPEN_DATABASE_API_KEY+'&'+'t='+nombre,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Respuesta OpenMovie: ', response);
            if (response.data){
                setRespuestaOpenMovie(response.data);
                seterrorRespuestaOpenMovie('');
            }
          } catch (error) { 
                console.error('Error:', error);
                seterrorRespuestaOpenMovie('ERROR: solicitud OpenMovieDB');
            }
    }

    const pagarconMP = () => {
        navigate('/pagoTarjeta');
        return;
    }

    return <dataContext.Provider value={ 
        {
            promptComprar, 
            cancelarOrden, 
            limpiarCompra, confirmarCompra, pagarconMP,
            obtenerInfoPeliculaChatGPT, respuestaChatGPT, errorRespuestaChatGPT,
            obtenerInfoPeliculaOpenMovie, respuestaOpenMovie, errorRespuestaOpenMovie, 
            handleLogOut
        }
    }>{children}</dataContext.Provider>
};

export default DataProvider;
