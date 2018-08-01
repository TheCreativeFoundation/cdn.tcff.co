const profileEmail = document.getElementById("profile-email");

firebase.auth().onAuthStateChanged(function (tcfUser) {
    if (tcfUser) {
        console.log("found a user");
        profileEmail.textContent = tcfUser.email;
        $("body").css("display", "block");
    } else {
        console.log("no user found, routing to sign in page");
        window.location.href = "/signin?callback_uri=" + callback;
    }
});