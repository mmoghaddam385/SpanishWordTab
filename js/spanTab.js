;(function(){

	const conjugationsUrl = 'http://api.verbix.com/conjugator/html?language=spa&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html&verb=';

	let netUtils;
	let settingsUtils;

	$(document).ready(function() {
		netUtils = window.netUtils;
		settingsUtils = window.settings;
		
		$('#iframeConjugations').on('load', onConjugationsLoad);

		settingsUtils.getSettings([settingsUtils.BACKGROUND_TYPE, settingsUtils.LANGUAGE], function(results) {
			if (results[settingsUtils.BACKGROUND_TYPE] === settingsUtils.FLAG_BACKGROUND) {
				$('#imgSpanishFlag').show();
				$('#imgUSFlag').show();
			} else if (results[settingsUtils.BACKGROUND_TYPE] === settingsUtils.COLORS_BACKGROUND) {
				$('#divEnglishColor').css('background-color', getRandomColor());
				$('#divSpanishColor').css('background-color', getRandomColor());
			}

			if (results[settingsUtils.LANGUAGE] === 'SPANISH') {
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
			}
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

	function getRandomColor() {
		let randomHue = Math.random();
		let saturation = 1;
		let lightness = 0.35;

		let color = hslToRgb(randomHue, saturation, lightness);

		return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
	}

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   {number}  h       The hue
	 * @param   {number}  s       The saturation
	 * @param   {number}  l       The lightness
	 * @return  {Array}           The RGB representation
	 */
	function hslToRgb(h, s, l){
		var r, g, b;

		if(s == 0){
			r = g = b = l; // achromatic
		}else{
			var hue2rgb = function hue2rgb(p, q, t){
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
	

})();