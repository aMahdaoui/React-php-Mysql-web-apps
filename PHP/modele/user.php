<?php
class user
{
	private $id;
	private $email;
	private $password; 

	 
	public function __construct(  $itms ) {
	    foreach( $itms as $name => $val )
	        $this->$name=$val;
	}


	// Liste des getters
	public function id()
	{
	return $this->id;
	}

	public function email()
	{
	return $this->email;
	}

	 
	public function password()
	{
		return $this->password;
	}


	// Liste des setters 
	public function setEmail($email)
	{
		$this->email = $email;
	}  

	public function setPassword($password)
	{
		$this->password = $password;
	}

}
?>  
