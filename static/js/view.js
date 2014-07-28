(function(w, $) {

var HeaderController = function () {
    this.target = $('header');
};

HeaderController.prototype.trigger = function (scroll_top) {
    if (scroll_top > 16)
        this.target.addClass('thin');
    else
        this.target.removeClass('thin');
};

var View = function () {
    this.wrapper = $('#wrapper');

    this.header_ctrl = new HeaderController();

    this.columns = this.wrapper.find('.column');
    this.column_nr = this.columns.length;

    this.page_height = $('body').height();

    for (var i = 0; i < this.column_nr; i++) {
        this.columns[i].height = 0;
    }

    $(document).on(
        'scroll',
        this,
        this.scroll_event_listener
    );

    setTimeout(
        function () {
            $(document).trigger('scroll');
        },
        50
    );
};

View.prototype.mk_block = function (item) {
    var iloader = new w.ImgLoader(
        item.thumb,
        500,
        item.height * 500 / item.width
    );
    return $('<div />').addClass('block').append(
        iloader.mk_wrapper(),
        $('<div />').addClass('meta').append(
            $('<p />').addClass('title').text(item.title),
            $('<p />').append(
                $('<span />').addClass('author').text(item.author),
                $('<span />').addClass('time').text(item.time)
            )
        )
    );
};

View.prototype.get_min_height_index = function () {
    var ret = 0;
    for (var i = 1; i < this.column_nr; i++) {
        if (this.columns[i].height < this.columns[ret].height) {
            ret = i;
        }
    }

    return ret;
};

View.prototype.append = function (item_list) {
    var l = item_list.length;
    var i = 0;
    var _this = this;
    var step_func = function () {
        var min_index = _this.get_min_height_index();

        _this.columns[min_index].height = 
            _this.columns.eq(min_index).append(
                _this.mk_block(item_list[i])
            ).height();

        if (++i < l)
            setTimeout(step_func, 200);
        else
            _this.page_height = $('body').height();
    };

    step_func();
};

View.prototype.scroll_event_listener = function (event) {
    var scroll_top = $(document).scrollTop();
    var _this = event.data;

    _this.header_ctrl.trigger(scroll_top);

    if (scroll_top > _this.page_height - 1500) {
        $(w).trigger('bottom');
    }
};

w.View = View;
w.HeaderController = HeaderController;

})(window, window.jQuery);
