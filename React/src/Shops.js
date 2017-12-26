import React from 'react';
import {Link} from 'react-router-dom';


class Shops extends React.Component {

	constructor (props) {
	  super(props);
	  this.state = {
	    isLogged: false
	  }
	}


	componentDidMount() {
		// here we will connect to server for getting all shops from DB Mysql
		fetch('http://localhost/challenge/controller/shops.php',{
		    method: 'POST',
		    credentials: 'include',  
		    body: JSON.stringify({  

		    })   
		}).then((response) => response.json())
		    .then((responseJson) => {
		 
		        // If server response message same as Data Matched
		       if(responseJson === 'Shops succes')
		        {  
		            this.setState({isLogged: true});
		            alert(responseJson);  
		  
		        }
		        else{ 
		          alert(responseJson);   
		        }
		 
		    }).catch((error) => { 
		        console.error(error);
		});  
  	}

  
	//  
	render () { 

	 	if (!this.state.isLogged) {
	 		return (
	 			<div>
			    	<h3> You are not logged In </h3> 
			    	<h4> 
			    		To view Shops Sign in here <Link to="/signup">Sign in </Link> 
			    		or create a <Link to="/signup">new account</Link>
			    	</h4>  
			    </div>
			)
	 	}
	  	return (  
		    <div> 
	    		<Link to="/signout">Sign out </Link> 
		    	<h3> You will find here all Shops list </h3> 
		    	<h4> Shops will be retreived from data base and will be placed here soon !</h4>     
		    </div> 
		)
	}
			

}export default Shops;	 