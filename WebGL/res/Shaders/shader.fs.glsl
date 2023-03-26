precision mediump float;

varying vec3 frag_Col;
varying vec2 frag_Uv;
uniform sampler2D sampler;

void main() {
    //gl_FragColor = texture2D(sampler, frag_Uv);
    gl_FragColor = vec4(frag_Col, 1.0);
}