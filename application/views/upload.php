<!doctype html>
<html lang="zh">
    <head>
        <title>Upload</title>
    </head>
    <body>
        <form action="<?php echo site_url('ajax/upload'); ?>" method="post" enctype="multipart/form-data">
            <input name="title" type="text">
            <input name="author" type="text">
            <textarea name="detail"></textarea>
            <input name="file" type="file">
            <input type="submit" value="submit">
        </form>
    </body>
</html>
