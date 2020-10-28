const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0,
    categories: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ADDED_TO_CART':
            const id = action.payload;
            // console.log('iddd', id);
            // const item = state.menu.find(item => item.id === id);
            const itemInd = state.items.findIndex(item => item.id === id)
            if (itemInd >= 0) {
                const itemState =  state.items.find(item => item.id === id);
                const newItem = {
                    ...itemState,
                    qtty: ++itemState.qtty
                };
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                };
            };
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            }
        case 'REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const itemPrice = state.items[itemIndex].price;
            const itemQtty = state.items[itemIndex].qtty;
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - (itemPrice*itemQtty)
            }
        case 'MAKE_CATEGORIES':
            const categor = action.payload;
            const isCategory = state.categories.keys().findIndex(item => item === categor);
            const categorState = state.categories;
            if (isCategory >= 0) {
                const updatedCategorie = ++categorState[categor];
                console.log(updatedCategorie);
                return {
                    ...state,
                    categories:{
                        ...state.categories,
                        updatedCategorie

                    }
                }
            }
            return {
                ...state,
                categories: {
                    ...state.categories,
                    categor: 1
                }
            }
        default:
            return state;
    }
}

export default reducer;