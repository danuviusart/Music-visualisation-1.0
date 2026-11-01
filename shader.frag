#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_active;
#define PI 3.14159265359

float plot(vec2 st, float pct){
  return smoothstep( pct-0.12, pct, st.y) -
         smoothstep( pct, pct+0.01, st.y);
}

vec3 wave(vec2 st, float freq, float tspeed, float ampl, vec3 base_color){
    
    // squising wave edges
    float envelope = sin(st.x * PI);
    
    // global color shift
    float color_shift = sin(u_time * 0.5) * 0.5 + 0.5;
    vec3 dynamic_color = 0.6 + 0.4 * cos(u_time * 0.5 + vec3(0.0, 4.0, 6.0));
    
    float ysin = sin(st.x * freq - u_time * tspeed) * (ampl * 0.1) * envelope + 0.5;
    float pct = plot(st, ysin);
    vec3 wave_color = base_color * pct * dynamic_color;
    return wave_color;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x / u_resolution.y;
    vec3 color = vec3(0.0);
    // float dynamic_amp = 0.01 + abs(sin(u_time + 1.5)) * 0.15;
    
    // --- Back wave ---
    vec3 backwave_color = wave(st, 5.0, 2.5, u_bass, vec3 (0.1, 0.15, 0.7));
    color += backwave_color;

    // --- WAVE 1 (Small back wave) ---
    vec3 wave1_color = wave(st, 10.0, 2.3, u_mid, vec3(0.4, 0.5, 1.3));
    
    // --- WAVE 2 (Big bright wave) ---
    vec3 wave2_color = wave(st, 6.0, 2.7, u_treble, vec3(0.2, 0.8, 1.0));
    
    // --- WAVE 3 (Front small wave) ---
    vec3 wave3_color = wave(st, 10.0, 3.5, u_bass, vec3(0.1, 0.3, 1.3));
    
    // --- WAVE 4 (Front tiny wave) ---
    vec3 wave4_color = wave(st, 15.0, 7.5, u_mid * 0.2, vec3(0.4, 0.4, 1.3));
    
    // Adding blend into a bright glowing mix
    color += wave1_color + wave2_color + wave3_color + wave4_color;
    // Keep it black until active
    //color *= u_active;
    color *= 0.6;
    gl_FragColor = vec4(color, 1.0);
}