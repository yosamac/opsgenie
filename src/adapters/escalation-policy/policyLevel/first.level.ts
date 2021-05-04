import { ServiceLogger } from '../../../logger/logger.service';
import { EscalationPolicyService } from '../ep.service';
import { PolicyLevel, Level } from './abstract.policy.level';
import { SecondLevel } from './second.level';

export class FirstLevel extends PolicyLevel {

  constructor(
    private epSvc: EscalationPolicyService,
    private readonly logger: ServiceLogger
  )
  {
    super(Level.FIRST);
  }

  nextLevel() {
      this.logger.info('First policy level');
      this.epSvc.setPolicyLevel(
        new SecondLevel(this.epSvc, this.logger)
      );
  }
}