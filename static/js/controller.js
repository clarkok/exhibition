(function (w, $) {

var Controller = function () {
    $(w).on('bottom', this, this.load_next_page);

    this.view = new View();
    this.model = new Model();
    this.next_page = 0;
};

Controller.prototype.load_next_page = function (e) {
    if (w.bottom_event_lock)
        return;
    console.log(w.bottom_event_lock);
    w.bottom_event_lock = true;
    var _this = e.data;
    var callback = function (data) {
        if (data.code) {
            alert(data.error);
            w.bottom_event_lock = false;
        }
        else if (data.data.length === 0) {
            alert('No items');
        }
        else {
            _this.next_page ++;
            _this.view.append(data.data);
            w.bottom_event_lock = false;
        }
    };

    _this.model.get_page(_this.next_page, callback);
};

w.Controller = Controller;

})(window, window.jQuery);
