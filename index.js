window.addEventListener('load',function(){
    const lunbo=document.querySelector(".mylunbo");
    const arrowl=document.querySelector(".arrow-l");
    const arrowr=document.querySelector(".arrow-r");
    var num=0;  // 左右移动按钮定位图片
    var circle=0;  // 定位小圆点
    var flag=true;  // 节流阀
    //1、右侧按钮，左侧按钮
    lunbo.addEventListener('mouseenter',function(){
        arrowl.style.display='block';
        arrowr.style.display='block';
        clearInterval(timer);  // 清楚计时器，轮播图不自动播放
        //timer=null;  // 清楚timer变量
    });
    lunbo.addEventListener('mouseleave',function(){
        arrowl.style.display='none';
        arrowr.style.display='none';
        timer=setInterval(function(){
            arrowr.click();
        },2000);
    });
    //2、创建小圆点
    const ul=lunbo.querySelector("ul");
    const ol=lunbo.querySelector("ol");
    for(let i=0;i<ul.children.length;i++){  // 根据图片数量生成小圆点
        let li=document.createElement("li");
        li.setAttribute('index',i);  // 添加自定义属性index
        ol.appendChild(li);
        //3、添加小圆圈点击事件
        li.onclick=function(){
            for(let i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            this.className='current';
            //4、小圆圈动画
            let lunbowidth=lunbo.offsetWidth;
            let index=this.getAttribute('index');
            num=circle=index;  // 点击小圆点时，将num和circle的值赋值为index，即将小圆点顺序和左右按钮的num定位到当前图片
            animate(ul,-index*lunbowidth);  // 调用动画函数，-index*lunboWidth为终点位置
        }
    }
    //5、克隆子元素-->ABCDA，此时最后一张图为第一张图的复制！！
    let child=ul.children[0].cloneNode(true);
    ul.appendChild(child);
    ol.children[0].className='current';
    //6、右侧按钮点击事件
    arrowr.addEventListener('click',function(){
        if(flag){
            flag=false;  // 未完成轮播动画，不能轮播，设置为false
            if(num==ul.children.length-1){
                ul.style.left=0;  // 当点击到最后一个图片时，即和第一幅图相同的那张，num为ul.children.length-1,先切换到第一张(很快),执行动画切换到第二张
                num=0;  // num重新设为0，后面再加1
            }
            num++;
            animate(ul,-num*lunbo.offsetWidth,function(){
                flag=true;  // 将flag设置为true，可以再次点击轮播
            });
            circle++;
            if(circle==ol.children.length)  // 当小圆圈移动到最后，点击右移，circle+1,此时circle为ol.children.length
                circle=0;
            setCurrent();
        }
    })
    //7、左侧点击事件
    arrowl.addEventListener('click',function(){
        if(flag){
            flag=false;
            if(num==0){
                num=ul.children.length-1;  // 当轮播图为第一张图时，num设为最后一张图的index，之后再减一
                ul.style.left=-num*lunbo.offsetWidth+'px';  // 先切换到最后一张图，之后再调用动画函数到实际倒数第二图
            }
            num--;
            animate(ul,-num*lunbo.offsetWidth,function(){
                flag=true;
            });
            circle--;
            if(circle==-1)  // 当小圆圈在第一个位置时，点击左移，circle-1，此时circle为-1
                circle=ol.children.length-1;
            setCurrent();
        }
    });
    var timer=setInterval(function(){
        arrowr.click();
    },2000);
    function setCurrent(){
        for(let i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circle].className='current';
    }
})