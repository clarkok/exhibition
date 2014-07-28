(function (w, $) {

var Model = function () {
};

Model.prototype.site_url = w.site_url;
Model.prototype.page_api = w.site_url + '/ajax/page/';
Model.prototype.item_api = w.site_url + '/ajax/item/';

Model.prototype.mk_page_url = function (page) {
    return this.page_api + page;
};

Model.prototype.mk_item_url = function (item) {
    return this.item_api + item;
};

Model.prototype.get_page = function (page, callback) {
    $.get(this.mk_page_url(page), callback, 'json');
};

Model.prototype.get_item = function (item, callback) {
    $.get(this.mk_item_url(item), callback, 'json');
};

w.Model = Model;

})(window, window.jQuery);
