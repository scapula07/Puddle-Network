import { useState ,useRef} from 'react'
import './App.css'
import { useEffect } from 'react'
import {Routes,Route,BrowserRouter as Router } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard'
import { Assets,Streams,Nodes } from './modules/Dashboard'
import Explorer from './pages/Explorer'
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { polygonMumbai, optimismGoerli, goerli, gnosis, gnosisChiado  } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import ErrorBoundary from './ErrorBoundary'



function App() {
        const { chains, provider } = configureChains( 
          [goerli],
          [publicProvider()]
        );
      
      console.log(chains,"chain")
      const connectors = connectorsForWallets([
        {
          groupName: "Recommended",
          wallets: [
          
            metaMaskWallet({ chains, shimDisconnect: true }),
          
          ],
        },
      ]);

      const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
      });


  return (
    <ErrorBoundary>
      <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>

          <Routes>
              <Route exact path="/"  element={  <Home />} />
              <Route exact path="/dashboard"  element={  <Dashboard/>} >
                <Route exact path=""  element={  < Assets/>} />
                <Route exact path="streams"  element={  < Streams/>} />
                <Route exact path="nodes"  element={  < Nodes/>} />
              </Route>
                  
              <Route exact path="/explorer"  element={  <Explorer />} />
        </Routes>
    </RainbowKitProvider>
   </WagmiConfig>
   </ErrorBoundary>
     )
}

export default App
