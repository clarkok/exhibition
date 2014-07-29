(function (w, $) {

var Router = function (controller) {
    this.ctrl = controller;

    $(w).on('hashchange', this, function (e) {
        e.data.dispatch();
    }).trigger('hashchange');
};

Router.prototype.dispatch = function () {
    var hash = w.location.hash;

    if (hash === '' || hash === '#' || hash === '#!' || hash === '#!/') {
        $(w).trigger('hide_detail');
    }
    else {
        var id = hash.match(/^#!\/(\d*)/)[1];
        if (id)
            this.ctrl.show_detail(id);
        else
            $(w).trigger('hide_detail');
    }
};

w.Router = Router;

})(window, window.jQuery);
