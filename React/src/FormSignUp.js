import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';  

import { FormErrors } from './FormErrors'; 



const initialState = {
    email: '',
    password: '',
    passwordConfirm: '',
    formUpErrors: {email: '', password: '', passwordConfirm: ''}, // ce champ sert a afficher un mesage d'erreur de validation 
    emailValid: false,
    passwordValid: false,
    passwordConfirmValid: false,
    formValid: false  
}; 

 

class FormSignUp extends Component { 
constructor (props) {
  super(props);
  this.state = initialState;

  this.handleSubmit.bind(this);
}


/* récupérer les valeurs saisie par l'utilisateur (champs : email et password ) , 
puis on cherche à les  valider à chaque changement d'etat, via la fonction validateFiel (), mais selon ces deux conditions :
    1/  l'adresse mail doit être une adresse valide  
    2/  la longeur de password doit être supérieure ou égale a 8
    3/  password confirm and password de confirmation doivent être égaux*/


 handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formUpErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
        fieldValidationErrors.email = emailValid ? '' : '  format is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'passwordConfirm': 
      	let pass = this.state.password ;
       	passwordConfirmValid = !value.localeCompare(pass);
    	fieldValidationErrors.passwordConfirm = passwordConfirmValid ? '': ' not match with password'; 
        break;
      default:
        break;
    } 
    this.setState({formUpErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    passwordConfirmValid: passwordConfirmValid
                  }, this.validateForm);
  }


  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.passwordConfirmValid});
  }



 
 
handleSubmit = (e) =>{
 
 e.preventDefault(); 

 // we will add fuction for avoid XSS attacks
 let UserEmail = this.state.email ; 
 let UserPassword = this.state.password ;
 let UserPasswordConfirm = this.state.passwordConfirm ; 

 

fetch('http://localhost/challenge/controller/signup.php',{
    method: 'POST',
    credentials: 'include', 
    body: JSON.stringify({ 
      email: UserEmail, 
      password: UserPassword,
      passwordConfirm : UserPasswordConfirm
    })   
  }).then((response) => response.json())
      .then((responseJson) => {
 
        // If server response message same as Data Matched
       if(responseJson === 'Account created succefully')
        {
 
            //Then open Profile activity and send user email to profile activity.
            //this.props.navigation.navigate('Second', { Email: UserEmail });
            //alert(responseJson); 
            //this.setState({signup: true}); 
            alert(responseJson);            

            //Redirect to shops;
            this.props.history.push("/shops"); 
  
        }
        else{
 
          alert(responseJson);
          this.setState(initialState); 
        }
 
      }).catch((error) => {
        console.log('not work');
        console.log(error);
        console.error(error);
      }); 
} 
  
 

   
//  
 render () {  
 
   	return ( 
       	<div> 
            <form className="Form" onSubmit={this.handleSubmit} >  
                <h5>Already have an account ! <Link to="/signin">Sign IN</Link></h5><hr /> 
                <h3>Create your account to view all shops.</h3> 
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" 
                            name="email"
                            placeholder="Email" 
                            value={this.state.email}
                            onChange={this.handleUserInput}  />
                </div>
                <div className="form-group">
                    <label  htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleUserInput} />
                </div> 
                <div className="form-group">
                    <label  htmlFor="passwordConfirm">Re-type Password</label>
                    <input type="password" className="form-control"
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            value={this.state.passwordConfirm}
                            onChange={this.handleUserInput} />
                </div>
                    <button type="submit" className="btn btn-warning" disabled={!this.state.formValid} > Sign Up</button>  
                <hr className="Form"  /><FormErrors formErrors={this.state.formUpErrors} /> 
            </form> 
            
       	</div> 
   )
 }
}
export default withRouter(FormSignUp);

  