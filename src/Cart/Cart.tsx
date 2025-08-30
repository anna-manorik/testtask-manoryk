import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { clearCart, removeItem } from '../redux/slice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const coursesInCart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleClearCart = () => dispatch(clearCart());
  const handleDeleteCartItem = (courseId: number) => dispatch(removeItem(courseId));

  return (
    <div className="cart-container">
      <ul>
        {coursesInCart.map(course => (
          <li key={course.id}>
            <span>{course.title} - ${course.price} - Qty: {course.quantity}</span>
            <button onClick={() => {course.id !== undefined && handleDeleteCartItem(course.id)}}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
      <button className="clear-cart-btn" onClick={handleClearCart}>CLEAR ALL</button>
      <Link to='/courses' className="courses-link-cart">Back to courses' list</Link>
    </div>
  );
};

export default Cart;
