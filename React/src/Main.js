import React, { Component } from 'react';    
     
import FormSignIn from './FormSignIn.js';  

  
const initialState = { 
    isLogged: false    
};

class Main extends Component {
   
    constructor (props) {
        super(props); 
        this.state = initialState; 
      
    } 
 
 
    render () {    

        // if a session is already set
        if (this.state.isLogged) {
            return (
                //redirection to shops directly
                <div>

                </div>
            )
             
        }else {
            return ( 
                <div>   
                    <FormSignIn />  
                </div> 
            )
        }
    } 
} 
export default Main;