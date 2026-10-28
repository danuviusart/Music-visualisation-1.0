#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_active;

// Custom plot function to draw a line based on a mathematical curve (pct)
float plot(vec2 st, float pct) {
    // Measures distance from st.y to the wave curve (pct)
    // Smoothstep creates a thin, anti-aliased line (0.02 thickness)
    return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
}

void main() {
    // 1. Normalize coordinates (st.x and st.y go from 0.0 to 1.0)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Scale x so we see multiple wave cycles across the canvas
    float x = st.x * 12.56;

    // 2. FIRST WAVE (Red/Crimson): Standard sine wave
    float y1 = sin(x + u_time) * 0.3 * u_mid + 0.5;
    float line1Intensity = plot(st, y1);

    // 3. SECOND WAVE (Blue): Cosine wave moving opposite direction
    float y2 = sin(x + u_time) * 0.3 * (u_bass*0.3) + 0.5;
    float line2Intensity = plot(st, y2);

    // 4. THIRD WAVE (Warm Orange): Faster frequency, slightly lower amplitude
    float y3 = sin(x * 1.5 + u_time) * 0.3 * u_treble + 0.5;
    float line3Intensity = plot(st, y3);

    // 5. Define your colors
    vec3 backgroundColor = vec3(0.08, 0.02, 0.05); // Dark background
    vec3 redLineColor     = vec3(0.85, 0.15, 0.20); // Deep rich red
    vec3 blueLineColor    = vec3(0.15, 0.50, 0.95); // Cool blue
    vec3 orangeLineColor  = vec3(0.98, 0.55, 0.10); // Warm bright orange

    // 6. Layer the lines onto the background
    vec3 finalColor = backgroundColor;

    // Paint red first
    finalColor = mix(finalColor, redLineColor, line1Intensity);

    // Paint blue second
    finalColor = mix(finalColor, blueLineColor, line2Intensity);

    // Paint orange third (on top)
    finalColor = mix(finalColor, orangeLineColor, line3Intensity);

    // Output final color to screen
    gl_FragColor = vec4(finalColor, 1.0);
}