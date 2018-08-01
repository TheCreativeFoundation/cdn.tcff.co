const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const continueUrl = getParameterByName("continueUrl");
const code = getParameterByName("oobCode");
const mode = getParameterByName("mode");
const passInput = document.getElementById("pass-input");
const passAgainInput = document.getElementById("passAgain-input");

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$(passInput).focus(function(){
    $(this).css("border-bottom","1px rgb(62, 139, 255) solid");
    $("#pass-label").css("color","rgb(62, 139, 255)");
});

$(passInput).focusout(function(){
    $(this).css("border-bottom","1px black solid");
    $("#pass-label").css("color","black");
});

$(passAgainInput).focus(function(){
    $(this).css("border-bottom","1px rgb(62, 139, 255) solid");
    $("#passAgain-label").css("color","rgb(62, 139, 255)");
});

$(passAgainInput).focusout(function(){
    $(this).css("border-bottom","1px black solid");
    $("#passAgain-label").css("color","black");
});

function showSuccess() {
    $("#pass-input").hide();
    $("#passAgain-input").hide();
    $("#pass-label").hide();
    $("#passAgain-label").hide();
    $("#initial-header").hide();
    $("#confirm-btn").hide();
    $("#success-header").show();
    $("#continue-btn-cnt").show();
}

function showError() {
    $("#pass-input").hide();
    $("#passAgain-input").hide();
    $("#pass-label").hide();
    $("#passAgain-label").hide();
    $("#initial-header").hide();
    $("#confirm-btn").hide();
    $("#error-header").show();
}

$("#continue-btn").click(function(){
    console.log("continue button has been clicked");
    window.location.href = continueUrl;
});

$("#confirm-btn").click(function(){
    console.log("confirm button was clicked");
    const pass = passInput.value;
    const passAgain = passAgainInput.value;
    if (pass.length >= 8) {
        if (pass === "" || passAgain === ""){
            if (pass === "") {
                console.log("no password found");
                $("#pass-label").css("color","#FF7676");
                $(passInput).css("border-bottom","1px #FF7676 solid");
            }   
            if (passAgain == "") {
                console.log("no password again found");
                $("#passAgain-label").css("color","#FF7676");
                $(passAgainInput).css("border-bottom","1px #FF7676 solid");
            }
        } else {
            if (pass === passAgain) {
                console.log("passwords match");
                firebase.auth().verifyPasswordResetCode(code).then(function(){
                    firebase.auth().confirmPasswordReset(code, pass).then(function(){
                        console.log("password reset was successful");
                        showSuccess();
                    }).catch(function(error){
                        console.log("password reset was successful");
                        console.log(error);
                        showError();
                    });
                }).catch(function(error){
                    console.log("password reset was successful");
                    console.log(error);
                    showError();
                });
            } else {
                console.log("passwords dont match");
                $("#passAgain-label").text("These passwords don't match");
                $("#passAgain-label").css("color","#FF7676");
                $(passAgainInput).css("border-bottom","1px #FF7676 solid");
                $("#pass-label").css("color","#FF7676");
                $(passInput).css("border-bottom","1px #FF7676 solid");
            }
        }
    } else {
        console.log("password is too short");
        $("#pass-label").text("Password should be at least 8 characters long");
        $("#passAgain-label").css("color","#FF7676");
        $(passAgainInput).css("border-bottom","1px #FF7676 solid");
        $("#pass-label").css("color","#FF7676");
        $(passInput).css("border-bottom","1px #FF7676 solid");
    }
});
