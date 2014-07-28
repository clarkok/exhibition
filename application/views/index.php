<!doctype html>
<html lang="zh">
    <head>
        <meta charset="utf-8">
        <title>QSC Exhibition</title>
        <link rel="stylesheet" href="<?php echo base_url('static/css/style.css'); ?>">
    </head>
    <body>
        <header>
            <h1>Exhibition</h1>
            <nav>
                <a href="http://share.myqsc.com/">Share</a>
                <a href="http://notice.myqsc.com/">Notice</a>
                <a href="http://m.myqsc.com/">Mobile</a>
                <a href="http://box.myqsc.com/">Box</a>
                <a href="http://site.myqsc.com/zjuff/">青年电影节</a>
                <a href="https://passport.myqsc.com/">求是潮通行证</a>
            </nav>
        </header>
        <div id="wrapper">
            <div class="column">
            </div>
            <div class="column">
            </div>
        </div>
        <div id="loading-wrapper">
            <ul id="loading">
                <li id="l1" class="loading-circle"></li>
                <li id="l2" class="loading-circle"></li>
                <li id="l3" class="loading-circle"></li>
                <li id="l4" class="loading-circle"></li>
                <li id="l5" class="loading-circle"></li>
            </ul>
            <span id="no-item">
                没有更多
            </span>
        </div>

        <script type="text/javascript">
            window.site_url = '<?php echo site_url(); ?>';
        </script>
        <script src="<?php echo base_url('static/js/jquery.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/progress.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/imgloader.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/view.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/model.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/loadingbar.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/controller.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/script.js'); ?>"></script>
    </body>
</html>
