(function (w, $) {

var ImgViewer = function ($wrapper, width, height) {
    this.wrapper = $wrapper;
    this.image = $wrapper.find('img');
    this.original_width = width;
    this.original_height = height;
    this.outer_width = 0;
    this.outer_height = 0;
    this.inner_width = 0;
    this.inner_height = 0;
    this.width = 0;
    this.height = 0;

    var _this = this;

    $(w).on('resize', function () {
        _this.outer_width = _this.wrapper.width();
        _this.outer_height = _this.wrapper.height() - 30;

        if (
            (_this.original_width / _this.original_height) >
            (_this.outer_width / _this.outer_height)
        ) {
            _this.inner_width = _this.outer_width;
            _this.inner_height = _this.original_height *
                _this.outer_width / _this.original_width;
        }
        else {
            _this.inner_height = _this.outer_height;
            _this.inner_width = _this.original_width *
                _this.outer_height / _this.original_height;
        }

        _this.recover();
    }).trigger('resize');

    $wrapper.on('mousemove', function (e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left,
            y = e.pageY - offset.top - 30;

        _this.zoom(x, y);
    })
    .on('mouseleave', function () {
        _this.recover();
    });
};

ImgViewer.prototype.set_location = function (x, y) {
    this.image.css({
        left: x + 'px',
        top: y + 30 + 'px'
    });
};

ImgViewer.prototype.set_size = function (w, h) {
    this.image.css({
        width: (this.width = w) + 'px',
        height: (this.height = h) + 'px',
        marginLeft: (- w / 2) + 'px',
        marginTop: (- h / 2) + 'px'
    });
};

ImgViewer.prototype.recover = function () {
    this.image.removeClass('zoom');
    this.set_size(this.inner_width, this.inner_height);
    this.set_location(this.outer_width / 2, this.outer_height / 2);
};

ImgViewer.prototype.zoom = function (x, y) {
    this.image.addClass('zoom');
    var posx, posy;
    var radio = this.inner_width / this.original_width;

    if (this.original_width < this.outer_width)
        posx = this.outer_width / 2;
    else {
        posx = x - (this.outer_width - this.inner_width) / 2;
        if (posx < this.outer_width * radio / 2)
            posx = this.outer_width * radio / 2;
        if (posx > this.inner_width - (this.outer_width * radio) / 2)
            posx = this.inner_width - (this.outer_width * radio) / 2;
        posx -= this.inner_width / 2;
        posx /= radio;
        posx = -posx;
        posx += this.outer_width / 2;
    }

    if (this.original_height < this.outer_height)
        posy = this.outer_height / 2;
    else {
        posy = y - (this.outer_height - this.inner_height) / 2;
        if (posy < this.outer_height * radio / 2)
            posy = this.outer_height * radio / 2;
        if (posy > this.inner_height - (this.outer_height * radio) / 2)
            posy = this.inner_height - (this.outer_height * radio) / 2;
        posy -= this.inner_height / 2;
        posy /= radio;
        posy = -posy;
        posy += this.outer_height / 2;
    }

    this.set_size(this.original_width, this.original_height);
    this.set_location(posx, posy);
};

w.ImgViewer = ImgViewer;

})(window, window.jQuery);
