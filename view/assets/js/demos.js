$(function () {
    'use strict';

    //ä¸‹æ‹‰åˆ·æ–°é¡µé¢
    $(document).on("pageInit", "#page-ptr", function(e, id, page) {
        var $content = $(page).find(".content").on('refresh', function(e) {
            // æ¨¡æ‹Ÿ2sçš„åŠ è½½è¿‡ç¨‹
            setTimeout(function() {
                var cardHTML = '<div class="card">' +
                    '<div class="card-header">æ ‡é¢˜</div>' +
                    '<div class="card-content">' +
                    '<div class="card-content-inner">å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹å†…å®¹' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $content.find('.card-container').prepend(cardHTML);
                // $(window).scrollTop(0);
                // åŠ è½½å®Œæ¯•éœ€è¦é‡ç½®
                $.pullToRefreshDone($content);
            }, 2000);
        });
    });

    //æ— é™æ»šåŠ¨
    $(document).on("pageInit", "#page-infinite-scroll", function(e, id, page) {
        function addItems(number, lastIndex) {
            // ç”Ÿæˆæ–°æ¡ç›®çš„HTML
            var html = '';
            for (var i = 0; i < 20; i++) {
                html += '<li class="item-content"><div class="item-inner"><div class="item-title">æ–°æ¡ç›®</div></div></li>';
            }
            // æ·»åŠ æ–°æ¡ç›®
            $('.infinite-scroll .list-container').append(html);
        }
        var loading = false;
        $(page).on('infinite', function() {

            // å¦‚æžœæ­£åœ¨åŠ è½½ï¼Œåˆ™é€€å‡º
            if (loading) return;

            // è®¾ç½®flag
            loading = true;

            // æ¨¡æ‹Ÿ1sçš„åŠ è½½è¿‡ç¨‹
            setTimeout(function() {
                // é‡ç½®åŠ è½½flag
                loading = false;

                addItems();
                $.refreshScroller();
            }, 1000);
        });
    });

    //é¡¶éƒ¨æ— é™æ»šåŠ¨
    $(document).on("pageInit", "#page-infinite-scroll-top", function(e, id, page) {
        function addItems(number, lastIndex) {
            // ç”Ÿæˆæ–°æ¡ç›®çš„HTML
            var html = '';
            for (var i = lastIndex+ number; i > lastIndex ; i--) {
                html += '<li class="item-content"><div class="item-inner"><div class="item-title">æ¡ç›®'+i+'</div></div></li>';
            }
            // æ·»åŠ æ–°æ¡ç›®
            $('.infinite-scroll .list-container').prepend(html);

        }
        var timer = false;
        $(page).on('infinite', function() {
            var lastIndex = $('.list-block li').length;
            var lastLi = $(".list-container li")[0];
            var scroller = $('.infinite-scroll-top');
            var scrollHeight = scroller[0].scrollHeight; // èŽ·å–å½“å‰æ»šåŠ¨å…ƒç´ çš„é«˜åº¦
            // å¦‚æžœæ­£åœ¨åŠ è½½ï¼Œåˆ™é€€å‡º
            if (timer) {
                clearTimeout(timer);
            }

            // æ¨¡æ‹Ÿ1sçš„åŠ è½½è¿‡ç¨‹
            timer = setTimeout(function() {

                addItems(20,lastIndex);

                $.refreshScroller();
                //  lastLi.scrollIntoView({
                //     behavior: "smooth",
                //     block:    "start"
                // });
                // å°†æ»šåŠ¨æ¡çš„ä½ç½®è®¾ç½®ä¸ºæœ€æ–°æ»šåŠ¨å…ƒç´ é«˜åº¦å’Œä¹‹å‰çš„é«˜åº¦å·®
                scroller.scrollTop(scroller[0].scrollHeight - scrollHeight);
            }, 1000);
        });

    });


    //å›¾ç‰‡æµè§ˆå™¨
    $(document).on("pageInit", "#page-photo-browser", function(e, id, page) {
        var myPhotoBrowserStandalone = $.photoBrowser({
            photos : [
                '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
                '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
                '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
            ]
        });
        //ç‚¹å‡»æ—¶æ‰“å¼€å›¾ç‰‡æµè§ˆå™¨
        $(page).on('click','.pb-standalone',function () {
            myPhotoBrowserStandalone.open();
        });
        /*=== Popup ===*/
        var myPhotoBrowserPopup = $.photoBrowser({
            photos : [
                '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
                '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
                '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
            ],
            type: 'popup'
        });
        $(page).on('click','.pb-popup',function () {
            myPhotoBrowserPopup.open();
        });
        /*=== æœ‰æ ‡é¢˜ ===*/
        var myPhotoBrowserCaptions = $.photoBrowser({
            photos : [
                {
                    url: '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
                    caption: 'Caption 1 Text'
                },
                {
                    url: '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
                    caption: 'Second Caption Text'
                },
                // è¿™ä¸ªæ²¡æœ‰æ ‡é¢˜
                {
                    url: '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
                },
            ],
            theme: 'dark',
            type: 'standalone'
        });
        $(page).on('click','.pb-standalone-captions',function () {
            myPhotoBrowserCaptions.open();
        });
    });


    //å¯¹è¯æ¡†
    $(document).on("pageInit", "#page-modal", function(e, id, page) {
        var $content = $(page).find('.content');
        $content.on('click','.alert-text',function () {
            $.alert('è¿™æ˜¯ä¸€æ®µæç¤ºæ¶ˆæ¯');
        });

        $content.on('click','.alert-text-title', function () {
            $.alert('è¿™æ˜¯ä¸€æ®µæç¤ºæ¶ˆæ¯', 'è¿™æ˜¯è‡ªå®šä¹‰çš„æ ‡é¢˜!');
        });

        $content.on('click', '.alert-text-title-callback',function () {
            $.alert('è¿™æ˜¯è‡ªå®šä¹‰çš„æ–‡æ¡ˆ', 'è¿™æ˜¯è‡ªå®šä¹‰çš„æ ‡é¢˜!', function () {
                $.alert('ä½ ç‚¹å‡»äº†ç¡®å®šæŒ‰é’®!')
            });
        });
        $content.on('click','.confirm-ok', function () {
            $.confirm('ä½ ç¡®å®šå—?', function () {
                $.alert('ä½ ç‚¹å‡»äº†ç¡®å®šæŒ‰é’®!');
            });
        });
        $content.on('click','.prompt-ok', function () {
            $.prompt('ä½ å«ä»€ä¹ˆé—®é¢˜?', function (value) {
                $.alert('ä½ è¾“å…¥çš„åå­—æ˜¯"' + value + '"');
            });
        });
    });

    //æ“ä½œè¡¨
    $(document).on("pageInit", "#page-action", function(e, id, page) {
        $(page).on('click','.create-actions', function () {
            var buttons1 = [
                {
                    text: 'è¯·é€‰æ‹©',
                    label: true
                },
                {
                    text: 'å–å‡º',
                    bold: true,
                    color: 'danger',
                    onClick: function() {
                        $.alert("ä½ é€‰æ‹©äº†â€œå–å‡ºâ€œ");
                    }
                },
                {
                    text: 'ä¹°å…¥',
                    onClick: function() {
                        $.alert("ä½ é€‰æ‹©äº†â€œä¹°å…¥â€œ");
                    }
                }
            ];
            var buttons2 = [
                {
                    text: 'å–æ¶ˆ',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });
    });

    //åŠ è½½æç¤ºç¬¦
    $(document).on("pageInit", "#page-preloader", function(e, id, page) {
        $(page).on('click','.open-preloader-title', function () {
            $.showPreloader('åŠ è½½ä¸­...')
            setTimeout(function () {
                $.hidePreloader();
            }, 2000);
        });
        $(page).on('click','.open-indicator', function () {
            $.showIndicator();
            setTimeout(function () {
                $.hideIndicator();
            }, 2000);
        });
    });


    //é€‰æ‹©é¢œè‰²ä¸»é¢˜
    $(document).on("click", ".select-color", function(e) {
        var b = $(e.target);
        document.body.className = "theme-" + (b.data("color") || "");
        b.parent().find(".active").removeClass("active");
        b.addClass("active");
    });

    //picker
    $(document).on("pageInit", "#page-picker", function(e, id, page) {
        $("#picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
        <button class="button button-link pull-left">\
      æŒ‰é’®\
      </button>\
      <button class="button button-link pull-right close-picker">\
      ç¡®å®š\
      </button>\
      <h1 class="title">æ ‡é¢˜</h1>\
      </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3'],
                    cssClass: 'picker-items-col-normal'
                }
            ]
        });
        $("#picker-name").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">ç¡®å®š</button>\
      <h1 class="title">è¯·é€‰æ‹©ç§°å‘¼</h1>\
      </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ['èµµ', 'é’±', 'å­™', 'æŽ', 'å‘¨', 'å´', 'éƒ‘', 'çŽ‹']
                },
                {
                    textAlign: 'center',
                    values: ['æ°ä¼¦', 'ç£Š', 'æ˜Ž', 'å°é¹', 'ç‡•å§¿', 'è²è²', 'Baby']
                },
                {
                    textAlign: 'center',
                    values: ['å…ˆç”Ÿ', 'å°å§']
                }
            ]
        });
    });
    $(document).on("pageInit", "#page-datetime-picker", function(e) {
        $("#datetime-picker").datetimePicker({
            toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">ç¡®å®š</button>\
      <h1 class="title">é€‰æ‹©æ—¥æœŸå’Œæ—¶é—´</h1>\
      </header>'
        });
    });

    $(document).on("pageInit", "#page-city-picker", function(e) {
        $("#city-picker").cityPicker({});
    });

    $.init();
});