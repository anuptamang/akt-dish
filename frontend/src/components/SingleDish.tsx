import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Products } from '../models/product';
import Button from './Button';

const SingleDish = () => {
  const history = useHistory()
  const params = useParams() as {id:string}
  const products:Products[] = useSelector((state:RootStateOrAny) => state.productList.products)

  const singleProduct = products?.filter(product => product._id === params.id)[0] 

  if(products.length < 1 || !singleProduct) {
    history.push('/')
  }
  
  const {name, image, recipeIngredient, recipeInstructions} = singleProduct
  
  return (
    <>
      <div className="row md:flex space-x-3">
          <div className="col md:w-4/12">
              <div className="dish-info__image block rounded bg-cover bg-center h-60 mb-3" style={{'backgroundImage': `url(${image})`}}></div>              
            <Button>Add To Cart</Button>
          </div>
          <div className="col md:w-4/6">
              <div className="dish-info__text p-3">
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                
                <h3 className="text-md font-bold mb-2">Ingredients:</h3>
                <ol className="list-decimal pl-4 text-sm mb-2">
                  {
                    recipeIngredient.map(ingredient => <li>
                    <strong className="list-ingredients__name">{ingredient.ingredient_name} : </strong>
                    <span className="list-ingredients__quantity">{ingredient.ingredient_quantity} {ingredient.ingredient_unit}</span>
                  </li>)
                  }
                </ol>
                <h3 className="text-md font-bold mb-2">How to cook:</h3>                
                <ol className="list-decimal pl-4 text-sm">
                  {
                    recipeInstructions.map(instruction=> <li className="mb-2">
                      {instruction}
                  </li>)
                  }
                </ol>
              </div>
          </div>
        </div>
    </>
  )
}

export default SingleDish
