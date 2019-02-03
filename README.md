# Lawn Mower

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Install
* `npm install`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Files
There is 1 component and 1 service. And each of them has a test file. (`.spec.ts`)

* lawn-mower.component.ts
* lawn-mower.component.spec.ts
* lawn-mower.service.ts
* lawn-mower.service.spec.ts

### 1. lawn-mower.component.ts
* field: LawnField
    * The coordinates of lawn mower. (ex: [5, 5])

* position: LawnMowerPosition
    * Current position of lawn mower. (ex: [3, 4, 'W'])

* setLawnMowerPosition(position: LawnMowerPosition) => void
    * Update position of lawn mower.

* controlLawnMower(control: LawnMowerControl[]) => void
    * `control` would be either `'L' | 'R' | 'F'`. 
    Depends on the parameter, it updates current position data of lawn mower. if it's `'F'`, it calls `goPosition()`.

* getDirection(dir: 'L' | 'R', currentOrient: Direction) => Direction
    * This method updates the orientation of lawn mower. parameter `dir` is the command that which direction the lawn mower should turn. And `currentOrient` is current orientation lawn mower is facing.

* goPosition() => void
    * This method makes lawn mower move forward. Depends on the direction that lawn mower is facing, the update would be different. If lawn mower is facing north, it will update `y` in `position` property. If facing west, `x` will be updated. In the end it calls `validateOutsideField()` for verification of the position.

* validateOutsideField() => void
    * Check if the `position` propety has gone over compare to `field` propety. If it is greater than `field`, it will be max size of `field`. And if it is smaller than 0, it will be 0.

### 2. lawn-mower.service.ts
* _field: LawnField
    * field data of lawn mower. Lawn mower component can get field data from this service.

* commandList: CommandList[]
    * command list of lawn mower. This is consist of position data (ex: 1,3,'W') and action data (ex: 'F', 'R', 'R', 'F').

* lawnMowers: LawnMowerComponent[]
    * A list of lawn mower component. This will be used to command each lawn mower instances.

* setField(field: LawnField) => void
    * Set field (ex: [4, 3])

* getField() => LawnField
    * Return `_field`.

* exceuteCommand() => void
    * Run command by `commandList`. In the end of action, it will print (`console.log`) the current position of lawn mower.

* interpretCommand(command: string) => void
    * It parses command string parameter to proper format for lawn mower component and service. the first line of `command` parameter will be parsed as `field` data. And each line break will be considered as a new command.

* interpretLawnMowerPosition(pos: string) => LawnMowerPosition
    * This method takes a raw position data and it converts and returns as formatted position data. (ex: `'3 5 W'` to `[3, 5, 'W']`)
    
* interpretAction(action: string) => LawnMowerControl[]
    * This method takes a raw action data and it converts and returns as formatted action data. (ex: `'LLFRF'` to `['L', 'L', 'F', 'R', 'F']`)



