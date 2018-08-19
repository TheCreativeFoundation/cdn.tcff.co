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
        window.location.href = "/signin?callback_uri="+callback;
    }).catch(function(error){
        console.log("signout not successful");
        console.log(error);
        window.location.href = "/error";
    });
});

// $("#yes-btn").click(function(){
//     console.log("the yes button was clicked");
//     firebase.auth().currentUser.getIdToken().then(function(token) {
//         console.log("token retrieved");
//         $.post("/api/createtoken", {token:token}, function(data){
//             console.log(data.statusCode);                   
//             if (data.statusCode === 202) {
//                 console.log(data.message);
//                 const customToken = data.token;
//                 console.log(customToken);
//                 $.post("/api/email/onconfirm", {token:token}, function(data2){
//                     if (data2.statusCode === 202) {
//                         console.log(data.message);
//                         window.location.href = callback+"?token="+customToken;
//                     } else {
//                         console.log(data2.message);
//                         window.location.href = "/error";
//                     }
//                 });
//             } else {
//                 console.log(data.message);
//                 window.location.href = "/error";
//             }
//         });
//     }).catch(function (error) {
//         console.log("getIdToken threw error: " + error);
//     });
// });

$("#yes-btn").click(() => {
    firebase.auth().currentUser.getIdToken(true).then((token) => {
        console.log("token retrieved");
        $.ajax({
            type: 'POST',
            url: '/api/createtoken',
            contentType: 'application/json',
            data: JSON.stringify({token: token});
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
                                window.location.href = "/error";
                            }
                        } 
                    });
                } else {
                    window.location.href = "/error";
                }
            }
        });
    }).catch((error) => {
        console.log("getIdToken threw error: " + error);
        window.location.href = "/error";
    });
});