import { useNavigate } from "react-router-dom";

const Cliente = ({cliente,handleEliminar}) => {
  const navigate = useNavigate();
  const {nombre,empresa,email,telefono,notas,id} = cliente;

    return (
    <tr className="border-b hover:bg-slate-300">
        <td className="p-3">{nombre}</td>
        <td className="p-3">
            <p><span className="text-gray-800 font-bold uppercase">Email: </span>{email}</p>
            <p><span className="text-gray-800 font-bold uppercase">Tel: </span>{telefono}</p>
        </td>
        <td className="p-3">{empresa}</td>
        <td className="p-3">
            <button type="button" className="rounded-md bg-teal-800 block text-white w-full p-2 uppercase mb-3 hover:bg-teal-600 font-bold text-xs"
            onClick={()=>navigate(`/clientes/${id}`)}
            >Ver</button>

            <button type="button" className="rounded-md bg-blue-700 block text-white w-full p-2 uppercase  mb-3 hover:bg-blue-400 font-bold text-xs" onClick={()=>navigate(`/clientes/editar/${id}`)}>Editar</button>

            <button type="button" className="rounded-md bg-rose-700 block text-white w-full p-2 uppercase hover:bg-rose-400 font-bold text-xs" onClick={()=>handleEliminar(id)}>Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente