const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;

const db = firebase.firestore();

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$("#no-btn").click(function(){
    console.log("the no button was clicked");
    firebase.auth().signOut().then(function(){
        console.log("sign out successful");
        window.location.href = "/signin?callback_uri="+callback+"&service="+service;
    }).catch(function(error){
        console.log("signout not successful");
        console.log(error);
        window.location.href = "/error";
    });
});

$("#yes-btn").click(() => {
    console.log(service);
    firebase.auth().currentUser.getIdToken(true).then((token) => {
        console.log("token retrieved");
        $.ajax({
            type: 'POST',
            url: '/api/createtoken',
            contentType: 'application/json',
            data: JSON.stringify({token: token, service: service}),
            success: (data) => {
                console.log(data.message);
                if (data.statusCode === 202) {
                    const customToken = data.token;
                    $.ajax({
                        type: 'POST',
                        url: '/api/email/onconfirm',
                        contentType: 'application/json',
                        data: JSON.stringify({token:token}),
                        success: (data2) => {
                            console.log(data2.message);
                            if (data2.statusCode === 202) {
                                window.location.href = callback+"?token="+customToken;
                            } else {
                                console.log(data2.message);
                                window.location.href = "/error";
                            }
                        } 
                    });
                } else {
                    console.log(data.message);
                    window.location.href = "/error";
                }
            }
        });
    }).catch((error) => {
        console.log("getIdToken threw error: " + error);
        window.location.href = "/error";
    });
});