const pow = require('../forTest').pow;

describe('Функция pow', () => {
    if('3^2 должно быть равно 9', () => {
        expect(pow(3, 2)).toBe(9);
    });
});