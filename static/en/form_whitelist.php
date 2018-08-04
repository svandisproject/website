<?php

require_once 'db-config.php';

$pdo = new PDO( 'mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS );

$pdo->exec( 'CREATE TABLE if not exists whitelist (
			id int(10) primary key ,
			email varchar(255),
			address_eth varchar(255),
			amount varchar(255),
			kyc varchar(255)
)' );

$insert = 'INSERT INTO whitelist (id, email, address_eth, amount, kyc) VALUES (:id ,:email, :address_eth, :amount, :kyc)';
$id     = $pdo->query( 'Select id from whitelist' )->fetchAll();

if ( empty( $id ) ) {
	$id = 1;
} else {
	$id = $id[ count( $id ) - 1 ]['id'] + 1;
}

if ( $_POST['email-whitelist'] && $_POST['eth-address-whitelist'] && $_POST['contribution-whitelist'] && $_POST['pass-kyc-whitelist'] ) {

	$insert_in_tabel = $pdo->prepare( $insert );

	$insert_in_tabel->bindParam( ':id', $id );
	$insert_in_tabel->bindParam( ':email', $_POST['email-whitelist'] );
	$insert_in_tabel->bindParam( ':address_eth', $_POST['eth-address-whitelist'] );
	$insert_in_tabel->bindParam( ':amount', $_POST['contribution-whitelist'] );
	$insert_in_tabel->bindParam( ':kyc', $_POST['pass-kyc-whitelist'] );

	$insert_in_tabel->execute();

}
if ( $_SERVER['HTTP_HOST'] == 'localhost' ) {
	header( 'Location: http://localhost/svandis2.0/en/formv2.html?message=sent' );
	exit;
} else {
	header( 'Location: ' . 'http://' . $_SERVER['HTTP_HOST'] . '/en/formv2.html?message=sent' );
	exit;
}