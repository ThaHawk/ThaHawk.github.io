var canvas;
var gl;


var spadiB = 0.4;
var spadiH = 0.05;

var mouseX;
var mouseY;
var movement = false;
//  Execute the code when the website has finished loading
window.onload = function init()
{

    //  set up the canvas that the user sees
    canvas = document.getElementById( "gl-canvas" );

    //  Tells us if it failed to set up the canvas/WebGL
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }



    //  Create some vertices
    var vertices = [
        vec2(  spadiB/2, -0.8 ),
        vec2( -spadiB/2, -0.8 ),
        vec2( -spadiB/2, -0.8-spadiH ),
        vec2(  spadiB/2, -0.8-spadiH )
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
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );

    //  Associate shader variables with our databuffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //  Event listeners for mouse
    canvas.addEventListener("mousedown", 
    function(e) { movement = true; mouseX = e.offsetX; mouseY = e.offsetY});

    canvas.addEventListener("mouseup", 
    function(e) { movement = false; });

    canvas.addEventListener("mousemove", 
    function(e) {
        if (movement){
            var xmove = 2*(e.offsetX - mouseX) / canvas.width;
            mouseX = e.offsetX;
            for(i = 0; i < 4; i++) {
                vertices[i][0] += xmove;
            }

            var ymove = 2 * (mouseY - e.offsetY) / canvas.height;
            mouseY = e.offsetY;
            for(i = 0; i < 4; i++) {
                vertices[i][1] += ymove;
            }
        }

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    }
    );


    //  Call the render function which will display our program
    render();
}

function render() {
    //  clear the screen
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    //  draw the array as triangles
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

    window.requestAnimationFrame(render);
}

function worldX(x){
    return 2*(x - mouseX)/canvas.width;
}

function worldY(y){
    return 2*(canvas.height - mouseX)/canvas.height-1;
}