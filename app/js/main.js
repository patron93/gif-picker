$(function () {

    var $container = $('.start-js'),
        $page = $('.page-js');


    //= partials/GP-options.js

    //= partials/GP-lazy.js

    //= partials/GP-search.js

    //= partials/GP-tags.js

    //= partials/GP-content.js

    //= partials/GP-favorites.js

    //= partials/GP-menu.js

    //= partials/GP-collections.js


    var initGifPicker = {
        init: function () {
            this._addElements();
            this._startItems();
            this._clickPageEvents();
            this._scrollEvents();
            this._menuEvents();


        },

        _startItems: function () {
            content.pushContainer(0, options.amountStartItems, gifObj.items);
        },

        _addElements: function () {
            var tpl = '<div class="done done-top done-js done-top-js"></div>' +
                '<div class="done done-bot done-js done-bot-js"></div>' +
                '<div class="position position-js"></div>';

            $('body').prepend(tpl);

            $('.most-popular-js').append(tags.mostPopular());


            $('.hash-js').append(tags.allTags());


        },

        _clickPageEvents: function () {
            $page.on('click', '.js-tag-item', function (e) {
                e.stopPropagation();

                var POSITION_HASH_CHAR = 1,
                    str = $(this).text().slice(POSITION_HASH_CHAR);

                search.showResult(str);

                content.changeSearchPanel('#' + str);

            })

                .on('click', '.thumb-js', function () {

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

                })

                .on('mouseenter', '.thumb-js', function () {

                    var favorites,
                        i,
                        src = $(this).find('img').attr('src');

                    favorites = JSON.parse(localStorage.getItem('favorites'));

                    if (favorites) {
                        for (i = 0; i < favorites.length; i++) {
                            if (favorites[i].src === src) {

                                if ($(this).find('.js-favorite').hasClass('fa-star-o'))
                                    $(this).find('.fa-star-o').removeClass('fa-star-o').addClass('fa-star')
                            }
                        }
                    }
                })

                .on('click', '.fa-star-o', function (e) {
                    e.stopPropagation();

                    favorites.addItems($(this));

                })

                .on('click', '.fa-star', function (e) {

                    e.stopPropagation();

                    favorites.removeItem($(this))
                })

                .on('click', '.fa-plus-square-o', function (e) {
                    e.stopPropagation();

                    collections.buildUl($(this))

                })

                .on('click', '.fa-times', function (e) {
                    e.stopPropagation();

                    collections.removeItem($(this))

                })

                .on('click', '.li-col', function (e) {

                    e.stopPropagation();

                    collections.addItem($(this))

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

                content.clearContainer($container);

                lazy.changeContainer(gifObj.items, 0);

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
        },

        _menuEvents: function () {

            $('.nav-icon').on('click', function () {

                menu.toggleMenu($(this));

                menu.buildMenu();

            });

            $('.menu')
                .on('click', 'li', function (e) {
                    e.stopPropagation();

                    menu.autoClose();

                })
                .on('click', '.menu-collections-li', function () {
                    var nameList = $(this).text();

                    menu.showContentCollection(nameList);

                })
                .on('click', '.fa-plus-circle', function () {

                    collections.popup();

                })
                .on('click', '.js-delete-list', function (e) {
                    e.stopPropagation();

                    var nameList = $(this).closest('.menu-collections-li').text();
                    $(this).closest('.menu-collections-li').remove();

                    collections.removeList(nameList)


                });

            $('.menu-favorites').on('click', function () {

                favorites.showFavorites();
            });
        }



    };

    initGifPicker.init();



});
