import React from 'react'
import "./live.css"


export default function LiveModal({children ,cname,trigger,onClose}) {
  return (
    <div>
          { trigger?
            <div className="overlay-style-live">
                <div className={`modal-upload ${cname}`}>
                   {children}
                </div> 
                
            </div>
         : <div></div>
            
            }

    </div>
  )
}