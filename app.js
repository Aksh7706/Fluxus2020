//==================================================== Dependencies ============================================//

const express = require('express');
const firebase = require('firebase');
const admin = require("firebase-admin");
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const serviceAccount = require("./key/key.json");
var port = process.env.PORT || 3000;

//==================================================== Initializing =============================================//

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fluxus2020-fd5e1.firebaseio.com"
});

const firebaseConfig = {
    apiKey: "AIzaSyDSgzeFiphNW_fBiRAQBhqWWmJWoPwV3DM",
    authDomain: "fluxus2020-fd5e1.firebaseapp.com",
    databaseURL: "https://fluxus2020-fd5e1.firebaseio.com",
    projectId: "fluxus2020-fd5e1",
    storageBucket: "fluxus2020-fd5e1.appspot.com",
    messagingSenderId: "509340349469",
    appId: "1:509340349469:web:76fb1ea1d6202c05ac02f4",
    measurementId: "G-F5C9SM18WT"
};

firebase.initializeApp(firebaseConfig);

//==================================================== Declarations =========================================//

let db = admin.firestore();

//==================================================== Parsing ==============================================//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//==================================================== Routes ===============================================//


app.get('/', function(req, res) {
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + '/public/dashboard/dashboard.html');
});

app.get('/techEvents', function(req, res) {
    res.sendFile(__dirname + '/public/dashboard/technical.html');
});

app.get('/cultEvents', function(req, res) {
    res.sendFile(__dirname + '/public/dashboard/cultural.html');
});

// app.get('/user', function(req, res) {
//     res.sendFile(__dirname + '/public/dashboard/user.html');
// });

app.get('/accommodation', function(req, res) {
    res.sendFile(__dirname + '/public/dashboard/accommodation.html');
});




app.get('/fluxus_register', async function(req, res) {

    idToken = req.query.token;

    if (!idToken) return res.status(401).send("Access denied. No token provided.");

    var uid;

    await admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            uid = decodedToken.uid;
        }).catch(function(error) {
            res.status(400).send("Invalid token.");
        });

    let userRef = db.collection('user').doc(uid);
    await userRef.get().then((doc) => {
        userDoc = doc
    }).catch((err) => {
        res.status(404).send(err);
    });

    if (!userDoc.exists) {
        res.sendFile('public/details/index1.html', { root: __dirname });
    } else {
        res.redirect('/dashboard');
    }

});

app.post('/fluxus_register', async function(req, res) {
    if (req.method !== 'POST') {
        res.status(400).json({ error: 'Method Not Allowed' });
    }
    var uid = req.body.token;

    const newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        cname: req.body.cname,
        gender: req.body.gender,
        email: req.body.email,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        events: [],
    };

    var fn = newUser.fname[0].toLowerCase();
    var ln = newUser.lname[0].toLowerCase();

    var name = fn[0].toUpperCase() + fn.slice(1) + " " + ln[0].toUpperCase() + ln.slice(1);

    var fid = "FS" + "-" + fn + ln + uid.substr(uid.length - 3);

    admin.firestore().collection('user').doc(uid).set(newUser).then(ref => {
        // console.log('Added document with ID: ', ref.id);
        const url = 'https://us-central1-fluxus2020-fd5e1.cloudfunctions.net/sendMail'
        var options = {
            method: 'post',
            body: {
                "dest": newUser.email,
                "fid": fid,
                "name": name,
            },
            json: true,
            url: url
        }
        request(options, function(err, res, body) {
            console.log(err);
            console.log(body);
        })
        res.redirect('/dashboard');

    }).catch((err => {
        res.json({ error: `${err}` });
    }));
});


//==================================================== Static ============================================================//

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/details'));
app.use(express.static(__dirname + '/public/dashboard'));

//==================================================== Server ============================================================//

app.listen(port, () => console.log('app listening on port 3000!'));