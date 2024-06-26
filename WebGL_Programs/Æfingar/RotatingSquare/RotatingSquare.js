var gl;
var vertices;
var theta = 0.1;


//  Execute the code when the website has finished loading
window.onload = function init()
{

    //  set up the canvas that the user sees
    var canvas = document.getElementById( "gl-canvas" );

    //  Tells us if it failed to set up the canvas/WebGL
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }



    //  Create some vertices
    vertices = [
        //  use TRIANGLE_FAN
        vec2(  0.5,  0.5 ), //  upper right
        vec2( -0.5,  0.5 ), //  upper left
        vec2( -0.5, -0.5 ), //  lower left
        vec2(  0.5, -0.5 )  //  lower right
    ];



    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    //  Set background color
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );

    //  Load shaders and initalize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //  Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    //  Associate shader variables with our databuffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //  Call the render function which will display our program
    render();
}

function render() {
    //  clear the screen
    gl.clear( gl.COLOR_BUFFER_BIT );

    var s = Math.sin(theta);
    var c = Math.cos(theta);

    for ( var i = 0; i < 4; i++) {
        vertices[i] = vec2(
            c * vertices[i][0] - s * vertices[i][1],
            s * vertices[i][0] + c * vertices[i][1]
        )
    }

    //  Send new coordinates over to the gpu
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    
    //  draw the array as triangle fan
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 ); 

    // call the next frame ~60 fps
    window.requestAnimFrame(render);
}