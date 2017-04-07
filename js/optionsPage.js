;(function() {

    $(document).ready(function() {
        $('#btnSave').on('click', saveOptions);
        $('#imgFlagsBgOption').on('click', bgOptionClicked);
        $('#imgColorsBgOption').on('click', bgOptionClicked);
        $('#selLanguage').on('change', onLanguageChanged);

        restoreOptions();
    });

    // populate options with current settings
    function restoreOptions() {
        let settingsUtils = window.settings;
        
        let settingNames = [
            settingsUtils.LANGUAGE,
            settingsUtils.BACKGROUND_TYPE
        ];

        settingsUtils.getSettings(settingNames, function(settings) {
            let language = settings[settingsUtils.LANGUAGE] || settingsUtils.DEFAULT_LANGUAGE;
            let bgType = settings[settingsUtils.BACKGROUND_TYPE] || settingsUtils.DEFAULT_BACKGROUND_TYPE;

            // set language
            $('#selLanguage').val(language);

            // set background type
            $('.bg-option').removeClass('selected');
            $('.bg-option[data-value="' + bgType + '"]').addClass('selected');

            // set proper image preview for flags bgType (based on selected language)
            $('#imgFlagsBgOption').attr('src', 'images/' + language + '_flags.png');
        })
    }

    function saveOptions() {
        let settingsUtils = window.settings;

        let language = $('#selLanguage').val();
        let bgType = $('.bg-option.selected').data('value');

        let settings = {};
        settings[settingsUtils.LANGUAGE] = language;
        settings[settingsUtils.BACKGROUND_TYPE] = bgType;

        settingsUtils.saveSettings(settings, function() {
            window.close();
        })
    }

    function bgOptionClicked(event) {
        $('.bg-option').removeClass('selected');
        $(event.target).addClass('selected');
    }

    // when the language changes, change the flags bgType img
    function onLanguageChanged(event) {
        let newSrc = 'images/' + $('#selLanguage').val() + '_flags.png';
        $('#imgFlagsBgOption').attr('src', newSrc);
    }

})();