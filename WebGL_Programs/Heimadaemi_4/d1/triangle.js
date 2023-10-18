///////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//    Einfaldasta WebGL forritið.  Teiknar einn rauðan þríhyrning.
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
///////////////////////////////////////////////////////////////////
var gl;
var points;

var color = vec4( 1.0, 0.0, 0.0, 1.0 );
var locColor;
var matrixLoc;
var iniTime;
var slowMove = 0.0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [    
        vec2( 0.5 , 0.0 ),
        vec2( 0.2 , -0.2 ),
        vec2( 0.2 , 0.2 ),
        // fan box
        vec2( 0.2 , -0.2 ),
        vec2( 0.2 , 0.2 ),
        vec2( -0.2 , 0.2 ),
        vec2( -0.2 , -0.2)
    ];

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    
    locColor = gl.getUniformLocation( program, "rcolor" );
    gl.uniform4fv( locColor, flatten(color) );

    iniTime = Date.now();

    matrixLoc = gl.getUniformLocation( program, "translation" );
    
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    slowMove += 0.01;
    // add some translation
    var mv = mat4();
    mv = mult( mv, translate( 0.0, slowMove, 0.0 ) );
    mv = mult( mv, rotateZ( 90 ) );
    
    gl.uniformMatrix4fv( matrixLoc, false, flatten(mv) );

    gl.uniform4fv(locColor, flatten(color));    // send color to fragment shader

    gl.drawArrays( gl.TRIANGLES, 0, 3 );        // draw triangle
    gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );     // draw square
    
    window.requestAnimFrame(render);
}
