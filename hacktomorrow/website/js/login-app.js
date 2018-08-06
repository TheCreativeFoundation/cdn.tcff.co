const token = getParameterByName("token");
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(tcfUser){
    if (tcfUser) {
        console.log("user found");
        window.location.href = "";
    } else {
        console.log("no user found");
        window.location.href = "https://accounts.tcff.co/signin?callback_uri=https://hacktomorrow.tcff.co/login";
    }
});