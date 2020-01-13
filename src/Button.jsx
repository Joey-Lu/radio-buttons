import React,{memo} from 'react'
import './Button.css'

const Button = memo(({id,onSelect,value,...rest}) =>{ 
    return (
        <button onClick={()=>onSelect(id)} {...rest}>
            {value}
        </button>
    )
})

export default Button
