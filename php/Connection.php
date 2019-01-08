<?php

class Connection {

	public $host = 'localhost';
	public $dbname = 'IS_OccurrencesRegister';
	public $user = 'postgres';
    public $pass = 'dados2018';
    public $port = '5432'

	public function createConnection() {
        $connection = pg_connect("host=".$host." port=".$port. "dbname=".$dbname." user=".$user." password=".$pass);
        echo $connection;
	}
}

?>