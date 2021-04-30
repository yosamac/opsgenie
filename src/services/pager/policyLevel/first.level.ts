import { EPAdapter } from "../pager.adapters";
import { PolicyLevel, Level } from './abstract.policy.level';
import { SecondLevel } from './second.level';

export class FirstLevel extends PolicyLevel {

  private escalationPolicy: EPAdapter;

  constructor(epSvc: EPAdapter) {
    super(Level.FIRST);
    this.escalationPolicy = epSvc;
  }
  
  nextLevel() {
    console.log('First policy level');
    this.escalationPolicy.setPolicyLevel(
      new SecondLevel(this.escalationPolicy)
    );
  }

}