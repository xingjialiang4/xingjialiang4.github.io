function animate(obj,length,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var step=(length-obj.offsetLeft)/2; // 缓动效果，步长=（目标值-当前值）/10
        step=step>0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft==length){
            clearInterval(obj.timer);
            if(callback)
                callback();
            //callback && callback()
        }
            obj.style.left=obj.offsetLeft+step+'px';
        },15);
}