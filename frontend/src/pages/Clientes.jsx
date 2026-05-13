import { useState, useEffect } from 'react'
import '../styles/index.css'
import { api } from '../services/api.js'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Clientes() {

    const [clientes, setClientes] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [editNome, setEditNome] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [idEdit, setIdEdit] = useState(null)
    const [edit, setEdit] = useState(false)
    const location = useLocation()

    useEffect(() => {
        loadClientes()
    }, [location.pathname])

    async function loadClientes() {
        try {
            const response = await api.get('/clientes')
            setClientes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function cadastrarCliente() {
        try {
            await api.post('/clientes', {
                nome,
                email
            })

            setNome("")
            setEmail("")

            loadClientes()

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteCliente(id) {
        try {
            await api.delete(`/clientes/${id}`)
            loadClientes()
        } catch (error) {
            console.log(error)
        }
    }

    async function editCliente() {
        try {
            await api.put(`/clientes/${idEdit}`, {
                nome: editNome,
                email: editEmail
            })
            loadClientes()
            setEditEmail('')
            setEditNome('')
            setEdit(false)

        } catch (error) {
            console.log(error)
        }
    }

    function openEdit(cliente) {

        setIdEdit(cliente.id)
        setEditNome(cliente.nome)
        setEditEmail(cliente.email)
        setEdit(true)
    }

    return (
        <>
            <h1>Clientes Cafeteria</h1>

            <Link to={"/"}>Home</Link>
            <Link to={"/pedidos"}>Pedidos</Link>

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className='inputc'
            />

            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='inputc'
            />

            <button onClick={cadastrarCliente} className='buttonc'>
                Cadastrar Cliente
            </button>

            {clientes.map(cliente => (
                <div key={cliente.id} className='boxc'>
                    <p>{cliente.nome} </p>
                    <p>{cliente.email}</p>
                    <button onClick={() => openEdit(cliente)} className='buttonc'>
                        Editar
                    </button>
                    <button onClick={() => deleteCliente(cliente.id)} className='buttonc'>
                        Deletar
                    </button>
                </div>
            ))}

            {edit && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Editar Cliente</h2>

                        <input
                            type="text"
                            value={editNome}
                            onChange={(e) => setEditNome(e.target.value)}
                            placeholder="Nome"
                        />

                        <input
                            type="text"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <button onClick={editCliente} className='buttonc'>
                            Salvar
                        </button>
                        <button onClick={() => setEdit(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>

    )
}

export default Clientes