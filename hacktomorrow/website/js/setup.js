var config = {
    apiKey: "AIzaSyClVwGc5lhfOxCX1q514chFf2QjFyxXr90",
    authDomain: "tcff-accounts.firebaseapp.com",
    databaseURL: "https://tcff-accounts.firebaseio.com",
    projectId: "tcff-accounts",
    storageBucket: "tcff-accounts.appspot.com",
    messagingSenderId: "371281398124"
};

firebase.initializeApp(config);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}