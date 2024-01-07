import { addToCart,cart,loadFromStorage} from "../../data/cart.js";

describe('Test case : addTocart fun', function (){
    it('add an existing product to the cart', function() {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(function () {
            return JSON.stringify([{

                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : '1'
            }]);
            
        });
        
        loadFromStorage();
        console.log(cart);
        console.log(cart.length);

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(valueSelection)
    });

    it('add a new product to the cart', function() {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(function () {
            return JSON.stringify([]);
            
        });
        loadFromStorage();
        

        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(valueSelection)
        
    });
});