import React from 'react'

export default function Streams() {
  return (
    <div className='py-8 w-full px-6'>
    <div className='flex flex-col space-y-4'>
        <div className='flex items-center justify-between border-b py-2'>
            <h5>Name</h5>
            <h5>Created</h5>
            <h5>Updated</h5>
            <h5>Source</h5>

        </div>
        {[1,2,2,,3,3].map(()=>{
            return(
                <div className='flex items-center justify-between border-b py-2 text-slate-500 font-semibold text-sm'>
                <h5>Name</h5>
                <h5>Created</h5>
                <h5>Updated</h5>
                <h5>Source</h5>

              </div>
            )
        })

        }
        

    </div>

</div>
  )
}
