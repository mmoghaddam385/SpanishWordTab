;(function() {

    $(document).ready(function() {
        $('#btnSave').on('click', saveOptions);
        $('#imgFlagsBgOption').on('click', bgOptionClicked);
        $('#imgColorsBgOption').on('click', bgOptionClicked);

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
            console.log(JSON.stringify(settings));

            let language = settings[settingsUtils.LANGUAGE] || settingsUtils.DEFAULT_LANGUAGE;
            let bgType = settings[settingsUtils.BACKGROUND_TYPE] || settingsUtils.DEFAULT_BACKGROUND_TYPE;

            console.log(language);
            console.log(bgType);

            // set language
            $('#selLanguage').val(language);

            // set background type
            $('.bg-option').removeClass('selected');
            $('.bg-option[data-value="' + bgType + '"]').addClass('selected');
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

})();