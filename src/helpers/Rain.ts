import { ElementRef } from '@angular/core';
import * as THREE from 'three';

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
  constructor(element?: any) {
    this.elementRef = element;
    this.addLoader();
    this.addRenderer();
    this.addMesh();
    this.time = 0;
    this.addCamera();
    this.addAmbientLight();
    this.addDirectionalLight();
    this.addPointLight();
    this.addRain();
    this.render();
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
    this.camera.rotation.y = -0.2;
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
      const cloudMaterial = new THREE.MeshPhongMaterial({
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
      (drop as any).velocity = 0;
      this.rainGeo.push(drop);
      this.scene.add(drop);
    }
  }
  render() {
    if (Math.random() > 0.93 || this.flash.power > 100) {
      if (this.flash.power < 100) {
        this.flash.position.set(
          Math.random() * 400,
          300 + Math.random() * 500,
          -200 + Math.random() * 400
        );
      }
      this.flash.power = 50 + Math.random() * 200;
    }
    this.cloudParticles.forEach((p) => {
      p.rotation.z -= 0.002;
    });
    this.rainGeo.forEach((drop: any) => {
      drop.velocity -= 1 * Math.random() * 0.1;
      drop.position.y += drop.velocity;
      if (drop.position.y < -200) {
        drop.position.set(
          Math.random() * 400 - 200,
          Math.random() * 800,
          Math.random() * 400 - 200
        );

        drop.velocity = 0;
      }
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
