
import { AuthProvider } from '../lib/Context/AuthContext'
import { DataProvider } from '../lib/Context/DataContext'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>
)
