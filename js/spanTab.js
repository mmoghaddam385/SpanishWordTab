;(function(){

	const conjugationsUrl = 'http://api.verbix.com/conjugator/html?&tableurl=https://raw.githubusercontent.com/mmoghaddam385/SpanishWordTab/master/verbix-template.html';
	const LEFT_SIDE = 'Left';
	const RIGHT_SIDE = 'Right';

	let netUtils;
	let settingsUtils;

	$(document).ready(function() {
		netUtils = window.netUtils;
		settingsUtils = window.settings;
		
		$('#iframeLeftConjugations').on('load', onConjugationsLoad(LEFT_SIDE));
		$('#iframeRightConjugations').on('load', onConjugationsLoad(RIGHT_SIDE));

		$('#iframeLeftConjugations').on('error', function(arg) {
			alert('there was an rtort');
		})

		$('#imgSettings').on('click', openOptionsPage);

		settingsUtils.getSettings([settingsUtils.BACKGROUND_TYPE, settingsUtils.LANGUAGE], function(settings) {
			let language = settings[settingsUtils.LANGUAGE] || settingsUtils.DEFAULT_LANGUAGE;
            let bgType = settings[settingsUtils.BACKGROUND_TYPE] || settingsUtils.DEFAULT_BACKGROUND_TYPE;

			getRandomWordAndFlags(language).then(function(result) {

				// set the background
				setBackground(bgType, result.leftFlag, result.rightFlag);

				// set the words
				$('#bLeft').html(result.word.leftWord);
				$('#bRight').html(result.word.rightWord);

				$('#divLeft').fadeIn();
				$('#divRight').fadeIn();

				// set the tab title
				document.title = 'Word of the Tab: ' + result.word.leftWord;

				// if its a verb, conjugate
				if (result.word.isVerb) {
					if (result.conjugations.conjugateLeft) {
						loadConjugations(result.word.leftWord, result.conjugations.leftLangCode, LEFT_SIDE);
					}

					if (result.conjugations.conjugateRight) {
						loadConjugations(result.word.rightWord, result.conjugations.rightLangCode, RIGHT_SIDE);
					}
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

	function loadConjugations(verb, langCode, side) {
		if (navigator.onLine) {
			$('#iframe' + side + 'Conjugations').hide();
			
			$('#img' + side + 'Loading').fadeIn(1000);

			let src = conjugationsUrl + '&language=' + langCode + '&verb=' + verb;
			$('#iframe' + side + 'Conjugations').attr('src', src);
		} else {
			$('#div' + side + 'NoNetwork').show();
		}
	}

	function onConjugationsLoad(side) {
		return function() {
			$('#img' + side + 'Loading').hide();
			$('#iframe' + side + 'Conjugations').fadeIn();
		}
	}

	/**
	 * returns object {
	 * 		word: {
	 *	 		leftWord: [string],
	 * 			rightWord: [string],
	 * 			isVerb: [boolean]
	 *		},
	 * 		conjugations: {
	 * 			conjugateLeft: [boolean], whether or not to conjugate the left word if it's a verb
	 * 			leftLangCode: [string], the language code to conjugate with verbix
	 * 
	 * 			conjugateRight: [boolean],
	 * 			rightLangCode: [string]
	 *		},
	 *		leftFlag: [img_url],
	 *		rightFlag: [img_url]
	 * }
	 */
	function getRandomWordAndFlags(language) {
		return new Promise(function(resolve, reject) {
			netUtils.getLocalFile('languages/' + language + '.json', function(result) {
				let randIndex = Math.floor(Math.random() * result.words.length);

				console.log(JSON.stringify(result.conjugations));

				let res = {
					word: {
						leftWord: result.words[randIndex].l,
						rightWord: result.words[randIndex].r,
						isVerb: result.words[randIndex].isVerb,
					},
					conjugations: {
						conjugateLeft: result.conjugations.conjugate_left,
						leftLangCode: result.conjugations.left_language_code,

						conjugateRight: result.conjugations.conjugate_right,
						rightLangCode: result.conjugations.right_language_code
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