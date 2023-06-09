import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spin from "../components/Spin";

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(2, 'el nombre es muy corto.')
            .max(20, 'Nombre muy largo.')
            .required('El nombre es obligatorio!.'),
        empresa: Yup.string()
            .required('La empresa es obligatoria!.'),
        email: Yup.string()
            .required('El email es obligatorio!.')
            .email('Email no válido'),
        telefono: Yup.number()
            .positive('El número no es válido')
            .integer('El número no es válido')
            .typeError('El número no es válido!.'),
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta;
            if (cliente.id) {
                const url = `https://my-json-server.typicode.com/ZitelliDZ/api_crm_cliente/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = 'https://my-json-server.typicode.com/ZitelliDZ/api_crm_cliente/clientes'
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            navigate('/clientes');
        } catch (error) {
            console.log('Error 5001');
        }
    }


    return (
        cargando ? <Spin /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={nuevoClienteSchema}
                >

                    {({ errors, touched }) => {


                        //console.log(data)
                        return (
                            <Form>
                                <div className='mb-5'>
                                    <label className='text-gray-800' htmlFor='nombre'>Nombre: </label>
                                    <Field
                                        id='nombre'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Nombre del Cliente.'
                                        name='nombre'
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-5'>
                                    <label className='text-gray-800' htmlFor='empresa'>Empresa: </label>
                                    <Field
                                        id='empresa'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Empresa del Cliente.'
                                        name='empresa'

                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                        ) : null}
                                </div>
                                <div className='mb-5'>
                                    <label className='text-gray-800' htmlFor='email'>Email: </label>
                                    <Field
                                        id='email'
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Email del Cliente.'
                                        name='email'

                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                        ) : null}
                                </div>
                                <div className='mb-5'>
                                    <label className='text-gray-800' htmlFor='telefono'>Teléfono: </label>
                                    <Field
                                        id='telefono'
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Teléfono del Cliente.'
                                        name='telefono'

                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                        ) : null}
                                </div>
                                <div className='mb-5'>
                                    <label className='text-gray-800' htmlFor='notas'>Notas: </label>
                                    <Field
                                        as='textarea'
                                        id='notas'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                        placeholder='Notas del Cliente.'
                                        name='notas'

                                    />
                                    {errors.notas && touched.notas ? (
                                        <Alerta>{errors.notas}</Alerta>
                                        ) : null}
                                </div>
                                <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className='w-full mt-10 bg-slate-600  p-5 text-white uppercase font-bold text-lg' />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario