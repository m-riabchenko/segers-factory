import {useEffect, useState} from "react";

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
                <td className="product-thumbnail"><a href="/#"><img
                    src="../../../resources/images/product/4.png" alt="product img"/></a>
                </td>
                <td className="product-name"><a href="/#">{item.product.name}</a></td>
                <td className="product-price"><span
                    className="amount">£{item.price}</span></td>
                <td className="product-quantity">
                    <input type="number"
                           readOnly={loading}
                           min={1}
                           max={100}
                           onBlur={onHandelBlur}
                           value={countItemsProduct}
                           onChange={e => onHandleChangeCountItem(item.id, e.currentTarget.value)}/>
                </td>
                <td className="product-subtotal">£{item.total}</td>
                <td className="product-remove"><a onClick={() => onClickRemoveCartItem(item.id)}
                                                  href="/cart#">X</a></td>
            </tr>
        </>
    )
}