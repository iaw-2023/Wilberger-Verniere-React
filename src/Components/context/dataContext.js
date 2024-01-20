import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../Services/api';

export const dataContext = createContext([]);

const DataProvider = ( {children} ) => {
    const [carrito, setCarrito] = useState([]);
    const [peliculaElegida, setPeliculaElegida] = useState([]);
    const [compraElegida, setCompraElegida] = useState();
    const [login, setLogin] = useState(
        localStorage.getItem('login') == 'true' || false
    );
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') || ""
    );
    const navigate = useNavigate();

    const promptComprar = (compra) => 
    {    
        if (!login){ //Si no esta logueado lo redirecciona a pantalla de login
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
            console.log(carrito);
        }
        console.log("Se cancelo comprar tickets");
    }

    const comprar = (compra, tickets) => 
    {
        setCarrito( () => {
            compra.NroTickets = tickets;
            let found = false;
            let index = 0;
            console.log("Buscando compra en carrito");
            while (!found && index < carrito.length){
                let aux = carrito.at(index);
                if (comprasIguales(aux,compra)){
                    aux.NroTickets += compra.NroTickets;
                    found = true;
                    console.log("Se encontro compra en carrito y se sumaron tickets");
                }
                index++;
            }
            if (!found){
                console.log("No se encontro, se agrego nueva compra al carrito");
                carrito.push (compra);
            }
            return carrito;
        });
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
        setCarrito( () => {
            let nuevoCarrito = [];
            for (let i=0; i<carrito.length; i++){
                if (i != index){
                    nuevoCarrito.push(carrito[i]);
                }
            }
            return nuevoCarrito;
        });
    }

    const confirmarCompra = (observaciones, email, fechaCompra) =>
    {
        let obvs = observaciones;
        if (obvs=="") { obvs = "-";}
        apiClient.post("/rest/compras/crear",
        { 
            'Observaciones': obvs, 
            'Email': email, 
            'FechaCompra': fechaCompra, 
            'Compras': carrito 
        },
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(function (response) {
            console.log(response);
            setCarrito([]);
          })
        .catch(function (error) {
            console.log(error);
            return null;
          }); 
    }

    const limpiarCompra = () =>
    { 
        setCarrito( () => {
            return [];
        });
    }

    const handleLogOut = () =>
    {
      console.log("Mi authToken es (en handleLogOut): ",authToken);
      apiClient.post("/rest/logout",
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept :'application/json', 
            },
        })
        .then(function (response) {
            console.log(response);
            setAuthToken("");
            localStorage.setItem('authToken', "");
            setLogin(false);
            localStorage.setItem('login', false);
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
      navigate("/");
    } 

    const fetchNombreUsuario = () => 
    {
       console.log("Mi authToken es (en fetchNombreUsuario): ",authToken);
       apiClient.get("/rest/user",
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept :'application/json', 
            },
        })
        .then(function (response) {
            console.log(authToken);
            console.log(response);
            return response.data.nombre
          })
        .catch(function (error) {
            console.log(error);
            return null;
          });
    }

    const fetchEmailUsuario = () => 
    {
        console.log("Mi authToken es (en fetchEmailUsuario): ",authToken);
        apiClient.get("/rest/user",
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept :'application/json', 
            },
        })
        .then(function (response) {
            console.log(authToken);
            console.log(response);
            return response.data.email
          })
        .catch(function (error) {
            console.log(error);
            return null;
          });
    }

    return <dataContext.Provider value={ 
        {
            carrito, setCarrito, 
            promptComprar, cancelarOrden, 
            confirmarCompra, limpiarCompra, 
            peliculaElegida, setPeliculaElegida,
            compraElegida, setCompraElegida,
            login, setLogin,
            authToken, setAuthToken,
            handleLogOut,
            fetchNombreUsuario,
            fetchEmailUsuario
        }
    }>{children}</dataContext.Provider>
};

export default DataProvider;
