$(function () {

    var $container = $('.start-js'),
        $page = $('.page-js');

    //= partials/GP-options.js

    //= partials/GP-lazy.js

    //= partials/GP-search.js

    //= partials/GP-tags.js

    //= partials/GP-content.js


    var initGifPicker = {
        init: function () {
            this._addElements();
            this._startItems();
            this._clickEvents();
            this._scrollEvents();

        },

        _startItems: function () {
            content.pushContainer(0, options.amountStartItems, gifObj.items);
        },

        _addElements: function () {
            $('body').prepend('<div class="done done-top done-js done-top-js">' +
                '</div><div class="done done-bot done-js done-bot-js"></div>' +
                '<div class="position position-js"></div>');

            $('.most-popular-js').append(tags.mostPopular());


            $('.hash-js').append(tags.allTags());


        },

        _clickEvents: function () {
            $page.on('click', 'li', function (event) {
                var POSITION_HASH_CHAR = 1,
                    str = $(this).text().slice(POSITION_HASH_CHAR);

                search.showResult(str);
                $('.search-state-js').show().find('.search-tag-js').text('#'+str);
                event.stopPropagation()
            });

            $page.on('click', '.thumb-js', function () {

                var PROGRESS_COPY_ANIMATION_IN = 100,
                    PROGRESS_COPY_ANIMATION_DUR = 200,
                    PROGRESS_COPY_ANIMATION_OUT = 500,
                    LENGTH_OLD_SUFFIX = 2,
                    suffix = 'orig',
                    src = $(this).find('img').attr('src'),
                    newSrc = src.slice(0, src.length - LENGTH_OLD_SUFFIX) + suffix;


                window.getSelection().removeAllRanges();


                $container.append('<p class="select">' + newSrc + '</p>');


                try {
                    var emailLink = document.querySelector('.select'),
                        range = document.createRange();

                    range.selectNode(emailLink);
                    window.getSelection().addRange(range);
                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();

                    $('.select').remove();

                    $('.done-js')
                        .removeClass('done-error')
                        .addClass('done-successful')
                        .fadeIn(PROGRESS_COPY_ANIMATION_IN);

                    setTimeout(function () {
                        $('.done-js').fadeOut(PROGRESS_COPY_ANIMATION_OUT);
                    }, PROGRESS_COPY_ANIMATION_DUR);

                } catch (err) {

                    $('.done-js')
                        .removeClass('done-successful')
                        .addClass('done-error')
                        .fadeIn(PROGRESS_COPY_ANIMATION_IN);

                    setTimeout(function () {
                        $('.done-js').fadeOut(PROGRESS_COPY_ANIMATION_OUT);
                    }, PROGRESS_COPY_ANIMATION_DUR);
                }

            });

            $('.show-more-js').on('click', function () {



                if ($(this).data('opened') === 'on') {

                    $(this).data('opened', 'off');
                    $('.all-tags-js').slideUp();
                    $(this).find('span').text('show more tags');

                    $('.most-popular-js').empty().append(tags.mostPopular());

                } else {

                    $('.all-tags-js').slideDown();
                    $('.most-popular-js').empty().append('<h4>all tags</h4>');
                    $(this).find('span').text('show less tags');

                    $(this).data('opened', 'on');
                }

            });

            $('.close-js').on('click', function () {

                $('.start-js').empty();
                lazy.gifCol = gifObj.items;

                lazy.count = 0;
                lazy.loadContent(options.amountLoadedItem);

                $('.search-state-js').hide();

            });

            $('.btn-top-js').on('click', function () {
                var SCROLL_ANIMATE_DURATION = 500;

                $('html').animate({
                    scrollTop: 0
                }, SCROLL_ANIMATE_DURATION)
            });
        },

        _scrollEvents: function () {
            $(window).on('scroll', function () {

                var DISTANCE_SCROLL_SHOW_BUTTON = 200,
                    DURATION_ANIMATE_BUTTON = 200;

                lazy.loadContent(options.amountLoadedItem);

                if ($(window).scrollTop() >= DISTANCE_SCROLL_SHOW_BUTTON) {
                    $('.btn-top-js').fadeIn(DURATION_ANIMATE_BUTTON)
                } else {
                    $('.btn-top-js').fadeOut(DURATION_ANIMATE_BUTTON)
                }

            });
        }

    };

    initGifPicker.init();


});
