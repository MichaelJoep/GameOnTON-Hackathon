import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import './index.css'

createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider 
  manifestUrl="https://8b15-197-210-85-203.ngrok-free.app/tonconnect-manifest.json"
  bridgeUrl="https://bridge.ton.space">
    <App />
  </TonConnectUIProvider>,
)
