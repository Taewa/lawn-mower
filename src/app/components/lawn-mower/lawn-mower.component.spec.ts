import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawnMowerComponent } from './lawn-mower.component';
import { LawnMowerControl, LawnMowerPosition } from 'src/app/models/lawn-mower';

describe('LawnMowerComponent', () => {
  let component: LawnMowerComponent;
  let fixture: ComponentFixture<LawnMowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawnMowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawnMowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setLawnMowerPosition() should set the position of lawn mower', () => {
    const pos: LawnMowerPosition = [1, 2, 'N'];
    component.setLawnMowerPosition(pos);
    expect(component.position).toEqual([1, 2, 'N']);
  });

  it('getDirection() should return a new direction', () => {
    // Test 1
    const dir1 = component.getDirection('L', 'N');  // Facing north and turn left
    expect(dir1).toEqual('W');                      // Then facing west 
    
    // Test 2
    const dir2 = component.getDirection('R', 'E');  // Facing east and turn right
    expect(dir2).toEqual('S');                      // Then facing south
    
    // Test 3
    const dir3 = component.getDirection('R', 'W');  // Facing west and turn right
    expect(dir3).toEqual('N');                      // Then facing north
  });

  it('goPosition() should set a updated position and validate if the position of machin is out of the field', () => {
    component.field = [5,5];
    component.position = [2, 2, 'N'];
    component.goPosition();
    expect(component.position).toEqual([2, 3, 'N']);
  });

  it('validateOutsideField() should prevent field out of a lawn mower', () => {
    component.field = [3,3];

    // Test 1
    component.setLawnMowerPosition([0, 0, 'N']);
    const instruction1: LawnMowerControl[] = ['F', 'F', 'F', 'F', 'F'];

    component.controlLawnMower(instruction1);
    expect(component.position).toEqual([0, 3, 'N']);

    // Test 2
    component.setLawnMowerPosition([0, 0, 'E']);

    // Trying to go out and turn left and go.
    const instruction2: LawnMowerControl[] = ['F', 'F', 'F', 'F', 'F', 'L', 'F'];

    component.controlLawnMower(instruction2);

    // So, it will stay in the max which is 3 and y will be 1 because it turn to left and went 1 step.
    expect(component.position).toEqual([3, 1, 'N']);

    // Test 3
    // Start even at wrong position.
    // 4 is out of the field. (Field max is 3 in this case)
    component.setLawnMowerPosition([1, 4, 'N']);
    component.validateOutsideField();

    // So, it will be automatically set as max which is 3.
    expect(component.position).toEqual([1, 3, 'N']);
  });

  it('controlLawnMower() should turn and move the lawn mower', () => {
    component.field = [5, 5];

    // Test 1
    component.setLawnMowerPosition([1, 2, 'N']);
    const instruction1: LawnMowerControl[] = ['L', 'F', 'L', 'F', 'L', 'F', 'L', 'F', 'F'];
    component.controlLawnMower(instruction1);

    expect(component.position).toEqual([1, 3, 'N']);

    // Test 2
    component.setLawnMowerPosition([3, 3, 'E']);
    const instruction2: LawnMowerControl[] = ['F', 'F', 'R', 'F', 'F', 'R', 'F', 'R', 'R', 'F'];
    component.controlLawnMower(instruction2);

    expect(component.position).toEqual([5, 1, 'E']);

  });
});
