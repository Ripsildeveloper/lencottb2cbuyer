import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Zoom } from './zoom.model';

@Component({
  selector: 'app-zoommodel',
  templateUrl: './zoommodel.component.html',
  styleUrls: ['./zoommodel.component.css']
})
export class ZoommodelComponent implements OnInit {
  @Input() zoom: Zoom;
  @Output() closeZoom = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closed() {
    this.zoom.clickIndex = false;
    this.closeZoom.emit();
  }
}
