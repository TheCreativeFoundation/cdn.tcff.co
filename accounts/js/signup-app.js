const body = document.getElementById("body");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("pass-input");
const firstNameInput = document.getElementById("firstName-input");
const lastNameInput = document.getElementById("lastName-input");
const usernameInput = document.getElementById("username-input");
const signupButton = document.getElementById("signup-button");
const colors = ["#00f0ff", "#fd51ff", "#ff0000", "#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");
const service = getParameterByName("service");

body.style.backgroundColor = colors[randomNumberOne];
signupButton.style.backgroundColor = colors[randomNumberOne];

$("#haveAccountLink a").css("color", colors[randomNumberTwo]);
$("#haveAccountLink a").attr("href", "/signin?callback_uri=" + callback + "&callback=" + callback);

$(emailInput).focus(function () {
    $("#email-label").css("color", "rgb(62, 139, 255)");
    $(this).css("border-bottom", "2px rgb(62, 139, 255) solid");
});

$(emailInput).focusout(function () {
    $("#email-label").css("color", "black");
    $(this).css("border-bottom", "1px black solid");
});

$(passInput).focus(function () {
    $("#pass-label").css("color", "rgb(62, 139, 255)");
    $(this).css("border-bottom", "2px rgb(62, 139, 255) solid");
});

$(passInput).focusout(function () {
    $("#pass-label").css("color", "black");
    $(this).css("border-bottom", "1px black solid");
});

$(usernameInput).focus(function () {
    $("#username-label").css("color", "rgb(62, 139, 255)");
    $(this).css("border-bottom", "2px rgb(62, 139, 255) solid");
});

$(usernameInput).focusout(function () {
    $("#username-label").css("color", "black");
    $(this).css("border-bottom", "1px black solid");
});

$(firstNameInput).focus(function () {
    $("#firstName-label").css("color", "rgb(62, 139, 255)");
    $(this).css("border-bottom", "2px rgb(62, 139, 255) solid");
});

$(firstNameInput).focusout(function () {
    $("#firstName-label").css("color", "black");
    $(this).css("border-bottom", "1px black solid");
});

$(lastNameInput).focus(function () {
    $("#lastName-label").css("color", "rgb(62, 139, 255)");
    $(this).css("border-bottom", "2px rgb(62, 139, 255) solid");
});

$(lastNameInput).focusout(function () {
    $("#lastName-label").css("color", "black");
    $(this).css("border-bottom", "1px black solid");
});

function showSuccess() {
    $("#application-form").hide();
    $("#initial-header").hide();
    $("#haveAccountLink").hide();
    $(".btn").hide();
    $("#secondary-header").show();
}

function showError() {
    $("#application-form").hide();
    $("#initial-header").hide();
    $("#haveAccountLink").hide();
    $(".btn").hide();
    $("#error-header").show();
}

$(signupButton).click(function () {
    const pass = passInput.value;
    console.log(pass);
    const email = emailInput.value;
    console.log(email);
    const username = usernameInput.value;
    console.log(username);
    const firstName = firstNameInput.value;
    console.log(firstName);
    const lastName = lastNameInput.value;
    console.log(lastName);
    if (pass === "" || email === "" || username === "" || firstName === "" || lastName === "") {
        if (pass === "") {
            $(passInput).css("border-bottom", "1px #FF7676 solid");
            $("#pass-label").css("color", "#FF7676");
        }
        if (email === "") {
            $(emailInput).css("border-bottom", "1px #FF7676 solid");
            $("#email-label").css("color", "#FF7676");
        }
        if (username === "") {
            $(usernameInput).css("border-bottom", "1px #FF7676 solid");
            $("#username-label").css("color", "#FF7676");
        }
        if (firstName === "") {
            $(firstNameInput).css("border-bottom", "1px #FF7676 solid");
            $("#firstName-label").css("color", "#FF7676");
        }
        if (lastName === "") {
            $(lastNameInput).css("border-bottom", "1px #FF7676 solid");
            $("#lastName-label").css("color", "#FF7676");
        }
        resetButton();
    } else {
        if (pass.length >= 8) {
            if (document.getElementById("termsOfService-input").checked) {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: "https://tcff.auth0.com/dbconnections/signup",
                    method: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        client_id: CLIENT_ID,
                        email: email,
                        password: pass,
                        username: username,
                        connection: 'Username-Password-Authentication',
                        user_metadata: {
                            firstName: firstName,
                            lastName: lastName,
                        }
                    }),
                    success: (data) => {
                        if (data.statusCode === 404) {
                            if (data.code === "invalid_password") {

                            } else if (data.code === "password_dictionary_error") {

                            } else if (data.code === "user_exists") {

                            } else if (data.code === "username_exists") {

                            } else if (data.code === "password_no_user_info_error") {

                            } else {

                            }
                        } else {
                            
                        }
                    },
                    error: () => {}
                });
            } else {
                $("#termsOfService-label").css("color", "#FF7676");
                $("#termsOfService-label a").css("color", "#FF7676");
                resetButton();
            }
        } else {
            $("#pass-label").text("Password should be at least 8 characters long");
            $("#passAgain-label").css("color", "#FF7676");
            $("#pass-label").css("color", "#FF7676");
            $(passInput).css("border-bottom", "1px #FF7676 solid");
            $(passAgainInput).css("border-bottom", "1px #FF7676 solid");
            resetButton();
        }
    }
});