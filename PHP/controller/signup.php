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
     
    // Populate User email from JSON $obj array and store into $email.$email = 'emailme@gmi.com';//
    $email = $obj['email'];
     
    // Populate Password from JSON $obj array and hash it (is stored on db hashed with sha1) store into $password.
    //$password = sha1($obj['password']); $password = 'passworddeep';//$passwordConfirm  = 'passworddeep';//
    $password = $obj['password']; 
    $passwordConfirm = $obj['passwordConfirm']; 

    //validate fields (must not be empty)
    if (!empty($passwordConfirm)  || !empty($email) || !empty($password)) { 
        if ($password === $passwordConfirm)
        {   
            //validate email format
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) { 
                
                $db = connectBase();   
                $manager = new userManager($db);

                //check if the mail is exist already
                $user = $manager->getUser($email,'dont_take_it'); 
 
                if(isset($user) and ($user instanceof User)) 

                    // If Mail  exist then show the message.
                    $signupMsg = $user->email().' is already exist'; 

                else{

                    $password = sha1($password);
                    // get Table Auto_Increment value  
                    $Auto_Increment = $manager->getAutoId();
                    $user = new User(array("id" =>$Auto_Increment, "email" => $email, "password" =>$password)); 
                    $manager->addUser($user);

                    //store the first session for this user (after successful signup)  
                    $_SESSION['id_user'] = $user->id();
                    $_SESSION['email_user'] = $user->email();

                    $signupMsg = 'Account created succefully'; 
                }
                
            }else
                $signupMsg = "Invalid email format"; 
        }else
            $signupMsg = 'password an confirm password not match' ; 
    }else
        $signupMsg = 'field(s) must not be empty' ;
    
        
          
   // Converting the message into JSON format.
    $signupJson = json_encode($signupMsg);  
    // Echo the message.
    echo $signupJson;

 ?>
 