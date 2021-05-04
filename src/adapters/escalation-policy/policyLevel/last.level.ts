import { EscalationPolicyService } from '../ep.service';
import { PolicyLevel, Level } from './abstract.policy.level';
import { FirstLevel } from './first.level';
import { ServiceLogger } from '../../../logger/logger.service';

export class LastLevel extends PolicyLevel {

    constructor(
      private epSvc: EscalationPolicyService,
      private readonly logger: ServiceLogger,
    ) {
      super(Level.LAST);
    }

    nextLevel() {
      this.logger.info('Last Policy Level');
      this.epSvc.setPolicyLevel(
        new FirstLevel(this.epSvc, this.logger)
      );
    }

}