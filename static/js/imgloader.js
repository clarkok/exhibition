(function (w, $) {

var ImgLoader = function (url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.cancelled = false;
};

ImgLoader.prototype.mk_wrapper = function () {
    this.wrapper = $('<div class="img-wrapper" />').css({
        width: this.width,
        height: this.height
    });

    var _this = this;

    setTimeout(
        function () {
            _this.start();
        },
        50
    );

    return this.wrapper;
};

ImgLoader.prototype.featureDetect = function () {
    return window.btoa && ('onprogress' in (new XMLHttpRequest()));
};

ImgLoader.prototype.start = function () {
    if (this.featureDetect())
        this.start_modern();
    else
        this.start_fallback();
};

ImgLoader.prototype.start_modern = function () {
    var progress_wrapper = Progress.prototype.mk_progress_dom();
    this.wrapper.append(progress_wrapper);
    this.progress = new Progress(progress_wrapper);

    var xhr = new XMLHttpRequest();

    var _this = this;

    xhr.addEventListener(
        'progress',
        function (e) {
            _this.progress.animate_to(e.loaded / e.total);
        },
        false
    );

    xhr.addEventListener(
        'load',
        function (e) {
            _this.progress.animate_to(
                1, 
                1000, 
                function() {
                    if (_this.cancelled)
                        return;
                    _this.progress.finish();
                    _this.wrapper.prepend(
                        $('<img />').attr(
                            'src',
                            'data:' + 
                                xhr.getResponseHeader('content-type') +
                                ';base64,' +
                                    xhr.responseText
                        )
                    );
                }
            );
        },
        false
    );

    xhr.addEventListener(
        'error',
        function (e) {
            alert('error');
        },
        false
    );

    xhr.open('GET', this.url + '?base64', true);

    this.progress.start();
    xhr.send();
};

ImgLoader.prototype.start_fallback = function () {
    var img = new Image();
    var _this = this;

    img.onload = function () {
        if (_this.cancelled)
            return;
        _this.wrapper.append(
            $('<img />').attr('src', _this.url)
        );
    };

    img.src = _this.url;
};

ImgLoader.prototype.cancel = function () {
    this.cancelled = true;
};

w.ImgLoader = ImgLoader;

})(window, window.jQuery);
