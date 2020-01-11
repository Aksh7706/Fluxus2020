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
    var db = firebase.firestore();

    console.log("Iskin maa ki chuu function call ua he");

    // firebase.auth().currentUser.then((user) => {
    //     if (user) {
    //         var uid = user.uid;
    //         console.log(uid);
    //     } else {
    //         console.log("iski maa ki chu")
    //     }
    // })


    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {

            // User is signed in.



            //Getting Params
            var uid = user.uid;
            var email = user.email;


            $('#user_Email').text(email);


            //Loading Data
            $('#tableData').append("<tr id='temph3'><td><h5  style='color: red'>Loading</h5><td></tr>");
            $('#tableCultData').append("<tr id='temph4'><td><h5  style='color: red'>Loading</h5><td></tr>");

            var docRef = db.collection("user").doc(uid);

            await docRef.get().then(function(doc) {
                if (doc.exists) {
                    var data = doc.data();
                    var events = data['events'];
                    var cultPaid = data['cultPaid'];
                    var fname = data['fname'][0].toLowerCase();
                    var lname = data['lname'][0].toLowerCase();
                    var tableData = '';
                    var tableCultData = '';
                    var fid = "FS" + "-" + fname + lname + uid.substr(uid.length - 3);
                    console.log(cultPaid);
                    $('#fluxus_id').text(fid);
                    if (cultPaid) {
                        $('#cultPaid').append(`<span style="color:#5cb85c">Paid Sucessfully</span>`);
                    } else {
                        $('#cultPaid').append(`<span style="color:red">Not Yet Paid</span>`);
                    }

                    var event_list = {
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
                    var event_cult_list = {
                        201: "Voice of Fluxus(solo)",
                        202: "Battle of bands",
                        203: "Music Duets(online)",
                        301: "Show it down(group dance)",
                        302: "Synzygy(duet)",
                        303: "Shawthy moves(solo)",
                        304: "Vortexzone(street)",
                        401: "Rangoli Making",
                        402: "Best Out Of Waste",
                        403: "Mask painting",
                        404: "Doodling Competition",
                        405: "Mascot design",
                        406: "Collage making",
                        501: "Online short film",
                        502: "Online Trailer Making (Twisted Trailer)",
                        503: "B roll challenge",
                        601: "Shutter up",
                        602: "Through the lens",
                        701: "Parliamentary Debate",
                        801: "Street play",
                        802: "Monoact",
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

                    var i1 = 0;
                    var i2 = 0;
                    for (index = 0; index < events.length; index++) {
                        if (event_list.hasOwnProperty(events[index]["code"])) {
                            if (events[index]["paid"]) {
                                tableData += `<tr><td>${i1+1}</td><td>${event_list[events[index]["code"]]}</td><td><span style="color:#5cb85c">Paid Sucessfully</span></td><td><span>Payment Done</span></td></tr>`
                            } else {
                                tableData += `<tr><td>${i1+1}</td><td>${event_list[events[index]["code"]]}</td><td><span style="color:red">Not Yet Paid</span></td><td><a href="${links[events[index]["code"]]}">Click Here To Pay</a></td></tr>`
                            }
                            i1++;
                        } else {
                            tableCultData += `<tr><td>${i2+1}</td><td>${event_cult_list[events[index]["code"]]}</td></tr>`;
                            i2++;
                        }
                    }
                    $('#temph3').remove();
                    $('#temph4').remove();
                    $('#tableData').append(tableData);
                    $('#tableCultData').append(tableCultData);
                    if (events.length == 0) {
                        $('#temph3').remove();
                        $('#temph4').remove();
                        $('#tableData').append("<tr id='temph3'><td><h5  style='color: red'>You haven't registered for any event yet.</h5><td></tr>");
                        $('#tableCultData').append("<tr id='temph3'><td><h5  style='color: red'>You haven't registered for any event yet.</h5><td></tr>");
                        console.log("No such document!");
                    }
                } else {
                    $('#temph3').remove();
                    $('#temph4').remove();
                    $('#tableData').append("<tr id='temph3'><td><h5  style='color: red'>You haven't registered for any event yet.</h5><td></tr>");
                    $('#tableCultData').append("<tr id='temph3'><td><h5  style='color: red'>You haven't registered for any event yet.</h5><td></tr>");
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        } else {
            window.location.href = "/app";
        }
    });


});

async function signOUT() {

    await firebase.auth().signOut().then(function() {
        $('#signOutModal').modal('show');
    }).catch(function(error) { console.log(error) });
}

// $('#signOutModal').on('hidden.bs.modal', function() {
//     window.location.href = "/";
// });