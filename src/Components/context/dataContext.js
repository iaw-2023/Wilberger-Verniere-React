import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const dataContext = createContext();

const dataProvider = ( {children} ) => {
    const [data, setData] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect( () => {
        axios.get('https://vercel-deploy-test-7ix687nun-wilbergermatias.vercel.app/rest/funciones')
            .then(response => setData(response.data.data));
    })

    return <dataContext.Provider value={ {data, carrito, setCarrito} }>{children}</dataContext.Provider>
};

export default dataProvider;
