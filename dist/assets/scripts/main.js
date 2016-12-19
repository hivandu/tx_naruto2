// Created by Hivan Du 2015(Siso brand interactive team).

"use strict";

var app = {
        before_loading_img:function(){
            var _this = this;
            var befireimg = [
                'bg.png',
                'loading-1.jpg',
                'loading-2.jpg',
                'loading-3.jpg',
                'loading-4.jpg',
                'loading-5.jpg',
                'loading-text.jpg'
            ]
            var imgPath = "assets/images/";
            var imgLength = befireimg.length;
            var loadedLength = 0;
            _this.timenumber = 0
            for (var i = 0; i < imgLength; i++) {
                var img = new Image();
                img.src = imgPath + befireimg[i];

                img.onload = function () {
                    loadedLength++;
                    /* check img load progress */
                    if( loadedLength == 7 ){
                        var settime = setInterval(function(){

                            $('.loading-text').html(_this.timenumber+'%');
                            if( _this.timenumber == 100 ){
                                /* check img load progress */

                                clearInterval(settime);//结束加载器
                                app.loadimg(_this) // 加载动画结束，进行后续加载
                                console.log('前面加载完毕')
                            }
                            else{
                                _this.timenumber += 2;
                            }
                            if( _this.timenumber > 10 && _this.timenumber <30 ){ $('.loading-body').attr("src",'assets/images/loading-1.jpg') }
                            if( _this.timenumber > 30 && _this.timenumber <50 ){ $('.loading-body').attr("src",'assets/images/loading-2.jpg') }
                            if( _this.timenumber > 50 && _this.timenumber <70 ){ $('.loading-body').attr("src",'assets/images/loading-3.jpg') }
                            if( _this.timenumber > 70 && _this.timenumber <90 ){ $('.loading-body').attr("src",'assets/images/loading-4.jpg') }
                            if( _this.timenumber > 90 && _this.timenumber <100 ){ $('.loading-body').attr("src",'assets/images/loading-5.jpg') }
                        },7)


                    }
                };
            }

        },

        loadimg: function (_this) {
        var audioEle1 = document.getElementById("audio");
        var audioEle2 = document.getElementById("audio2");
        var audioEle3 = document.getElementById("audio3");
        audioEle1.oncanplaythrough = function() {};
        audioEle2.oncanplaythrough = function() {};
        audioEle3.oncanplaythrough = function() {};
        var imgSrcArr = [
            'error.png', 'index.jpg','zan.png', 'btn-2.png', 'btn-bg.png', 'btn-bg2.png', 'btn.png',
            'hengfu.png', 'lm01-2.png', 'lm01.png', 'lm02-1.png', 'logo.png', 'm-img.png', 'mz01.png',
            'mz02.png', 'p1-1.png', 'p1-A.png', 'p1-alert-text.jpg', 'p2-true-text.jpg', 'p1-B-alert.png', 'p1-B.png',
            'p1-bg.jpg', 'p1-title.png', 'p2-1.png', 'p2-A.png', 'p2-alert-text.jpg', 'p2-B.png',
            'p2-bg.jpg', 'p2-title.png', 'p3-true-text.jpg', 'p3-1.png', 'p3-bg.jpg',
            'p3-A.png', 'p3-alert-text.jpg', 'p3-B.jpg', 'p3-title.png', 'p4-true-text.jpg', 'p4-1.png',
            'p4-A.png', 'p4-alert-text.jpg', 'p4-B-alert.png',
            'p4-B.png', 'p4-bg.jpg', 'p4-title.png', 'p6-text.png', 'sy01-1.png', 'sy01.png', 'sy02-1.png',
            'sy02.png', 'xh01-1.png', 'xh01.png', 'xh02-1.png', 'xh02.png', 'yun-l.png',
            'yun-r.png', 'p4-yun2.jpg', 'p4-yun4.jpg', 'p7-06.jpg', 'p7-01.jpg', 'p7-02.jpg', 'p7-03.jpg', 'p7-04.jpg', 'p7-05.jpg',
            'p7-btn.png', 'p7-btn2.png', 'p6-btn.png', 'p6-btn2.png', 'p7-ko.png', 'p6-text.png', 'p6-02.jpg'
        ];
        var imgPath = "assets/images/";
        var imgLength = imgSrcArr.length;
        var loadedLength = 0;
        var isLoaded = false;
        var loading_val = 0;
        for (var i = 0; i < imgLength; i++) {
            var img = new Image();
            img.src = imgPath + imgSrcArr[i];
            img.onload = function () {
                loadedLength++;
                if( loading_val< 68 ){
                    loading_val +=1;
                }
                if( loading_val >0 ){
                    console.log('开始loading...'+loadedLength+'图片' )

                    /* loading animation */
                    if ( checkIsAllLoaded() && isLoaded == false && _this.timenumber > 99) {
                        isLoaded = true;
                        $("img").each(function(){
                            var dataSrc = $(this).attr('data-src');
                           if(dataSrc){
                               $(this).prop('src',dataSrc);
                           }
                        });
                        setTimeout(function(){
                            $('.loading_box').hide();
                            $('.swiper-container').fadeIn();
                            app.create()
                        },700)

                    }
                }

            };
        }

        function checkIsAllLoaded () {
            return loadedLength / imgLength > 0.3;
        }
    },

    create: function () {
        //load img

        //  create slider
        var app_index = 1;//now Swiper inedx
        app.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            speed:'100',
            mousewheelControl:"false",
            preventLinksPropagation : false
        });

        function lockSwiper(){
            app.mySwiper.lockSwipes();
        }

        //lock Swiper
        lockSwiper();

        var error_sum = -1; //初始化用户选择 -1为未选中
        //click bin
        $('.btn').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            error_sum = -1;
        });

        $('.fx_btn1').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideTo(7, 1, false);
            lockSwiper();
        });

        $('.zban-btn').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideTo(7, 1, false);
            lockSwiper();
        });

        //count Sum
        var Count_sum = 1; //统计打错结果
        //replay btn
        $('.reply').on("touchend", function(){
            //console.log( app_index );
            //console.log($('.swiper-slide').eq(app_index).html())

            var that = $(this).parent();
            var This = $(this);
            that.find('.reply').removeClass('active');
            $('.active-text').hide();
            This.find('.active-text').show();
            $(this).addClass('active');
            if($(this).hasClass('dn_l')){
                that.find('.people—img').hide();
                that.find('.A_img').fadeIn();
                that.find('.p1-B-alert').removeClass('active');
                that.find('.p2-A-alert').addClass('active');
                error_sum = 0;
            }else{
                that.find('.people—img').hide();
                that.find('.B_img').fadeIn();
                that.find('.people-bg2').fadeIn();
                that.find('.p1-B-alert').addClass('active');
                that.find('.p2-A-alert').removeClass('active');
                error_sum = 1;
            }
        })

        //click btn_define
        $('.btn_define').on("touchend", function(){
            var that = $(this).parent();
            if(error_sum!=-1){

                if(error_sum==0){
                    that.find('.bg_zz').fadeIn();
                    that.find('.true_box').fadeIn();
                }else{
                    Count_sum += error_sum;
                    that.find('.bg_zz').fadeIn();
                    that.find('.false_box').fadeIn();
                }
            };

            var false_box_dspaly = that.find('.false_box').css('display')
            if( false_box_dspaly == 'block' ){
                var audioEle2 = document.getElementById("audio2");
                audioEle2.play();
            }


        })
        //click mp3 box
        $('.mp3-box').on("touchend", function(){
            $(this).toggleClass('active');
            $(this).attr('src','assets/images/m-img-active.png')
            if(!audio.paused){
                $('#audio')[0].pause();
            }else{
                $('#audio')[0].play();
                $(this).attr('src','assets/images/m-img.png')
            }

        })

        //r_paly
        $('#r_paly').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideTo(0, 100, false);
            lockSwiper();
            error_sum=-1;
            $('.alert_box').hide();
            $('.bg_zz').hide();
            $('.reply').removeClass('active');
            $('.people—img').hide();
            $('.star').show();
            $('.p1-B-alert').removeClass('active');
            $('.p4-1-xin').show()
            Count_sum = 1
        })

        //提示信息弹出 click
        $('.alert_box').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            app_index = app.mySwiper.activeIndex;

            error_sum = -1;
            $('.tishi').html( Count_sum )
            console.log( Count_sum )
            if(Count_sum == 1){
                $('#title').html('作为资深火影迷，我竟被岸本扇了个巴掌')
            }else{
                $('#title').html('羞辱！作为资深火影迷，我竟被岸本扇了个'+ Count_sum + '巴掌')
            }
        })

        $('.fx_btn2').on("touchend", function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            //$('.fenx_people').hide()
            lockSwiper()
            setTimeout(function(){
                var audioEle3 = document.getElementById("audio3");
                audioEle3.play();
            },250)

            console.log(Count_sum)
        })

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    }
}
$(function (){
    // init app
    app.before_loading_img();
});