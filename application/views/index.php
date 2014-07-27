<!doctype html>
<html lang="zh">
    <head>
        <meta charset="utf-8">
        <title>QSC Exhibition</title>
        <link rel="stylesheet" href="<?php echo base_url('static/css/style.css'); ?>">
    </head>
    <body>
        <header class="thin">
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
                <div class="block">
                    <div class="img-wrapper">
                        <img src="http://clarkok-mba.local/exhibition/index.php/ajax/thumb/11" />
                    </div>
                    <div class="meta">
                        <p class="title">The Title</p>
                        <p>
                            <span class="author">The Author</span>
                            <span class="time">Time</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="block">
                    <div class="img-wrapper">

                        <div class="progress">
                            <div class="first-circle-container">
                                <div class="first-circle-color">
                                    <div class="first-circle-center-mask">
                                    </div>
                                </div>
                            </div>
                            <div class="first-circle-mask"></div>
                            <div class="second-circle-container">
                                <div class="second-circle-color">
                                    <div class="second-circle-center-mask">
                                    </div>
                                </div>
                            </div>
                            <div class="begin-circle"></div>
                            <div class="end-circle"></div>
                        </div>

                    </div>
                    <div class="meta">
                        <p class="title">The Title</p>
                        <p>
                            <span class="author">The Author</span>
                            <span class="time">Time</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            window.site_url = '<?php echo site_url(); ?>';
        </script>
        <script src="<?php echo base_url('static/js/jquery.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/progress.js'); ?>"></script>
        <script src="<?php echo base_url('static/js/script.js'); ?>"></script>
    </body>
</html>
