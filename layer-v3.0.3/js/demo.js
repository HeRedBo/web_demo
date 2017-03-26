$(function() {
    $("#chutiyan>a").bind('click', function(event) {
        var othis = $(this), index = othis.index();
        switch(index)
        {
            case 0: // 初体验
                var icon = -1;
                (function changeIcon() {
                    var index = layer.alert('Hi,你好！点击确认更改图标！',{
                        icon : icon,
                        shadeClose: true,
                        title : icon === -1 ? '初体验 - layer ' + layer.v : 'icon : ' + icon + '- layer ' + layer.v 
                    }, changeIcon); 
                    if(8 === ++ icon) layer.close(index);
                })();
            break;
            case 1:
                // 询问框
                layer.confirm('你是如何看待开发？', {
                    btn : ['重要','奇葩'] // 按钮、
                }, function(){
                    layer.msg('的确很重要！',{icon:1});
                },function(){
                    layer.msg('也可以这样', {
                        time : 2000, // 2s 后自动关闭
                        btn : ['明白了','知道了']
                    });
                });
            break;
            case 2:
                //layer.msg('玩命提示中');
                //正上方
                layer.msg('灵活运用offset', {
                  icon : 1,
                  offset : 10,
                  shift : 0
                });
            break;
            case 3:
                layer.alert('墨绿风格，点击确认看深蓝',{
                    skin :'layui-layer-molv', // 样式名称
                    closeBtn : 0
                },function() {
                    layer.alert('偶吧深蓝style',  {
                        skin : 'layui-layer-lan',
                        closeBtn : 0,
                        anim : 4 // 动画类型
                    });
                })
            break;
            case 4: //页面层
                layer.open({
                    type : 1,
                    skin : 'layui-layer-rim', //加上边框
                    area : ['420px', '240px'],
                    content : 'html 内容'
                });
            break;
            case 5:
                layer.open({
                    type : 1,
                    skin : 'layui-layer-demo', //加上边框
                    closeBtn : 0, // 不显示关闭按钮
                    anim : 2,
                    shadeClose : true, // 开启遮罩关闭
                    content : '即传入skin:"样式名"，然后你就可以为所欲为了。你怎么样给她整容都行 我是华丽的酱油==。'
                });
            break;
            case 6:
                layer.tips('Hi，我是tips', this);
            break;
            case 7: // iframe层
                layer.open({
                    type : 2,
                    title : 'layer mobile 页',
                    shadeClose : true,// 开启遮罩关闭
                    shade : 0.8,
                    area : ['380px','90%'],
                    content : 'http://layer.layui.com/mobile/'
                });
            break;
            case 8: // 加载层
                var index = layer.load(0, {shade: false,time : 3000}); //0代表加载的风格，支持0-2
            break;
            case 9:
                //loading层
                var index = layer.load(1, {
                  shade: [0.1,'#fff'], //0.1透明度的白色背景
                });
            break;
            case 10:
                 //小tips
                layer.tips('我是另外一个tips，只不过我长得跟之前那位稍有些不一样。', this, {
                  tips: [1, '#3595CC'],
                  time: 4000
                });
            break;
             case 11:
                //prompt层
                layer.prompt({title: '输入任何口令，并确认', formType: 1}, function(pass, index){
                  layer.close(index);
                  layer.prompt({title: '随便写点啥，并确认', formType: 2}, function(text, index){
                    layer.close(index);
                    layer.msg('演示完毕！您的口令：'+ pass +'您最后写下了：'+text);
                  });
                });
            break;
            case 12:
                layer.tab({
                  area: ['600px', '300px'],
                  tab: [{
                    title: 'TAB1', 
                    content: '内容1'
                  }, {
                    title: 'TAB2', 
                    content: '内容2'
                  }, {
                    title: 'TAB3', 
                    content: '内容3'
                  }]
                });
            break;
        }
    });
});