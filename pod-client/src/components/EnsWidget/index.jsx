import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { RegistrationWidget } from 'ens-widgets'
import { useState } from 'react'

export default function EnsWidget() {
    const { openConnectModal } = useConnectModal()
    const [status, setStatus] = useState('idle')
  
    const handleStatusUpdate = (newStatus) => {
      setStatus(newStatus)
    }
  return (
    <div className=''>
      <RegistrationWidget
        connectAction={openConnectModal}
        onStatusUpdate={handleStatusUpdate}
        trackingCode="demo.eth"
      />

    </div>
  )
}
