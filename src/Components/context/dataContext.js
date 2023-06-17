import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const dataContext = createContext();

const dataProvider = ( {children} ) => {
    const [carrito, setCarrito] = useState([]);

    const handleComprar = (props) => 
    {
        var p = prompt("Ingrese la cantidad de tickets que desea comprar", "0");
        var cantTickets = parseInt(p);
        if (!cantTickets<1){
            console.log("se va a llamar a comprar");
            comprar(props, cantTickets);
            console.log("se completo comprar");
        }
    }

    const comprar = (compra, tickets) => 
    {
        setCarrito( () => {
            compra.NroTickets = tickets;
            let found = false;
            let index = 0;
            console.log("Buscando elemento en carrito");
            while (!found && index < carrito.length){
                let aux = carrito.at(index);
                if (aux.Pelicula == compra.Pelicula && aux.Fecha == compra.Fecha && aux.NroSala == compra.NroSala && aux.Hora == compra.Hora){
                aux.NroTickets += compra.NroTickets;
                found = true;
                console.log("Se encontro en carrito y se sumaron tickets");
                }
                index++;
            }
            if (!found){
                console.log("No se encontro, se agrego al carrito");
                carrito.push(compra);
            }   
            console.log(carrito);
        });
    }

    const cancelarOrden = (index) =>
    {
        setCarrito( () => {
            carrito.splice(index,1); 
            console.log(carrito); 
        });
    }

    const confirmarCompra = () =>
    {
        console.log("data: [");
        console.log("Observaciones: "+observaciones);
        console.log("Email: "+email);
        console.log("FechaCompra: "+fechaCompra);
        console.log("Compras: ");
        { carrito && carrito.length>0 && carrito.map((compraObj,index) => (
        console.log(index+": "),
        console.log("Pelicula: "+compraObj.Pelicula),
        console.log("NroTickets: "+compraObj.NroTickets),
        console.log("Fecha: "+compraObj.Fecha),
        console.log("Hora: "+compraObj.Hora)
        ))};
        console.log("]");
        /* axios.post(
        'https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/compras/crear',
        { todo lo relacionado a la compra }
        ) */ 
    }

    const limpiarCompra = () =>
    { 
        setCarrito( () => {
            carrito.splice(0,carrito.length); 
            console.log(carrito);
        });
    }

    return <dataContext.Provider value={ {carrito, setCarrito, handleComprar, cancelarOrden, confirmarCompra, limpiarCompra} }>{children}</dataContext.Provider>
};

export default dataProvider;
