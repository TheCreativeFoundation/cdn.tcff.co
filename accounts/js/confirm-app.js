const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$("#no-btn").click(function(){
    console.log("the no button was clicked");
    firebase.auth().signOut().then(function(){
        console.log("sign out successful");
        window.location.href = "/signin?callback="+callback;
    }).catch(function(error){
        console.log("signout not successful");
        window.location.href = "/error";
    });
});

$("#yes-btn").click(function(){
    console.log("the yes button was clicked");
    const tcfUser = firebase.auth().currentUser;
    tcfUser.getIdToken(true).then(function (token) {
        $.post("/verifytoken", {
            token: token
        }, function (data) {
            if (data.statusCode === 202 && data.isValid) {
                const userData = {
                    email: tcfUser.email,
                    username: tcfUser.username !== undefined ? tcfUser.username : null,
                    photoUrl: tcfUser.photoUrl !== undefined ? tcfUser.photoUrl : null,
                    displayName: tcfUser.displayName !== undefined ? tcfUser.displayName : null,
                    uid: tcfUser.uid
                }
                $.post("/createuserhash", userData, function(data){                   
                    if (data.statusCode === 202) {
                        const fullCallback = callback+"?user="+data.userData;
                        window.location.href = fullCallback;
                    } else {
                        console.log(data.message);
                        window.location.href = "/erro";
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