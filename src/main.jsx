import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FirebaseContext } from './store/Context.jsx'
import Context from './store/Context.jsx'
import FirebaseApp from './firebase/config.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={FirebaseApp}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </StrictMode>
)

