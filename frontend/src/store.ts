import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { productCreateReducer, productListReducer } from './reducers/productReducers'
import { userLoginReducer } from './reducers/userReducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  userLogin: userLoginReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,

})

const userInfoFromLocalStorage = JSON.parse(localStorage?.getItem('userInfo') || 'null')

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
}

// mount it on the Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(mySaga)

export default store
