import React, { Component } from 'react'; 
import {withRouter, Link} from 'react-router-dom'; 
import { FormErrors } from './FormErrors'; 


// initialisation :    
// formErrors is for display errors after validation  
// formValid became true if password and email are valide  
//  
const initialState = {
    email: '',
    password: '',
    formErrors: {email: '', password: ''}, // ce champ sert a afficher un mesage d'erreur de validation 
    emailValid: false,
    passwordValid: false,
    formValid: false 
};

class FormSignIn extends Component {
   
constructor (props) {
  
    super(props); 
    this.state = initialState;

    this.handleSubmit.bind(this);  
}


/* get email  and^password typed values in real time , 
then we try  to validate  at any state's changement "validateFiel ()", according to this two  conditions :
    1/  email address must be an email adresse valide  
    2/  password lenght >=   8*/

 handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}

validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); 
        fieldValidationErrors.email = emailValid ? '' : '  format is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }



// Validate Form through other Fields
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
 
 
//Send the Form to server to check if user email  and password are stored in DB with PHP 
handleSubmit = (e) =>{
 
    e.preventDefault();
    
    // we will add fuction for avoid XSS attacks  (potentiallyMaliciousInput)
    let UserEmail = this.state.email ; 
    let UserPassword = this.state.password ; 

 

    fetch('http://localhost/challenge/controller/signin.php',{
        method: 'POST',
        credentials: 'include',   
        body: JSON.stringify({ 
          email: UserEmail, 
          password: UserPassword 
        })   
    }).then((response) => response.json())
        .then((responseJson) => {
 
        // If server response message same as Data Matched
            if(responseJson === 'Data Matched'){ 
                // redirection to shops component to view shops
                this.props.history.push("/shops");  
                alert('Sign in succes !');  
            }else {
   
                alert(responseJson);
                this.setState(initialState);
 
            }
   
        }).catch((error) => {
          console.log('not work');
          console.log(error);
          console.error(error);
        }); 
} 


// rendring Form 
// by default the button is disabled until all fields Form are  valide  
//  
 render () {
 
    
   return ( 


        <div>    
            <form  className="Form" onSubmit={this.handleSubmit}> 
                <h5>Not register yet <Link to="/signup">Sign UP</Link></h5><hr /> 
                <h3> Sign In to  Get access to the shops. </h3>
                <div className="form-group ">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" 
                              name="email"
                              placeholder="Email" 
                              value={this.state.email}
                              onChange={this.handleUserInput}  />
                </div>
                <div className="form-group ">
                <label   htmlFor="password">Password</label>
                <input type="password" className="form-control"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleUserInput} />
                </div> 
                <div>
                    <button type="submit" name="signin" className="btn btn-primary" disabled={!this.state.formValid} > Sign In </button>  
                </div> <hr className="Form" /><FormErrors formErrors={this.state.formErrors} />
            </form>   
                
        </div> 
      )
 }
}
export default  withRouter(FormSignIn);

