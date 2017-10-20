var lazy = (function () {
    var count = options.amountStartItems,
        gifCol = gifObj.items;

    return {


        loadContent: function (amountPush) {

            var heightWindow = $(document).height(),
                botPosition = $('.position-js').offset().top,
                amountItem = gifCol.length,
                rest = amountItem - count,
                DISTANCE_FOR_INIT_LAZY = 100;

            if (botPosition >= (heightWindow - DISTANCE_FOR_INIT_LAZY) && (count + amountPush) <= amountItem) {

                content.pushContainer(count, amountPush, gifCol);
                count += amountPush;
            }
            else if (botPosition >= (heightWindow - DISTANCE_FOR_INIT_LAZY) && rest < amountPush) {
                content.pushContainer(count, rest, gifCol);
                count += rest;
            }
        },

        changeContainer: function (newContainer, amountItems) {
            gifCol = newContainer;
            count = amountItems;
        }
    }
})();