(function(){
    $("#chutiyan>a").bind('click', function(event) 
    {
       var othis = $(this), index = othis.index();
       switch(index)
       {
            case 0:
                var icon = -1;
                (function changeIcon(){
                    var index = layer.alert('Hi，你好！ 点击确认更换图标', {
                    icon: icon,
                    shadeClose: true,
                    title: icon === -1 ? '初体验 - layer '+layer.v : 'icon：'+icon + ' - layer '+layer.v
                    }, changeIcon);
                    if(8 === ++icon) layer.close(index);
                }());
            break;
            case 1:
                //询问框
                layer.confirm('您是如何看待前端开发？', {
                  btn: ['重要','奇葩'] //按钮
                }, function(){
                  layer.msg('的确很重要', {icon: 1});
                }, function(){
                  layer.msg('也可以这样', {
                    time: 20000, //20s后自动关闭
                    btn: ['明白了', '知道了']
                  });
                });
            break;
            case 2:
            //提示层
                //layer.msg('玩命提示中'); 
                //正上方
                layer.msg('灵活运用offset', {
                  offset: 10,
                  shift: 0
                });
            
            break;
            case 3:
                //墨绿深蓝风
                layer.alert('墨绿风格，点击确认看深蓝', {
                  skin: 'layui-layer-molv' //样式类名
                  ,closeBtn: 0
                }, function(){
                  layer.alert('偶吧深蓝style', {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,shift: 4 //动画类型
                  });
                }); 
            break;
            case 4:
                //页面层
                layer.open({
                  type: 1,
                  skin: 'layui-layer-rim', //加上边框
                  area: ['420px', '240px'], //宽高
                  content: '<div style="padding:20px;">即直接给content传入html字符<br>当内容宽高超过定义宽高，会自动出现滚动条。<br><br><br><br><br><br><br><br><br><br><br>很高兴在下面遇见你</div>'
                }); 
            break;
            case 5: 
                layer.tips('Hi，我是tips', this);
            break;
            case 6:
                //加载层
                var index = layer.load(2, {shade: false}); //0代表加载的风格，支持0-2
              
            break;
            case 7:
                  //loading层
                var index = layer.load(0, {
                  shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
            break;
            case 8:
                //小tips
                layer.tips('我是另外一个tips，只不过我长得跟之前那位稍有些不一样。', this, {
                  tips: [1, '#3595CC'],
                  time: 4000
                });
 
            break;
       }
    });
})();