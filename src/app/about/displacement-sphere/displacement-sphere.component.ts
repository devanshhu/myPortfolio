import { Component, OnInit } from '@angular/core';
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
    const sketch = new Rain();
  }
}
