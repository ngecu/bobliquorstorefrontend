import {
    WISH_ADD_ITEM,
    WISH_REMOVE_ITEM,
    WISH_CLEAR_ITEMS,
    USER_WISHES_REQUEST,
    USER_WISHES_SUCCESS,
    USER_WISHES_FAIL,
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
      case USER_WISHES_REQUEST:
        return { loading: true }
      case USER_WISHES_SUCCESS:
        return { loading: false, wishItems: action.payload }
        case USER_WISHES_FAIL:
          return { loading: false, error: action.payload }
    
      default:
        return state
    }
  }
  