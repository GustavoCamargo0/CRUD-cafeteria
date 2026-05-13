import { useState, useEffect } from 'react'
import '../styles/index.css'
import { api } from '../services/api.js'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Pedidos() {

    const [pedidos, setPedidos] = useState([])
    const [produto, setProduto] = useState("")
    const [valor, setValor] = useState("")
    const [clienteId, setClienteId] = useState("")
    const location = useLocation()

    useEffect(() => {
        loadPedidos()
    }, [location.pathname])

    async function loadPedidos() {
        try {
            const response = await api.get('/pedidos')
            setPedidos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function cadastrarPedido() {
        try {
            await api.post('/pedidos', {
                produto,
                valor,
                cliente_id
            })

            setProduto("")
            setValor("")
            setClienteId("")

            loadPedidos()

        } catch (error) {
            console.log(error)
        }
    }

    async function deleteCliente(id) {
        try {
            await api.delete(`/clientes/${id}`)
            loadPedido()
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
            <h1>Pedidos Cafeteria</h1>

            <Link to={"/"}>Home</Link>
            <Link to={"/clientes"}>Clientes</Link>

            <input
                type="text"
                placeholder="Produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                className='inputc'
            />

            <input
                type="text"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className='inputc'
            />

            <button onClick={cadastrarPedido} className='buttonc'>
                Cadastrar Pedido
            </button>

            {pedidos.map(pedido => (
                <div key={pedido.id} className='boxc'>
                    <p>{pedido.produto} </p>
                    <p>{pedido.valor}</p>
                    <button onClick={() => openEdit(cliente)} className='buttonc'>
                        Editar
                    </button>
                    <button onClick={() => deleteCliente(cliente.id)} className='buttonc'>
                        Deletar
                    </button>
                </div>
            ))}

        </>

    )
}

export default Pedidos