import React from 'react'
import PropTypes from 'prop-types'

function App({ children }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

App.propTypes = {
  children: PropTypes.object.isRequired,
}

export default App
