let $ = require('jQuery');
// let slick = require('slick-carousel');
let slick = require('slick-carousel-browserify');
const productColor = ['#E2AA52', '#D2C9D1', '#B4CEA7'];
const productSize = ['S', 'M', 'XL'];
let countProduct = 0;

$(document).ready(function(){
    slick($('.product-card-image'), {
        dots: false,
        arrows:true,
        speed: 500
    });

    $(".to-cart").click(function(){
        countProduct = ++countProduct;
        $(".round-btn__counter").css('display', 'inline-block');
        $(".round-btn__counter").text(countProduct);
    });

    $('.color').each(function(index) {
        $(this).css('background-color', productColor[index]);
    });

    $('.size').each(function(index) {
        $(this).text(productSize[index]);
    });

    $('.select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if ( !$(this).hasClass('on') ) {
                $(this).addClass('on');
                selectList.slideDown(duration);

                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text( $(this).find('span').text() );

                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(duration);
            }
        });
    });
});
