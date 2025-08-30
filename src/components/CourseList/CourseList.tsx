import { Link } from 'react-router-dom';
import type { CourseListProps } from '../../types/TypesProps'
import CourseItem from '../CourseItem/CourseItem';
import "./CourseList.css";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

const CourseList = ({ courseList }: CourseListProps) => {
    const coursesInCart = useSelector((state: RootState) => state.cart.items);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to='/' className="back-link">HOME</Link>
                <div className='cart-div'>
                    <Link to='/cart'><span style={{width: '50px'}}>🛒</span></Link>
                    <div className={coursesInCart.length > 0 ? 'cart-badge' : 'hidden'}>
                        {coursesInCart.length}
                    </div>
                </div>
            </div>
            
            <div className='cards-list'>
                {courseList.map(course => (<CourseItem {...course} />))}
            </div>
        </>
    )

}

export default CourseList