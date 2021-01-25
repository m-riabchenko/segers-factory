export const CartItem = ({id, price, total, count, onClickRemoveCartItem, onUpdateCartItem}) => {

    return (
        <>
            <tr key={id}>
                <td className="product-thumbnail"><a href="/#"><img
                    src="../../../resources/images/product/4.png" alt="product img"/></a>
                </td>
                <td className="product-name"><a href="/#">Vestibulum
                    suscipit</a></td>
                <td className="product-price"><span
                    className="amount">£{price}</span></td>
                <td className="product-quantity">
                    <input type="number"
                           value={count}
                           onChange={(e) => onUpdateCartItem(id, e.currentTarget.value)}/>
                </td>
                <td className="product-subtotal">£{total}</td>
                <td className="product-remove"><a onClick={() => onClickRemoveCartItem(id)}
                                                  href="/cart#">X</a></td>
            </tr>
        </>
    )
}