(function (w, $) {

var Controller = function () {
    $(w).on('bottom', this, this.load_next_page);
    $('#wrapper').on('click', '.block', this, this.show_detail);

    this.view = new View();
    this.model = new Model();
    this.loading = new LoadingBar();
    this.next_page = 0;

    $(w).on('hide_detail', this, this.hide_detail);
};

Controller.prototype.load_next_page = function (e) {
    if (w.bottom_event_lock)
        return;
    w.bottom_event_lock = true;
    var _this = e.data;
    var callback = function (data) {
        if (data.code) {
            alert(data.error);
            w.bottom_event_lock = false;
        }
        else if (data.data.length === 0) {
            _this.loading.no_item_show();
        }
        else {
            _this.loading.hide();
            _this.next_page ++;
            _this.view.append(data.data);
            w.bottom_event_lock = false;
        }
    };

    _this.loading.show();
    _this.model.get_page(_this.next_page, callback);
};

Controller.prototype.show_detail = function (e) {
    var _this = e.data;

    _this.view.lock_header();
    _this.view.lock_scroll();

    _this.detail = new Detail($(this));

};

Controller.prototype.hide_detail = function (e) {
    var _this = e.data;

    _this.detail.hide();

    _this.view.unlock_header();
    _this.view.unlock_scroll();
};

w.Controller = Controller;

})(window, window.jQuery);
