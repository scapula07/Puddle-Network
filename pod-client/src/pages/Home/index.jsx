import React ,{useState} from 'react'
import Feed from '../../modules/Feed'
import Layout from '../../Layout/main'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'

export default function Home() {
  const { openConnectModal } = useConnectModal()
  const [status, setStatus] = useState('idle')

  const handleStatusUpdate = (newStatus) => {
    setStatus(newStatus)
  }

   return (
  
    
   
   <Layout>
       <Feed />
   </Layout>
  )
}

