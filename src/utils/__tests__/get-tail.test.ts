import { getTail } from '../get-tail';

describe('getTail', () => {
    it('should return recursive object', () => {
        expect(getTail(5, getTail(7, getTail(12, getTail(45))))).toStrictEqual({
            next: {
                next: {
                    next: {
                        next: null,
                        value: 45,
                    },
                    value: 12,
                },
                value: 7,
            },
            value: 5,
        });
    });
});
