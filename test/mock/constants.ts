import { validSvcId, anotherValidPager } from './dao.mock';

export const ep = [
  {
    svcId: validSvcId,
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
            type: 'EMAIl_TARGET',
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
  },
  {
    svcId: 'service-2',
    policyLevels:[
      { level: 1,
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
        notified: false
      },
      { level: 2,
        targets: [ 
          {
            type: 'SMS_TARGET',
            phoneNumber:'910123456'
          },
          {
            type: 'EMAIL_TARGET',
            email:'yosnier@gmail.con'
          },
          {
            type: 'SMS_TARGET',
            phoneNumber:'910098765'
          } 
        ],
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
        notified: false
      }
    ]
  }
];
