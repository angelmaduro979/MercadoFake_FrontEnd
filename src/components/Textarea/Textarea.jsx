import React from 'react'
import './Textarea.css'


const Textarea = ({name, value, id, onChange, placeholder, className}) => {
  return (
    <textarea name={name} value={value} id={id} onChange={onChange} placeholder={placeholder} className={className}>

    </textarea>
  )
}



export default Textarea