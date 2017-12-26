 <?php   
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials:true");
header('Content-type: application/json');  
session_start();
require_once("../includes/fonctions.php");
require_once("../modele/userManager.php"); 
 
        

    $json = file_get_contents('php://input');
     
     // decoding the received JSON and store into $obj variable.
    $obj = json_decode($json,true);
     
    // Populate User email from JSON $obj array and store into $email.
    $email = $obj['email'];
     
    // Populate Password from JSON $obj array and hash it (is stored on db hashed with sha1) store into $password.
    //$password = sha1($obj['password']);
    $password = $obj['password']; 
 
    //open connexion to DB
    $db = connectBase();  
    
    // $manager allow us to manage users (add user, get user, ...)
    $manager = new userManager($db); 
    $user = $manager->getUser($email,$password); 
 
    if(isset($user) and ($user instanceof User))
    {
        // If user exist then show the message.
        $LoginMsg = 'Data Matched';

        //store a session for this user 
        $_SESSION['id_user'] = $user->id();
        $_SESSION['email_user'] = $user->email(); 
    } 
    else
        $LoginMsg = 'Invalid Username or Password Please Try Again';
    
         
          
   // Converting the message into JSON format. 
    $LoginJson = json_encode($LoginMsg); 
     
    
    // Echo the message.
    echo $LoginJson ;

 ?>

 
