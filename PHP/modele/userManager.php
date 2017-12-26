<?php 
  error_reporting(E_ALL);
  require_once("../modele/user.php"); 


class userManager
{
  private $_db; // Instance de PDO

  public function __construct($db)
  {
    $this->setDb($db);
  }

  public function addUser(user $usr)
  {
    $q = $this->_db->prepare('INSERT INTO users SET email = :email, password = :password');  
    $q->bindValue(':email', $usr->email());
    $q->bindValue(':password', $usr->password());  
    $q->execute(); 
  }
  
  public function getUser($email, $password)
  {  
      // dont_take_it allow us to check if email is already exist or not we dont care about password
      if ($password == 'dont_take_it'){
          $q = $this->_db->query("SELECT id, email, password FROM users WHERE email ='{$email}'");
      }
      else{
          // the password should'nt  stocked clair hash it with sha1 for more security
          $password = sha1($password);
          $q = $this->_db->query("SELECT id, email, password FROM users WHERE email ='{$email}' AND password = '{$password}'"); 
      }

      $donnees = $q->fetch(PDO::FETCH_ASSOC);    
      if (is_null($donnees) || $donnees == false )
      { 
          return false; 
      }   
      else 
          return new User($donnees);
  }


  public function getAutoId()
  {
      $max = 0;
      // get AI from DB schema
      $q = $this->_db->query("SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'shops' 
                                                                      AND   TABLE_NAME = 'users' ");
 
      while ($donnees = $q->fetch(PDO::FETCH_ASSOC))
      {
          if ($donnees['AUTO_INCREMENT'] > $max) {
            $max = $donnees['AUTO_INCREMENT'];
          } 
      } 
      return $max;
  }


 
   
  public function setDb(PDO $db)
  {
    $this->_db = $db;
  }
}
?> 