import React, { Component } from 'react';  
import {BrowserRouter} from 'react-router-dom';  


import Routes from './Routes';  
//import logo from './logo.svg';    



 
//<div><Routes /><Redirect to = {'/signin'} /></div> 
 

class App extends Component {

  
  render() {

      return ( 
          <BrowserRouter  >  
              <div className="App"> 
                  <div className="header">   
                      <br /><h1> Web Application Cooding Challenge</h1><hr />
                  </div>
                  < Routes />
              </div> 
          </BrowserRouter>
      );
  }
} 
export default App;
