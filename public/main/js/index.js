document.addEventListener('DOMContentLoaded', () => {

    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $(".swiper-container").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
    });

    var swiper = new Swiper('.swiper-days', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        mousewheel: true,
    });

    TweenMax.to(".layer--2", 2.5, { scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) }).delay(1);
    TweenMax.to(".layer--3", 1, { scaleY: 1, ease: Power4.easeOut, }).delay(3);

    function resizeIFrameToFitContent(iFrame) {
        console.log("hello");
        iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
        iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    }


    var iFrame = document.getElementById('iFrame1');
    resizeIFrameToFitContent(iFrame);

    // $('.customer-logos').slick({
    //     slidesToShow: 6,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 1500,
    //     arrows: false,
    //     dots: false,
    //     pauseOnHover: false,
    //     responsive: [{
    //         breakpoint: 768,
    //         settings: {
    //             slidesToShow: 4
    //         }
    //     }, {
    //         breakpoint: 520,
    //         settings: {
    //             slidesToShow: 3
    //         }
    //     }]
    // });


})