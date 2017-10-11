var content = (function () {

    function createItem(src, tags) {
        var col,
            thumb,
            img,
            ul,
            li;

        col = document.createElement('div');
        col.className = 'col-xl-2 col-lg-3 col-md-4 col-sm-6';

        thumb = document.createElement('div');
        thumb.className = 'thumb thumb-js';

        img = document.createElement('img');
        img.src = src;

        ul = document.createElement('ul');
        ul.className = 'tags tags-js';

        $.each(tags, function (i, val) {
            li = document.createElement('li');
            li.innerHTML = '#' + val;
            ul.appendChild(li)
        });

        thumb.appendChild(img);
        thumb.appendChild(ul);
        col.appendChild(thumb);

        $container.append(col);
    }

    return {
        pushContainer: function (startPos, amountItems, gifArray) {
            var i;

            for (i = startPos; i < (startPos + amountItems); i++) {
                createItem(gifArray[i].src, gifArray[i].keys);

            }
        }
    }
})();