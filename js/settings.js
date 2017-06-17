;(function() {

    let settingsExport = {
        BACKGROUND_TYPE: 'BACKGROUND_TYPE',
        DEFAULT_BACKGROUND_TYPE: 'COLORS',

        FLAG_BACKGROUND: 'FLAGS',
        COLOR_BACKGROUND: 'COLORS', // NOTE: change default if you change this
        
        LANGUAGE: 'LANGUAGE',
        DEFAULT_LANGUAGE: 'spanish_english',

        getSettings: function(settingName, callback) {
            chrome.storage.sync.get(settingName, callback);
        },
        // setting is an object of the form of {name: value}
        saveSettings: function(setting, callback) {
            chrome.storage.sync.set(setting, callback);
        }
    };

    window.settings = settingsExport;

})();