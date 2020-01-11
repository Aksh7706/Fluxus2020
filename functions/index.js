const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const request = require('request');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const serviceAccount = require("./key/key.json");
const app = express();
const cors = require('cors')({ origin: true });

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
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('/dashboard', function(req, res) {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile(__dirname + '/public/dashboard/dashboard.html');
});

app.get('/techEvents', function(req, res) {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile(__dirname + '/public/dashboard/technical.html');
});

app.get('/cultEvents', function(req, res) {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile(__dirname + '/public/dashboard/cultural.html');
});

app.get('/accommodation', function(req, res) {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile(__dirname + '/public/dashboard/accommodation.html');
});

app.get('/fluxus_register', async function(req, res) {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
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
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
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
        cultPaid: false,
    };

    var fn = newUser.fname[0].toLowerCase();
    var ln = newUser.lname[0].toLowerCase();

    var f = newUser.fname.toLowerCase();
    var l = newUser.lname.toLowerCase();

    var name = f[0].toUpperCase() + f.substring(1) + " " + l[0].toUpperCase() + l.substring(1);

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

exports.app = functions.https.onRequest(app);




























/**
 * Here we're using Gmail to send 
 */
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'contactus.fluxus@iiti.ac.in',
        pass: 'contactusfluxus19'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.body.dest;
        const fid = req.body.fid;
        const name = req.body.name;
        console.log(name);
        const mailOptions = {
            from: `FLUXUS'20 IIT Indore <contactus.fluxus@iiti.ac.in>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Fluxus-2020 Registration', // email subject
            html: `<p style="font-size: 16px;">Greetings ` + name + `,<br>

            <br>Congratulations! You have successfully registered for Fluxus 2020. It gives us immense pleasure to welcome your to Central India's Largest College Fest. We are delighted to have you on board and look forward to provide you the best 3 days of your life.
            <br><br>Your Fluxus Number is :<span style="color:red"> ` + fid + `</span>.<br><br>
            
            Some tips to help you live Fluxus to the fullest:<br>   
            Follow our social media handles (<a href="https://www.facebook.com/fluxusiiti/">Facebook</a>, <a href="https://www.instagram.com/fluxus_iit_indore/">Instagram</a> , <a href="https://twitter.com/Fluxusiiti_">Twitter</a>, <a href="https://www.youtube.com/channel/UCMFkSgMJJ4-QpTm9qIATcSA">Youtube</a> and <a herf="https://www.linkedin.com/company/fluxus---iit-indore/?originalSubdomain=in">LinkedIn</a>) and official website to get regular updates regarding all the artists and other launches for Fluxus 2020.<br>
            
            You'll need to show your College ID cards to the security personnel at Fluxus. Please keep it available with you at all times.
            We hope to see you at the most exciting edition of the fest so far!<br>
            
            <br> Thanks & Regards,<br>
            
            
            <br> FLUXUS 2020 | IIT Indore <br>
            Central India's Largest College Fest</p>
            
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});


exports.sendEventMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.body.dest;
        const event = req.body.event;

        const event_list = {
            101: "Code-de-Cuisson",
            102: "StrategAI",
            103: "Manthan",
            104: "Robowars",
            105: "Nitrothrust",
            106: "Obsta-Course",
            107: "Robo-Soccer",
            108: "Marg-Darshak",
            109: "Cadathon",
        }

        var links = [];
        links[101] = "";
        links[102] = "https://www.townscript.com/e/strategai-012310";
        links[103] = "https://www.townscript.com/e/manthan-201311";
        links[104] = "https://www.townscript.com/e/robowars-133202";
        links[105] = "https://www.townscript.com/e/nitrothrust-411004";
        links[106] = "https://www.townscript.com/e/obstacourse-120323";
        links[107] = "https://www.townscript.com/e/robosoccer-030244";
        links[108] = "https://www.townscript.com/e/margdarshak-112414";
        links[109] = "";

        const mailOptions = {
            from: `FLUXUS'20 IIT Indore <contactus.fluxus@iiti.ac.in>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Fluxus-2020 Event Registration', // email subject
            html: `
            Hello enthusiast! <br><br>
            Thanks for registering for "${event_list[event]}" at Fluxus'20! <br>
            This email is to provide you with the official details to give you a breath of relief. The details of "${event_list[event]}" can be found here : <a href="https://www.fluxus.co.in/aboutCult-Fluxus/index.html">Info Link</a><br>
            Date: 7th Feb - 9th Feb <br>
            Location : IIT Indore <br>
            Now all you need to do is proceed with the payment because remember your registration will only be confirmed after payment, the link for which is <a href=${links[event]}>Payment Link</a>
            As this registration doesn't include accommodation, you can contact here for details for the same :<br>
            Yuvnish Mahlotra : 9467734617<br>
            Mohit Raj Munot : 6386270113<br>

            <br> Thanks & Regards,<br>
            
            <br> FLUXUS 2020 | IIT Indore <br>
            Central India's Largest College Fest</p>
            
            ` // email content in HTML
        };

        const mailOptions2 = {
            from: `FLUXUS'20 IIT Indore <contactus.fluxus@iiti.ac.in>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Fluxus-2020 Event Registration', // email subject
            html: `Hello Enthusiast! <br><br>
            Thanks for registering for Cultural events of Fluxus'20! <br>
            Now that you have done the registration, let's get into the cool stuff. Once you proceed with the payment (the link given on your dashboard on fluxus website) you can participate in <b>any</b> cultural event at Fluxus'20. And not only that, you are being exempted from accommodation charges, because India knows how much the Fluxus team cares for its participants.
            <br>The details of all the fun cultural events can be found here : <a href="https://www.fluxus.co.in/aboutCult-Fluxus/index.html">Cultural Competitions</a>
            <br>Remember to not miss the payment or your registration won't be confirmed! 
            <br>We await your presence to have a fun time at Fluxus.
            ` // email content in HTML
        };

        // returning result
        if (event_list.hasOwnProperty(event)) {
            return transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    return res.send(erro.toString());
                }
                return res.send('Sended');
            });
        } else {
            return transporter.sendMail(mailOptions2, (erro, info) => {
                if (erro) {
                    return res.send(erro.toString());
                }
                return res.send('Sended');
            });
        }
    });
});