;(function() {

	function genericAjax(url, success, error) {
		$.ajax({
			url: url,
			type: 'GET',
			success: success,
			error: error
		});
	}

	let netUtilsExport = {
		conjugateVerb: function(verb, success, error) {
			let url = 'http://api.verbix.com/conjugator/html?language=spa&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html&verb=';
			url += verb;

			genericAjax(url, success, error);
		}
	}

	window.netUtils = netUtilsExport;

})();