 <?php

    function escape_error($val)
        {
    	$magic_quotes =get_magic_quotes_gpc();
    
    			if($magic_quotes)
    			{
                    $val = addslashes($val);
    			}	
    	return $val;
        }
		
		
	function connectBase(){
		try {
		return  new PDO ('mysql:host=localhost;dbname=shops', 'sadmah', 'HammadiElec123+');
		}
		catch (PDOException $e) {
			print "Erreur !: " . $e->getMessage() . "<br/>";
			die();
}
    }



?> 