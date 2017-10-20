var content = (function () {

    function createItem(src, tags) {
        var ul,
            col,
            thumb;

        col = $('<div/>', {
            class: 'col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6'
        }).appendTo($container);

        thumb = $('<div/>', {
            class: 'thumb thumb-js'
        }).appendTo(col);

        $('<img/>', {
            src: src,
            alt: ''
        }).appendTo(thumb);

        ul = $('<ul/>', {
            class: 'js-tags-list tags-list'
        }).appendTo(thumb);

        $.each(tags, function (i, val) {
            $('<li/>', {
                class: 'js-tag-item tag-item',
                text: '#' + val
            }).appendTo(ul)
        });


        $('<ul/>', {
            class: 'list-collections js-list-collections'
        }).appendTo(thumb);

        $('<i/>', {
            class: 'fa fa-star-o js-favorite',
            'aria-hidden': true
        }).appendTo(thumb);

        $('<i/>', {
            class: 'fa fa-plus-square-o',
            'aria-hidden': true
        }).appendTo(thumb);

    }


    return {
        pushContainer: function (startPos, amountItems, gifArray) {
            var i;

            for (i = startPos; i < (startPos + amountItems); i++) {

                createItem(gifArray[i].src, gifArray[i].keys);
            }
        },

        clearContainer: function (container) {
            container.find('img').attr('src', ' ');
            container.empty();
        },

        changeSearchPanel: function (nameResult) {
            $('.search-state-js')
                .show().find('.search-tag-js')
                .text(nameResult);
        }
    }
})();