import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const dataContext = createContext([]);

const DataProvider = ( {children} ) => {
    const [carrito, setCarrito] = useState([]);
    const [peliculaElegida, setPeliculaElegida] = useState([]);
    const [compraElegida, setCompraElegida] = useState();
    const [login, setLogin] = useState(false);
    const [usuarioActivo, setUsuarioActivo] = useState("");
    const [emailActivo, setEmailActivo] = useState("");
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
        axios.post('https://wilberger-verniere-laravel-zxwy.vercel.app/rest/compras/crear',
        { 
            'Observaciones': obvs, 
            'Email': email, 
            'FechaCompra': fechaCompra, 
            'Compras': carrito 
        })
        .then(function (response) {
            console.log(response);
            setCarrito([]);
          })
        .catch(function (error) {
            console.log(error);
          }); 
    }

    const limpiarCompra = () =>
    { 
        setCarrito( () => {
            return [];
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
            usuarioActivo, setUsuarioActivo,
            emailActivo, setEmailActivo,
        } 
    }>{children}</dataContext.Provider>
};

export default DataProvider;
