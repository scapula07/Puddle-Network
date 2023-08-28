import React from 'react'
import TopSection from '../components/Topsection'
import { Outlet } from 'react-router-dom'

export default function DashboardView() {
  return (
    <div className='px-4 py-8'>
        <TopSection />
        <Outlet />

    </div>
  )
}
