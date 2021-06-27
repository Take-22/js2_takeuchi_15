let count = 0;
const max = 8;

//cssを適用する関数
function css(){
        //coverのcss
    const style_cover = "#cover"+count;
    $(style_cover)
        .css("position", "relative")
        .css("display", "inline-block");

        //textboxのcss
    const style_text = "#text"+count;
    $(style_text)
        .css("padding-right", "20px")
        .css("width", "120px");

    //dragButtonのcss
    const style_dragButton = "#dragButton"+count;
    $(style_dragButton)
        .css("font-size", "10px")
        .css("width", "15px",)
        .css("height", "15px")
        .css("position", "absolute")
        .css("left", "5px")
        .css("top", "2px")  
        .css("border-radius", "50px")
        .css("cursor", "pointer")
        .css("font-weight","bold");
    
    //deleteButtonのcss
    const style_deleteButton = "#deleteButton"+count;
    $(style_deleteButton)
        .css("font-size", "10px")
        .css("width", "15px",)
        .css("height", "15px")
        .css("position", "absolute")
        .css("right", "2px")
        .css("top", "2px")
        .css("cursor", "pointer")
        .css("font-weight","bold");
}

//新規作成のボタンを押すとテキストボックスを作成
$("#button").on("click",function(){
    count += 1;
    $("#wrapper").append('<div id="cover'+count+'"><textarea id="text'+count+'"></textarea><div id="dragButton'+count+'">〇</div><div id="deleteButton'+count+'">×</div></div>');
    css(); //cssを適用
    console.log(count); //確認用
    //textboxとlocalStorageのidを一致させる
    for(let n = 1; n<=count; n++){
        const num = "#text"+n;
        console.log(num); //確認用
        const value = $(num).val();
        localStorage.setItem(n,value);

        //「×」をクリックするとtextboxが消える
        const deleteButton = "#deleteButton"+n;
        $(deleteButton).on("click",function(){
            //特定のtextboxを削除
            const cover = "#cover"+n 
            $(cover).remove(); 
            //特定のtextboxに紐づくlocalStorageを削除
            localStorage.removeItem(n)
        });
    }
}); 

//テキストボックスをLocalstorageに保存する
$("#save").on("click",function(){
    for(let n = 1; n<=count; n++){
        const num = "#text"+n;
        const value = $(num).val();
        if(value==""){

        }
        localStorage.setItem(n,value);
    }  
}); 

//更新してもcountが前のものから継続
for(let z = 1; z<=localStorage.length;z++){
    count = z;
}

//更新してもtextboxそのものを残す
for(let v = 1; v<=localStorage.length; v++){
    const html = '<div id="cover'+v+'"><textarea id="text'+v+'"></textarea><div id="dragButton'+v+'">〇</div><div id="deleteButton'+v+'">×</div></div>'
    $("#wrapper").append(html);
    count = v
    css(); //cssを適用
}

//更新してもtextbox内のtextデータを残す
for(let i = 1; i<=localStorage.length; i++){
    const num = "#text"+i;
    const value01 = localStorage.getItem(i);
    $(num).append(value01);
}

//更新しても「×」をクリックするとtextboxが消える
for(let x = 1; x<=localStorage.length; x++){
    const deleteButton = "#deleteButton"+x;
    $(deleteButton).on("click",function(){
        const cover = "#cover"+x 
        $(cover).remove(); //特定のtextboxを削除

        //特定のtextboxに紐づくlocalStrageを削除
        localStorage.removeItem(x)
    });
}

//deleteで全て消去
$("#delete").on("click",function(){
    $("#wrapper").empty();
    count = 0;
    localStorage.clear();
}); 

//ドラッグして自由な位置に持っていく //一例
dragButton1.onmousedown = function(event){
    let shiftX = event.clientX - cover1.getBoundingClientRect().left;
    let shiftY = event.clientY - cover1.getBoundingClientRect().top;
    cover1.style.position = 'absolute';
    cover1.style.zIndex = 1000;
    document.body.append(cover1);
    moveAt(event.pageX, event.pageY);
    //textboxを（pageX、pageY）座標の中心に置く
    function moveAt(pageX, pageY){
        cover1.style.left = pageX - shiftX + 'px';
        cover1.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event){
        moveAt(event.pageX, event.pageY);
    }
    //mousemoveでtextboxを移動する
    document.addEventListener('mousemove', onMouseMove);
    //textboxをドロップ
    cover1.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        cover1.onmouseup = null;
    };      
};  
dragButton1.ondragstart = function(){
    return false;
};

