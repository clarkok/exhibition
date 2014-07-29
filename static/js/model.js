(function (w, $) {

var Model = function () {
    this.list = [];
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
    var _this = this;
    $.get(
        this.mk_page_url(page), 
        function (data) {
            if (data.code === 0) {
                var l = data.data.length;
                for (var i = 0; i < l; i++)
                    _this.list[data.data[i].id] = data.data[i];
            }
            callback(data);
        },
        'json'
    );
};

Model.prototype.get_item = function (item, callback) {
    var _this = this;
    if (this.list[item] !== undefined)
        callback({
            code: 0,
            data: this.list[item]
        });
    else
        $.get(
            this.mk_item_url(item),
            function (data) {
                if (data.code)
                    _this.list[data.data.id] = data.data;

                callback(data);
            },
            'json'
        );
};

w.Model = Model;

})(window, window.jQuery);
