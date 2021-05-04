
import { Injectable } from '@nestjs/common';

import { LastLevel } from './last.level';
import { PolicyLevel, Level } from './abstract.policy.level';
import { ServiceLogger } from '../../../logger/logger.service';
import {
  EscalationPolicyService } from '../ep.service';

@Injectable()
export class SecondLevel extends PolicyLevel {

  constructor(
    private epSvc: EscalationPolicyService,
    private readonly logger: ServiceLogger,
  ) {
    super(Level.SECOND);
  }

  nextLevel() {
      this.logger.log('Second Policy Level');
      this.epSvc.setPolicyLevel(
        new LastLevel(this.epSvc, this.logger)
      );
  }

  getTargets() {
      return this.targets;
  }
}