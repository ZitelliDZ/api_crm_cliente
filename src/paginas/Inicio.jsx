import { useState, useEffect } from "react"
import Cliente from "../components/Cliente";

const Inicio = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {


        const obtenerClientesApi = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (error) {
                console.log('Error 5002');
            }
        }
        obtenerClientesApi();

    }, [])

    const handleEliminar = async (id) => {
        try {
            const confirmar = confirm(`Desea Eliminar el cliente?${id}`)

            if (confirmar) {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url, {
                    method: 'DELETE',
                })
                await respuesta.json()
                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes)
            }

        } catch (error) {
            console.log('Holas')
        }

    }

    return (
        <>
            <h1 className='font-black text-4xl text-gray-800'>Clientes</h1>
            <p className='mt-3'>Administra tus Clientes</p>
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead>
                    <tr className=" bg-cyan-800 text-white rounded-t-lg">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio