(function (w, $) {

/********************************************************
 * Init Progress Object                                 *
 * @param $wrapper an jQuery object for the wrapper     *
 ********************************************************/

var Progress = function ($wrapper) {
    this.wrapper = $wrapper;
    this.mask = $wrapper.find('.first-circle-mask');
    this.second = $wrapper.find('.second-circle-container');
    this.end = $wrapper.find('.end-circle');
    this.radius = $wrapper.width() / 2;
    this.current = 0;
    this.timmer = undefined;
};

/********************************************************
 * Set Transform property with browser prefex           *
 * @param $target the jQuery object of target           *
 * @param value the original value                      *
 ********************************************************/

Progress.prototype.mk_transform = function ($target, value) {
    $target.css({
        webkitTransform : value,
        mozTransform : value,
        transform : value
    });
};

/********************************************************
 * Set the progress to value                            *
 * @param value [0, 1]                                  *
 ********************************************************/

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

/********************************************************
 * Set the circle position in the end of progress ring  *
 * @param value [0, 1]                                  *
 ********************************************************/

Progress.prototype.set_end_pos = function (value) {
    value *= 2 * Math.PI;

    this.end.css({
        top : (this.radius - this.end_radius * Math.cos(value)) + 'px',
        left : (this.radius - this.end_radius * Math.sin(value)) + 'px'
    });
};

/********************************************************
 * Show the progress ring and set it to 0               *
 ********************************************************/

Progress.prototype.start = function () {
    this.wrapper.addClass('show');
    this.end_radius = (this.radius + this.wrapper.find('.center-mask').width() / 2) / 2;
    this.set(0);
};

Progress.prototype.finish = function () {
    this.wrapper.addClass('finish');
    var _this = this;

    setTimeout(
        function () {
            _this.erase();
        },
        800
    );
};

/********************************************************
 * Remove the total progress ring                       *
 ********************************************************/

Progress.prototype.erase = function () {
    this.wrapper.remove();
};

/********************************************************
 * Timing function                                      *
 * @param x step before timing [0, 1]                   *
 * @return step after timing                            *
 ********************************************************/

Progress.prototype.timing = function (x) {
    return (Math.sin(x * Math.PI / 2));
};

/********************************************************
 * Animate to a new value                               *
 * @param new_value                                     *
 * @param duration                                      *
 * @param callback                                      *
 ********************************************************/

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
            if (callback)
                callback.call(_this);
            _this.timmer = undefined;
        }
    };

    this.timmer = setTimeout(tmp_func, 18);
};

/********************************************************
 * Build up Progress DOM                                *
 * @param posx                                          *
 * @param posy                                          *
 ********************************************************/

Progress.prototype.mk_progress_dom = function (posx, posy) {
    if (posx === undefined)
        posx = '50%';
    if (posy === undefined)
        posy = '50%';

    return $('<div class="progress"><div class="first-circle-container"><div class="first-circle-color"></div></div><div class="first-circle-mask"></div><div class="second-circle-container"><div class="second-circle-color"></div></div><div class="center-mask"></div><div class="begin-circle"></div><div class="end-circle"></div></div>').css({
        left: posx,
        top: posy
    });
};

w.Progress = Progress;

})(window, window.jQuery);
