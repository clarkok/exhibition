(function (w, $) {

var UploadCtrl = function () {
    this.wrapper = $('#upload');
    this.mask = $('#upload-mask');
    this.container = $('#container');
    this.img_wrapper = $('#upload-img-wrapper');

    var _this = this;
    $(w).on('dragover', function (e) {
        e.preventDefault();
        _this.init();
        _this.mask.addClass('show');
        _this.wrapper.addClass('show');
    });

    this.mask.on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this.set_location(e.originalEvent.clientX, e.originalEvent.clientY);
        console.log(e.originalEvent.clientX);
    })
    .on('drop', function (e) {
        e.preventDefault();
        _this.mask.removeClass('show');
        _this.wrapper.removeClass('show').addClass('pre-flat').addClass('flat');
        _this.container.removeClass('standby').css({
            marginTop: ($(w).height() / 2 - e.originalEvent.clientY - 220) + 'px',
            marginLeft: ($(w).width() / 2 - e.originalEvent.clientX - 350) + 'px'
        });
        setTimeout(function () {
            _this.container.addClass('standby').css({
                marginTop: '-250px',
                marginLeft: '-350px'
            });
        }, 3000);
        console.log(e.originalEvent);
        if (e.originalEvent.dataTransfer.files.length > 1)
            alert('Multply files uploading is currently not supported!');
        _this.setup_image(e.originalEvent.dataTransfer.files[0]);
    })
    .on('dragleave', function (e) {
        $(this).removeClass('show');
        _this.wrapper.removeClass('show');
    });
};

UploadCtrl.prototype.init = function () {
    this.wrapper.removeClass('show flat');
    this.mask.removeClass('show');
    this.container.removeClass('standby');
    this.img_wrapper.empty();
};

UploadCtrl.prototype.set_location = function (x, y) {
    this.wrapper.css({
        top: (y - 30) + 'px',
        left: x + 'px'
    });
};

UploadCtrl.prototype.setup_image = function (file) {
    this.file = file;

    var reader = new FileReader();
    var _this = this;

    reader.onload = function (e) {
        _this.img_wrapper.append($('<span />').addClass('vertical-helper'));
        $('<img />').attr('src', e.target.result).appendTo(_this.img_wrapper);
    };

    reader.readAsDataURL(file);
};

UploadCtrl.prototype.upload = function () {
};

w.UploadCtrl = UploadCtrl;

})(window, window.jQuery);
