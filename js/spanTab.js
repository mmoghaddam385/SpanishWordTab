;(function(){

	let netUtils;

	$(document).ready(function() {
		netUtils = window.netUtils;

		let src = 'http://api.verbix.com/conjugator/html?language=spa&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html&verb=';
		src += 'almorzar';


		$('#iframeConjugations').attr('src', src);
		$('#iframeConjugations').on('load', function() { 
			$('#imgLoading').hide();
			$('#iframeConjugations').show();
		 });

		//  netUtils.conjugateVerb('Ser', function(result) {
		//  	alert (result);
		//  });
	});

	function getRandomWord() {
		return {word: 'To Be', translation: "ser", isVerb: true};
	}

})();