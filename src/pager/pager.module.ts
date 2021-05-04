import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagerService } from './pager.service';
import { DaoModule } from '../dao/dao.module';
import { EscalationPolicyModule } from '../adapters/escalation-policy';
import { MailModule } from '../adapters/mail';
import { SmsModule } from '../adapters/sms';
import { TimesModule } from '../adapters/times';
import { ConsoleModule } from '../adapters/console';
import { PagerController } from './pager.controller';
import { PagerEventController } from './pager.event.controller';
import { AlertSubscriber } from './subscribers/alert.subscriber';
import { ConsoleSubscriber } from './subscribers/console.subscriber';
import { TimerSubscriber } from './subscribers/times.subscriber';
import { AlertingModule } from '../adapters/alerting';

@Module({
    imports:[
        ConfigModule,
        DaoModule,
        EscalationPolicyModule,
        MailModule,
        SmsModule,
        TimesModule,
        ConsoleModule,
        AlertingModule
    ],
    controllers: [
        PagerController,
        PagerEventController,
        AlertSubscriber,
        ConsoleSubscriber,
        TimerSubscriber
    ],
    providers: [PagerService]
})
export class PagerModule {}
