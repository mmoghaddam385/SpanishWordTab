;(function(window){

	let wordnikUtilsExport = {
		randomWord: function() {
			return new Promise(function(resolve, reject) {
				let url = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun,adjective,verb,adverb,preposition&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&api_key=ea0e88c3032033b68a2080764dc075fca31bcc2b4bedc3f20';
				let error = function (jqXHR, textStatus, errorThrown) {
					reject(errorThrown);
				};

				window.netUtils.genericAjax(url, resolve, error);
			});
		},

		definition: function(word) {
			return new Promise(function(resolve, reject) {

				let url = 'http://api.wordnik.com:80/v4/word.json/' + word + '/definitions?limit=3&includeRelated=false&useCanonical=true&includeTags=false&api_key=ea0e88c3032033b68a2080764dc075fca31bcc2b4bedc3f20';
				let error = function (jqXHR, textStatus, errorThrown) {
					reject(errorThrown);
				};

				window.netUtils.genericAjax(url, resolve, error)
			});
		}
	};

	window.wordnikUtils = wordnikUtilsExport;

})(window);