/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Sýnir hvernig hægt er að breyta lit með uniform breytu
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
/////////////////////////////////////////////////////////////////
var gl;
var points;

var colorLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    var vertices = new Float32Array(600);
    
    for ( let i = 0; i < 600; i+=6 ){
        // set location on screen
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        vertices[i] = plusOrMinus*Math.random();
        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        vertices[i+1] = plusOrMinus*Math.random();
        console.log(vertices);

        // lower right making a triangle height 0.1 and width 0.1;
        vertices[i+2] = vertices[i] - 0.05;     // x pos
        vertices[i+3] = vertices[i+1] - 0.1;    // y pos

        // lower left making a triangle height 0.1 and width 0.1;
        vertices[i+4] = vertices[i] + 0.05;     // x pos
        vertices[i+5] = vertices[i+1] - 0.1;    // y pos
    } 

    //
    //  Configure WebGL
    //

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Find the location of the variable fColor in the shader program
    colorLoc = gl.getUniformLocation( program, "fColor" );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    for ( let i = 0; i < 300; i+=3 ){
        gl.uniform4fv( colorLoc, vec4( Math.random(), Math.random(), Math.random(), 1.0 ));
        gl.drawArrays( gl.TRIANGLES, i, 3 );
    }

}
