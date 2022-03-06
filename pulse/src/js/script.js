$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_l.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron_r.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault(); // чтобы не переходить по адрессу, например, ссылки, а выполнять какое-либо другое действие
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function valideForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалйуста, введите свое имя",
                phone: "Пожалйуста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();             // отменяет стандартное поведение страницы (т.е. перезагрузку страницы)

        // if (!$(this).valid()) {         // Проверка валидации (чтобы не отправлять пустые формы)
        //     return;
        // };

        $.ajax({
            type: "POST",                           // что делаем? - Отправляем данные
            url: "mailer/smart.php",                // Куда?
            data: $(this).serialize()               // Что отправляем? serialize() переформирует данные для сервера
        }).done(function() {                        // Когда подтвердится успешное выполнение отправки формы
            $(this).find("input").val("");          // очищаем форму, помещая пустое значение в инпуты
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');             // В конце формы должны перезагрузиться/очиститься
            return false;
        });
    });
});

// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false,
//     responsive: {
//         992: {
//             autoplay: false,
//             nav: false
//         }
//       }
//   });

// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
// });

// $(document).ready(function(){
//     $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
//         $(this)
//           .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
//           .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
//     });

//     function toggleSlide(item) {
//         $(item).each(function(i) {
//             $(this).on('click', function(e){
//                 e.preventDefault(); // чтобы не переходить по адрессу, например, ссылки, а выполнять какое-либо другое действие
//                 $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//                 $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//             })
//         });
//     };

//     toggleSlide('.catalog-item__link');
//     toggleSlide('.catalog-item__back')
// });