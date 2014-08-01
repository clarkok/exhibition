#!/bin/sh

cat js/jquery.js js/progress.js js/imgloader.js js/view.js js/model.js js/loadingbar.js js/maskctrl.js js/detail.js js/imgviewer.js js/router.js js/upload.js js/controller.js js/script.js | uglifyjs -o exhibition.js
