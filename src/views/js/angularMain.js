
//Instancia de angular
var app = angular.module('conectikidslanding',['ngResource']);


//Se crea un controlador con su funcion callback
app.controller('mailingController', [ '$scope', '$resource', '$location', contactForm]);


//Se definen todos aquellos elemtentos que seran utilizados por el nodo del DOM que
//tenga la instancia de este controlador
function contactForm( $scope, $resource, $location )
{
	//Variables iniciales
	$scope.newPass = ''
	$scope.sendingInfo = false
	$scope.writeContact = true
	$scope.user = { name: '' }


	//Obtenemos el token de recuperacion de contraseña desde la URL
	var forgotToken = $location.$$absUrl.split('/')
	forgotToken = forgotToken[ (forgotToken.length - 1) ]



	//Obtenemos la informacion del usuario
	var fetch = $resource('http://localhost:9000/api/password-resets/'+forgotToken, {}, {
		get: 
		{
			method: 'GET'
		}})

	fetch.get().$promise.then( function(result)
	{
		$scope.user = result.user
		console.log(result.user)
	} )






	$scope.enviarInfo = function()
	{
		console.log($scope.newPass)

		if( $scope.newPass != '' )
		{
			$scope.sendingInfo = true
			$scope.writeContact = false
			console.log("AQUI DEBE IR EL FETCH")
		}
		else
		{
			alert("Ingrese su nueva contraseña")
		}
		
	}


	$scope.fetching = function( contact )
	{

		var contentType = 'application/json'

		var fetch = $resource('https://conectikidmailing.herokuapp.com/api/contact', {},{
		post: 
		{
			method: 'POST',
			headers: 
			{
				'Content-Type' : contentType
			}
		}})

		var peticion = fetch.post( contact )
		
		peticion.$promise.then(function (result)
		{
			console.log(result)
		}, function(error) 
		{
			$scope.sendingInfo = false
			$scope.infoSended = true



		}).finally(function() 
		{

			var delayInMilliseconds = 1000


			console.log(delayInMilliseconds)
			
			setTimeout(function() {
				$scope.writeContact = true

				$scope.sendingInfo = false

				$scope.infoSended = false

				$scope.contactInfo = { nombreContacto: '', emailContacto: '', phoneContacto: undefined, msjContacto: '' }
			}, delayInMilliseconds)


        })
	}

}



