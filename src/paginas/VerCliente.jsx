import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Spin from "../components/Spin";
const VerCliente = () => {

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
                console.log('Error 5003');
            }
            setTimeout(() => {
                setCargando(!cargando)
            }, 1500);
        }
        obtenerClientesApi();
    }, [])


    return (
        cargando ? <Spin /> : (
            Object.keys(cliente).length === 0 ?
                <p>No Hay Resultados</p> :
                (
                    <div>
                        <h1 className='font-black text-4xl text-gray-800'>Ver Cliente: {cliente.nomrbe}</h1>
                        <p className='mt-3'>Información del Cliente</p>

                        {cliente.nombre && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase font-bold  text-gray-800 ">Cliente: </span>
                                {cliente.nombre}
                            </p>
                        )}

                        {cliente.email && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase font-bold  text-gray-800 ">Email: </span>
                                {cliente.email}
                            </p>
                        )}

                        {cliente.empresa && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase font-bold  text-gray-800 ">Empresa: </span>
                                {cliente.empresa}
                            </p>
                        )}

                        {cliente.telefono && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase font-bold  text-gray-800 ">Teléfono: </span>
                                {cliente.telefono}
                            </p>
                        )}


                        {cliente.notas && (
                            <p className="text-2xl text-gray-600 mt-4">
                                <span className="uppercase font-bold  text-gray-800 ">Notas: </span>
                                {cliente.notas}
                            </p>
                        )}
                    </div>
                )
        )

    )
}

export default VerCliente