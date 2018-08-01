const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");
const emailInput = document.getElementById("email-input");

$("body").css("background-color",colors[randomNumberOne]);
$(".btn").css("background-color",colors[randomNumberOne]);

$("a").css("color",colors[randomNumberTwo]);
$("#rememberPasswordLink").attr("href","/signin?callback_uri="+callback);

$("#email-input").focus(function(){
    $(this).css("border-bottom","1px rgb(62, 139, 255) solid");
    $(this).css("color","rgb(62, 139, 255)");
    $("#email-label").css("color","rgb(62, 139, 255)");
});

$("#email-input").focusout(function(){
    $(this).css("border-bottom","1px black solid");
    $(this).css("color","black");
    $("#email-label").css("color","black");
});

function showSuccess(){
    $("#application-form").hide();
    $("button").hide();
    $("h4").hide();
    $("#initial-header").hide();
    $("#secondary-header").show();
    $("#givenEmail").show();
}

$("#confirm-btn").click(function(){
    const email = emailInput.value;
    if (email === "") {
        $("#email-input").css("border-bottom","1px #FF7676 solid");
        $("#email-label").css("color","#FF7676");
    } else {
        const state = {
            url: "http://localhost:5000/v1/signin?callback="+callback,
            handleCodeInApp: false
        }

        firebase.auth().sendPasswordResetEmail(email, state).then(function() {
            console.log("reset password sent successfully");
            showSuccess();
        }).catch(function(error) {
            console.log(error);
            if (error.code === "auth/invalid-email") {
                $("#email-label").text("This email is invalid");
                $("#email-input").css("border-bottom", "1px #FF7676 solid");
                $("#email-label").css("color", "#FF7676");
            } else if (error.code === "auth/user-not-found") {
                $("#email-label").text("No TCF Account is associated with this email");
                $("#email-input").css("border-bottom", "1px #FF7676 solid");
                $("#email-label").css("color", "#FF7676");
            } else {
                
            }
        });
    }
});