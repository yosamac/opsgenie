import { EPService } from "../adapters";
import { PolicyLevel, Level } from './policyLevel';
import { SecondLevel } from './secondLevel';

export class FirstLevel extends PolicyLevel {

  private escalationPolicy: EPService;

  constructor(epSvc: EPService) {
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