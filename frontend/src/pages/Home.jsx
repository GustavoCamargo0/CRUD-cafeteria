import { useState, useEffect } from 'react'
import '../styles/index.css'
import { api } from '../services/api.js'
import { Link } from 'react-router-dom'

function Home() {
    return (
    <>
    <h1>Home</h1>
    <Link to={"/clientes"}>Clientes</Link>
    <Link to={"/pedidos"}>Pedidos</Link>
    </>
  )
}

export default Home