const token = getParameterByName("token");
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(tcfUser){
    if (tcfUser) {
        console.log("user found");
        
    } else {
        console.log("no user found");
        $("#question-view").show();
    }
});