import { call, put, takeEvery } from 'redux-saga/effects';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from './constants/productConstants';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from './constants/userConstants';
import { login } from './services/login';
import { logout } from './services/logout';
import { getProducts } from './services/getProducts';
import { addProduct } from './services/addProduct';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* userLogin(action:any):any {
   try {
      const user = yield call(login, action.payload);
      
      yield put({type: USER_LOGIN_SUCCESS, user});
   } catch (e) {
      //
   }
}

function* userLogout():any {
   try {
      yield call(logout);
      
      yield put({type: USER_LOGOUT_SUCCESS});
   } catch (e) {
      //
   }
}

function* listProduct(action:any):any {
   try {
      const products = yield call(getProducts);
      
      yield put({type: PRODUCT_LIST_SUCCESS, products});
   } catch (e) {
      //
   }
}


function* createProduct(action:any):any {
   try {
      const product = yield call(addProduct, action.payload);
      
      yield put({type: PRODUCT_CREATE_SUCCESS, product});
      yield put({type: PRODUCT_CREATE_RESET})
   } catch (e) {
      yield put({type: PRODUCT_CREATE_FAIL})
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery(USER_LOGIN_REQUEST, userLogin);
  yield takeEvery(USER_LOGOUT_REQUEST, userLogout);
  yield takeEvery(PRODUCT_LIST_REQUEST, listProduct);
  yield takeEvery(PRODUCT_CREATE_REQUEST, createProduct);
}

export default mySaga;