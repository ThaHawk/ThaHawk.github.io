var gl;
var points;

//  Execute the code when the website has finished loading
window.onload = function init()
{

    //  set up the canvas that the user sees
    var canvas = document.getElementById( "gl-canvas" );

    //  Tells us if it failed to set up the canvas/WebGL
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }



    //  Create some vertices
    var vertices = [
        vec2(  0.0,  1.0 ),
        vec2(  1.0,  0.0 ),
        vec2( -1.0,  0.0 )
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
    
    //  draw the array as triangles
    gl.drawArrays( gl.TRIANGLES, 0, 3 ); 
}