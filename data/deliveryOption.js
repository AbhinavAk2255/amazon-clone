import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
    id : '1',
    deliveryDays : 7,
    priceCents : 0
},{
    id : '2',
    deliveryDays : 3,
    priceCents : 499
},{
    id : '3',
    deliveryDays : 1,
    priceCents : 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((prodt) => {
        if (prodt.id === deliveryOptionId) {
            deliveryOption = prodt;
        }
    });
    return deliveryOption;
}
export function calculateDeliveryDate(deliveryOption) {
    let daysRemaining = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
    while (daysRemaining > 0) {
        deliveryDate = deliveryDate.add(1 ,'days');

        if (!isWeekend(deliveryDate)) {
            daysRemaining--;
        }
    }
    const dateString = deliveryDate.format('dddd ,MMMM D');
    return dateString;
   
}

function isWeekend(date) {
    const ischeck = date.format('dddd');
    return ischeck === 'Sunday' || ischeck === 'Saturday';
}