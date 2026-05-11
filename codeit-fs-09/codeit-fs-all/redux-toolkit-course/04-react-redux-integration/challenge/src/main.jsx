import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// TODO: Provider import하고 store 연결하기
// import { Provider } from 'react-redux'
// import { store } from './store/store.js'
import { App } from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TODO: Provider로 App을 감싸고 store prop 전달 */}
    <App />
  </StrictMode>,
)