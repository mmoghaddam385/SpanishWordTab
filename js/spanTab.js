;(function(){

	const conjugationsUrl = 'http://api.verbix.com/conjugator/html?language=spa&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html&verb=';

	$(document).ready(function() {
		$('#iframeConjugations').on('load', onConjugationsLoad);

		getRandomWord().then(function(word) {
			$('#bSpanish').html(word.translation);
			$('#bEnglish').html(word.word);

			$('#divSpanish').fadeIn();
			$('#divEnglish').fadeIn();

			document.title = 'Word of the Tab: ' + word.translation;

			if (word.isVerb) {
				loadConjugations(word.translation);
			}
		}, function(error) {

		});

	});

	function loadConjugations(verb) {
		$('#iframeConjugations').hide();
		
		$('#imgLoading').fadeIn(1000);

		let src = conjugationsUrl + verb;
		$('#iframeConjugations').attr('src', src);
	}

	function onConjugationsLoad() {
		$('#imgLoading').hide();
		$('#iframeConjugations').fadeIn();
	}

	function getRandomWord() {
		return new Promise(function(resolve, reject) {
			netUtils.getLocalFile('languages/spanish.json', function(result) {
				let randIndex = Math.floor(Math.random() * result.words.length);

				resolve(result.words[randIndex]);
			}, function(error, status) {
				reject(status);
			});
		});
	}
	

})();