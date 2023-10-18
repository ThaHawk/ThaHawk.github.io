const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL is not supported by your browser.");
}

// Define cube vertices and colors.
const vertices = [
    // Front face
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    // Back face
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
];

const colors = [
    // Front face (red)
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    // Back face (red)
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
];

// Define cube indices for rendering faces.
const indices = [
    0, 1, 2, 0, 2, 3,    // Front face
    4, 5, 6, 4, 6, 7,    // Back face
    0, 4, 7, 0, 7, 3,    // Left face
    1, 5, 6, 1, 6, 2,    // Right face
    0, 1, 5, 0, 5, 4,    // Bottom face
    2, 3, 7, 2, 7, 6,    // Top face
];

// Create vertex buffer for vertices and colors.
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices.concat(colors)), gl.STATIC_DRAW);

// Create an index buffer.
const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Vertex and fragment shader source code.
const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    varying highp vec4 vColor;
    void main(void) {
        gl_Position = aVertexPosition;
        vColor = aVertexColor;
    }
`;

const fsSource = `
    varying highp vec4 vColor;
    void main(void) {
        gl_FragColor = vColor;
    }
`;

// Compile and link shaders.
const shaderProgram = createShaderProgram(gl, vsSource, fsSource);

// Get attribute and uniform locations.
const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
const vertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");

// Use the shader program.
gl.useProgram(shaderProgram);

// Enable the vertex position and color attributes.
gl.enableVertexAttribArray(vertexPosition);
gl.enableVertexAttribArray(vertexColor);

// Set the vertex buffer to the attributes.
const vertexStride = 24; // 6 floats per vertex (3 for position, 3 for color).
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, vertexStride, 0);
gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, vertexStride, 12);

// Set the clear color and clear the canvas.
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the cube using the index buffer.
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

/**
 * Utility function to create a shader program from source code.
 */
function createShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    return shaderProgram;
}
