import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VertexShader } from './vParticleFlower.glsl';
import { FragmentShader } from './fParticleFlower.glsl';

export class ParticlesFlower {
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public width = window.innerWidth;
  public height = window.innerHeight;
  public settings: any;
  public controls!: OrbitControls;
  public gui!: dat.GUI;
  public time = 0;
  public isPlaying = true;
  public geometry!: THREE.PlaneGeometry;
  material!: THREE.Material;
  mesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.Material>;

  constructor() {
    this.addRenderer();
    this.addCamera();
    this.addGeometry();
    this.addSettings();
    this.render();
    this.addOrbitControls();
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xeeeeee);
    document.body.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      1000
    );
    this.camera.position.set(0, 0, 2);
  }
  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  addSettings() {
    this.gui = new dat.GUI();
    this.settings = {
      progress: 0,
    };
    this.gui.add(this.settings, 'progress', 0, 1, 0.01);
  }
  resize() {}
  render() {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
  addObjects() {}
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }
  addGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1);
    // this.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    this.material = new THREE.ShaderMaterial({
      fragmentShader: new FragmentShader().getFragmentShader(),
      vertexShader: new VertexShader().getVertexShader(),
      uniforms: {},
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
}
