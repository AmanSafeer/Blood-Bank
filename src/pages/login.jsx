import React, { Component } from 'react';
import {connect} from 'react-redux'

class Login extends Component {
  render() {
    return (
      <div >
       <h1>Login</h1>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {

  }
}
function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
// export default Login
