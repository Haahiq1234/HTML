class Camera {
    constructor(canvas, program) {
        this.program = program;
        this.mView_UL = GL.getUniformLocation(program, "mView");
        this.mProj_UL = GL.getUniformLocation(program, "mProj");
        this.mWorld_UL = GL.getUniformLocation(program, "mWorld");

        this.mView = new Float32Array(16);
        this.mProj = new Float32Array(16);
        this.mWorld = new Float32Array(16);

        this.position = [0, 0, -5];
        this.direction = [0, 0, 1];

        this.center = [];

        glMatrix.mat4.perspective(this.mProj, Math.PI / 2, canvas.width / canvas.height, 0.1, 1000);
        glMatrix.mat4.identity(this.mWorld);
        GL.uniformMatrix4fv(this.mProj_UL, false, this.mProj);
        this.UpdateWorld();        
        this.UpdateView();

        this.rot = new Float32Array(16);
        this.quat = [];
    }
    UpdateView() {
        GL.useProgram(this.program);
        glMatrix.vec4.add(this.center, this.position, this.direction);
        glMatrix.mat4.lookAt(this.mView, this.position, this.center, [0, 1, 0]);
        GL.uniformMatrix4fv(this.mView_UL, false, this.mView);
    }
    UpdateWorld() {
        //console.log(this.mWorld_UL);
        GL.uniformMatrix4fv(this.mWorld_UL, false, this.mWorld);
    }
    rotate(x, y, z) {
        glMatrix.quat.fromEuler(this.quat, x, y, z);
        glMatrix.mat4.fromQuat(this.rot, this.quat);
        let mWorld = [...this.mWorld];
        glMatrix.mat4.mul(this.mWorld, mWorld, this.rot);
        this.UpdateWorld();
    }
}
function createProgram(vertexShaderText, fragmentShaderText) {
    var program = GL.createProgram();
    var vertexShader = GL.createShader(GL.VERTEX_SHADER);
    GL.shaderSource(vertexShader, vertexShaderText);
    GL.compileShader(vertexShader);
    let vertexShaderLogInfo = GL.getShaderInfoLog(vertexShader);
    if (vertexShaderLogInfo != "") {
        console.log(vertexShaderLogInfo);
        return;
    }
    var fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);
    GL.shaderSource(fragmentShader, fragmentShaderText);
    GL.compileShader(fragmentShader);
    let fragmentShaderInfoLog = GL.getShaderInfoLog(fragmentShader);
    if (fragmentShaderInfoLog != "") {
        console.log(fragmentShaderInfoLog);
        return;
    }

    GL.attachShader(program, vertexShader);
    GL.attachShader(program, fragmentShader);

    GL.linkProgram(program);
    GL.validateProgram(program);

    GL.detachShader(program, vertexShader);
    GL.detachShader(program, fragmentShader);

    GL.deleteShader(vertexShader);
    GL.deleteShader(fragmentShader);

    let shaderProgramInfoLog = GL.getProgramInfoLog(program);

    if (shaderProgramInfoLog != "") {
        console.log(shaderProgramInfoLog);
        return;
    }
    return program;
}

function getUL(program, name) {
    let loc = GL.getUniformLocation(program, name);
    if (!loc) {
        console.log("Uniform of name: " + name + " not found. Maybe it is unused.");
    }
    return loc;
}

function getAL(program, name) {
    let loc = GL.getAttribLocation(program, name);
    if (!loc) {
        console.log("Attribute of name: " + name + " not found. Maybe it is unused.");
        return;
    }
    return loc;
}

function createBuffer(bufferType, data, dataType, vertexElementCount, layout=[]) {
    let buffer = GL.createBuffer();
    GL.bindBuffer(bufferType, buffer);
    if (dataType == GL.FLOAT) {
        data = new Float32Array(data);
    } else if (bufferType == GL.ELEMENT_ARRAY_BUFFER) {
        data = new Int16Array(data);
    }
    GL.bufferData(bufferType, data, GL.STATIC_DRAW);
    if (layout.length > 0) {
        let dataTypeSize = 0;
        let offset = 0;
        if (dataType == GL.FLOAT) {
            dataTypeSize = Float32Array.BYTES_PER_ELEMENT;
        }
        for (var i = 0; i < layout.length; i++) {
            GL.enableVertexAttribArray(layout[i][0]);
            GL.vertexAttribPointer(layout[i][0], layout[i][1], dataType, false, vertexElementCount * dataTypeSize, offset);
            offset += dataTypeSize * layout[i][1];
        }
    }
    return buffer;
}
        
