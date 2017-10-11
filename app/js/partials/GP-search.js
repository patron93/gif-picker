var search = (function () {

    var result = [];

    function searchItems(tag) {
        var i,
            resultArr;

        for (i = 0; i < gifObj.items.length; i++) {
            resultArr = gifObj.items[i].keys;

            if (resultArr.indexOf(tag) > -1) {
                result.push(gifObj.items[i]);
            }
        }
        return result
    }

    return {

        showResult: function (tag) {

            result = [];

            searchItems(tag);
            $container.find('img').attr('src', ' ');
            $container.empty();

            if (result.length <= options.amountStartItems) {
                content.pushContainer(0, result.length, result);

            } else {
                content.pushContainer(0, options.amountStartItems, result);
            }

            lazy.gifCol = result;
            lazy.count = options.amountStartItems;
        }

    }
})();