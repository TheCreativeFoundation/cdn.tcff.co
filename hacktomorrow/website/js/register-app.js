const config = {
    apiKey: "AIzaSyAST_jvoKcXxoBIZWUNPTqneE4mHv6QLNA",
    authDomain: "hacktomorrow-website.firebaseapp.com",
    databaseURL: "https://hacktomorrow-website.firebaseio.com",
    projectId: "hacktomorrow-website",
    storageBucket: "hacktomorrow-website.appspot.com",
    messagingSenderId: "695600248341"
};
firebase.initializeApp(config);

const loginButton = document.getElementById('button');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginButton.addEventListener('click', function () {
    const theEmail = email.value;
    const thePassword = password.value; 
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(theEmail, thePassword);
    promise.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        // create token
        // store token
    } else {
        console.log("not user");
        // pass
    }
});