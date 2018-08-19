const body = document.getElementById("body");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("pass-input");
const passAgainInput = document.getElementById("passAgain-input");
const firstNameInput = document.getElementById("firstName-input");
const lastNameInput = document.getElementById("lastName-input");
const usernameInput = document.getElementById("username-input");
const signupButton = document.getElementById("signup-button");
const colors = ["#00f0ff","#fd51ff","#ff0000","#ffb400"];
const randomNumberOne = Math.floor(Math.random() * 4);
const randomNumberTwo = (randomNumberOne === 3) ? randomNumberOne - 1 : randomNumberOne + 1;
const callback = getParameterByName("callback_uri");

body.style.backgroundColor = colors[randomNumberOne];
signupButton.style.backgroundColor = colors[randomNumberOne];

const db = firebase.firestore();

$("#haveAccountLink a").css("color",colors[randomNumberTwo]);
$("#haveAccountLink a").attr("href","/signin?callback_uri="+callback);

$(emailInput).focus(function(){
    $("#email-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(emailInput).focusout(function(){
    $("#email-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

$(passInput).focus(function(){
    $("#pass-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(passInput).focusout(function(){
    $("#pass-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

$(passAgainInput).focus(function(){
    $("#passAgain-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(passAgainInput).focusout(function(){
    $("#passAgain-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

$(usernameInput).focus(function(){
    $("#username-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(usernameInput).focusout(function(){
    $("#username-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

$(firstNameInput).focus(function(){
    $("#firstName-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(firstNameInput).focusout(function(){
    $("#firstName-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

$(lastNameInput).focus(function(){
    $("#lastName-label").css("color","rgb(62, 139, 255)");
    $(this).css("border-bottom","2px rgb(62, 139, 255) solid");
});

$(lastNameInput).focusout(function(){
    $("#lastName-label").css("color","black");
    $(this).css("border-bottom","1px black solid");
});

function showSuccess(){
    $("#application-form").hide();
    $("#initial-header").hide();
    $("#haveAccountLink").hide();
    $(".btn").hide();
    $("#secondary-header").show();
}

function showError(){
    $("#application-form").hide();
    $("#initial-header").hide();
    $("#haveAccountLink").hide();
    $(".btn").hide();
    $("#error-header").show();
}

function deleteUser(){
    firebase.auth().currentUser.delete().then(function(){
        console.log("user deleted");
        showError();
    }).catch(function(error){
        console.log("could not delete user");
        window.location.href = "/error";
    });
}

$(signupButton).click(function() {
    const pass = passInput.value; console.log(pass);
    const passAgain = passAgainInput.value; console.log(passAgain);
    const email = emailInput.value; console.log(email);
    const username = usernameInput.value; console.log(username);
    const firstName = firstNameInput.value; console.log(firstName);
    const lastName = lastNameInput.value; console.log(lastName);
    if (pass === "" || passAgain === "" || email === "" || username === "" || firstName === "" || lastName === "") {
        if (pass === "") {
            $(passInput).css("border-bottom", "1px #FF7676 solid");
            $("#pass-label").css("color", "#FF7676");
        }
        if (passAgain === "") {
            $(passAgainInput).css("border-bottom", "1px #FF7676 solid");
            $("#passAgain-label").css("color", "#FF7676");
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
            if (pass === passAgain) {
                if (document.getElementById("termsOfService-input").checked) {
                    const auth = firebase.auth();
                    auth.createUserWithEmailAndPassword(email, pass).then(function(){
                        console.log(auth.currentUser);
                        db.collection("accounts").doc(auth.currentUser.uid).set({
                            firstName: firstName,
                            lastName: lastName,
                            agreedToTerms: true,
                            username: username,
                            email: email,
                            photoUrl: "https://cdn.tcff.co/jojo-mature.png",
                            permissions:{tcfUser:true}
                        }).then(function(ref){
                            console.log(ref);
                            auth.currentUser.updateProfile({
                                displayName: username,
                                photoURL: "https://cdn.tcff.co/jojo-mature.png"
                            }).then(function(){
                                const state = {
                                    url: "https://accounts.tcff.co/signin/confirm?callback_uri="+callback,
                                    handleCodeInApp: false
                                };
                                console.log(state);
                                auth.currentUser.sendEmailVerification(state).then(function(){
                                    console.log("email verification email sent correctly");
                                    showSuccess();
                                }).catch(function(error){
                                    console.log(error);
                                    deleteUser();
                                    showError();
                                });
                            }).catch(function(error){
                                console.log(error);
                                deleteUser();
                                showError();
                            });
                        }).catch(function(error){
                            console.log(error.message);
                            deleteUser();
                            showError();
                        });
                    }).catch(function(error){
                        console.log(error.message);
                        if (error.code == "auth/email-already-in-use") {
                            $("#email-label").text("A TCF Account with this email already exists");
                            $('#email-label').css("color","#FF7676");
                            $(emailInput).css("border-bottom","1px #FF7676 solid");
                        } else if (error.code === "auth/invalid-email") {
                            $("#email-label").text("This email is invalid");
                            $('#email-label').css("color","#FF7676");
                            $(emailInput).css("border-bottom","1px #FF7676 solid");
                        } else {
                            console.log(error.code);
                            window.location.href = "/error";
                        }
                        resetButton();
                    });
                } else {
                    $("#termsOfService-label").css("color", "#FF7676");
                    $("#termsOfService-label a").css("color", "#FF7676");
                    resetButton();
                }
            } else {
                $("#passAgain-label").text("Passwords don't match");
                $("#passAgain-label").css("color","#FF7676");
                $("#pass-label").css("color","#FF7676");
                $(passInput).css("border-bottom","1px #FF7676 solid");
                $(passAgainInput).css("border-bottom","1px #FF7676 solid");
                resetButton();
            }
        } else {
            $("#pass-label").text("Password should be at least 8 characters long");
            $("#passAgain-label").css("color","#FF7676");
            $("#pass-label").css("color","#FF7676");
            $(passInput).css("border-bottom","1px #FF7676 solid");
            $(passAgainInput).css("border-bottom","1px #FF7676 solid");
            resetButton();
        }
    }
});