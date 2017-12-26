 <?php    
header("Access-Control-Allow-Origin: http://localhost:3000");  
header("Access-Control-Allow-Credentials:true");
header('Content-type: application/json');  
session_start();
require_once("../includes/fonctions.php");
require_once("../modele/userManager.php"); 
  
    //var_dump($_SESSION);
    //echo $_SESSION['email_user'] ;


    
    $json = file_get_contents('php://input');
     
     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
     
    // Populate User email from JSON $obj array and store into $email.
    //$email = $obj['email'];
     
    // Populate Password from JSON $obj array and hash it (is stored on db hashed with sha1) store into $password.
    //$password = sha1($obj['password']);
    //$password = $obj['password']; 

    //$j = var_dump($_SESSION);

    if( isset( $_SESSION['id_user'])){
        $ShopsMsg = "Shops succes";  
    }else
        $ShopsMsg = "You must be logged to show shops";


    $ShopsMsg = json_encode($ShopsMsg);
    echo($ShopsMsg); 
 ?>