"use strict";

const EventEmitter = require('events').EventEmitter;

const pagerService = new EventEmitter();

const ep = [
  {
    svcId: 'service-1',
    currentState: 'HEALTHY',
    states: {
      healthy: 'HEALTHY',
      unhealthy: 'UNHEALTHY'
    },
    policyLevels:[
      { level: 1, 
        targets: [ 
          {
            type: 'EMAIL_TARGET',
            email:'yosnier@gmail.con'
          },
          {
            type: 'SMS_TARGET',
            phoneNumber:'910123456'
          },
          {
            type: 'SMS_TARGET',
            phoneNumber:'910098765'
          } 
        ],
        get nextLevel() {
          return ep.policyLevels[1]
        },
        notified: false
      },
      { level: 2, 
        targets: [ 
          {
            type: 'EMAIL_TARGET',
            email:'monts@gmail.con'
          },
          {
            type: 'SMS_TARGET',
            phoneNumber:'912345678'
          },
          {
            type: 'EMAIL_TARGET',
            email:'yos@gmail.com'
          }
        ],
        get nextLevel() {
          return ep.policyLevels[2]
        },
        notified: false
      },
      { level: 3, 
        targets: [ 
          {
            type: 'SMS_TARGET',
            phoneNumber:'123456789'
          },
          {
            type: 'EMAIL_TARGET',
            email:'mont@gmail.com'
          },
          {
            type: 'SMS_TARGET',
            phoneNumber:'456789123'
          }
        ],
        get nextLevel() {
          return ep.policyLevels[2]
        },
        notified: false
      },

    ]
  }
  // {
  //   svcId: 'service-2',
  //   states: {
  //     healthy: 'HEALTHY',
  //     unhealthy: 'UNHEALTHY'
  //   },
  //   currentState: 'UNHEALTHY',
  //   policyLevels:[
  //     { level: 1, 
  //       targets: [
  //         {
  //           type: 'EMAIL_TARGET',
  //           email:'monts@gmail.con'
  //         },
  //         {
  //           type: 'SMS_TARGET',
  //           phoneNumber:'912345678'
  //         },
  //         {
  //           type: 'EMAIL_TARGET',
  //           email:'yos@gmail.com'
  //         }
  //       ]
  //     },
  //     { level: 2, 
  //       targets: [ 
  //         {
  //           type: 'SMS_TARGET',
  //           phoneNumber:'910123456'
  //         },
  //         {
  //           type: 'EMAIL_TARGET',
  //           email:'yosnier@gmail.con'
  //         },
  //         {
  //           type: 'SMS_TARGET',
  //           phoneNumber:'910098765'
  //         } 
  //       ]
  //     },
  //     { level: 3, 
  //       targets: [ 
  //         {
  //           type: 'SMS_TARGET',
  //           phoneNumber:'123456789'
  //         },
  //         {
  //           type: 'EMAIl_TARGET',
  //           email:'mont@gmail.com'
  //         },
  //         {
  //           type: 'SMS_TARGET',
  //           phoneNumber:'456789123'
  //         }
  //       ]
  //     }
  //   ]
  // }
];

const pagers = [{
  id: 1,
  services: [
    {
      svcId: 'service-1',
      currentState: 'UNHEALTHY',
      states: {
        healthy: 'HEALTHY',
        unhealthy: 'UNHEALTHY'
      },
    },
    {
      svcId: 'service-2',
      currentState: 'HEALTHY',
      states: {
        healthy: 'HEALTHY',
        unhealthy: 'UNHEALTHY'
      },
    }
  ]
}] 


// function that receive a  and after 2 second write in console.
function alertTimeout(policy, emitter, time, callback,) {

    setTimeout(() => {
        const message = `Launching timeout for Level:${policy.level}`;
        console.log('-'.repeat(message.length));
        console.log(message);
        console.log('-'.repeat(message.length));
        emitter.emit('Acknowledgement_Timeout', { id: 'service-1' })
        callback();
    }, 5000);
}

// Serie async loop
function escalatePolicy(service, fn, emitter, time, callbackServiceHealthy){

    if (service.policyLevels.length === 0 || 
        service.state === 'HEALTHY' ||
        service.ack
    ) {
        callbackServiceHealthy();
        return;
    }

    const policyLevel = service.policyLevels.shift();

    notifyToTargets(policyLevel);

    fn(policyLevel, emitter, time, () => {
      escalatePolicy(service, fn, emitter, time, callbackServiceHealthy);
    });

}

// LISTENER

pagerService.on('ALERT_MESSAGE', (data) => {
  console.log(`Receive Event: ALERT_MESSAGE`);
  handlerAlertMessage(data);
});

pagerService.on('SERVICE_HEALTHY', (data) => {
  console.log(`Receive Event: SERVICE_HEALTHY`);
  handlerServiceHealthy(data);
});

pagerService.on('Acknowledgement', (data) => {
  console.log(`Receive Event: Acknowledgement`);
  handlerAck(data);
});

pagerService.once('Acknowledgement_Timeout', (data) => {
  console.log(`Receive Event: Acknowledgement_Timeout`);
  handlerAckTimeout(data)
});

pagerService.on('Acknowledgement_Timeout', (data) => {
  console.log(`Receive Event: Acknowledgement_Timeout`);
  handlerAckTimeout(data)
});

// ADAPTERS
const mailService = (email) => console.log(`Sending email for ${email}`);
const smsService = (phoneNumber) => console.log(`Sending sms for ${phoneNumber}`);

const notifyToTargets = (policyLevel) =>  {  
  console.log(`Sending notifications  ${policyLevel.level}`);
  
  policyLevel.targets.forEach(item => {
    item.type === 'EMAIL_TARGET'
      ? mailService(item.email)
      : smsService(item.phoneNumber)
  });
  policyLevel.notified = true;
} 

// IMPLEMENT FUNCTIONS
const time = 10000;
const handlerAlertMessage = (data) => {
  const svc = ep.find(item =>  item.svcId === data.id);
  console.log(svc);
  svc.currentState = svc.states['unhealthy'];

  escalatePolicy(svc, alertTimeout, pagerService, time, () => {
    console.log("The end");
  });
}

const handlerServiceHealthy = (data) => {
  const svc = ep.find(item => item.svcId === data.id);
  svc.currentState = svc.states.healthy;
  // process.exit(0);
  escalatePolicy(svc, alertTimeout, pagerService, time, () => {
    console.log("The end");
  });
}

const handlerAckTimeout = (data) => {
  const svc = ep.find(item => item.svcId === data.id);
  svc.currentState = svc.states.unhealthy;
  //process.exit(0)
  escalatePolicy(svc, alertTimeout, pagerService, time, () => {
    console.log("The end");
  });
}

const handlerAck = (data) => {
  const svc = ep.find(item =>  item.svcId === data.id);
  svc.currentState = svc.states.healthy;
  svc.ack = true;

  escalatePolicy(svc, alertTimeout, pagerService, time, () => {
    console.log("The end");
  });
}

// LAUNCH EVENT

pagerService.emit('ALERT_MESSAGE',{ id: 'service-1'});

setTimeout(() => {
  console.log('Launch Acknowledgement');
  pagerService.emit('Acknowledgement', { id: 'service-1' });
}, 4000)

setTimeout(() => {
  console.log('Launch SERVICE_HEALTHY');
  pagerService.emit('SERVICE_HEALTHY', { id: 'service-1' });
}, 2000)


