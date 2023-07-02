export class FragmentShader {
  getFragmentShader() {
    return `
    uniform float time;
    uniform sampler2D t;
    uniform float progress;
    varying vec2 vUv;
    varying vec3 vPosition;
        void main(){
            // vec2 newUV = vPosition.xy/vec2(480.* 1.5, 820. * 1.5) + vec2(0.5); this is to calculate & normalise
            vec4 tt = texture2D(t,vUv);
            vec4 tt1 = texture2D(t,vec2(0.));

            gl_FragColor = mix(tt,tt1, progress);
            if(gl_FragColor.r < 0.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
            // gl_FragColor = vec4(1.,0.,0.,1.);
        }
        
        
        `;
  }
}
