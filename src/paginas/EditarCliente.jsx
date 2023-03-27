import React from 'react'
import Formulario from '../components/Formulario'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams();

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const url = `https://my-json-server.typicode.com/ZitelliDZ/api_crm_cliente/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log('Error 5005');
            }
            setTimeout(() => {
                setCargando(!cargando)
            }, 1500);
        }
        obtenerClientesApi();
    }, [])

    
  return (
    <>
        <h1 className='font-black text-4xl text-gray-800'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza el formulario para Editar Cliente</p>
        
        {cliente?.nombre ? (
            <Formulario cargando={cargando} cliente={cliente} />
        ): <p>Cliente no Válido</p>}
    </>
  )
}

export default EditarCliente