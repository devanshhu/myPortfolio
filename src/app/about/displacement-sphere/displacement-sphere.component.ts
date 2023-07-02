import { Component, OnInit } from '@angular/core';
import { ParticlesFlower } from 'src/helpers/ParticleFlower/ParticleFlower';
import { Rain } from 'src/helpers/Rain';
import * as THREE from 'three';

@Component({
  selector: 'app-displacement-sphere',
  templateUrl: './displacement-sphere.component.html',
  styleUrls: ['./displacement-sphere.component.scss'],
})
export class DisplacementSphereComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const rain = new Rain();
    new ParticlesFlower();
  }
}
