var db;
var uid;
var email;

document.addEventListener('DOMContentLoaded', () => {
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
    db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            email = user.email;
            console.log(uid);
            console.log(email);
        } else {
            window.location.href = "/";
        }
    });
})


async function registerMusic(eventCode) {


    var eventRef = db.collection("cult").doc("Music");
    var userRef = db.collection("user").doc(uid);
    if (eventCode == 201) {
        await eventRef.update({
            201: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 202) {
        await eventRef.update({
            202: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 203) {
        await eventRef.update({
            203: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerDance(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("Dance");
    var userRef = db.collection("user").doc(uid);
    if (eventCode == 301) {
        await eventRef.update({
            301: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 302) {
        await eventRef.update({
            302: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 303) {
        await eventRef.update({
            303: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 304) {
        await eventRef.update({
            304: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerKala(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("Kalakriti");
    var userRef = db.collection("user").doc(uid);
    if (eventCode == 401) {
        await eventRef.update({
            401: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 402) {
        await eventRef.update({
            402: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 403) {
        await eventRef.update({
            403: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 404) {
        await eventRef.update({
            404: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 405) {
        await eventRef.update({
            405: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    if (eventCode == 406) {
        await eventRef.update({
            406: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        await userRef.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                code: eventCode,
                paid: true
            })
        });
        $('#dtext').text(eventCode);
        $('#confirmModal').modal('show')
    }
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}


async function registerMyst(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("Myst");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: true
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerCine(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("Cine");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: true
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}


async function registerDeb(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("DebSoc");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: true
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerDrama(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("cult").doc("Drama");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: true
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerRobo(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("tech").doc("Robotics");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: false
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

async function registerPML(eventCode) {
    // var user = firebase.auth().currentUser;
    // var uid = user.uid;

    var eventRef = db.collection("tech").doc("PML");
    var userRef = db.collection("user").doc(uid);
    await eventRef.update({
        [eventCode]: firebase.firestore.FieldValue.arrayUnion(uid)
    });
    await userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion({
            code: eventCode,
            paid: false
        })
    });
    $('#dtext').text(eventCode);
    $('#confirmModal').modal('show');
    const url = "https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendEventMail";
    const data = {
        "dest": email,
        "event": eventCode,
    };
    $.post(url, data, function(data, status) {
        console.log(`${data} and status is ${status}`);
    })
}

console.log("Iskin maa ki chuu function call ua he");


async function signOUT() {

    await firebase.auth().signOut().then(function() {
        $('#signOutModal').modal('show');
    }).catch(function(error) { console.log(error) });
}

$('#signOutModal').on('hidden.bs.modal', function() {
    window.location.href = "/";
});