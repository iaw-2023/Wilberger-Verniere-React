import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './funciones.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { dataContext } from '../context/dataContext';

function Funciones() {
    const [funcion, setFuncion] = useState([])
    const [error, setError] = useState(null);
    const {carrito, setCarrito} = useContext(dataContext);

    const fetchFuncion = () => {
        return axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/funciones')
            .then((response) => {
                setFuncion(response.data.data);
                setError(null);
            }).catch(setError);
    }

    useEffect(() => {
        fetchFuncion();
    },[]);

    if (error) return<p>OCURRIO UN ERROR AL PEDIR LAS FUNCIONES</p>
    
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

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="tabla dark:text-gray-400">
                    <thead className="tablaHead dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="tablaH">Pelicula:</th>
                            <th scope="col" className="tablaH">Fecha:</th>
                            <th scope="col" className="tablaH">Hora:</th>
                            <th scope="col" className="tablaH">Sala numero:</th>
                            <th scope="col" className="tablaH">Accion:</th>
                        </tr>
                    </thead>
                    <tbody>
                        { funcion && funcion.length>0 && funcion.map((funcionObj,index) => (
                            <tr className="tablaRow" key={index}>
                                <th className="tablaH"> {funcionObj.Pelicula}      </th>
                                <th className="tablaH"> {funcionObj.Fecha}         </th>
                                <th className="tablaH"> {funcionObj.Hora}          </th>
                                <th className="tablaH"> {funcionObj.NroSala}       </th>
                                <th className="tablaH"> 
                                    <Button className="añadir-ticket" onClick={ ()=>handleComprar(funcionObj) }>Comprar</Button>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Funciones