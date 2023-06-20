import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const dataContext = createContext();

const dataProvider = ( {children} ) => {
    const [carrito, setCarrito] = useState([]);
    const [peliculaElegida, setPeliculaElegida] = useState([]);
    const [compraElegida, setCompraElegida] = useState([]);

    const handleComprar = (props) => 
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
            console.log("Buscando compra en carrito");
            while (!found && index < carrito.length){
                let aux = carrito.at(index);
                console.log("Pelicula: " + compra.Pelicula+","+aux.Pelicula);
                console.log("NroSala: " + compra.NroSala+","+aux.NroSala);
                console.log("Fecha: " + compra.Fecha+","+aux.Fecha);
                console.log("Hora: " + compra.Hora+","+aux.Hora);
                if (aux.Pelicula == compra.Pelicula && aux.Fecha == compra.Fecha && aux.NroSala == compra.NroSala && aux.Hora == compra.Hora){
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

    const confirmarCompra = (observaciones,email,fechaCompra) =>
    {
        console.log("data: [");
        console.log("   Observaciones: "+observaciones);
        console.log("   Email: "+email);
        console.log("   FechaCompra: "+fechaCompra);
        console.log("   Compras: ");
        { carrito && carrito.length>0 && carrito.map((carritoObj,index) => (
            console.log(index+" :\n["),
            console.log("       Pelicula: "+carritoObj.Pelicula),
            console.log("       NroTickets: "+carritoObj.NroTickets),
            console.log("       Fecha: "+carritoObj.Fecha),
            console.log("       Hora: "+carritoObj.Hora)
        ))};
        console.log("]");
        /* axios.post('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/compras/crear',
        { 
            Observaciones: observaciones, 
            EmailCliente: email, 
            FechaCompra: fechaCompra, 
            Compras: carrito 
        }); */ 
    }

    const limpiarCompra = () =>
    { 
        setCarrito( () => {
            carrito.splice(0,carrito.length); 
            console.log(carrito);
        });
    }

    return <dataContext.Provider value={ 
        {
            carrito, setCarrito, 
            handleComprar, cancelarOrden, 
            confirmarCompra, limpiarCompra, 
            peliculaElegida, setPeliculaElegida,
            compraElegida, setCompraElegida
        } 
    }>{children}</dataContext.Provider>
};

export default dataProvider;
