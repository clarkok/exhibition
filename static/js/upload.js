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
        if (w.username === undefined) {
            alert('请先登录');
            w.location.href = $('.login').attr('href');
            return;
        }
        _this.mask.removeClass('show');
        _this.wrapper.removeClass('show').addClass('pre-flat').addClass('flat');
        _this.container.removeClass('standby').css({
            marginTop: ($(w).height() / 2 - e.originalEvent.clientY - 220) + 'px',
            marginLeft: ($(w).width() / 2 - e.originalEvent.clientX - 350) + 'px'
        });
        setTimeout(function () {
            _this.container.addClass('standby').css({
                marginTop: '',
                marginLeft: ''
            });
        }, 3000);
        console.log(e.originalEvent);
        if (e.originalEvent.dataTransfer.files.length > 1)
            alert('多文件上传尚不支持');
        _this.setup_image(e.originalEvent.dataTransfer.files[0]);
    })
    .on('dragleave', function (e) {
        $(this).removeClass('show');
        _this.wrapper.removeClass('show');
    });

    $('#upload-form').on('submit', function (e) {
        e.preventDefault();
        _this.upload();
    });

    $('.cancel').on('click', function () {
        _this.clean();
    });
};

UploadCtrl.prototype.init = function () {
    this.wrapper.removeClass('show flat clean-out');
    this.mask.removeClass('show');
    this.container.removeClass('standby uploading');
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
    this.container.addClass('uploading');
    var data = new FormData();
    var _this = this;

    data.append('file', this.file);
    data.append('title', $('[name=title]').val());
    data.append('author', $('[name=author]').val());
    data.append('detail', $('[name=detail]').val());

    var progress_wrapper = Progress.prototype.mk_progress_dom();
    this.container.append(progress_wrapper);
    this.progress = new Progress(progress_wrapper);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', w.site_url + '/ajax/upload', true);
    xhr.addEventListener('load', function (e) {
        var data = JSON.parse(xhr.responseText);
        if (data.code === 0) {
            _this.progress.animate_to(1, 1000, function () {
                _this.progress.finish();
                _this.clean();
            });
        }
    }, false);

    xhr.upload.addEventListener('progress', function (e) {
        _this.progress.animate_to(e.loaded / e.total);
    }, false);

    this.progress.start();
    xhr.send(data);
};

UploadCtrl.prototype.clean = function () {
    this.wrapper.addClass('clean-out');
    var _this = this;
    setTimeout(function () {
        _this.init();
    }, 500);
};

w.UploadCtrl = UploadCtrl;

})(window, window.jQuery);
