import { EPService } from "../adapters";
import { LastLevel } from "./LastLevel";
import { PolicyLevel, Level } from './policyLevel';

export class SecondLevel extends PolicyLevel {
  
  private escalationPolicy: EPService; 

  constructor(epSvc: EPService) {
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