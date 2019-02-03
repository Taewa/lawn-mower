import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { LawnMowerService } from './lawn-mower.service';
import { LawnMowerComponent } from '../components/lawn-mower/lawn-mower.component';


describe('LawnMowerService', () => {
  const lawnMowers: LawnMowerComponent[] = [];

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      LawnMowerComponent
    ],
  }).compileComponents()
  );

  beforeEach(() => {
    let lawnMowersNum = 2;
    
    for (let i = 0; i < lawnMowersNum; i++) {
      const lawnMowerFixture = TestBed.createComponent(LawnMowerComponent);
      
      lawnMowers.push(lawnMowerFixture.componentInstance);
      lawnMowerFixture.detectChanges();
    }
  });

  it('should be created', () => {
    const service: LawnMowerService = TestBed.get(LawnMowerService);
    expect(service).toBeTruthy();
  });

  it('should create a lawn field', inject([LawnMowerService], (lawnMowerService: LawnMowerService) => {
    lawnMowerService.setField([10, 5]);

    expect(lawnMowerService.getField()).toEqual([10, 5]);
  }));


  it('interpretLawnMowerPosition() should parse the postion of lawn mower', inject([LawnMowerService], (lawnMowerService: LawnMowerService) => {
    const pos = lawnMowerService.interpretLawnMowerPosition('3 5 W');
    expect(pos).toEqual([3, 5, 'W']);
  }));

  it('interpretAction() should parse the control of lawn mower', inject([LawnMowerService], (lawnMowerService: LawnMowerService) => {
    const pos = lawnMowerService.interpretAction('RRFLR');
    expect(pos).toEqual(['R', 'R', 'F', 'L', 'R']);
  }));

  it('interpretCommand() should interpret command', inject([LawnMowerService], (lawnMowerService: LawnMowerService) => {
    const command = '5 5\n1 2 N\nLFLFLFLFF\n3 3 E\nFFRFFRFRRF';
    lawnMowerService.interpretCommand(command);
    expect(lawnMowerService.getField()).toEqual([5, 5]);
    expect(lawnMowerService.commandList).toEqual([
      [[1, 2, 'N'], ['L', 'F', 'L', 'F', 'L', 'F', 'L', 'F', 'F']],
      [[3, 3, 'E'], ['F', 'F', 'R', 'F', 'F', 'R', 'F', 'R', 'R', 'F']],
    ]);
  }));

  it('exceuteCommand() should run lawn mower components', inject([LawnMowerService], (lawnMowerService: LawnMowerService) => {
    lawnMowers.forEach((lawnMower) => {
      lawnMower.field = [5, 5];
    });

    // The first line is the coordinates of the upper-right corner of the lawn. ( 5 5 )
    // TEST
    // This file is given in input:
    // 5 5
    // 1 2 N
    // LFLFLFLFF
    // 3 3 E
    // FFRFFRFRRF
    const command = '5 5\n1 2 N\nLFLFLFLFF\n3 3 E\nFFRFFRFRRF';
    lawnMowerService.interpretCommand(command);
    lawnMowerService.lawnMowers = lawnMowers;
    lawnMowerService.exceuteCommand();

    // This output is expected(final positions of mowers):
    // 1 3 N
    // 5 1 E
    expect(lawnMowerService.lawnMowers[0].position).toEqual([1, 3, 'N']);
    expect(lawnMowerService.lawnMowers[1].position).toEqual([5, 1, 'E']);

  }));
});
