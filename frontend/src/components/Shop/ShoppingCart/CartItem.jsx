import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import productImage from "../../../resources/images/product/4.png"

export const CartItem = ({
                             item,
                             onClickRemoveCartItem,
                             onUpdateCartItem,
                             loading
                         }) => {
    const [countItemsProduct, setCountItemsProduct] = useState(0)

    useEffect(() => {
        setCountItemsProduct(item.count)
    }, [item.count])

    const onHandleChangeCountItem = (id, value) => {
        if (value > 100) {
            setCountItemsProduct(100)
            onUpdateCartItem(id, value)
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

    return (
        <>
            <tr key={item.id}>
                <td className="product-thumbnail"><NavLink to={"/product/" + item.product.id}><img
                    src={productImage} alt="product img"/></NavLink>
                </td>
                <td className="product-name"><NavLink
                    to={"/product/" + item.product.id}>{item.product.name}</NavLink></td>
                <td className="product-price"><span
                    className="amount">£{item.price}</span></td>
                <td className="product-quantity">
                    <input type="number"
                           readOnly={loading}
                           min={1}
                           max={100}
                           onBlur={onHandelBlur}
                           value={countItemsProduct}
                           onChange={e => onHandleChangeCountItem(item.id, e.currentTarget.value)}
                           onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.keyCode === 13) && evt.preventDefault()}
                    />
                </td>
                <td className="product-subtotal">£{item.total}</td>
                <td className="product-remove"><a className={"cursor-pointer"}
                    onClick={() => onClickRemoveCartItem(item.id)}>X</a></td>
            </tr>
        </>
    )
}