;(function(){

	let transltrUtils;
	let wordnikUtils;

	$(document).ready(function() {
		transltrUtils = window.transltrUtils;
		wordnikUtils = window.wordnikUtils;

		wordnikUtils.randomWord().then(function (result) {
			
			wordnikUtils.definition(result.word).then(function(result) {

				transltrUtils.translate(result[0].word).then(function(translation) {

					alert('The word is ' + result[0].word + '.\nIt is a(n) ' + result[0].partOfSpeech + ' that means ' + result[0].text + '\nIt translates to ' + translation.translationText);

				})

			}, function (errorText) {
				alert(errorText);
			})

		}, function(errorText) {
			alert(errorText);
		});

	});

})();