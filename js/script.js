(function() {
	function getScript(url,integrity,success){

		var script=document.createElement('script');
		script.src=url;
		script.integrity=integrity;
		script.crossOrigin="anonymous";
		var head=document.getElementsByTagName('head')[0],
			done=false;
		head.appendChild(script);

	  var script=document.createElement('script');
	  script.src=url;
	  var head=document.getElementsByTagName('head')[0],
		  done=false;
	  script.onload=script.onreadystatechange = function(){
		if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
		  done=true;
		  success();
		  script.onload = script.onreadystatechange = null;
		  head.removeChild(script);
		}
	  };
	  head.appendChild(script);
	}
	  getScript('https://code.jquery.com/jquery-3.4.1.slim.min.js','sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n',function(){
		  // YOUR CODE GOES HERE AND IS EXECUTED AFTER JQUERY LOADS


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
		$('main').height('auto');
		$('.solve, .js-result-box, .js-number').removeClass('done');
		$(this).text('Igraj').removeClass('restart');
		$('.submit, .solve').addClass('d-none');
		$('.bottom-section .row, .btn-section-inner .row').removeClass('justify-content-between').addClass('justify-content-center');
		$('.number-box').text('').removeClass('done');
		$('.result').val('').addClass('done');
		$('.user-number').removeClass('correct false');
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
		if (window.matchMedia("(max-width: 767px)").matches) {
			var keyboardSection = $(window).innerHeight() - $('section.numbers-section').outerHeight(true) - $('section.results-section').outerHeight(true) - 62;
			if (keyboardSection > 262) {
				$('main').height(keyboardSection).addClass('done');
			} else {
				$('main').height(262).addClass('done');
			}
			$('.keyboard-section').addClass('show');
		}
		$('.submit, .solve').removeClass('d-none');
		$('.bottom-section .row, .btn-section-inner .row').addClass('justify-content-between').removeClass('justify-content-center');
	} 
});

$(window).resize(function() {
	if ($('section.keyboard-section').hasClass('show')) {
		var keyboardSection = $(window).innerHeight() - $('section.numbers-section').outerHeight(true) - $('section.results-section').outerHeight(true) - 62;
		if (keyboardSection > 262) {
			$('main').height(keyboardSection);
		} else {
			$('main').height(262);
		}
	}
  });

function getOccurrence(array, value) {
	return array.filter((v) => (v === value)).length;
}

var allowedInput = [' ','0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')'];
$('.result').on("focus change keyup paste keypress", function(event) {
	var input = $(this).val().split("");
	for (let i = 0; i < input.length; i++) {
		if (getOccurrence(allowedInput, input[i]) === 0) {
			$(this).val($(this).val().split(' =')[0].replace(input[i],''));
		}
	}
	$('.error-box-message, .user-number').empty();
	$('.user-number').removeClass('correct false');
	if (event.key === "Enter" && input !== undefined) {
		$('.submit').click();
	}
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
			$('.error-box-message').append(dontexist, usedTooManyTimes);
			$('.user-number').removeClass('correct').addClass('false');
		} else if (targetResult === result) {
			$('.user-number').removeClass('false').addClass('correct');
		} else if (result !== undefined) {
			$('.user-number').removeClass('correct').addClass('false');
		}
		if (result !== undefined) {
			$('.user-number').text(result.toFixed(2).replace('.00',''));
			$('.result').val($('.result').val().split(' =')[0]+ ' = ' + result.toFixed(2).replace('.00','') + numberFound);
		}				
	}
	catch(err) {
		$('.error-box-message').html('<p>Greska u matematičkom izrazu!</p>');
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

$('.keyboard-btn, .button').on("touchstart mousedown", function() {
	$(this).addClass('active');
});

$('.keyboard-btn, .button').on("touchend mouseup", function() {
	$(this).removeClass('active');
});





});
})();
