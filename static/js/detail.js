(function (w, $) {

$('#back').on('click', function () {
    $(w).trigger('hide_detail');
});

var Detail = function ($block) {
    this.wrapper = $('#detail-wrapper');
    this.block = $block;
    this.pic_wrapper = this.wrapper.find('#pic-detail').empty();
    this.load_picture();
    this.detail = this.wrapper.find('#detail').empty();
    this.build_detail();
    this.show();
};

Detail.prototype.load_picture = function () {
    this.loader = new ImgLoader(
        this.block.data('full'),
        this.block.data('width'),
        this.block.data('height')
    );
    
    this.loader.wrapper = this.pic_wrapper;

    var _this = this;

    setTimeout(function () {
        _this.loader.start();
    }, 1000);
};

Detail.prototype.build_detail = function () {
    this.detail.append(
        $('<li />').addClass('detail-item title-i').append(
            $('<label />').text('标题'),
            $('<p />').addClass('title').text(
                this.block.find('.title').text()
            )
        ),
        $('<li />').addClass('detail-item author-i').append(
            $('<label />').text('作者'),
            $('<p />').addClass('author').text(
                this.block.find('.author').text()
            )
        ),
        $('<li />').addClass('detail-item time-i').append(
            $('<label />').text('时间'),
            $('<p />').addClass('time').text(
                this.block.find('.time').text()
            )
        ),
        $('<li />').addClass('detail-item detail-i').append(
            $('<label />').text('简介'),
            $('<p />').addClass('detail').text(
                this.block.data('detail')
            )
        )
    );
};

Detail.prototype.show = function () {
    this.wrapper.addClass('show');
};

Detail.prototype.hide = function () {
    this.wrapper.removeClass('show');
};

w.Detail = Detail;

})(window, window.jQuery);