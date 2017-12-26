<?php 
header("Access-Control-Allow-Origin: http://localhost:3000");  
header("Access-Control-Allow-Credentials:true");
header('Content-type: application/json');  
session_start();
require_once("../includes/fonctions.php");
require_once("../modele/userManager.php"); 

$json = file_get_contents('php://input'); 


 
	$_SESSION = array();

	// session stored through a cookies; 
	if(isset($_COOKIE[session_name()]))
	{
	    setcookie(session_name(),'',time()-3500,'/');
	}


	// remove all session variables
	session_unset();

	// destroy the session
	session_destroy();   


	 
    $SignoutMsg = "Signout succes";
    $SignoutMsg = json_encode($SignoutMsg);
    echo($SignoutMsg);

?>