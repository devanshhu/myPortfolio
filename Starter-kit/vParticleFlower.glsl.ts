export class VertexShader {
  getVertexShader() {
    return `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform sample2D texture1;
    flaot PI = 3.14159265358979;
        void main(){
            gl_Position = vec4(1.,1.,1.,1.0);
        }
        
        
        `;
  }
}
