var collections = (function () {

    var NAME_IN_LOCAL_STORAGE = 'collections',
        POPUP_ANIMATION_DURATION = 300,
        REMOVE_ITEM_ANIMATE = 200;

    function getLocalStorageItem(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    function setLocalStorageItem(name, sring) {
        localStorage.setItem(name, sring)
    }

    function tplPopup() {
        var $div,
            $contentPopup;

        $div = $('<div/>', {
            class: 'js-container-popup'
        });

        $contentPopup = $('<div/>', {
            class: 'content-popup'
        }).appendTo($div);

        $('<p/>', {
            text: 'pls enter the name of the collection'
        }).appendTo($contentPopup);

        $contentPopup.append('<form>' +
            '<input type="text" placeholder="collection name" autofocus>' +
            '<button class="btn-add-list">add</button>' +
            '</form>');

        $('body').append($div);
    }

    function closePopup() {
        var $containerPopup = $('.js-container-popup');

        $containerPopup.animate({
            opacity: 0
        }, POPUP_ANIMATION_DURATION, function () {
            $containerPopup.remove()
        })
    }

    function popupEvents() {
        $('.js-container-popup').on('click', function () {

            closePopup();

        })
            .find('.content-popup').on('click', function (e) {
            e.stopPropagation();
        });

        $('.btn-add-list').on('click', function (e) {
            e.preventDefault();

            var val = $('input').val(),
                list;

            list = getLocalStorageItem(NAME_IN_LOCAL_STORAGE) || [];

            list.push({name: val, items: []});

            closePopup();

            setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(list));

        });
    }


    return {

        popup: function () {

            tplPopup();

            popupEvents();

        },

        buildUl: function (container) {

            var DURATION_ANIMATION = 100,
                collections = getLocalStorageItem(NAME_IN_LOCAL_STORAGE),
                thisSrc = container.closest('.thumb-js').find('img').attr('src'),
                $list,
                i,
                j;

            $('.js-list-collections').find('.li-col').remove();

            if (collections) {

                outer: for (i = 0; i < collections.length; i++) {

                    for (j = 0; j < collections[i].items.length; j++) {
                        if (thisSrc === collections[i].items[j].src) {
                            $('<li/>', {
                                class: 'li-col on',
                                text: collections[i].name
                            }).prependTo('.js-list-collections');
                            continue outer
                        }
                    }

                    $('<li/>', {
                        class: 'li-col',
                        text: collections[i].name
                    }).prependTo('.js-list-collections')
                }

            } else {

                this.popup()
            }
            $list = container.closest('.thumb-js').find('.js-list-collections');

            $list.fadeToggle(DURATION_ANIMATION);

            container.closest('.thumb-js').on('mouseleave', function () {
                $list.fadeOut(DURATION_ANIMATION);
            })
        },

        addItem: function (container) {
            var obj = {keys: []},
                $item = container.closest('.thumb-js'),
                nameList,
                collections,
                i,
                j;

            $item.find('.js-tag-item').each(function () {
                obj.keys.push($(this).text().slice(1));
            });
            obj.src = $item.find('img').attr('src');

            nameList = container.text();


            collections = getLocalStorageItem(NAME_IN_LOCAL_STORAGE);

            outer: for (i = 0; i < collections.length; i++) {
                if (nameList === collections[i].name) {

                    for (j = 0; j < collections[i].items.length; j++) {
                        if (obj.src === collections[i].items[j].src) continue outer;
                    }
                    collections[i].items.push(obj);
                    container.addClass('on')
                }
            }
            setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(collections));

        },

        removeItem: function (context) {
            var $item = context.closest('.thumb-js'),
                src = $item.find('img').attr('src'),
                collections = getLocalStorageItem(NAME_IN_LOCAL_STORAGE),
                AMOUNT_REMOVE_ITEM = 1,
                nameList,
                i,
                j;

            outer: for (i = 0; i < collections.length; i++) {

                nameList = collections[i].name;

                if (nameList === collections[i].name) {

                    for (j = 0; j < collections[i].items.length; j++) {
                        if (src === collections[i].items[j].src) {
                            collections[i].items.splice(j, AMOUNT_REMOVE_ITEM);
                            break outer
                        }
                    }
                }
            }
            setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(collections));

            $item.animate({
                opacity: 0
            }, REMOVE_ITEM_ANIMATE, function () {
                $item.closest('.col-xl-2').remove()
            })

        },

        removeList: function (nameList) {
            var collections = getLocalStorageItem(NAME_IN_LOCAL_STORAGE),
                i;

            for (i = 0; i < collections.length; i++) {
                if (nameList === collections[i].name) {
                    collections.splice([i], 1);
                    break
                }
            }

            if (collections.length === 0) {
                localStorage.removeItem(NAME_IN_LOCAL_STORAGE)
            } else {
                setLocalStorageItem(NAME_IN_LOCAL_STORAGE, JSON.stringify(collections));

            }
        }
    }
})();