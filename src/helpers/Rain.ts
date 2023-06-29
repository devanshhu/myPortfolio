import { ElementRef } from '@angular/core';
import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

export class Rain {
  public elementRef: ElementRef;
  public geometry!: THREE.PlaneGeometry;
  public material!: THREE.MeshNormalMaterial;
  public mesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshNormalMaterial>;
  public time!: number;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public loader!: THREE.TextureLoader;
  cloudParticles: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[] =
    [];
  rain!: any;
  rainGeo: any = [];
  rainCount: number = 1500;
  flash!: THREE.PointLight;
  composer!: EffectComposer;
  mouseX: any = window.innerWidth / 2;
  oldX: any = window.innerWidth / 2;
  mouseY: any = window.innerHeight / 2;
  oldY: any = window.innerHeight / 2;
  constructor(element?: any) {
    this.elementRef = element;
    this.addLoader();
    this.addRenderer();
    // this.addMesh();
    this.time = 0;
    this.addCamera();
    this.addAmbientLight();
    this.addDirectionalLight();
    this.addPointLight();
    this.addRain();
    this.addLightning();
    this.render();
    this.addMouseListener();
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = -1;
    this.camera.rotation.x = 1.2;
    this.camera.rotation.y =
      Math.ceil(Math.random() * 100) % 2 === 0 ? -0.1 : 0.1;
  }

  addMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addAmbientLight() {
    const ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
  }
  addDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    this.scene.add(directionalLight);
  }
  addLoader() {
    this.loader = new THREE.TextureLoader();
    this.loader.load('assets/three/cloud.png', (texture) => {
      const cloudGeo = new THREE.PlaneGeometry(800, 600);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });
      for (let i = 0; i < 16; i++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 1000 - 450,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.set(1.16, -0.12, Math.random() * 360);
        cloud.material.opacity = 0.6;
        cloud.material.depthWrite = false;
        this.cloudParticles.push(cloud);
        this.scene.add(cloud);
      }
    });
  }
  addPointLight() {
    this.flash = new THREE.PointLight(0x064777, 30, 500, 1.7);
    this.flash.position.set(200, 300, 100);
    this.scene.add(this.flash);
  }

  addRain() {
    // this.rainGeo = new THREE.BufferGeometry();
    for (let i = 0; i < this.rainCount; i++) {
      const dropG = new THREE.SphereGeometry(0.8);
      const dropM = new THREE.MeshLambertMaterial({
        color: 0xaaaaaa,
        transparent: true,
        map: this.loader.load('assets/three/cloud.png'),
      });
      const drop = new THREE.Mesh(dropG, dropM);
      drop.position.set(
        Math.random() * 400 - 200,
        Math.random() * 800,
        Math.random() * 400 - 200
      );
      (drop as any).velocity = {};
      (drop as any).velocity = -3;
      this.rainGeo.push(drop);
      this.scene.add(drop);
    }
  }
  render() {
    if (Math.random() > 0.93 || this.flash.power > 100) {
      if (this.flash.power < 100) {
        // For lightning effect
        this.flash.position.set(
          Math.random() * 400,
          300 + Math.random() * 500,
          -200 + Math.random() * 400
        );
      }
      this.flash.power = 50 + Math.random() * 200;
    }
    // For cloud rotation
    this.cloudParticles.forEach((p) => {
      p.rotation.z -= 0.002;
    });
    // For moving droplets
    this.rainGeo.forEach((drop: any) => {
      drop.position.y += drop.velocity;
      if (drop.position.y < -200) {
        drop.position.set(
          Math.random() * 400 - 200,
          Math.random() * 800,
          Math.random() * 400 - 200
        );
      }
    });
    this.composer.render();
    requestAnimationFrame(this.render.bind(this));
  }

  addLightning() {
    const renderScene = new RenderPass(this.scene, this.camera);
    const pointLight = new THREE.PointLight(0xffffff, 0, 500, 1.7);
    this.camera.add(pointLight);
    const unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1,
      1,
      1
    );
    this.composer = new EffectComposer(this.renderer);
    const vShader = document.getElementById('vertexshader') || undefined;
    const fShader = document.getElementById('fragmentshader') || undefined;
    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.composer.renderTarget2.texture },
        },
        vertexShader: vShader?.textContent || '',
        fragmentShader: fShader?.textContent || '',
        defines: {},
      }),
      'baseTexture'
    );
    mixPass.needsSwap = true;
    this.composer.addPass(mixPass);
    this.composer.addPass(renderScene);
    this.composer.addPass(unrealBloomPass);
  }

  addMouseListener() {
    window.addEventListener('mousemove', (e) => {
      let changeX = e.clientX - this.oldX,
        changeY = e.clientY - this.oldY;
      this.camera.rotation.y += -changeX / 10000;
      this.camera.rotation.x += -changeY / 10000;
      this.oldX = e.clientX;
      this.oldY = e.clientY;
    });
  }
}
