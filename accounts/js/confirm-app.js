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
        window.location.href = "/error";
    });
});

$("#yes-btn").click(function(){
    console.log("the yes button was clicked");
    const tcfUser = firebase.auth().currentUser;
    tcfUser.getIdToken(true).then(function(token) {
        $.post("/verifytoken", {
            token: token
        }, function (data) {
            if (data.statusCode === 202 && data.isValid) {
                db.collection("accounts").doc(tcfUser.uid).get().then(function(doc){
                    if (doc.exists) {
                        const userData = {
                            token: token,
                            email: tcfUser.email,
                            username: tcfUser.displayName,
                            photoUrl: doc.photoUrl,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            uid: tcfUser.uid
                        };
                        console.log(userData);
                        $.post("/createuserhash", userData, function(data){                   
                            if (data.statusCode === 202) {
                                const fullCallback = callback+"?user="+data.userData;
                                window.location.href = fullCallback;
                            } else {
                                console.log(data.message);
                                window.location.href = "/error";
                            }
                        });
                    } else {
                        console.log("no document for user was found");
                        window.location.href = "/error";
                    }
                }).catch(function(error){
                    console.log(error.message);
                    window.location.href = "/error";
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