import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import './index.css'

createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider 
  manifestUrl="http://localhost:3005/tonconnect-manifest.json"
  bridgeUrl="https://bridge.ton.space">
    <App />
  </TonConnectUIProvider>,
)
