import React from 'react'
import PropTypes from 'prop-types'


const Form = ({children, className, action, method, onSubmit}) => {
  return (
    <form action={action} method={method} className={className} onSubmit={onSubmit}>
        {children}
    </form>
  )
}

Form.propTypes={
    children: PropTypes.any,
    className: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    onSubmit: PropTypes.func,
    enctype: PropTypes.string
}

export default Form