import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalVariableContainer {
  basiqToken: string;

  constructor() {
    this.basiqToken = 'baccc';
  }
}