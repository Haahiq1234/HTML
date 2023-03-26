precision mediump float;
            
attribute vec3 vert_Pos;
attribute vec3 vert_Col;
attribute vec2 vert_Uv;

uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mWorld;

varying vec3 frag_Col;
varying vec2 frag_Uv;

void main() {
    frag_Col = vert_Col;
    frag_Uv = vert_Uv;
    gl_Position = mProj * mView * mWorld * vec4(vert_Pos, 1.0);
}