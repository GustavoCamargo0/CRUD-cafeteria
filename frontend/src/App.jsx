import { useState, useEffect } from 'react'
import './styles/App.css'
import { api } from './services/api'

function App() {

  const [clientes, setClientes] = useState([])
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    loadClientes()
  }, [])

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

  return (
    <>
      <h1>Clientes Cafeteria</h1>

      {clientes.map(cliente => (
        <div key={cliente.id}>
          <p>{cliente.nome} {cliente.email}</p>

          <button onClick={() => deleteCliente(cliente.id)}>
            deletar
          </button>
        </div>
      ))}

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={cadastrarCliente}>
        Cadastrar Cliente
      </button>
    </>
  )
}

export default App