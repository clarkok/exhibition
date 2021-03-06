(function(w, $) {

var HeaderController = function () {
    this.target = $('header');
    this.header_locked = false;
};

HeaderController.prototype.trigger = function (scroll_top) {
    if (this.header_locked)
        return;
    if (scroll_top > 16)
        this.target.addClass('thin');
    else
        this.target.removeClass('thin');
};

HeaderController.prototype.lock = function () {
    this.header_locked = true;
    this.target.addClass('thin');
};

HeaderController.prototype.unlock = function () {
    this.header_locked = false;
    if ($(document).scrollTop() <= 16)
        this.target.removeClass('thin');
};

var View = function () {
    this.wrapper = $('#wrapper');
    this.header_ctrl = new HeaderController();
    this.columns = this.wrapper.find('.column');
    this.column_nr = this.columns.length;
    this.page_height = $('body').height();
    this.window_height = $(window).height();

    for (var i = 0; i < this.column_nr; i++) {
        this.columns[i].height = 0;
    }

    $(document).on(
        'scroll',
        this,
        this.scroll_event_listener
    );

    var _this = this;

    $(window).on(
        'resize',
        function () {
            _this.window_height = $(window).height();
        }
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
    return $('<div />').addClass('block')
        .data(item).append(
        $('<div />').addClass('click-mask'),
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

    if (scroll_top > _this.page_height - _this.window_height) {
        $(w).trigger('bottom');
    }
};

View.prototype.lock_header = function () {
    this.header_ctrl.lock();
};

View.prototype.unlock_header = function () {
    this.header_ctrl.unlock();
};

View.prototype.wheel_block = function (e) {
    e.preventDefault();
    e.stopPropagation();
};

View.prototype.key_block = function (e) {
    if ([37, 38, 39, 40].indexOf(e.which) != -1) {
        e.preventDefault();
        e.stopPropagation();
    }
};

View.prototype.lock_scroll = function () {
    $(w).on('DOMMouseScroll', this.wheel_block);
    $(w).on('mousewheel', this.wheel_block);
    $(document).on('mousewheel', this.wheel_block);
    $(document).on('keydown', this.key_block);
};

View.prototype.unlock_scroll = function () {
    $(w).off('DOMMouseScroll', this.wheel_block);
    $(w).off('mousewheel', this.wheel_block);
    $(document).off('mousewheel', this.wheel_block);
    $(document).off('keydown', this.key_block);
};

w.View = View;
w.HeaderController = HeaderController;

})(window, window.jQuery);
