import React from 'react'
import PropTypes from 'prop-types'

const Button = ({text, type, className, onClick}) => {

  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
       {text}
      </button>
    </div>
  )
}

Button.propTypes={
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick:PropTypes.func
}



export default Button
