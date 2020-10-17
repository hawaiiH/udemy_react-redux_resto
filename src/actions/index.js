const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    };
};

const menuError = () => {
    return {
        type: 'MENU_ERROR'
    }
}

const addedToCart = (id) => {
    return {
        type: 'ADDED_TO_CART',
        payload: id
    };
};

const removedFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: id
    }
};

const plus = (id) => {
    return {
        type: 'PLUS',
        payload: id
    };
};


export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    removedFromCart,
    plus
}