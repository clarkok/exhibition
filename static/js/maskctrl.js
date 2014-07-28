(function (w, $) {

$('#wrapper').on('click', '.click-mask', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var offset = $(this).offset();
    var posx = e.pageX - offset.left;
    var posy = e.pageY - offset.top;

    var effect;

    $(this).after(
        effect = $('<div />').addClass('click-effect').css({
            top: posy,
            left: posx
        })
    );

    setTimeout(
        function () {
            effect.remove();
        },
        4000
    );

    var $this = $(this);

    setTimeout(
        function () {
            $this.parent().trigger('click');
        },
        500
    );

    $(this).stop().animate(
        {
            opacity: 0
        },
        300,
        function () {
            if ($this.data('mouse_in'))
                $this.stop().animate(
                    {
                        opacity: 0.2
                    },
                    3000
                );
        }
    );
});

$('#wrapper').on('mouseenter', '.click-mask', function () {
    $(this).data('mouse_in', true).stop().animate({
        opacity: 0.2
    }, 300);
});

$('#wrapper').on('mouseleave', '.click-mask', function () {
    $(this).data('mouse_in', false).stop().animate({
        opacity: 0
    }, 300);
});

})(window, window.jQuery);
