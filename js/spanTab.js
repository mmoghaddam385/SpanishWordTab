;(function(){

	let transltrUtils;
	let wordnikUtils;

	$(document).ready(function() {
		transltrUtils = window.transltrUtils;
		wordnikUtils = window.wordnikUtils;

		getRandomWordAndMetadata().then(function(result) {
			alert('word: ' + result.word + '\ndefinition: ' + result.definitions[0].text + '\nTranslation: ' + result.translation);
		})

	});

	function getRandomWordAndMetadata() {
		return new Promise(function(resolve, reject) {
			wordnikUtils.randomWord().then(function (randomWord) {
				wordnikUtils.definition(randomWord.word).then(function(definitions) {
					transltrUtils.translate(randomWord.word).then(function(translation) {
						let result = {
							word: randomWord.word,
							definitions: definitions,
							translation: translation.translationText
						};

						resolve(result);
					}, function(errorText) {
						reject(errorText);
					});
				}, function (errorText) {
					reject(errorText);
				});
			}, function(errorText) {
				reject(errorText);
			});
		});
	}

})();