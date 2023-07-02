import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VertexShader } from './vParticleFlower.glsl';
import { FragmentShader } from './fParticleFlower.glsl';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import gsap from 'gsap';

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
  public geometry!: any;
  material!: THREE.Material;
  mesh!: any;
  texture: any = 'assets/three/flower.jpeg';
  renderScene!: RenderPass;
  composer!: EffectComposer;
  bloomPass: any;
  constructor() {
    this.addSettings();
    this.addRenderer();
    this.addCamera();
    this.addPost();
    this.addGeometry();
    this.render();
    this.resize();
    setTimeout(() => {
      this.handleAnimations();
    }, 100);
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    document.getElementById('container')?.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      5000
    );
    this.addOrbitControls();
    this.camera.position.set(0, 0, 1500);
    this.controls.update();
  }
  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  addSettings() {
    // this.gui = new dat.GUI();
    this.settings = {
      distortion: 1,
      threshold: 0,
      strength: 0,
      progress: 0,
    };
    // this.gui.add(this.settings, 'distortion', 0, 8, 0.01);
    // this.gui.add(this.settings, 'strength', 0, 10, 0.01);
    // this.gui.add(this.settings, 'progress', 0, 3, 0.01);
    // this.gui.add(this.settings, 'radius', 0, 3, 0.01);
  }
  resize() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.render(this.scene, this.camera);
      this.composer.setSize(this.width, this.height);
      this.composer.render();
    });
  }
  render() {
    // this.mesh.rotation.x += 0.009;
    // this.mesh.rotation.y += 0.009;
    if (this.mesh.material.uniforms) {
      this.mesh.material.uniforms.time.value += 0.05;
      //   this.mesh.material.uniforms.progress.value = this.settings.progress;
      //   this.bloomPass.strength = this.settings.strength;
    }
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
    window.requestAnimationFrame(this.render.bind(this));
  }
  addObjects() {}
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }
  addGeometry() {
    this.geometry = new THREE.PlaneGeometry(480 * 1.745, 820 * 1.745, 480, 820);

    this.material = new THREE.ShaderMaterial({
      fragmentShader: new FragmentShader().getFragmentShader(),
      vertexShader: new VertexShader().getVertexShader(),
      uniforms: {
        time: { type: 'f', value: 0 } as any,
        progress: { type: 'f', value: 0 } as any,
        resolution: { type: 'v4', value: new THREE.Vector4() } as any,
        distortion: { value: 1 },
        uvRate1: {
          value: new THREE.Vector2(1.0, 1.0),
        },
        t: {
          type: 't',
          value: new THREE.TextureLoader().load(this.texture),
        } as any,
      },
    });
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addPost() {
    this.renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0;
    this.bloomPass.radius = 0;
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.bloomPass);
    this.composer.setSize(this.width, this.height);
  }

  handleAnimations() {
    gsap.to(this.mesh.material.uniforms.distortion, {
      value: 2,
      delay: 0,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.to(this.mesh.material.uniforms.distortion, {
      value: 0,
      delay: 1,
      duration: 1,
      ease: 'power2.in',
    });
    gsap.to(this.mesh.material.uniforms.progress, {
      value: 1,
      delay: 2,
      duration: 0.5,
      ease: 'power2.in',
    });
    gsap.to(this.bloomPass, {
      strength: 3,
      delay: 0.4,
      duration: 1,
      ease: 'power2.in',
    });
    gsap.to(this.bloomPass, {
      strength: 0.1,
      delay: 1.1,
      duration: 2,
      ease: 'power2.in',
    });
    gsap.to(document.getElementById('video1'), {
      duration: 0.1,
      opacity: 1,
      delay: 2,
    });
    setTimeout(() => {
      const video = document.getElementById('video1') as any;
      if (video) {
        video.muted = true;
        video.play();
      }
    }, 2104);
  }
}
