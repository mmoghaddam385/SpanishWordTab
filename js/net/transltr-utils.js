;(function() {

	let utilsExport = {
		translate: function(word) {
			return new Promise(function(resolve, reject) {
				let url = 'http://transltr.org/api/translate?to=es&from=en';
				url = window.netUtils.addUrlParameter(url, 'text', word);

				let error = function (jqXHR, textStatus, errorThrown) {
					reject(errorThrown);
				};

				window.netUtils.genericAjax(url, resolve, error);
			});
		}
	};

	window.transltrUtils = utilsExport;

})();