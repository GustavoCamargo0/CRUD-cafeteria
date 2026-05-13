import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Rotas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
