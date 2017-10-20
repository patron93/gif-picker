var menu = (function () {

    var NAME_PROPERTY_COLLECTIONS = 'collections',
        $menu = $('.menu');

    function getLocalStorageItem(name) {
        return JSON.parse(localStorage.getItem(name))
    }

    return {

        toggleMenu: function ($this) {

            var widthMenu = $menu.width();

            $this.toggleClass('open');

            $menu.toggleClass('on');

            if ($menu.hasClass('on')) {
                $menu.animate({
                    right: '+=' + widthMenu
                });

            } else {
                $menu.animate({
                    right: '-=' + widthMenu
                });
            }
        },

        buildMenu: function () {

            var collections = getLocalStorageItem(NAME_PROPERTY_COLLECTIONS);

            $('.menu-collections-ul').empty();

            $.each(collections, function (i, val) {
                $('<i/>', {
                    class: 'fa fa-trash-o js-delete-list',
                    'aria-hidden': true
                }).appendTo($('<li/>', {
                    class: 'menu-collections-li',
                    text: val.name
                }).appendTo('.menu-collections-ul'));

            });
        },

        autoClose: function () {

            var widthMenu = $menu.width();

            $('.nav-icon').removeClass('open');

            $menu.removeClass('on');

            $menu.animate({
                right: '-=' + widthMenu
            });
        },

        showContentCollection: function (nameList) {
            var collections = getLocalStorageItem(NAME_PROPERTY_COLLECTIONS),
                i;

            if (collections) {
                for (i = 0; i < collections.length; i++) {

                    if (nameList === collections[i].name) {

                        content.clearContainer($container);

                        if (collections[i].items.length <= options.amountStartItems) {
                            content.pushContainer(0, collections[i].items.length, collections[i].items);
                        } else {
                            content.pushContainer(0, options.amountStartItems, collections[i].items);
                        }

                        lazy.changeContainer(collections[i].items, options.amountStartItems);


                        content.changeSearchPanel(collections[i].name)
                    }
                }
            }

            $('.fa-plus-square-o').removeClass('fa-plus-square-o').addClass('fa-times');
        }
    }

})();