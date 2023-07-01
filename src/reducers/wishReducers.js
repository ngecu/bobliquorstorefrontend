import {
    WISH_ADD_ITEM,
    WISH_REMOVE_ITEM,
    WISH_CLEAR_ITEMS,
  } from '../constants/wishContants'
  
  export const wishReducer = (
    state = { wishItems: [] },
    action
  ) => {
    switch (action.type) {
      case WISH_ADD_ITEM:
        const item = action.payload
  
        const existItem = state.wishItems.find((x) => x.product === item.product)
  
        if (existItem) {
          return {
            ...state,
            wishItems: state.wishItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          }
        } else {
          return {
            ...state,
            wishItems: [...state.wishItems, item],
          }
        }
      case WISH_REMOVE_ITEM:
        return {
          ...state,
          wishItems: state.wishItems.filter((x) => x.product !== action.payload),
        }
     
      case WISH_CLEAR_ITEMS:
        return {
          ...state,
          wishItems: [],
        }
      default:
        return state
    }
  }
  