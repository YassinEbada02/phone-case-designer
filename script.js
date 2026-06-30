const canvas = new fabric.Canvas('case_designer_canvas', {
    preserveObjectStacking: true,
});

fabric.Image.fromURL(
    "assets/mockups/iphone14pro.png",
    function (img) {

        img.selectable = false;
        img.evented = false;

        img.scaleToWidth(canvas.width);

        img.set({
            left: 0,
            top: 0
        });

        canvas.setOverlayImage(
            img,
            canvas.renderAll.bind(canvas)
        );

    },
    {
        crossOrigin: "anonymous"
    }
);

// رفع صورة
document
.getElementById("case_designer_image_input")
.addEventListener("change", function (e) {

    const files = e.target.files;

    Array.from(files).forEach(file => {

        const reader = new FileReader();

        reader.onload = function (event) {

            fabric.Image.fromURL(event.target.result, function(img){

                img.scaleToWidth(180);

                img.set({
                    left:250,
                    top:350,
                    originX:"center",
                    originY:"center"
                });

                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();

            });

        };

        reader.readAsDataURL(file);

    });

});

// إضافة نص
document
.getElementById("case_designer_add_text_btn")
.onclick=function(){

    const value=document
    .getElementById("case_designer_text_input")
    .value;

    if(!value) return;

    const color=document
    .getElementById("case_designer_text_color")
    .value;

    const size=parseInt(
        document
        .getElementById("case_designer_text_size")
        .value
    );

    const text=new fabric.IText(value,{
        left:250,
        top:350,
        fill:color,
        fontSize:size,
        originX:"center",
        originY:"center"
    });

    canvas.add(text);
    canvas.setActiveObject(text);

};

// تغيير لون النص
document
.getElementById("case_designer_text_color")
.oninput=function(){

    const obj=canvas.getActiveObject();

    if(obj && obj.type==="i-text"){

        obj.set("fill",this.value);

        canvas.renderAll();

    }

};

// تغيير حجم الخط
document
.getElementById("case_designer_text_size")
.oninput=function(){

    const obj=canvas.getActiveObject();

    if(obj && obj.type==="i-text"){

        obj.set("fontSize",parseInt(this.value));

        canvas.renderAll();

    }

};

// حذف العنصر
document
.getElementById("case_designer_delete_layer_btn")
.onclick=function(){

    const obj=canvas.getActiveObject();

    if(obj){

        canvas.remove(obj);

    }

};

// مسح الكل
document
.getElementById("case_designer_clear_btn")
.onclick=function(){

    canvas.getObjects().forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.renderAll();

};
