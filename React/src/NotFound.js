import React from 'react';
import {Link} from 'react-router-dom'; 


class Shops extends React.Component {

	constructor (props) {
	  super(props);
	  this.state = { 
	  }
	}

 
	//  
	render () { 
 
	  	return (  
		    <div> 
		    	<br /><br /><br /><br /><br />
		    	<h1> Oops ! Page Not Found ! </h1> <br />
		    	<h5> <Link to="/shops">Go to Shops ! </Link></h5> 
		    	<h5> <Link to="/signup">Create an account </Link></h5> 
		    	<h5> <Link to="/signin">Signin </Link></h5>   
		    </div> 
		)
	}
			

}export default Shops;	 