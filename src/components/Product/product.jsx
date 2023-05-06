import "./product.css";
import {BackButton} from "../BackButton/backbutton";

export const Product = ({ product }) => {

    return (
        <div className='product'>
            <div className='titleWrapper'>
                <BackButton />
                <span className='productTitle'>{product.name}</span>
                <div>
                    <span>Article</span>
                    <span>Rate</span>
                </div>
            </div>
            <div className='imgWrapper'>
                <img className='img' src={product.pictures} alt={"pic"} />
            </div>
            <div className='desc'>
                <span className='price'>{product.price}&nbsp;p</span>
            </div>
            <div className='desc'>
                <span className='price'>{product.description}</span>
            </div>
        </div>
    )
}