import { EPAdapter } from "../pager.adapters";
import { PolicyLevel, Level } from './abstract.policy.level';
import { FirstLevel } from './first.level';

export class LastLevel extends PolicyLevel {
  
  private escalationPolicy: EPAdapter; 

  constructor(epSvc: EPAdapter) {
    super(Level.LAST);
    this.escalationPolicy = epSvc;
  }

  nextLevel() { 
    console.log('Last Policy Level');
    this.escalationPolicy.setPolicyLevel(
      new FirstLevel(this.escalationPolicy)
    );
  }
}