<?php

header('Content-Type:application/json; charset=utf-8');
require('funcoes.php');

// Defines os parametros que necessitas de receber para processar o pedido
if(!(empty($_GET['latitude']) && empty($_GET['longitude'])))
{
	$param1=$_GET['latitude'];
	$param2=$_GET['longitude'];
	// Processas o pedido com os parametros que recebeste
	if (true) {
		// Envias resposta de sucesso 
		// Exemplo: http://localhost/bitnami/WebServiceExample/emergencyWS6.php?param1=1&param2=2&param3=3
		$url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='.$param1.','.$param2.'&key=AIzaSyD8loXIrO1O1stBVB8xbeppPjE5aG5ERh8';
     	$jsondata = @file_get_contents($url);
		 $data=json_decode($jsondata);
		 $resposta=$data->results[0]->formatted_address;

		response(200,$resposta);
	} 
	else { 
		// Envias resposta de falha 
		// Exemplo http://localhost/bitnami/WebServiceExample/emergencyWS6.php?param1=1&param2=2&param3=A
		response(400,"Geolocation Fail");
	}
}
else
{
	// Envias resposta de pedido inválido 
	// Exemplo: http://localhost/bitnami/WebServiceExample/emergencyWS.php
	response(400,"Invalid Request");
}

function response($status,$status_message)
{
	header("HTTP/1.1 ".$status);

	$response['status']=$status;
	$response['status_message']=$status_message;

	$json_response = json_encode($response);
	echo $json_response;
}
?>