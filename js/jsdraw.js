    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var clickColor = new Array();
    var clickLineWidth = new Array();
    var colorPurple = "#cb3594";
    var colorGreen = "#659b41";
    var colorYellow = "#ffcf33";
    var colorBrown = "#986928";
    var colorWhite = "#fff";
    var colorBlack = "#000";
    var currentLineWidth;
    var curColor = colorPurple;
    var purpleButton, greenButton, yellowButton, brownButton, whiteButton, blackButton;
    var paint;
    var context;
    var canvas;
    var canvasDiv;

    function addClick(x,y,dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(curColor);
        clickLineWidth.push(currentLineWidth);
    }

    function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.lineJoin = "round";

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
            context.lineWidth = clickLineWidth[i];
            context.stroke();
        }
    }

    function prepareCanvas(width, height){
        canvas = document.getElementById('drawCanvas')
        context = canvas.getContext("2d");  
        canvas.width=width;
        canvas.height=height;
        context.lineWidth = 5;
        currentLineWidth = 5;
    }

    function styleButtons(){
        document.getElementById('purple_color').classList.add('rounded-color-purple');
        document.getElementById('green_color').classList.add('rounded-color-green');
        document.getElementById('yellow_color').classList.add('rounded-color-yellow');
        document.getElementById('brown_color').classList.add('rounded-color-brown');
        document.getElementById('white_color').classList.add('rounded-color-white');
        document.getElementById('black_color').classList.add('rounded-color-black');
    }

    function createSlider() {
        $( "#slider" ).slider({
            range: "min",
            value: 5,
            min: 1,
            max: 10,
            slide: function( event, ui ) {
              currentLineWidth = ui.value;
            }
        });
    }

    function startUp(){
        $( function() {
                var dialog, form,wval,hval,
            
                width = $( "#width" ),
                height = $( "#height" ),
                allFields = $( [] ).add( width ).add( height ),
                tips = $( ".validateTips" );
            
                function updateTips( t ) {
                    tips
                        .text( t )
                        .addClass( "ui-state-highlight" );
                    setTimeout(function() {
                        tips.removeClass( "ui-state-highlight", 1500 );
                    }, 500 );
                }
            
                function checkLength( o, n, min, max ) {
                    if ( o.val().length > max || o.val().length < min ) {
                        o.addClass( "ui-state-error" );
                        updateTips( "Length of " + n + " must be between " +
                        min + " and " + max + "." );
                        return false;
                    } else {
                        return true;
                    }
                }
            
                function checkRegexp( o, regexp, n ) {
                    if ( !( regexp.test( o.val() ) ) ) {
                        o.addClass( "ui-state-error" );
                        updateTips( n );
                        return false;
                    } else {
                        return true;
                    }
                }
            
                function checkAndSet() {
                    var valid = true;
                    allFields.removeClass( "ui-state-error" );
                
                    valid = valid && checkLength( width, "width", 2, 4 );
                    valid = valid && checkLength( height, "height", 2, 4 );
                
                    valid = valid && checkRegexp( width, /^([0-9])+$/, "number field only allow : 0-9" );
                    valid = valid && checkRegexp( height, /^([0-9])+$/, "number field only allow : 0-9" );

                    wval = width.val();
                    hval = height.val();
            
                    if ( valid ) {
                        prepareCanvas(wval, hval);
                        dialog.dialog( "close" );
                    } else {
                        prepareCanvas(400,400);
                    }
                    return valid;
                }
            
                dialog = $( "#dialog-form" ).dialog({
                autoOpen: false,
                height: 400,
                width: 350,
                modal: true,
                buttons: {
                    "Set params": checkAndSet,
                    Cancel: function() {
                        dialog.dialog( "close" );
                    }
                },
                close: function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }
                });
            
                form = dialog.find( "form" ).on( "submit", function( event ) {
                    event.preventDefault();
                    checkAndSet();
                });

                dialog.dialog( "open" );
            
            } );
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
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, context.lineWidth);
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

    $('#white_color').button().click(function() {
        curColor = colorWhite;
    });
    $('#black_color').button().click(function() {
        curColor = colorBlack;
    });

    $(document).ready(function() {
        startUp();
        styleButtons();
        createSlider();
        //TODO: fill button, save button
    });