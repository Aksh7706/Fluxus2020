var firebaseConfig = {
    apiKey: "AIzaSyDSgzeFiphNW_fBiRAQBhqWWmJWoPwV3DM",
    authDomain: "fluxus2020-fd5e1.firebaseapp.com",
    databaseURL: "https://fluxus2020-fd5e1.firebaseio.com",
    projectId: "fluxus2020-fd5e1",
    storageBucket: "fluxus2020-fd5e1.appspot.com",
    messagingSenderId: "509340349469",
    appId: "1:509340349469:web:76fb1ea1d6202c05ac02f4",
    measurementId: "G-F5C9SM18WT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        position: 'absolute' // Element positioning
    };

    var target = document.getElementById('foo');
    var spinner = new Spinner(opts);
    spinner.spin(target);
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            var uid = user.uid;
            var docRef = db.collection("user").doc(uid);

            await docRef.get().then(function(doc) {
                if (doc.exists) {
                    window.location = '/dashboard';
                } else {

                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        } else {
            console.log("aksh");
            spinner.stop();
            $("#f12").remove();
        }
    });

});

(function($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);


$(".btn-face").on('click', function(event) {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        // var uid = user.uid;

        firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
            window.location = '/fluxus_register?token=' + token;
        }).catch(function(error) {
            // Handle error
        });

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

async function G_Sign_In() {
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // console.log(token);
        // // The signed-in user info.
        // var user = result.user;
        // var uid = result.user.uid;
        // window.location = '/fluxus_register?token=' + token;
        firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
            window.location = '/fluxus_register?token=' + idToken;
        }).catch(function(error) {
            // Handle error
        });

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
};