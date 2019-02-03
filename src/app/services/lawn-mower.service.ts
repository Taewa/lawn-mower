import { Injectable } from '@angular/core';
import { LawnField } from '../models/field';
import { LawnMowerPosition, LawnMowerControl, CommandList } from '../models/lawn-mower';
import { LawnMowerComponent } from '../components/lawn-mower/lawn-mower.component';

@Injectable({
  providedIn: 'root'
})
export class LawnMowerService {
  private _field: LawnField;
  public commandList: CommandList[];
  public lawnMowers: LawnMowerComponent[];
  

  constructor() { }

  setField(field: LawnField): void {
    this._field = field;
  }

  getField(): LawnField {
    return this._field;
  }

  exceuteCommand(): void {
    this.commandList.forEach((cmd, idx) => {
      const lawnMower = this.lawnMowers[idx];

      cmd.forEach((c, idx) => {
        if(idx === 0) {       // idx === 0 means that this is the position data
          const pos = cmd[idx] as LawnMowerPosition;
          lawnMower.setLawnMowerPosition(pos);
        }
        else if(idx === 1) {  // idx === 1 means that this is the control data
          const ctrl = cmd[idx] as LawnMowerControl[];
          lawnMower.controlLawnMower(ctrl);

          const lawnMowerPos = lawnMower.position;
          
          // Each mower moves sequentially,
          // it means that the second mower moves only after the first
          // one execute all its instructions.
          // When the mower has executed all its instructions, 
          // it outputs its position and orientation.
          console.log(lawnMowerPos);
        }
      });
    });
  }

  interpretCommand(command: string): void {
    const cmdArray = command.split('\n'); // Devide by line break.
    const field = cmdArray[0].split(' ').filter((n, idx) => 2 > idx).map(n => +n);

    this.setField([field[0], field[1]]);

    cmdArray.shift(); // Remove first line. (which is field data)

    const cmdList = {
      pos: [] as LawnMowerPosition[],
      cmd: [] as LawnMowerControl[][]
    };

    cmdArray.forEach((cmd, idx) => {
      if(idx % 2 === 0) { 
        // Even number is position data.
        // First line give the initial position and orientation of the mower. 
        // Position and orientation are given by 2 numbers and a letter, separated by a space
        cmdList.pos.push(this.interpretLawnMowerPosition(cmd));
      } else {            
        // Uneven number is action data.
        // Second line is a sequence of instruction driving the mower across the lawn. 
        // Instructions are a sequence of letters without space.
        cmdList.cmd.push(this.interpretAction(cmd));
      }
    });

    this.commandList = cmdList.pos.map((pos, idx: number) => {
      return [pos, cmdList.cmd[idx]] as CommandList;
    });

  }

  interpretLawnMowerPosition(pos: string): LawnMowerPosition {
    const posArray = pos.split(' ').map((p, idx) => {
      return idx === 2? (p as string) : (+p as number);
    });

    return posArray as LawnMowerPosition;
  }

  interpretAction(action: string): LawnMowerControl[] {
    return action.split('') as LawnMowerControl[];
  }
}
