import { EPService } from "../adapters";
import { PolicyLevel, Level } from './policyLevel';
import { FirstLevel } from './firstLevel';


export class LastLevel extends PolicyLevel {
  
  private escalationPolicy: EPService; 

  constructor(epSvc: EPService) {
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