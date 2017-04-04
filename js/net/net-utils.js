;(function() {

	function genericAjax(url, success, error) {
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: success,
			error: error
		});
	}

	let netUtilsExport = {
		getLocalFile: function(file, success, error) {
			let url = chrome.extension.getURL(file);

			genericAjax(url, success, error);
		}
	}

	window.netUtils = netUtilsExport;

})();