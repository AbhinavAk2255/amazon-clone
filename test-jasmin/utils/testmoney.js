import { currencyfunc } from "../../utils/money.js";

describe('testing case : currencyFunction', function(){
    it('convert ceents in to dollers', function () {
        expect(currencyfunc(2095)).toEqual('20.95');
    });

    it('work with zeros', function (){
        expect(currencyfunc(0)).toEqual('0.00');
    });

    it('rounding with nearest cents', function (){
        expect(currencyfunc(2000.5)).toEqual('20.01');
    });
})