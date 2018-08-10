const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");

const db = firebase.firestore();

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$("#no-btn").click(function(){
    console.log("the no button was clicked");
    firebase.auth().signOut().then(function(){
        console.log("sign out successful");
        window.location.href = "/signin?callback="+callback;
    }).catch(function(error){
        console.log("signout not successful");
        console.log(error);
        window.location.href = "/error";
    });
});

$("#yes-btn").click(function(){
    console.log("the yes button was clicked");
    firebase.auth().currentUser.getIdToken().then(function(token) {
        $.post("/createtoken", {token:token}, function(data){                   
            if (data.statusCode === 202) {
                const customToken = data.token;
                $.post("/email/onconfirm", {token:token}, function(data2){
                    if (data2.statusCode === 202) {
                        window.location.href = callback+"?token="+customToken;
                    } else {
                        console.log(data2.message);
                        window.location.href = "/error";
                    }
                });
            } else {
                console.log(data.message);
                window.location.href = "/error";
            }
        });
    }).catch(function (error) {
        console.log("getIdToken threw error: " + error);
    });
});