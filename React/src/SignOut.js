import React from 'react';
import {withRouter, Link} from 'react-router-dom'; 


class SignOut extends React.Component {

	constructor (props) {
	  super(props); 
	  this.state = { 
	  }
	}


	componentDidMount() {

		fetch('http://localhost/challenge/controller/signout.php',{
		    method: 'POST',
		    credentials: 'include',  
		    body: JSON.stringify({ })   
		}).then((response) => response.json())
		    .then((responseJson) => {
		  
		       if(responseJson === "Signout succes")
		        {  
		            this.props.history.push("/signin");
		            alert(responseJson);  
		        }    
		    }).catch((error) => { 
		        console.error(error);
		});   
  	}  

	render () {  
	  	return (  
		    <div>
		    	<h2> Erreur  has occured  </h2> <Link to="/">Go home </Link> 
		    </div> 
	   	)
	} 
}export default withRouter(SignOut);	 