import { create } from 'zustand';

export const useOrdersStore = create((set) => ({
    openOrderDetailsDialog: false,
    selectedOrderDetails: [],

    openOrderDetails: (orderDetails) =>
        set({
            selectedOrderDetails: orderDetails,
            openOrderDetailsDialog: true,
        }),

    closeOrderDetails: () =>
        set({
            openOrderDetailsDialog: false,
        }),
}));
