var canvas;
var gl;

var maxNumPoints = 200;  
var index = 0;
//  Execute the code when the website has finished loading
window.onload = function init()
{

    //  set up the canvas that the user sees
    canvas = document.getElementById( "gl-canvas" );

    //  Tells us if it failed to set up the canvas/WebGL
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initalize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //  Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumPoints, gl.DYNAMIC_DRAW);

    //  Associate shader variables with our databuffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //  Listen for click and place a colored dot at that point

    
    canvas.addEventListener("mousedown", function(e)
        {
            gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

            //  Calculate coordinates of new point
            var t = vec2(
                2 *  e.offsetX / canvas.width - 1,
                2 * (canvas.height - e.offsetY) / canvas.height - 1
            );

            //  Add new point behind the others
            gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

            index++;
        }
    );


    //  Call the render function which will display our program
    render();
}

function render() {
    //  clear the screen
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.drawArrays( gl.POINTS, 0, index );

    window.requestAnimFrame(render);
    
}