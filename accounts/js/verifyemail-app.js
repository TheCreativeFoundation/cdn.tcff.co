const code = getParameterByName("oobCode");
const continueUrl = getParameterByName("continueUrl");
const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

console.log(continueUrl);
console.log(firebase.auth().currentUser);
function showSuccess() {
    console.log("showSuccess");
    $("#application").show();
    $("#success-header").show();
    $("button").show();
    $("#error-header").hide();
}

function showError() {
    console.log("showError");
    $("#application").show();
    $("#success-header").hide();
    $("button").hide();
    $("#error-header").show();
} 

firebase.auth().onAuthStateChanged(function(tcfUser){
    if (tcfUser) {
        console.log(tcfUser);
        firebase.auth().applyActionCode(code).then(function(resp){
            console.log("verifying user worked");
            firebase.auth().currentUser.getIdToken(true).then(function(token){
                $.post("/verifytoken",{token:token},function(data){
                    if (data.statusCode == 202 && data.isValid) {
                        console.log("verifytoken worked");
                        const userData = {
                            email: tcfUser.email,
                            username: tcfUser.username !== undefined ? tcfUser.username : null,
                            photoUrl: tcfUser.photoUrl !== undefined ? tcfUser.photoUrl : null,
                            displayName: tcfUser.displayName !== undefined ? tcfUser.displayName : null,
                            uid: tcfUser.uid
                        };
                        console.log(userData);
                        console.log(userData);
                        $.post("/createuserhash", userData, function(data){
                            console.log(data.userData);
                            if (data.statusCode == 202) {
                                document.querySelector("button").addEventListener('click', function(){
                                    window.location.href = continueUrl; 
                                });
                                showSuccess();
                            } else {
                                console.log(data.message);
                                showError();
                            }
                        });
                    } else {
                        console.log(data.message);
                        showError();
                    }
                });
            }).catch(function(error){
                console.log("getIdToken threw error: "+error);
            });
            showSuccess();
        }).catch(function(error){
            console.log("verifying user did not work");
            showError();
        });
    }
});