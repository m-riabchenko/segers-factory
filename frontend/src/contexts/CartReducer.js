export const CartReducer = (state, action) => {
    switch (action.type) {
        case "SET_CART":
            return {
                items: action.payload.items,
                total: action.payload.total
            }
        case "ADD_ITEM":
            if (!state.items.find(item => item.id === action.payload.cartItem.id)) {
                return {
                    ...state,
                    items: [...state.items, action.payload.cartItem]
                }
            } else {
                let newCart = state.items.filter(item => item.id !== action.payload.cartItem.id)
                return {
                    ...state,
                    items: [...newCart, action.payload.cartItem]
                }
            }
        case "UPDATE_COUNT":
            let newCart = state.items.filter(item => item.id !== action.payload.cartItem.id)
            return {
                ...state,
                items: [...newCart, action.payload.cartItem]
            }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: [...state.items.filter(item => item.id !== action.payload.id)]
            }
        case "CLEAR":
            return {
                items: [],
                total: 0,
            }
        default:
            return state
    }
}