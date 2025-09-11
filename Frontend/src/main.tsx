import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";

import ProductContextProvider from "../utilities/Context/productscontext.tsx"; 

createRoot(document.getElementById('root')!).render(
  <ProductContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ProductContextProvider>,
)
