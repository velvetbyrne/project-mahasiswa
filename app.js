let app = angular.module("typingMania", []);

app.factory('highScoreStorage', function(){
	let service = {}

	let hs = localStorage.getItem('highScores')

	if(hs == null || hs == ''){
		hs = []
	} else{
		hs = JSON.parse(hs)
	}
	//struktur score disimpan dalam format JSON(nama, vpm)
	service.addScore = function(newScore){
		hs.push(newScore)
		localStorage.setItem('highScores', JSON.stringify(hs))
	}
	service.getScore = function{
		return hs
	}

	return service
})

app.factory('questionStorage', function(){
	let service = {}

	let q = localStorage.getItem('questions')

	if(q == null){
		q = []
	} else{
		q = JSON.parse(q)
	}

	service.getRandom = function(){
		let idx = Math.floor(Math.random() * q.length);
		let generatedTexts = q[idx].split(' ')
			.map(text => {
				return {text: text,status:'undone'}
			})
			return generatedTexts;
	}
	return service;
})

app.controller('typingController', function($scope, $rootScope, highScoreStorage, questionStorage){
	$scope.texts;
	$scope.playerInput = ''
	$scope.index = 0;
	$scope.startTime = 0;
	$scope.name = ''

	$scope.intialize = function(){
		$scope.texts = questionStorage.getRandom()
		console.log($scope.texts)
		$scope.texts[$scope.index].status = 'current'
		alert("Click the input type box to start the game!\n"+
			"Commit your answer by hit space button!\n"+
			"You will get 300ms penalty point"+
			" every time you commit a wrong answer"
		);
		$scope.name = prompt('Who are you?')
	}
	$scope.intialize();
	$scope.submitInput = function(){
		let containSpace = $scope.playerInput.includes(' ')
		if(containSpace){
			let playerInput = $scope.playerInput.trim()
			let currentText = $scope.texts[$scope.index].text;
			if(currentText === playerInput){
				$scope.texts[$scope.index].status = 'right'
			}
			else{
				$scope.texts[$scope.index].status = 'wrong'
			}
			$scope.playerInput = ''
			if($scope.texts.length == ++$scope.index){
				let finalTime = new Date().valueOf() - $scope.startTime
				finalTime += (
					$scope.texts.filter(t => t.status == 'wrong').length * 300
				)
				let wpm = $scope.texts.length / (finalTime/60000)
				highScoreStorage.addScore({name: $scope.name,wpm})
				alert('Finished')
				$rootScope.$emit('refresh', 'yourArgumentHere')
			}
		}
	}
	$scope.startGme = function(){
		$scope.startTime = new Date().valueOf();
	}
})

app.controller('highScoreStorage', function($scope, $rootScope, highScoreStorage){
	$scope.highScores = [];
	$scope.intialize = function(){
		$scope.highScores = highScoreStorage.getScore()
	}
	$scope.intialize()

	$rootScope.$on('refresh', function(event,args){
		//you can access your argument using args
		$scope.intialize()
	});
})