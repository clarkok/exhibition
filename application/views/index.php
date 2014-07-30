<!doctype html>
<html lang="zh">
    <head>
        <meta charset="utf-8">
        <title>QSC Exhibition</title>
        <link rel="stylesheet" href="<?php echo base_url('static/css/style.css'); ?>">
    </head>
<!--[if lt IE 10]><body class="ie"><![endif]-->
<!--[if gt IE 9]><body><![endif]-->
<!--[if !IE]>--><body><!--<![endif]-->
        <header>
            <h1>Exhibition</h1>
            <?php if (isset($username)): ?>
            <span class="login">Hi, <?php echo $username; ?></span>
            <?php else :?>
            <a class="login" href="http://passport.myqsc.com/member/auth?redirect=<?php site_url('/ajax/login'); ?>">立即登录</a>
            <?php endif; ?>
            <nav>
                <a href="http://share.myqsc.com/">Share</a>
                <a href="http://notice.myqsc.com/">Notice</a>
                <a href="http://m.myqsc.com/">Mobile</a>
                <a href="http://box.myqsc.com/">Box</a>
                <a href="http://site.myqsc.com/zjuff/">青年电影节</a>
                <?php if (isset($username)): ?>
                <span>Hi, <?php echo $username; ?></span>
                <?php else :?>
                <a href="http://passport.myqsc.com/member/auth?redirect=<?php echo site_url('/ajax/login'); ?>">登录</a>
                <?php endif; ?>
            </nav>
        </header>
        <div id="detail-wrapper">
            <div id="pic-detail">
                <img src="http://clarkok-mba.local/exhibition/index.php/ajax/full/23" alt="article" />
            </div>
            <div id="meta">
                <div id="back">
                    ←
                </div>
                <ul id="detail">
                    <li class="detail-item title-i">
                        <label>标题</label>
                        <p class="title">The Title</p>
                    </li>
                    <li class="detail-item author-i">
                        <label>作者</label>
                        <p class="author">The Author</p>
                    </li>
                    <li class="detail-item time-i">
                        <label>时间</label>
                        <p class="time">The Time</p>
                    </li>
                    <li class="detail-item detail-i">
                        <label>简介</label>
                        <p class="detail">The Detail</p>
                    </li>
                </ul>
            </div>
        </div>
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
            window.username = <?php echo (isset($username) ? "'" . $username . "'" : 'undefined' ) ?>;
        </script>
        <?php if (isset($_GET['debug'])): ?>
            <script src="<?php echo base_url('static/js/jquery.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/progress.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/imgloader.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/view.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/model.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/loadingbar.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/maskctrl.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/detail.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/imgviewer.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/router.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/controller.js'); ?>"></script>
            <script src="<?php echo base_url('static/js/script.js'); ?>"></script>
        <?php else: ?>
            <script src="<?php echo base_url('static/exhibition.js'); ?>"></script>
        <?php endif ?>
    </body>
</html>
