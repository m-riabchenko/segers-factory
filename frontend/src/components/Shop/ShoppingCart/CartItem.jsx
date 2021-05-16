import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useAlert} from "react-alert";

export const CartItem = ({
                             item,
                             onClickRemoveCartItem,
                             onUpdateCartItem,
                             loading
                         }) => {
    const [countItemsProduct, setCountItemsProduct] = useState(0)
    const maxQty = 100
    const minQty = 1
    const HOST = "http://127.0.0.1:8000"
    useEffect(() => {
        setCountItemsProduct(item.quantity)
    }, [item.quantity])
    const newAlert = useAlert()
    const onHandleChangeCountItem = (id, value) => {
        console.log(value)
        if (value > maxQty) {
            setCountItemsProduct(maxQty)
            onUpdateCartItem(id, maxQty)
        } else if (value !== "") {
            setCountItemsProduct(value)
            onUpdateCartItem(id, value)
        } else {
            setCountItemsProduct(value)
        }
    }

    const onHandelBlur = e => {
        if (e.currentTarget.value === "") {
            setCountItemsProduct(1)
        }
    }
    console.log(item)
    return (
        <>
            <tr key={item.id}>
                <td className="product-thumbnail">
                    <NavLink to={"/product/" + item.id}>
                        <img src={item.images && HOST + item.images['main-image']}
                             alt="product img"/></NavLink>
                </td>
                <td className="product-name"><NavLink
                    to={"/product/" + item.id}>{item.name}</NavLink></td>
                <td className="product-price">
                  <span className="amount">
                      {item.price} грн.
                </span>
                </td>
                <td className="product-quantity">
                    <input type="number"
                           readOnly={loading}
                           min={minQty}
                           max={maxQty}
                           onBlur={onHandelBlur}
                           value={countItemsProduct}
                           onChange={e => onHandleChangeCountItem(item.id, e.currentTarget.value)}
                           onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.key === 'Enter') && evt.preventDefault()}
                    />
                </td>
                <td className="product-subtotal">{item.itemTotal} грн.</td>
                <td className="product-remove"><a className={"cursor-pointer"}
                                                  onClick={() => {
                                                      onClickRemoveCartItem(item.id)
                                                      newAlert.show('Товар видалено із корзини', {
                                                          type: 'success',
                                                      })
                                                  }}>X</a>
                </td>
            </tr>
        </>
    )
}