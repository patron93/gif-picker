$(function () {

    var $container = $('.start'),
        $page = $('#page');

    var options = {
        amountStartItems: 20,
        amountLoadedItem: 20,
        amountPopularTags: 25
    };


    var lazy = {

        count: options.amountStartItems,
        gifCol: gifObj.items,

        loadContent: function (amountPush) {

            var heightWindow = $(document).height(),
                botPosition = $('.position').offset().top;

            var rest = this.amountItem - this.count;

            if (botPosition >= (heightWindow - 100) && (this.count + amountPush) <= this.amountItem) {

                content.pushContainer(this.count, amountPush, this.gifCol);
                this.count += amountPush;
            }
            else if (botPosition >= (heightWindow - 100) && rest < amountPush) {
                content.pushContainer(this.count, rest, this.gifCol);
                this.count += rest;
            }
        }


    };

    var search = {

        result: [],

        searchItems: function (tag) {

            for (var i = 0; i < gifObj.items.length; i++) {
                var resultArr = gifObj.items[i].keys;

                if (~resultArr.indexOf(tag)) {
                    this.result.push(gifObj.items[i]);
                }
            }
            return this.result
        },

        showResult: function (tag) {

            this.result = [];
            this.searchItems(tag);
            $container.find('img').attr('src', ' ');
            $container.children().remove();

            if (this.result.length <= options.amountStartItems) {
                content.pushContainer(0, this.result.length, this.result);

            } else {
                content.pushContainer(0, options.amountStartItems, this.result);
            }

            lazy.gifCol = this.result;
            lazy.count = options.amountStartItems;

        }
    };

    var tags = {

        tagsArr: [],

        sortTags: function () {

            var tagsObj = {};
            for (var i = 0; i < gifObj.items.length; i++) {

                for (var j = 0; j < gifObj.items[i].keys.length; j++) {
                    var tag = gifObj.items[i].keys[j];
                    tagsObj[tag] ? tagsObj[tag] += 1 : tagsObj[tag] = 1;
                }
            }
            for (var key in tagsObj) {
                this.tagsArr.push({name: key, value: tagsObj[key]})
            }

            this.tagsArr.sort(function (a, b) {
                return b.value - a.value;
            });
            return this.tagsArr;
        },

        allTags: function () {

            $('.hash').append('<div class="container-fluid"><div class="row"><ul class="all-tags">' +
                '</ul></div></div>');
            var $ul = $('.all-tags');
            for (var i = 0; i < this.tagsArr.length; i++) {
                $ul.append('<li>#' + this.tagsArr[i].name + '</li>')
            }
        },

        mostPopular: function () {

            $('.most-popular').append('<div class="popular"></div>');
            var $ul = $('.popular'),
                widthTagsPanel = $ul.width(),
                widthTags = 0;

            for (var i = 0; i < options.amountPopularTags; i++) {
                if (widthTags > (widthTagsPanel - 100)) break;
                $ul.append('<li>#' + this.tagsArr[i].name + '</li>');
                widthTags += ($ul.find('li').eq(i).outerWidth(true) + 5);

            }
        }
    };

    var content = {

        createItem: function (src, tags) {
            $container.append('<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 ">' +
                '<div class="thumb">' +
                '<img src="' + src + '">\n' +
                '   <ul class="tags">\n' +
                '       <li>' + (tags[0] ? '#' + tags[0] : "") + '</li>\n' +
                '       <li>' + (tags[1] ? '#' + tags[1] : "") + '</li>\n' +
                '       <li>' + (tags[2] ? '#' + tags[2] : "") + '</li>\n' +
                '       <li>' + (tags[3] ? '#' + tags[3] : "") + '</li>\n' +
                '       <li>' + (tags[4] ? '#' + tags[4] : "") + '</li>\n' +
                '  </ul></div></div>')
        },

        pushContainer: function (startPos, amountItems, gifArray) {
            for (var i = startPos; i < (startPos + amountItems); i++) {
                this.createItem(gifArray[i].src, gifArray[i].keys)
            }
        }

    };

    Object.defineProperty(lazy, 'amountItem', {
        get: function () {
            return this.gifCol.length
        }
    });

    content.pushContainer(0, options.amountStartItems, gifObj.items);

    tags.sortTags();


    $('body').prepend('<div class="done done-top"></div><div class="done done-bot"></div><div class="position"></div>');

    $('.most-popular').append(tags.mostPopular());

    $('.hash').append(tags.allTags());

    $page.on('click', 'li', function (event) {

        var str = $(this).text().slice(1);

        search.showResult(str);
        $('.close').show();
        event.stopPropagation()
    });

    $('.close').on('click', function () {

        $('.start').children().remove();
        lazy.gifCol = gifObj.items;

        lazy.count = 0;
        lazy.loadContent(options.amountLoadedItem);

        $('.close').hide();

    });

    $page.on('click', '.thumb', function () {

        window.getSelection().removeAllRanges();

        var suffix = 'orig',
            src = $(this).find('img').attr('src'),
            newSrc = src.slice(0, src.length - 2) + suffix;
        $container.append('<p class="select">' + newSrc + '</p>');


        try {
            var emailLink = document.querySelector('.select');
            var range = document.createRange();
            range.selectNode(emailLink);
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();

            $('.select').remove();

            $('.done').removeClass('done-error').addClass('done-successful').fadeIn(100);

            setTimeout(function () {
                $('.done').fadeOut(500);
            }, 200);

        } catch (err) {

            $('.done').removeClass('done-successful').addClass('done-error').fadeIn(40);

            setTimeout(function () {
                $('.done').fadeOut(400);
            }, 130);
        }

    });

    $('.show-more').on('click', function () {

        var $icon = $(this).find('i');

        if ($icon.hasClass('fa-chevron-up')) {
            $('.all-tags').slideUp();

            $icon.toggleClass('fa-chevron-up');
            $icon.toggleClass('fa-chevron-down');

            $('.most-popular').empty().append(tags.mostPopular());

        } else {

            $('.all-tags').slideDown();

            $('.most-popular').empty().append('<h3>all tags</h3>');

            $icon.toggleClass('fa-chevron-up');
            $icon.toggleClass('fa-chevron-down');
        }

    });

    $('.btn-top').on('click', function () {
        $('html').animate({
            scrollTop: 0
        }, 500)
    });

    $(window).on('scroll', function () {
        lazy.loadContent(options.amountLoadedItem);

        if ($(window).scrollTop() >= 200) {
            $('.btn-top').fadeIn(200)
        } else {
            $('.btn-top').fadeOut(200)
        }

    })

});
