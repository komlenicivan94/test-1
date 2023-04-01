/*Moj Broj

effecti na buttone

nadji font 

input validation - bolji nacin

loader na resenje

sredi error message

zabrani input i submit pre svih brojeva i onda ga pusti

mobilni focus na input scrol to element

napravi listu komentara pa zovi kad treba

restart alert

nadji slike
(facial expresion)

nadji pozadinu

sredi vreme  - progress bar

sredi logic za vreme
*/


var intervalId;
var myNumber;
$('.play').click(function() {
	var mainNumber = $('.main-number-box .number-box:not(.done)');
	var singleNumbers = $('.single-numbers-box .number-box:not(.done)');
	var middleNumber = $('.middle-number-box .number-box:not(.done)');
	var bigNumber = $('.big-number-box .number-box:not(.done)');
	if ($(this).hasClass('restart')) {
		$(window).scrollTop(0);
		$('.keyboard-section').removeClass('show');
		$('.solve, .js-result-box, .js-number').removeClass('done');
		$(this).text('Igraj').removeClass('restart');
		$('.submit, .solve').addClass('d-none');
		$('.bottom-section .row').removeClass('justify-content-between').addClass('justify-content-center');
		$('.number-box').text('').removeClass('done');
		$('.result').val('').addClass('done');
		$('.result-box, .js-result-box, .error-box-message, .js-number, .user-number').empty();
	} else if ($('.number-box.done').length < 1 && !$(this).hasClass('started')) {
		myNumber = new MyNumber();
		$(this).text('Stop').addClass('started');
		intervalId = window.setInterval(function(){
			mainNumber.eq(0).text(Math.floor(Math.random() * (9 - 0 + 1) + 0));
		}, 100);
	} else if (mainNumber.length > 0) {
		clearInterval(intervalId);
		let numCheck = (myNumber.target.toString().split('').reverse()[mainNumber.length-1] === undefined) ? '0' : myNumber.target.toString().split('').reverse()[mainNumber.length-1];
		mainNumber.eq(0).text(numCheck).addClass('done');
		let done = (mainNumber.eq(0).hasClass('done')) ? 1 : 0;
		intervalId = window.setInterval(function(){
			mainNumber.eq(done).text(Math.floor(Math.random() * (9 - 0 + 1) + 0));
			if (mainNumber.length < (done + 1)) {
				singleNumbers.eq(0).text(Math.floor(Math.random() * (9 - 1 + 1) + 1));
			}
		}, 100);
	} else if (singleNumbers.length > 0) {
		clearInterval(intervalId);
		singleNumbers.eq(0).text(myNumber.values.toString().split(',').reverse()[singleNumbers.length-1]).addClass('done');
		let done = (singleNumbers.eq(0).hasClass('done')) ? 1 : 0;
		intervalId = window.setInterval(function(){
			singleNumbers.eq(done).text(Math.floor(Math.random() * (9 - 1 + 1) + 1));
			if (singleNumbers.length < (done + 1)) {
				middleNumber.eq(0).text(Math.floor(Math.random() * (4 - 2 + 1) + 2) * 5);
			}
		}, 100);
	} else if (middleNumber.length > 0) {
		clearInterval(intervalId);
		middleNumber.eq(0).text(myNumber.values.toString().split(',')[1]).addClass('done');
		intervalId = window.setInterval(function(){
			bigNumber.eq(0).text(Math.floor(Math.random() * (4 - 1 + 1) + 1) * 25);
		}, 100);
	} else if (bigNumber.length > 0) {
		clearInterval(intervalId);
		bigNumber.eq(0).text(myNumber.values.toString().split(',')[0]).addClass('done');
		$(this).text('Restart').addClass('restart').removeClass('started');
		if (!window.matchMedia("(pointer: coarse)").matches) {
			$('.result').focus().removeClass('done');
		}	
		$('.keyboard-section').addClass('show');
		$('.submit, .solve').removeClass('d-none');
		$('.bottom-section .row').addClass('justify-content-between').removeClass('justify-content-center');
	} 
});

