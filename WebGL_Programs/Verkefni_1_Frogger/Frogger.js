//////////////////////////////////////////////////////////////////////
//    Sýnisforrit í Tölvugrafík
//     T-laga form teiknað með TRIANGLE-FAN
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
//////////////////////////////////////////////////////////////////////
"use strict";
var canvas;
var gl;
var frogSpeed = 0.1;
var carSpeed = 0.005;

var frogPosY = -0.9;
var frogPosX = 0.0;

var car1Y = 0.0;
var car1X = -1.0;
var car2Y = -0.5;
var car2X = -1.0;
var car3Y = 0.5;
var car3X = -1.0;

var verLoc;
var horLoc;
var colorLoc;
var alive = true;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    

    // input vertecies into array v
    var v = [ 
        // frida froskur
        vec2(  0.05, 0.0  ), 
        vec2( -0.05, 0.0  ), 
        vec2(  0.0, 0.1  ),
        // bill 1 
        vec2(  0.1, 0.1  ),
        vec2(  0.1, -0.0  ),
        vec2( -0.1, 0.1  ),
        vec2(  -0.1, -0.0  ),
    ];  

    

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(v), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    verLoc = gl.getUniformLocation( program, "frogPosY" );
    horLoc = gl.getUniformLocation( program, "frogPosX" );

    window.addEventListener("keydown", function(e){
        console.log("Event triggered");
        switch( e.key ) {
        case "w": // vinstri ör
        frogPosY += frogSpeed; break;
        case "s": // vinstri ör
        frogPosY += -frogSpeed; break;
        case "a": // vinstri ör
        frogPosX += -frogSpeed; break;
        case "d": // hægri ör
        frogPosX += frogSpeed; break;
        default: frogPosX = 0.0;
        } 
    });
        
    // Find the location of the variable fColor in the shader program
    colorLoc = gl.getUniformLocation( program, "fColor" );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // reset car1 after leaving the screen
    (car1X > 1.2) ? car1X = -1.2 : car1X += carSpeed;
    (car2X > 1.2) ? car2X = -1.2 : car2X += carSpeed*2;
    (car3X > 1.2) ? car3X = -1.2 : car3X += carSpeed*3;

    // see if any part of triangle is inside car1
    // acconting for float precision
    if (frogPosX-car1X > -0.1 &&
        frogPosX-car1X < 0.1 &&
        frogPosY-car1Y > -0.05 &&
        frogPosY-car1Y < 0.05)
        alive = false;

    if (frogPosX-car2X > -0.1 &&
        frogPosX-car2X < 0.1 &&
        frogPosY-car2Y > -0.05 &&
        frogPosY-car2Y < 0.05)
        alive = false;

    if (frogPosX-car3X > -0.1 &&
        frogPosX-car3X < 0.1 &&
        frogPosY-car3Y > -0.05 &&
        frogPosY-car3Y < 0.05)
        alive = false;

    

    // send the new position over to gpu
    (alive) ? gl.uniform4fv( colorLoc, vec4( 0.0, 1.0, 0.0, 1.0 )) 
            : gl.uniform4fv( colorLoc, vec4( 1.0, 0.0, 0.0, 1.0 ));
    gl.uniform1f( verLoc, frogPosY );
    gl.uniform1f( horLoc, frogPosX );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    

    // send the new position over to gpu
    gl.uniform4fv( colorLoc, vec4( 0.0, 1.0, 1.0, 1.0 ));
    gl.uniform1f( verLoc, car1Y );
    gl.uniform1f( horLoc, car1X );
    gl.drawArrays( gl.TRIANGLE_STRIP, 3, 7 );

    
    // send the new position over to gpu
    gl.uniform4fv( colorLoc, vec4( 1.0, 0.0, 1.0, 1.0 ));
    gl.uniform1f( verLoc, car2Y );
    gl.uniform1f( horLoc, car2X );
    gl.drawArrays( gl.TRIANGLE_STRIP, 3, 7 );

    
    // send the new position over to gpu
    gl.uniform4fv( colorLoc, vec4( 1.0, 1.0, 0.0, 1.0 ));
    gl.uniform1f( verLoc, car3Y );
    gl.uniform1f( horLoc, car3X );
    gl.drawArrays( gl.TRIANGLE_STRIP, 3, 7 );


    window.requestAnimFrame(render);
}
