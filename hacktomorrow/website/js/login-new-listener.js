var config = {
    apiKey: "AIzaSyClVwGc5lhfOxCX1q514chFf2QjFyxXr90",
    authDomain: "tcff-accounts.firebaseapp.com",
    databaseURL: "https://tcff-accounts.firebaseio.com",
    projectId: "tcff-accounts",
    storageBucket: "tcff-accounts.appspot.com",
    messagingSenderId: "371281398124"
};

firebase.initializeApp(config);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const token = getParameterByName("token");
const db = firebase.firestore();

function createNewClaim(uid){
    const docRef = db.collections("accounts").doc(uid);
    docRef.update({"permissions.htMember":true,"permissions.htTeamMember":false}).then(() => {
        firebase.auth().currentUser.getIdToken(true).then((token) => {
            $.post("/set-claims",{token:token},(data) => {
                if (data.statusCode === 202) {
                    firebase.auth().currentUser.getIdToken(true).then((token) => {
                        if (token.claims.htMember) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }).catch((error) => {
                        console.log(error);
                        return 0;
                    });
                } else {
                    console.log(data.message);
                    return 0;
                }
            });
        }).catch((error) => {
            console.log(error);
            return 0;
        });
    }).catch((error) => {
        console.log(error);
        return 0;
    });
}


firebase.auth().signInWithCustomToken(token).then(() => {
    const tcfUser = firebase.auth().currentUser;
    console.log(tcfUser);
    const uid = tcfUser.uid;
    if (firebase.claims.htMember === undefined) {
        // new to hacktomorrow        
        const response = createNewClaim();
        if (response === 1) {
            window.location.href = "/welcome";
        } else {
            window.location.href = "/login/error";
        }
    } else {
        // a user coming back to hacktomorrow
        
    }
}).catch((error) => {
    console.log("signin with custom token was not successful");
    window.href.location = "/login/error";
});