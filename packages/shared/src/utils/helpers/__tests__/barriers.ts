import { expect } from 'chai';
import * as Barriers from '../barriers';

describe('Barriers', () => {
    describe('isBarrierSupported', () => {
        it('should return false when barrier is not in CONTRACT_SHADES', () => {
            expect(Barriers.isBarrierSupported('SomeThinMadeUp')).to.eql(false);
        });
        it('should return true when barrier is in CONTRACT_SHADES', () => {
            expect(Barriers.isBarrierSupported('CALL')).to.eql(true);
        });
    });

    describe('barriersToString', () => {
        it('should convert non-zero barriers which do not have +/- to string consisting of them without +/- while is_relative is false', () => {
            expect(Barriers.barriersToString(false, 10, 15)).to.deep.equal(['10', '15']);
        });
        it('should convert values without +/- and zero to string consisting of them without +/- while is_relative is false', () => {
            expect(Barriers.barriersToString(false, 0, 15)).to.deep.equal(['0', '15']);
        });
        it('should convert barriers which have +/- to string consisting of them without +/- while is_relative is false', () => {
            expect(Barriers.barriersToString(false, +11, 15)).to.deep.equal(['11', '15']);
        });
        it('should convert barriers which have +/- to string consisting of them with +/- while is_relative is true', () => {
            expect(Barriers.barriersToString(true, +11, +15)).to.deep.equal(['+11', '+15']);
        });
    });
});
