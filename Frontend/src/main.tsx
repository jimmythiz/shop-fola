import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";

import ProductContextProvider from "../utilities/Context/productscontext"; 
import { AuthProvider } from "../utilities/Context/authcontext";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
     <AuthProvider>
     <ProductContextProvider>
          <App />
        </ProductContextProvider>
    </AuthProvider>
    </BrowserRouter>
)
