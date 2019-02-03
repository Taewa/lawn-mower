export type Direction = 'N' | 'E' | 'W' | 'S';
export type LawnMowerPosition = [number, number, Direction];
export type LawnMowerControl = 'L' | 'R' | 'F';
export type CommandList = [LawnMowerPosition, LawnMowerControl[]];