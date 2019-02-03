import { Component, OnInit } from '@angular/core';
import { LawnMowerPosition, LawnMowerControl, Direction } from 'src/app/models/lawn-mower';
import { LawnField } from 'src/app/models/field';
import { LawnMowerService } from 'src/app/services/lawn-mower.service';

@Component({
  selector: 'app-lawn-mower',
  templateUrl: './lawn-mower.component.html',
  styleUrls: ['./lawn-mower.component.scss']
})
export class LawnMowerComponent implements OnInit {

  public field: LawnField;
  public position: LawnMowerPosition;

  constructor(private lawnMowerService: LawnMowerService) {
    // Get field data from the service
    this.field = this.lawnMowerService.getField();
   }

  ngOnInit() {}

  setLawnMowerPosition(position: LawnMowerPosition): void {
    this.position = position;
  }

  // The mower is controlled by sending it a sequence of letters. 
  // Possible letters are « R », « L » and « F ».
  controlLawnMower(control: LawnMowerControl[]): void {
    control.forEach(ctrl => {
      
      switch(ctrl) {
        case 'L': {
          this.position[2] = this.getDirection('L', this.position[2]);
          break;
        }

        case 'R': {
          this.position[2] = this.getDirection('R', this.position[2]);
          break;
        }

        case 'F': {
          this.goPosition();
          break;
        }
      }
    });
  }

  // « R » and « L » make the mower rotate of 90° respectively to the left or to the
  // right, without moving.
  getDirection(dir: 'L' | 'R', currentOrient: Direction): Direction {
    const dirList: Direction[] = ['N', 'E', 'S', 'W'];
    const currentOrientIdx = dirList.indexOf(currentOrient);
    
    if (dir === 'L') {
      let idx = currentOrientIdx - 1;
      return 0 > (idx) ?  dirList[dirList.length - 1] : dirList[idx]; 
    } 
    else if(dir === 'R') {
      let idx = currentOrientIdx + 1;
      return idx >= dirList.length ?  dirList[0] : dirList[idx]; 
    }

  }

  // « F » means that the mower is moving forward on the cell in front of it,
  // without changing its orientation.
  goPosition(): void {
    const currentOrient = this.position[2];

    switch(currentOrient) {
      case 'N': {
        this.position[1] += 1;
        break;
      }

      case 'E': {
        this.position[0] += 1;
        break;
      }

      case 'S': {
        this.position[1] -= 1;
        break;
      }

      case 'W': {
        this.position[0] -= 1;
        break;
      }
    }

    this.validateOutsideField();
  }

  // If the position after the move is outside the lawn, 
  // then the mower do not move, it keeps its orientation and process the next command.
  validateOutsideField():void {
    this.field.forEach((fieldPos, idx) => {
      const curPos = this.position[idx];

      if(curPos > fieldPos) {
        this.position[idx] = fieldPos; 
        // We can notify our users
      } 
      else if(0 > curPos) {
        this.position[idx] = 0;
        // We can notify our users
      } 
    });
  }

}
