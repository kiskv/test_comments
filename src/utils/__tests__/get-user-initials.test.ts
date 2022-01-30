import { getUserInitials } from '../get-user-initials';

describe('getUserInitials', () => {
    it('should return "ИИ"', () => {
        expect(getUserInitials('Иван Робертс')).toBe('ИР');
    });

    it('should return "ЛМ"', () => {
        expect(getUserInitials('лея Моргана')).toBe('ЛМ');
    });

    it('should return "ГП"', () => {
        expect(getUserInitials('гусинный принц на троне')).toBe('ГП');
    });
});
