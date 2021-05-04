export const validSvcId = 'service-1';
export const anotherValidSvcId = 'service-2';
export const validPager = {
    svcId: validSvcId,
    state: 'HEALTHY',
    events : [],
    levelNotified : null
};

export const anotherValidPager = {
    svcId: anotherValidSvcId,
    state: 'UNHEALTHY',
    events : [],
    levelNotified : 0
};

export class DaoServiceMock {

    findAll(): Promise<any[]> {
        return Promise.resolve([validPager]);
    }

    findOne(id: string): Promise<any> {
        return id == validSvcId
            ? Promise.resolve(validPager)
            : id == anotherValidPager.svcId
                ? Promise.resolve(anotherValidPager)
                : Promise.resolve(null);
    }

    updateOne(data: any): Promise<any> {
        return data.svcId == validSvcId
            ? Promise.resolve({ ...validPager, ...data })
            : Promise.resolve({ n: 0, nModified: 0 });
    }
}
