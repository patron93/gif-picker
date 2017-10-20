var favorites = (function () {

    var NAME_IN_LOCAL_STORAGE = 'favorites';

    function getLocalStorageItem(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    function setLocalStorageItem(name, sring) {
        localStorage.setItem(name, sring)
    }

    function addItemInLS(obj) {
        var favorites;

        favorites = getLocalStorageItem(NAME_IN_LOCAL_STORAGE) || [];

        favorites.push(obj);

        setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(favorites));
    }

    function removeItemInLS(srcImg) {
        var favorites,
            AMOUNT_ITEM = 1,
            i;

        favorites = getLocalStorageItem(NAME_IN_LOCAL_STORAGE);

        for (i = 0; i < favorites.length; i++) {
            if (favorites[i].src === srcImg) {
                favorites.splice(i, AMOUNT_ITEM);
            }
        }


        setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(favorites));
    }


    return {

        addItems: function (container) {
            var obj = {keys: []},
                $item = container.closest('.thumb-js');

            container.removeClass('fa-star-o').addClass('fa-star');

            $item.find('.js-tag-item').each(function () {
                obj.keys.push($(this).text().slice(1));
            });

            obj.src = $item.find('img').attr('src');


            addItemInLS(obj)
        },

        removeItem: function (container) {

            var src,
                $item = container.closest('.thumb-js');

            container.removeClass('fa-star').addClass('fa-star-o');

            src = $item.find('img').attr('src');

            removeItemInLS(src)
        },

        showFavorites: function () {
            var favorites;

            favorites = getLocalStorageItem(NAME_IN_LOCAL_STORAGE);

            if (favorites) {

                content.clearContainer($container);


                if (favorites.length <= options.amountStartItems) {
                    content.pushContainer(0, favorites.length, favorites);

                } else {
                    content.pushContainer(0, options.amountStartItems, favorites);
                }

                lazy.changeContainer(favorites, options.amountLoadedItem);

                content.changeSearchPanel(NAME_IN_LOCAL_STORAGE)
            }
        }
    }
})();