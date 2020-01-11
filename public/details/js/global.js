var email;
var uid;

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

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            email = user.email;
            uid = user.uid;

            console.log(email);
            console.log($("#getEmail")[0].val);

            $("#getEmail").val(email);
            console.log($("#getEmail")[0].val);
        } else {
            window.location.href = "/";
        }
    });
});

(function($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function() {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function(ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function(e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function(e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function(e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function() {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


})(jQuery);


function getUid() {
    // console.log("Iskin maa ki chuu function call ua he");
    // var user = await firebase.auth().currentUser;
    // $('#userToken').val(user.uid);
    // $('#userData').submit();

    // if (user) {
    //     console.log(user.uid)
    // } else {
    //     console.log("iski maa ki chu")
    // }

    $('#userToken').val(uid);
    $('#userData').submit();

};