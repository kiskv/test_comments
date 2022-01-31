import { reverseTail } from '../reverse-tail';

describe('reverseTail', () => {
    it('should return reversed recursive object', () => {
        expect(
            reverseTail({
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
            })
        ).toStrictEqual({
            next: {
                next: {
                    next: {
                        next: null,
                        value: 5,
                    },
                    value: 7,
                },
                value: 12,
            },
            value: 45,
        });
    });
});
