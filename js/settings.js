;(function() {

    let settingsExport = {
        BACKGROUND_TYPE: 'BACKGROUND_TYPE',
        FLAG_BACKGROUND: 'FLAGS',
        COLOR_BACKGROUND: 'COLORS',
        
        LANGUAGE: 'LANGUAGE',

        getSettings: function(settingName, callback) {
            chrome.storage.sync.get(settingName, callback);
        },
        // setting is an object of the form of {name: value}
        setSettings: function(setting, callback) {
            chrome.storage.sync.set(setting, callback);
        }
    };

    window.settings = settingsExport;

})();