import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {removedFromCart, plus} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, removedFromCart, RestoService, plus}) => {
    if (items.length === 0) {
        return (
            <div className="cart__title">Ваш корзина пуста :(</div>
        )
    }

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ | x{item.qtty}</div>
                                <div onClick={() => removedFromCart(id)} className="cart__close">&times;</div>
                                <button onClick={() => plus(id)}>+</button>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => {
                console.log(items)
                RestoService.setOrder(generateOrder(items));
                cleanCart(items, removedFromCart);
            }}
                className="cart__btn">Purchase</button>
        </>
    );
};

const cleanCart = (items, func) => {
    items.map(item => func(item.id));
}


const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    removedFromCart,
    plus
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));