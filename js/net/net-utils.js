;(function() {

	let netUtilsExport = {
		genericAjax: function(url, success, error) {
			$.ajax({
				url: url,
				success: success,
				error: error
			});
		},

		addUrlParameter: function(url, param, value) {
			if (url.indexOf('?') >= 0) {
				// the url already has parameters, just add this one
				url += '&';
			} else {
				// first parameter in the url, add the ?
				url += '?';
			}

			return url + param + '=' + value;
		}
	}

	window.netUtils = netUtilsExport;

})();