import React from 'react'

import PropTypes from 'prop-types'


const Div = ({className, children }) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

Div.propTypes={
    className: PropTypes.string,
    children: PropTypes.any
}



export default Div