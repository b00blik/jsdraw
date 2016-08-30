    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var clickColor = new Array();
    var colorPurple = "#cb3594";
    var colorGreen = "#659b41";
    var colorYellow = "#ffcf33";
    var colorBrown = "#986928";
    var curColor = colorPurple;
    var paint;
    var context;
    var canvas;
    var canvasDiv;

    function addClick(x,y,dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(curColor);
    }

    function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.lineJoin = "round";
        context.lineWidth = 5;

        for(var i=0; i < clickX.length; i++) {		
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            } else {
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }
    }

    function prepareCanvas(width, height){
        canvas = document.getElementById('drawCanvas')
        context = canvas.getContext("2d");  
        canvas.width=width;
        canvas.height=height;
    }

    $('#drawCanvas').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY);
        redraw();
    });

    $('#drawCanvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#drawCanvas').mouseup(function(e){
        paint = false;
    });

    $('#drawCanvas').mouseleave(function(e){
        paint = false;
    });

    $('#clear').button().click(function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
    });

    $('#purple_color').button().click(function() {
        curColor = colorPurple;
    });
    
    $('#yellow_color').button().click(function() {
        curColor = colorYellow;
    });

    $('#green_color').button().click(function() {
        curColor = colorGreen;
    });

    $('#brown_color').button().click(function() {
        curColor = colorBrown;
    });

    //TODO: styling buttons