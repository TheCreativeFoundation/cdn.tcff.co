const body = document.getElementById("body");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("pass-input");
const emailLabel = document.getElementById("email-label");
const passLabel = document.getElementById("pass-label");
const signinButton = document.getElementById("signin-button");
const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"]
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");
const service = getParameterByName("service");

body.style.backgroundColor = colors[randomNumberOne];
signinButton.style.backgroundColor = colors[randomNumberOne];

$("#forgotPasswordLink a").attr("href","/forgotpassword?callback_uri="+callback);
$("#createAccountLink a").attr("href","/signup?callback_uri="+callback);

$("a").css("color",colors[randomNumberTwo]);

document.getElementById("service").textContent = service;

$(emailInput).focus(function(){
    $(this).css("border-bottom","1px rgb(62, 139, 255) solid");
    $(this).css("color","rgb(62, 139, 255)");
    $(emailLabel).css("color","rgb(62, 139, 255)");
});

$(emailInput).focusout(function(){
    $(this).css("border-bottom","1px black solid");
    $(this).css("color","black");
    $(emailLabel).css("color","black");
});

$(passInput).focus(function(){
    $(this).css("border-bottom","1px rgb(62, 139, 255) solid");
    $(this).css("color","rgb(62, 139, 255)");
    $(passLabel).css("color","rgb(62, 139, 255)");
});

$(passInput).focusout(function(){
    $(this).css("border-bottom","1px black solid");
    $(this).css("color","black");
    $(passLabel).css("color","black");
})

$(signinButton).click(function(){
    console.log("signin-button clicked");
    const email = emailInput.value;
    const pass = passInput.value;
    console.log(pass);
    console.log(email);
    if (email === "" || pass === ""){
        if (email === ""){
            $(emailLabel).css("color","#FF7676");
            $(emailInput).css("border-bottom","1px #FF7676 solid");
        }
        if (pass === ""){
            $(passLabel).css("color","#FF7676");
            $(passInput).css("border-bottom","1px #FF7676 solid");
        }
        resetButton();
    }
    else {
        const webAuth = new auth0.WebAuth({
            domain: 'tcff.auth0.com',
            clientID: 'o314Vjy5gyCCfHnA1ieVbxwXZzTxwAtZ'
            responseType: 'token id_token',
            scope: 'openid'
        });
        webAuth.login({
            realm: 'Username-Password-Authentication',
            username: email,
            password: pass
        }, function(err) {
            if (err) alert(err);
        });  
    }
});
