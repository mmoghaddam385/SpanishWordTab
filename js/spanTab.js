;(function(){

	const conjugationsUrl = 'http://api.verbix.com/conjugator/html?language=spa&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html&verb=';
	const LEFT_SIDE = 'Left';
	const RIGHT_SIDE = 'Right';

	let netUtils;
	let settingsUtils;

	$(document).ready(function() {
		netUtils = window.netUtils;
		settingsUtils = window.settings;
		
		$('#iframeLeftConjugations').on('load', onConjugationsLoad(LEFT_SIDE));
		$('#iframeRightConjugations').on('load', onConjugationsLoad(RIGHT_SIDE));

		$('#imgSettings').on('click', openOptionsPage);

		settingsUtils.getSettings([settingsUtils.BACKGROUND_TYPE, settingsUtils.LANGUAGE], function(settings) {

			getRandomWordAndFlags(settings[settingsUtils.LANGUAGE]).then(function(result) {

				setBackground(settings[settingsUtils.BACKGROUND_TYPE], result.leftFlag, result.rightFlag);

				$('#bLeft').html(result.word.leftWord);
				$('#bRight').html(result.word.rightWord);

				$('#divLeft').fadeIn();
				$('#divRight').fadeIn();

				document.title = 'Word of the Tab: ' + result.word.leftWord;

				if (result.word.isLeftVerb) {
					loadConjugations(result.word.leftWord, LEFT_SIDE);
				}

				if (result.word.isRightVerb) {
					loadConjugations(result.word.rightWord, RIGHT_SIDE)
				}

			}, function(error) {
				console.error('there was an error retrieving settings: ', error);
			});
		});

	});

	function setBackground(bgType, leftFlag, rightFlag) {
		switch (bgType) {
			case settingsUtils.FLAG_BACKGROUND:
				showFlags(leftFlag, rightFlag);
				break;
			case settingsUtils.COLOR_BACKGROUND:
				setRandomBackgrounds();
				break;
			default:
				console.error('Error: unkown backgorund type: ', bgType);
		}
	}

	function showFlags(left_img, right_img) {
		$('#imgLeftFlag').attr('src', left_img);
		$('#imgRightFlag').attr('src', right_img);

		$('#imgLeftFlag').fadeIn();
		$('#imgRightFlag').fadeIn();
	}

	function setRandomBackgrounds() {
		$('#divLeftColor').css('background-color', getRandomColor());
		$('#divRightColor').css('background-color', getRandomColor());
	}

	function loadConjugations(verb, side) {
		$('#iframe' + side + 'Conjugations').hide();
		
		$('#img' + side + 'Loading').fadeIn(1000);

		let src = conjugationsUrl + verb;
		$('#iframe' + side + 'Conjugations').attr('src', src);
	}

	function onConjugationsLoad(side) {
		return function() {
			$('#img' + side + 'Loading').hide();
			$('#iframe' + side + 'Conjugations').fadeIn();
		}
	}

	function getRandomWordAndFlags(language) {
		return new Promise(function(resolve, reject) {
			netUtils.getLocalFile('languages/' + language + '.json', function(result) {
				let randIndex = Math.floor(Math.random() * result.words.length);

				let res = {
					word: {
						leftWord: result.words[randIndex].l,
						rightWord: result.words[randIndex].r,
						isLeftVerb: result.words[randIndex].lv,
						isRightVerb: result.words[randIndex].rv,
					},
					leftFlag: result.left_flag,
					rightFlag: result.right_flag
				};

				resolve(res);
			}, function(error, status) {
				reject(status);
			});
		});
	}

	function openOptionsPage() {
		if (chrome.runtime.openOptionsPage) {
			// New way to open options pages, if supported (Chrome 42+).
			chrome.runtime.openOptionsPage();
		} else {
			// Reasonable fallback.
			window.open(chrome.runtime.getURL('options.html'));
		}
	}

	// get a random color that white text will be visible on
	// calculated by randomly assigning a hue to 100% saturation and 35% lightness HSL
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