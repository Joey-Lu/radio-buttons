import React,{memo} from 'react'
import './Button.css'

const Button = memo(({id,onSelect,value,disabled}) =>{ 
    return (
        <button onClick={()=>onSelect(id)} disabled={disabled}>
            {value}
        </button>
    )
})

export default Button
