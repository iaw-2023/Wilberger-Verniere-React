import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const dataContext = createContext();

const dataProvider = ( {children} ) => {
    const [carrito, setCarrito] = useState([]);
    const [peliculaElegida, setPeliculaElegida] = useState([]);
    const [compraElegida, setCompraElegida] = useState([]);

    const promptComprar = (compra) => 
    {
        /* var valorValido = false;
        while (!valorValido){
            var p = prompt("Ingrese la cantidad de tickets que desea comprar", "0");
            var cantTickets = parseInt(p);
            if (cantTickets<props.LugaresDisponibles && cantTickets>0) { valorValido=true; }
            else { console.log("El valor insertado no es valido, ingrese uno nuevo"); }
        }
        console.log("se va a llamar a comprar");
        comprar(props, cantTickets);
        console.log("se completo comprar"); */
        console.log(carrito);
        var p = prompt("Ingrese la cantidad de tickets que desea comprar", "0");
        var cantTickets = parseInt(p);
        if (!cantTickets<1){
            console.log("se va a llamar a comprar");
            comprar(compra, cantTickets);
            console.log("se completo comprar");
        }
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
                carrito.push(compra);
            }
            return carrito;
        });
    }

    const comprasIguales = (compra1,compra2) => 
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

    const confirmarCompra = (observaciones,email,fechaCompra) =>
    {
        axios.post('https://wilberger-verniere-laravel-zxwy-kw6w8m4ps-iawv.vercel.app/rest/compras/crear',
        { 
            'Observaciones': observaciones, 
            'Email': email, 
            'FechaCompra': fechaCompra, 
            'Compras': carrito 
        })
        .then(function (response) {
            console.log(response);
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
            compraElegida, setCompraElegida
        } 
    }>{children}</dataContext.Provider>
};

export default dataProvider;
