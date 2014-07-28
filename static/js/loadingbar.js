(function (w, $) {

var LoadingBar = function () {
    this.wrapper = $('#loading-wrapper');
    this.loading = this.wrapper.find('#loading');
    this.no_item = this.wrapper.find('#no-item');
};

LoadingBar.prototype.show = function () {
    this.loading.addClass('show');
};

LoadingBar.prototype.hide = function () {
    this.loading.removeClass('show');
};

LoadingBar.prototype.no_item_show = function () {
    this.hide();
    this.no_item.addClass('show');
};

w.LoadingBar = LoadingBar;

})(window, window.jQuery);
