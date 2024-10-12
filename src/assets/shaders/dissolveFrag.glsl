#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform float u_animation_time;

float random(vec2 uv) {
    return fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec4 textureColor = texture2D(u_tex0, uv);

    float dissolveThreshold = noise(uv * 10.0);

    if (dissolveThreshold < u_animation_time) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        gl_FragColor = textureColor;
    }
}