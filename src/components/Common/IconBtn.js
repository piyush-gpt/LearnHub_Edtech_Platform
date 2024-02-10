import React from 'react'

function IconBtn({text, onclick, children , disabled, outline=false, customClasses, type}) {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className={customClasses}>
        {
            children?(<>
                <span>{text}</span>
                {children}
            </>):( <span>{text}</span>)
        }
    </button>
  )
}

export default IconBtn