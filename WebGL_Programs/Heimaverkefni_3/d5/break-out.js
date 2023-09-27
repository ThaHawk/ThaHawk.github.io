/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Ferningur skoppar um gluggann.  Notandi getur breytt
//     hraðanum með upp/niður örvum.
//
//    Hjálmtýr Hafsteinsson, september 2023
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// Núverandi staðsetning miðju ferningsins
var box = vec2( 0.0, 0.0 );
var spade = vec2( 0.0, 0.0 );

// Stefna (og hraði) fernings
var dX;
var dY;

var sHitBox = vec2( 0.0, 0.0 );

// Svæðið er frá -maxX til maxX og -maxY til maxY
var maxX = 1.0;
var maxY = 1.0;

// Hálf breidd/hæð ferningsins
var boxRad = 0.05;

// Ferningurinn er upphaflega í miðjunni
// var vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);
var vertices = [
    vec2 ( -0.05, -0.05 ),
    vec2 ( 0.05, -0.05 ),
    vec2 ( 0.05, 0.05 ),
    vec2 ( -0.05, 0.05 ),
    vec2 ( -0.1, -0.9 ),
    vec2 ( -0.1, -0.86 ),
    vec2 (  0.1, -0.86 ),
    vec2 (  0.1, -0.9 ) 
];


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 ); // gray background
    
    // Gefa ferningnum slembistefnu í upphafi
    dX = Math.random()*0.1-0.05;
    dY = Math.random()*0.1-0.05;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    locBox = gl.getUniformLocation( program, "boxPos" );
    locSpade = gl.getUniformLocation( program, "spadePos" );

    // Event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        mouseX = e.offsetX;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            var xmove = 2*(e.offsetX - mouseX)/canvas.width;
            mouseX = e.offsetX;
            for(i=4; i<8; i++) {
                vertices[i][0] += xmove;
            }

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
        }
    } );
    
    render();
}


function render() {
    
    // Láta ferninginn skoppa af top og hliðar veggjunum
    if (Math.abs(box[0] + dX) > maxX - boxRad) dX = -dX;
    if (box[1] + dY > maxY - boxRad) dY = -dY;

    // Láta box skoppa upp ef staðsetning bolta er á milli vertexana.
    if (box[0] + dX >= vertices[5][0] - boxRad && 
        box[0] + dX <= vertices[7][0] + boxRad &&
        box[1] - boxRad + dY <= -0.9 && 
        box[1] - boxRad + dY >= -1.0)
        dY = -dY;

    console.log(box[1] + dY);

    // milli 6-1 og 7-1

    // Uppfæra staðsetningu
    box[0] += dX;
    box[1] += dY;
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    //
    gl.uniform2fv( locBox, flatten(box) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

    gl.uniform2fv( locBox, flatten(vec2(0.0,0.0)) );
    gl.drawArrays( gl.TRIANGLE_FAN, 4, 4 );

    window.requestAnimFrame(render);
}
