import { Component, OnInit, Input, SimpleChanges, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css']
})
export class LifeCycleComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() country: string;
  constructor() { }
  ngOnChanges(simpleChange: SimpleChanges) {
    console.log(simpleChange);
  }
  ngOnInit() {
    this.country = 'India';
    console.log('Ng On Init', this.country);
  }
  ngDoCheck() {
    console.log('Ng Docheck', this.country);
  }
  ngAfterContentInit() {
    console.log('After content Init', this.country);
  }
  ngAfterContentChecked() {
    console.log('After content Checked', this.country);
  }
  ngAfterViewInit() {
    console.log('After view Init', this.country);
  }
  ngAfterViewChecked() {
    console.log('After View Checked', this.country);
  }
  ngOnDestroy() {
    console.log('Destroy', this.country);
  }
}
