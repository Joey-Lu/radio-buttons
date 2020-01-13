import React,{memo,useState} from 'react'

const Button = memo(({id,onSelect,value,...rest}) =>{ 
    return (
        <button onClick={()=>onSelect(id)}{...rest}>
            {value}
        </button>
    )
})

export default Button
