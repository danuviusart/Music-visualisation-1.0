#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_active;

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;

    
    float r = (st.x - st.y) + abs(sin(u_mid));

    // 2. Mids and Treble create softer, lower-intensity accent waves
    float g = (st.y - st.x) + abs(sin(u_treble));
    float b = 0.0;

    // 3. Combine them: Red dominates, mids add warm orange/yellow hints, treble adds subtle depth
    vec3 col = vec3(r, g, b);

    // Keep it black until active
    col *= u_active;

    gl_FragColor = vec4(col, 1.0);
}