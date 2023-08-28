import React from 'react'

export default function FeedSection() {
  return (
    <div className='px-10 flex flex-col w-full '>
        <div className='h-56 w-full'>

        </div>
        <div className='flex w-full space-x-40'>
            <div className='w-1/2 flex flex-col space-y-4'>
                <div className='flex items-center justify-between '>
                    <h5>Just in</h5>
                    <h5>View all</h5>

                </div>
                {[1,2,3].map(()=>{
                    return(
                        <div className='flex space-x-4 '>
                            <main className='bg-slate-300 h-20 w-20 rounded-lg'>

                            </main>
                            <div className='flex flex-col space-y-2'>
                                <h5 className='font-semibold text-sm'>Barot is banned</h5>
                                <h5 className='font-semibold text-slate-600 text-xs'>Barot is banned</h5>
                                <h5 className='font-semibold text-slate-500 text-xs'>12 podcast</h5>
                            </div>
                        </div>
                    )
                })

                }
            </div>
            
            <div className='w-1/2 flex flex-col space-y-4'>
                <div className='flex items-center justify-between '>
                    <h5>Trending</h5>
                    <h5>View all</h5>

                </div>
                {[1,2,3].map(()=>{
                    return(
                        <div className='flex space-x-4 '>
                            <main className='bg-slate-300 h-20 w-20 rounded-lg'>

                            </main>
                            <div className='flex flex-col space-y-2'>
                                <h5 className='font-semibold text-sm'>Barot is banned</h5>
                                <h5 className='font-semibold text-slate-600 text-xs'>Barot is banned</h5>
                                <h5 className='font-semibold text-slate-500 text-xs'>12 podcast</h5>
                            </div>
                        </div>
                    )
                })

                }
            </div>
            
        </div>

        



    </div>
  )
}
