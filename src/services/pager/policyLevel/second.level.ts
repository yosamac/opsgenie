import { EPAdapter } from "../pager.adapters";
import { LastLevel } from "./last.level";
import { PolicyLevel, Level } from './abstract.policy.level';

export class SecondLevel extends PolicyLevel {
  
  private escalationPolicy: EPAdapter; 

  constructor(epSvc: EPAdapter) {
    super(Level.SECOND);
    this.escalationPolicy = epSvc;
  }

  nextLevel() {
    console.log('Second Policy Level');
    this.escalationPolicy.setPolicyLevel(
      new LastLevel(this.escalationPolicy)
    );
  }
}