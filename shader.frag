#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_active;

void main() {
    // 1. Red is our strong, dominant base pulsing to the bass
    float r = 0.4 + 0.6 * abs(sin(u_time * 0.6 + u_bass * 4.0));

    // 2. Mids and Treble create softer, lower-intensity accent waves
    float g = abs(sin(u_time * 1.0 + u_mid * 4.0)) * 0.4;
    float b = abs(sin(u_time * 1.0 + u_treble * 4.0)) * 1.0;

    // 3. Combine them: Red dominates, mids add warm orange/yellow hints, treble adds subtle depth
    vec3 col = vec3(r, g, b);

    // Keep it black until active
    col *= u_active;

    gl_FragColor = vec4(col, 1.0);
}