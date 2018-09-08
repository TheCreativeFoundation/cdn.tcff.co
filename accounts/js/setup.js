var webAuth = new auth0.WebAuth({
    domain: 'tcff.auth0.com',
    clientID: 'o314Vjy5gyCCfHnA1ieVbxwXZzTxwAtZ',
    redirectUri: 'https://accounts.tcff.co/signin/confirm'
});

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const resetButton = () => {
    $("button").attr("disabled", false);
    $("button").css("opacity", "1");
}