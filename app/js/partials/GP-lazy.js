var lazy = (function () {

    return {
        count: options.amountStartItems,
        gifCol: gifObj.items,

        loadContent: function (amountPush) {

            var heightWindow = $(document).height(),
                botPosition = $('.position-js').offset().top,
                amountItem = this.gifCol.length,
                rest = amountItem - this.count,
                DISTANCE_FOR_INIT_LAZY = 100;

            if (botPosition >= (heightWindow - DISTANCE_FOR_INIT_LAZY) && (this.count + amountPush) <= amountItem) {

                content.pushContainer(this.count, amountPush, this.gifCol);
                this.count += amountPush;
            }
            else if (botPosition >= (heightWindow - DISTANCE_FOR_INIT_LAZY) && rest < amountPush) {
                content.pushContainer(this.count, rest, this.gifCol);
                this.count += rest;
            }
        }
    }
})();