(function (w, $) {

var Progress = function ($wrapper) {
    this.wrapper = $wrapper;
    this.mask = $wrapper.find('.first-circle-mask');
    this.second = $wrapper.find('.second-circle-container');
    this.end = $wrapper.find('.end-circle');
    this.radius = $wrapper.width() / 2;
    this.current = 0;

    this.timmer = 0;
};

Progress.prototype.mk_transform = function ($target, arg) {
    $target.css({
        webkitTransform : arg,
        mozTransform : arg,
        transform : arg
    });
};

Progress.prototype.set = function (value) {
    if (value < 0.5) {
        this.wrapper.removeClass('more-than-half');
        this.mk_transform(
            this.mask,
            'rotate(-' + value * 360 + 'deg)'
        );
    }
    else {
        this.wrapper.addClass('more-than-half');
        this.mk_transform(
            this.second,
            'rotate(-' + (value * 360 - 180) + 'deg)'
        );
    }

    this.set_end_pos(value);
    this.current = value;
};

Progress.prototype.set_end_pos = function (value) {
    value *= 2 * Math.PI;

    this.end.css({
        top : (this.radius - this.end_radius * Math.cos(value)) + 'px',
        left : (this.radius - this.end_radius * Math.sin(value)) + 'px'
    });
};

Progress.prototype.start = function () {
    this.wrapper.addClass('show');
    this.end_radius = (this.radius + this.wrapper.find('.first-circle-center-mask').width() / 2) / 2;
    this.set(0);
};

Progress.prototype.erase = function () {
    this.wrapper.remove();
};

Progress.prototype.timing = function (x) {
    return (Math.sin(x * Math.PI / 2));
};

Progress.prototype.animate_to = function (new_value, duration, callback) {
    if (duration === undefined)
        duration = 500;
    if (this.timmer !== undefined)
        clearTimeout(this.timmer);

    var step = 0;
    var total_step = duration / 18;
    var origin = this.current;
    var delta = new_value - origin;
    var _this = this;

    var tmp_func = function () {
        if (++step < total_step) {
            _this.timmer = setTimeout(tmp_func, 18);
            var current_value = _this.timing(step / total_step) * delta + origin;
            _this.set(current_value);
        }
        else {
            _this.set(new_value);
            callback.call(_this);
        }
    };

    this.timmer = setTimeout(tmp_func, 18);
};

w.Progress = Progress;

})(window, window.jQuery);
