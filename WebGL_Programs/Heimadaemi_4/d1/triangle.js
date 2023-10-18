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

var projLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [    
        vec4( 0.5 , 0.0, 0.0, 0.1 ),
        vec4( 0.2 , -0.2, 0.0, 0.1 ),
        vec4( 0.2 , 0.2 , 0.0, 0.1),
        // fan box
        vec4( 0.2 , -0.2 , 0.0, 0.1),
        vec4( 0.2 , 0.2 , 0.0, 0.1),
        vec4( -0.2 , 0.2 , 0.0, 0.1),
        vec4( -0.2 , -0.2, 0.0, 0.1)
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
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    
    locColor = gl.getUniformLocation( program, "rcolor" );
    gl.uniform4fv( locColor, flatten(color) );

    matrixLoc = gl.getUniformLocation( program, "translation" );
    
    projLoc = gl.getUniformLocation( program, "projection");
    var projection = perspective(50.0, 1.0, 0.2, 100.0);
    gl.uniformMatrix4fv(projLoc, false, flatten(projection));

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // add some translation
    var mv = lookAt( vec3(0.0, 0.0, 100.0),
                     vec3(0.0, 0.0, 0.0),
                     vec3(0.0, 1.0, 0.0)                    
    );

    var v = vec3(0.0, 11.0, 0.0);

    mv = mult( mv, translate(v) );
    
    gl.uniformMatrix4fv( matrixLoc, false, flatten(mv) );


    gl.drawArrays( gl.TRIANGLES, 0, 3 );        // draw triangle
    gl.drawArrays( gl.TRIANGLE_FAN, 3, 4 );     // draw square
    
    window.requestAnimFrame(render);
}
