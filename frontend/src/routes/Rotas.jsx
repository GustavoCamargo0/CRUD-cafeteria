import {
    createBrowserRouter
} from 'react-router-dom'

import Home from '../pages/Home'
import Clientes from '../pages/Clientes'
import Pedidos from '../pages/Pedidos'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/clientes',
        element: <Clientes />
    },
    {
        path: '/pedidos',
        element: <Pedidos/>
    }
])