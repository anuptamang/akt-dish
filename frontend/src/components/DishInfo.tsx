import { FC } from 'react';
import { Products } from '../models/product';
import Button from './Button';
import DishImage from './DishImage';

interface DishInfoProps {
  product: Products
}

const DishInfo:FC<DishInfoProps> = ({product}) => {
  return (
    <>
      <div className="dish-info block bg-red-100 rounded-md overflow-hidden hover:bg-red-300 transition-all">
          <DishImage url={product.image} />
          <div className="dish-info__text p-3">
            <h2 className="text-md font-bold mb-1">{product.name}</h2>                
            <Button variant="Link" to={`/dish/${product._id}`} width="full">View Recipe</Button>
            <Button width="full">Add To Cart</Button>
          </div>
        </div>
    </>
  )
}

export default DishInfo
