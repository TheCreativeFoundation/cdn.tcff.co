const code = getParameterByName("oobCode");
const continueUrl = getParameterByName("continueUrl");
const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$(".btn").attr("href", continueUrl);

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
            showSuccess();
        }).catch(function(error){
            console.log("verifying user did not work");
            console.log(error.message);
            showError();
        });
    }
});