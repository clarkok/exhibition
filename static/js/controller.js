(function (w, $) {

var Controller = function () {
    $(w).on('bottom', this, this.load_next_page);
    $('#wrapper').on('click', '.block', function () {
        w.location.href = '#!/' + $(this).data('id');
    });

    this.view = new View();
    this.model = new Model();
    this.loading = new LoadingBar();
    this.next_page = 0;
    this.router = new Router(this);

    w.back_flag = (w.location.hash === '');

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
            setTimeout(function () {
                w.bottom_event_lock = false;
            }, 1000);
        }
        else if (data.data.length === 0) {
            _this.loading.no_item_show();
        }
        else {
            _this.loading.hide();
            _this.next_page ++;
            _this.view.append(data.data);
            setTimeout(function () {
                w.bottom_event_lock = false;
            }, 1000);
        }
    };

    _this.loading.show();
    _this.model.get_page(_this.next_page, callback);
};

Controller.prototype.show_detail = function (id) {
    this.view.lock_header();
    this.view.lock_scroll();

    this.loading.show();

    var _this = this;

    this.model.get_item(id, function (data) {
        _this.loading.hide();
        if (data.code === 0) {
            _this.detail = new Detail(_this.view.mk_block(data.data));
        }
    });

};

Controller.prototype.hide_detail = function (e) {
    var _this = e.data;

    _this.detail.hide();

    _this.view.unlock_header();
    _this.view.unlock_scroll();
};

w.Controller = Controller;

})(window, window.jQuery);

