export const deliveryOptions =  [
  {
    deliveryId: "1",
    priceCents: 0,
    deliveryDay: 9
  },
  {
    deliveryId: "2",
    priceCents: 499,
    deliveryDay: 3
  },
  {
    deliveryId: "3",
    priceCents: 999,
    deliveryDay: 1
  }
];


export const getMatchDeliveryOption = (id) => deliveryOptions.filter(deliveryOption => deliveryOption.deliveryId === id);