function getOccurrence(array, value) {
	return array.filter((v) => (v === value)).length;
}

/*Allowed Input*/
var allowedInput = [' ','0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')'];
$('.result').on("focus change keyup paste keypress", function() {
	var input = $(this).val().split("");
	for (let i = 0; i < input.length; i++) {
		if (getOccurrence(allowedInput, input[i]) === 0) {
			$(this).val($(this).val().split(' =')[0].replace(input[i],''));
		}
	}
	$('.error-box-message, .user-number').empty();
	$('.user-number').removeClass('correct false');
});


$('.submit').click(function() {	
	try {
		var targetResult = Number($('.main-number-box .number-box').text());
		var availableNumbers = [];
		$('.number-flex-box:not(.main-number-box) .number-box.done').each(function() {
			availableNumbers.push($(this).text());  
		});
		var usedNumbers = $('.result').val().split(' =')[0].replaceAll('+',' ').replaceAll('-',' ').replaceAll('*',' ').replaceAll('/',' ').replaceAll('(',' ').replaceAll(')',' ').replaceAll('=',' ').split(' ').filter(n => n);
		var usedTooManyTimes = [];
		var dontexist = [];
		for (let i = 0; i < availableNumbers.length; i++) {
			if (getOccurrence(usedNumbers, availableNumbers[i]) > getOccurrence(availableNumbers, availableNumbers[i])) {
				usedTooManyTimes.push('<p>U ponuđenim brojevima nema '+getOccurrence(usedNumbers, availableNumbers[i])+' broja ' + availableNumbers[i] + '</p>');
			}
		}
		for (let i = 0; i < usedNumbers.length; i++) {
			if (getOccurrence(availableNumbers, usedNumbers[i]) === 0) {
				dontexist.push('<p>Upotrebili ste broj ' + usedNumbers[i] + ' koji ne postoji u ponuđenim brojevima</p>');
			}
		}	
		var result = eval($('.result').val().split(' =')[0]);
		var numberFound = '';		
		$('.error-box-message, .user-number').empty();
		if (dontexist.length > 0 || usedTooManyTimes.length > 0) {
			$('.message-box').show();
			$('.error-box-message').append(dontexist, usedTooManyTimes);
			$('.user-number').removeClass('correct').addClass('false');
		} else if (targetResult === result) {
			$('.user-number').removeClass('false').addClass('correct');
		} else {
			$('.user-number').removeClass('correct').addClass('false');
			$('.message-box').show();
		}
		if (result !== undefined) {
			$('.user-number').text(result.toFixed(2).replace('.00',''));
			$('.result').val($('.result').val().split(' =')[0]+ ' = ' + result.toFixed(2).replace('.00','') + numberFound);
		}				
	}
	catch(err) {
		$('.error-box-message').html('<p>Greska u matematičkom izrazu!</p>');
		console.log(err)
	}
})

$('.solve:not(.done)').click(function() {
	$(this).addClass('done');
	$('.js-number').text(eval(myNumber.solve().best.toString().replaceAll('×','*'))).addClass('done');
	$('.js-result-box').text(myNumber.solve().best.toString().replaceAll('×','*').replaceAll(' ','') + ' = ' + eval(myNumber.solve().best.toString().replaceAll('×','*'))).addClass('done');
});

$('.keyboard-btn:not(.keyboard-clear)').click(function() {
	$('.result').val($('.result').val().split(' =')[0] + $(this).text());
	$('.error-box-message, .user-number').empty();
	$('.user-number').removeClass('correct false');
});

$('.keyboard-clear').click(function() {
	if ($('.result').val().indexOf('=') > -1) {
		$('.result').val($('.result').val().split(' =')[0]);
	} else {
		$('.result').val($('.result').val().substring(0, $('.result').val().length-1));
	}
	$('.error-box-message, .user-number').empty();
	$('.user-number').removeClass('correct false');
});
