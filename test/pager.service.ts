import { PagerService } from '../src/services/pager/pager.service';

describe('PagerService', () => {
    let pagerService: PagerService;

    beforeAll(async () => {

    });

    describe('#notifies all', () => {
      /**
       * Given a Monitored Service in a Healthy State,
       * when the Pager receives an Alert related to this Monitored Service,
       * then the Monitored Service becomes Unhealthy,
       * the Pager notifies all targets of the first level of the escalation policy,
       * and sets a 15-minutes acknowledgement delay
      */
      
        it('Should notified all targets of next level of the escalation policy', (done) => {

        });

      /** 
       * Given a Monitored Service in an Unhealthy State,
       * the corresponding Alert is not Acknowledged
       * and the last level has not been notified,
       * when the Pager receives the Acknowledgement Timeout,
       * then the Pager notifies all targets of the next level of the escalation policy
       * and sets a 15-minutes acknowledgement delay.
      */

        it('Should be call setTime on Time service', (done) => {

        });

      /**
       * Given a Monitored Service in an Unhealthy State
       * when the Pager receives the Acknowledgement
       * and later receives the Acknowledgement Timeout,
       * then the Pager doesn't notify any Target
       * and doesn't set an acknowledgement delay.
      */
      
      it('Should be call setTime on Time service', (done) => {

      });

        /**
         * Given a Monitored Service in an Unhealthy State,
         * then the Pager doesn’t notify any Target
         * when the Pager receives an Alert related to this Monitored Service,
         * and doesn’t set an acknowledgement delay
         */

        it('Should be call setTime on Time service', (done) => {

        });
        /**
         * Given a Monitored Service in an Unhealthy State,
         * when the Pager receives a Healthy event related to this Monitored Service
         * and later receives the Acknowledgement Timeout,
         * then the Monitored Service becomes Healthy,
         * the Pager doesn’t notify any Target
         * and doesn’t set an acknowledgement delay
         */
    });
});



  