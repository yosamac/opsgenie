
import { ep } from './constants';

export class MailServiceMock {

    sendEmail(data) {
        console.log(`Sending email ${data}`);
    }
}

export class SmsServiceMock {

    sendSms(data) {
        console.log(`Sending sms to: ${data}`);
    }
}

export class EPServiceMock {

    getEPByMonitoredSvc(data: any): Promise<any> {
        const result = ep.find(item => data == item.svcId);
        if (!result){
            return Promise.reject(new Error('Service not found'));
        }
        return Promise.resolve(result);
    }
}

export class TimesServiceMock {

    setTimes(timeout: number) {
        console.log(`Set timeout: ${timeout}`);
    }
}