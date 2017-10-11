var tags = (function () {

    var tagsArr = [],
        tagsObj = {},
        i,
        j,
        key,
        tag;

    for (i = 0; i < gifObj.items.length; i++) {

        for (j = 0; j < gifObj.items[i].keys.length; j++) {
            tag = gifObj.items[i].keys[j];
            tagsObj[tag] ? tagsObj[tag] += 1 : tagsObj[tag] = 1;
        }
    }
    for (key in tagsObj) {
        tagsArr.push({name: key, value: tagsObj[key]})
    }

    tagsArr.sort(function (a, b) {
        return b.value - a.value;

    });

    return {

        allTags: function () {
            var $ul,
                i;

            $('.hash-js').append('<div class="container-fluid"><div class="row"><ul class="all-tags all-tags-js">' +
                '</ul></div></div>');
            $ul = $('.all-tags-js');
            for (i = 0; i < tagsArr.length; i++) {
                $ul.append('<li>#' + tagsArr[i].name + '</li>')
            }
        },

        mostPopular: function () {
            var $ul,
                widthTagsPanel,
                widthTags,
                i;

            $('.most-popular-js').append('<ul class="popular popular-js"></ul>');
            $ul = $('.popular-js');
            widthTagsPanel = $ul.width();
            widthTags = 0;

            for (i = 0; i < options.amountPopularTags; i++) {
                if (widthTags > (widthTagsPanel - 100)) break;
                $ul.append('<li>#' + tagsArr[i].name + '</li>');
                widthTags += ($ul.find('li').eq(i).outerWidth(true) + 5);
            }

        }

    }
})();