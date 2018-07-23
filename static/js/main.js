jQuery(document).ready(function ($) {
    //subscribe form

    var strGET = window.location.search.replace( '?result=', '');

    if(strGET=='success'){
        document.getElementById("success").style.opacity = '1';
        setTimeout( function(){
            document.getElementById('success').style.opacity ="0";
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
      if((!jQuery('.social-icons-list').height() || !jQuery('.subscribe-form-wrapper').height()) && !jQuery('.privacy-policy').length){
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

  $('#selectpicker').select2({
    minimumResultsForSearch: -1,
    templateResult: addUserPic,
    width: 'resolve',

    templateSelection: addUserPic,
  });

  $('#selectpicker').on('select2:select', function () {
    document.location.href = '/' + $('#selectpicker').val();
  });

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
    }
}