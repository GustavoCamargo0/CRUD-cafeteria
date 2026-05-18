import { useState, useEffect } from 'react'
import '../styles/index.css'
import { api } from '../services/api.js'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Pedidos() {

    const [pedidos, setPedidos] = useState([])
    const [produto, setProduto] = useState("")
    const [valor, setValor] = useState("")
    const [cliente_id, setCliente_id] = useState("")
    const [filtroStatus, setFiltroStatus] = useState("todos")
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
            if (produto.trim() === '' || valor.trim() === '' || cliente_id.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            await api.post('/pedidos', {
                produto,
                valor,
                cliente_id
            })

            setProduto("")
            setValor("")
            setCliente_id("")

            loadPedidos()

        } catch (error) {
            console.log(error)
        }
    }

    async function atualizarStatus(id, status) {
        try {
            const novoStatus = status === 'entregue' ? 'pendente' : 'entregue';
            await api.put(`/pedidos/${id}`, { status: novoStatus });
            loadPedidos();
        } catch (error) {
            console.log(error);
        }
    }

    async function deletePedido(id) {
        try {
            await api.delete(`/pedidos/${id}`);
            loadPedidos();
        } catch (error) {
            console.log(error);
        }
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
            <input
                type="text"
                placeholder="Cliente ID"
                value={cliente_id}
                onChange={(e) => setCliente_id(e.target.value)}
                className='inputc'
            />

            <button onClick={cadastrarPedido} className='buttonc'>
                Cadastrar Pedido
            </button>

            <select className='selectc'
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
            >
                <option value="todos">Todos</option>
                <option value="entregue">Entregues</option>
                <option value="pendente">Pendentes</option>
            </select>

            {pedidos.filter(pedido => filtroStatus === "todos" || pedido.status === filtroStatus).map(pedido => (
                <div key={pedido.id} className='boxc'>
                    <p><strong>Produto:</strong> {pedido.produto} </p>
                    <p><strong>Valor:</strong> R$ {pedido.valor}</p>
                    <p><strong>Cliente ID:</strong> {pedido.cliente_id}</p>
                    <p><strong>Status:</strong> <span style={{ color: pedido.status === 'entregue' ? 'green' : 'red' }}>{pedido.status}</span></p>
                    <button onClick={() => atualizarStatus(pedido.id, pedido.status)} className='buttonc'>
                        {pedido.status === 'entregue' ? 'Marcar como Pendente' : 'Marcar como Entregue'}
                    </button>
                    <button onClick={() => deletePedido(pedido.id)} className='buttonc'>
                        Deletar
                    </button>
                </div>
            ))}
         

        </>

    )
}

export default Pedidos