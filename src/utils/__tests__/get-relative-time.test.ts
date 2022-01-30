import MockDate from 'mockdate';
import { getRelativeTime } from '../get-relative-time';

describe('getRelativeTime', () => {
    const now = 643575616186;
    beforeEach(() => {
        MockDate.set(now);
    });

    afterEach(() => {
        MockDate.reset();
    });

    it('should return "20 лет назад"', () => {
        expect(getRelativeTime(0)).toBe('20 лет назад');
    });

    it('should return "2 минуты назад"', () => {
        expect(getRelativeTime(now - 100000)).toBe('2 минуты назад');
    });

    it('should return "несколько секунд назад"', () => {
        expect(getRelativeTime(now)).toBe('несколько секунд назад');
    });
});
