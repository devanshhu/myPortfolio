import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { WebGLRenderer, Scene } from 'three';
// import * as dat from 'dat.gui';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  renderer!: WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  starGeo!: THREE.BufferGeometry;
  // dat = new dat.GUI();
  sphere!: THREE.Points<THREE.SphereGeometry, THREE.PointsMaterial>;
  loader!: THREE.TextureLoader;
  particlesMesh!: THREE.Points<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.PointsMaterial
  >;
  ngOnInit(): void {
    // this.initializeScene();
    // this.addTorusGeometry();
    // this.addParticles();
    // this.addPointLight();
    // this.render();
    // console.log(dat);
  }

  initializeScene() {
    this.renderer = new WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.loader = new THREE.TextureLoader();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene = new Scene();
    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(0, 0, 2);
  }
  render() {
    let component = this;
    (function render() {
      requestAnimationFrame(render);
      component.animate();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  addTorusGeometry() {
    const torus = new THREE.SphereGeometry(1.4, 100, 100, 100);
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.005,
      // map: this.loader.load('assets/three/disc.png'),
    });
    this.sphere = new THREE.Points(torus, material);
    this.scene.add(this.sphere);
  }
  addPointLight() {
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(2, 3, 4);
    // this.scene.add(pointLight);
  }
  animate() {
    this.sphere.rotation.y += 0.01;
    this.particlesMesh.rotation.y -= 0.01;
  }
  addParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.005,
      map: this.loader.load('assets/three/disc.png'),
    });
    this.particlesMesh = new THREE.Points(particlesGeometry, material);

    this.scene.add(this.particlesMesh);
  }
}
