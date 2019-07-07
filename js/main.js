jQuery(document).ready(function ($) {
    //subscribe form

    var strGET = window.location.search.replace('?result=', '');

    if (strGET == 'success') {
        document.getElementById("success").style.opacity = '1';
        setTimeout(function () {
            document.getElementById('success').style.opacity = "0";
        }, 4000);
    }

    //roadmap animate
    if ($('body').hasClass('home')) {
        roadmapAnimate();
        $(window).on("scroll", function () {
            roadmapAnimate();
        });
    }

    //smooth navigation scroll
    if ($('body').hasClass('home')) {
        $(".main-navigation li a, .footer-navigation li a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });
    }

    setTimeout(function () {
        if (((!jQuery('.social-icons-list').height() && !jQuery('.fa-linkedin-in').height()) || !jQuery('.subscribe-form-wrapper').height()) && jQuery('body.index-page').length) {
            alert('Please disable your adblock to view this site properly');
        }
    }, 2000);

    //mobile menu
    $(".menu-toggle").on("click", function () {
        $(this).toggleClass("mobile");
        $("body").toggleClass("fixed");
        $(".main-navigation").toggleClass("mobile");
        $(".main-navigation.mobile li a").on("click", function () {
            $("body").removeClass("fixed");
            $(".main-navigation, .menu-toggle").removeClass("mobile");
        })
    });

    if ($('#selectpicker').length) {
        $('#selectpicker').select2({
            minimumResultsForSearch: -1,
            templateResult: addUserPic,
            width: 'resolve',
            templateSelection: addUserPic,
        });
    }
    if ($('#pass-kyc-whitelist').length) {
        $('#pass-kyc-whitelist').select2({
            minimumResultsForSearch: -1,
            width: 'resolve',
            placeholder: "Please select an option"
        });
    }

    $('#selectpicker').on('select2:select', function () {
        document.location.href = 'https://svandis.io/' + $('#selectpicker').val();
    });
    if ($(".owl-carousel").length) {
        $(".owl-carousel").owlCarousel({
            margin: 20,
            nav: true,
            autoplay: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }

    $('#form-whitelist-button').on('click', function (e) {
        e.preventDefault();
        let error = false;
        let email = $('#email-whitelist');
        let address = $('#eth-address-whitelist');
        let contribution = $('#contribution-whitelist');

        if (email.val() == '' || !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email.val())) {
            email.css('border', '1px solid red');
            error = true
        } else {
            email.css('border', '1px solid #ccc');
        }

        if (address.val() == '') {
            address.css('border', '1px solid red');
            error = true
        } else {
            address.css('border', 'none');
        }

        if (contribution.val() == '') {
            contribution.css('border', '1px solid red');
            error = true
        } else {
            contribution.css('border', '1px solid #ccc');
        }

        if ($('#pass-kyc-whitelist option:selected').val() == '') {
            $('.select2').css('border', '1px solid red');
            error = true
        } else {
            $('.select2').css('border', '1px solid #ccc');
        }


        if (!error) {
            $('#form-whitelist').submit();
        }

    });

    let getName = getParameterByName('message');
    if (getName == 'sent') {
        $('#success').show();
    }

    $(".bio-button").on("click", function () {
        if ($(this).siblings(".col-descr").css("max-height") == "0px") {
            $(this).siblings(".col-descr").css("max-height", "1000px");
            $(this).children(".bio-plus").html("-");
        }
        else {
            $(this).siblings(".col-descr").css("max-height", "0px");
            $(this).children(".bio-plus").html("+");
        }
    })

    $(".bio-button").on("click", function () {
        var popupToOpen = "." + $(this).data('popup');

        $(popupToOpen).css('display', 'table')
    });

    $(".bio-popup-close").on("click", function () {
        $(".bio-popup").css('display', 'none');
    })

    $(".bio-popup").on("click", function () {
        $(".bio-popup").css('display', 'none');
    })

    $(".team-item-wrap").on("click", function (e) {
        e.stopPropagation();
    })

    $(".scroll").click(function () {
        var href = $(this).attr('href');
        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 1000);
    });

    $('.img-modal-trigger').click(function () {
        $('.img-modal').show();
    });
    $('.img-modal-close').click(() => {
        $('.img-modal').hide();
    })
});

function addUserPic(opt) {
    if (!opt.id) {
        return opt.text;
    }
    let optimage = $(opt.element).data('content');
    if (!optimage) {
        return opt.text;
    } else {
        return $(optimage).append($(opt.element).text());
    }

}

function roadmapAnimate() {
    var aSpeed = 500;
    if (($(window).scrollTop() + $(window).height()) >= $("#roadmap").offset().top) {
        $('.item-3').delay(400).fadeIn(aSpeed);
        $('.item-4').delay(700).fadeIn(aSpeed);
        $('.item-5').delay(1000).fadeIn(aSpeed);
        $('.item-6').delay(1300).fadeIn(aSpeed);
        $('.item-7').delay(1600).fadeIn(aSpeed);
        $('.item-8').delay(1900).fadeIn(aSpeed);
        $('.item-9').delay(2200).fadeIn(aSpeed);
    }
}

// Read url parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}