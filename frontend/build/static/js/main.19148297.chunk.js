(this["webpackJsonpdishes-recipe"]=this["webpackJsonpdishes-recipe"]||[]).push([[0],{48:function(e,t,c){},55:function(e,t,c){},75:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),a=c(26),s=c.n(a),i=(c(48),c(8)),o=c(0),l=function(){return Object(o.jsx)("footer",{className:"fixed bottom-0 left-0 right-0 z-20 py-4 bg-red-300 text-center dark:bg-gray-900 dark:text-white",children:Object(o.jsx)("div",{className:"container mx-auto px-4",children:"\xa9 DishRecipe"})})},d=c(10),u=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{className:"logo text-2xl font-extrabold",children:Object(o.jsx)(d.b,{to:"/",className:"text-black dark:text-white block p-2 text-center md:text-left",children:"DishRecipe"})})})},j=c(17),b=c(5),m="USER_LOGIN_REQUEST",x="USER_LOGIN_SUCCESS",p="USER_LOGIN_FAIL",h="USER_LOGOUT_REQUEST",O="USER_LOGOUT_SUCCESS",f=function(){var e=Object(i.e)(),t=Object(b.b)(),c=Object(b.c)((function(e){return e.userLogin})),r=Object(b.c)((function(e){return e.cart.cartItems})),a=c.userInfo,s=Object(n.useState)("light"),l=Object(j.a)(s,2),u=l[0],m=l[1];return Object(n.useEffect)((function(){"dark"===u?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}),[u]),Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("nav",{className:"nav pb-3",children:Object(o.jsx)("div",{className:"nav__drop",children:Object(o.jsxs)("ul",{className:"list-none flex",children:[Object(o.jsx)("li",{className:"px-1",children:Object(o.jsx)(d.b,{className:"block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",to:"/",children:"Home"})}),!a&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("li",{className:"px-1",children:Object(o.jsx)(d.b,{className:"block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",to:"/login",children:"Login"})}),Object(o.jsx)("li",{children:Object(o.jsx)(d.b,{className:"block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",to:"/signup",children:"Signup"})})]}),a&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("li",{className:"px-1",children:Object(o.jsx)("button",{onClick:function(c){c.preventDefault(),t({type:h}),localStorage.removeItem("cartItems"),e.push("/")},className:"block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",children:"Logout"})}),Object(o.jsx)("li",{className:"px-1",children:Object(o.jsxs)(d.b,{to:"/cart",className:"block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",children:["Cart(",r.length,")"]})})]}),Object(o.jsx)("li",{className:"px-1",children:Object(o.jsx)("button",{className:"dark-mode-toggle block p-2 text-black bg-red-200 dark:bg-gray-600 dark:text-white hover:opacity-60 md:mx-1 rounded",onClick:function(){m((function(e){return"dark"===e?"light":"dark"}))},children:"dark"===u?Object(o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"currentColor",className:"w-6 h-6",children:Object(o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"})}):Object(o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"currentColor",className:"w-6 h-6 text-gray-800 dark:text-gray-200",children:Object(o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"})})})})]})})})})},g=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("header",{className:"header fixed left-0 right-0 top-0 z-50 bg-red-300 dark:bg-gray-900",children:Object(o.jsxs)("div",{className:"px-4 md:py-3 mx-auto md:flex md:justify-between md:items-center",children:[Object(o.jsx)(u,{}),Object(o.jsx)(f,{})]})})})},v="inline-flex items-center justify-center w-32 p-2 h-14 bg-red-200 dark:text-white dark:bg-gray-600 hover:opacity-60 text-black rounded text-center mb-2",k=function(e){return Object(o.jsx)(o.Fragment,{children:"Link"===e.variant?Object(o.jsx)(d.b,{to:e.to,className:"".concat(v," ").concat("full"===e.width&&"w-full"," ").concat("lg"===e.size&&"text-lg w-40"," ").concat(e.disabled&&"pointer-events-none opacity-50"),children:e.children}):"submit"===e.variant?Object(o.jsx)("button",{type:"submit",className:"".concat(v," ").concat("full"===e.width&&"w-full"," ").concat("lg"===e.size&&"text-lg w-40"," ").concat(e.disabled&&"pointer-events-none opacity-50"),children:e.children}):Object(o.jsx)("button",{className:"".concat(v," ").concat("full"===e.width&&"w-full"," ").concat("lg"===e.size&&"text-lg w-40"," ").concat(e.disabled&&"pointer-events-none opacity-50"),onClick:e.onClick?e.onClick:{},children:e.children})})},y="CART_ADD_ITEM",w="CART_ADD_ITEM_SUCCESS",N="CART_REMOVE_ITEM",_="CART_RESET",I=function(e){var t=e.product,c=Object(b.b)();return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{className:"row md:flex space-x-3",children:[Object(o.jsx)("div",{className:"col md:w-4/12",children:Object(o.jsx)("div",{className:"dish-info__image block rounded bg-cover bg-center h-60 mb-3",style:{backgroundImage:"url(".concat(t.image,")")}})}),Object(o.jsx)("div",{className:"col md:w-4/6",children:Object(o.jsxs)("div",{className:"dish-info__text p-3",children:[Object(o.jsx)("h2",{className:"text-2xl font-bold mb-2",children:t.name}),Object(o.jsx)(k,{onClick:function(){c({type:N,id:t._id})},children:"Remove"})]})})]})})},C=function(e){return Object(o.jsx)("div",{className:"container px-4 mx-auto py-12",children:e.children})},S=function(){var e=Object(b.c)((function(e){return e.cart.cartItems}));return Object(o.jsxs)(C,{children:[Object(o.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"Cart"}),e.map((function(e,t){return Object(o.jsx)(I,{product:e},t)}))]})},E=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(S,{})})},L=c(14),R=function(e){var t=e.url;return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{className:"dish-info__image back bg-cover bg-center h-60",style:{backgroundImage:"url(".concat(t,")")}})})},T=function(e){var t=e.product,c=Object(b.b)(),n=Object(b.c)((function(e){return e.userLogin})),r=Object(b.c)((function(e){return e.cart.cartItems})).some((function(e){return e._id===t._id})),a=n.userInfo;return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"dish-info block bg-red-100 dark:bg-white rounded-md overflow-hidden hover:bg-red-300 transition-all w-full",children:[Object(o.jsx)(R,{url:t.image}),Object(o.jsxs)("div",{className:"dish-info__text p-3",children:[Object(o.jsx)("h2",{className:"text-md font-bold mb-1",children:t.name}),Object(o.jsx)(k,{variant:"Link",to:"/dish/".concat(t._id),width:"full",children:"View Recipe"}),a&&Object(o.jsx)(k,{disabled:r,onClick:function(){c({type:y,product:t})},width:"full",children:r?"Added":"Add To Cart"})]})]})})},F=function(e){var t=e.ingType,c=e.onFilter,r=Object(n.useState)(""),a=Object(j.a)(r,2),s=a[0],i=a[1];return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("li",{className:"mb-2 pr-3 capitalize",children:Object(o.jsxs)("label",{htmlFor:"filterRecipe-".concat(t),children:[Object(o.jsx)("input",{onChange:function(e){c(e.target.value,s!==e.target.value),i((function(t){return t?"":e.target.value}))},type:"checkbox",value:t,checked:s===t,name:"ingType",id:"filterRecipe-".concat(t)})," ",t]})})})},U=(c(55),function(){return Object(o.jsx)("div",{className:"loader"})}),D=function(e){var t=e.handleFilterCheck,c=Object(b.c)((function(e){return e.productList.products})).map((function(e){return e.recipeIngredient.filter((function(e){return e})).map((function(e){return e.ingredient_name}))})),n=Object(b.c)((function(e){return e.productList})).loading,r=c.reduce((function(e,t){return t.map((function(t){return e.includes(t.toLocaleLowerCase())||e.push(t.toLocaleLowerCase()),e})),e}),[]);return Object(o.jsxs)("div",{className:"dish-user-panel md:flex md:justify-between mb-5",children:[Object(o.jsxs)("div",{className:"form filter-form md:w-2/3 mb-3",children:[Object(o.jsx)("h2",{className:"flex items-center text-2xl w-full h-14 bg-red-200 dark:bg-gray-900 dark:text-white px-4 py-1 rounded",children:"Filter Dish Recipes"}),Object(o.jsx)("div",{className:"filter-drop p-3 bg-red-100 dark:bg-white rounded",children:n?Object(o.jsx)(U,{}):Object(o.jsx)("ul",{className:"list-none flex flex-wrap",children:r.map((function(e){return Object(o.jsx)(F,{onFilter:t,ingType:e},e)}))})})]}),Object(o.jsx)(k,{variant:"Link",size:"lg",to:"/add",children:"Add Dish Recipe"})]})},A="PRODUCT_LIST_REQUEST",M="PRODUCT_LIST_SUCCESS",z="PRODUCT_LIST_FAIL",P="PRODUCT_CREATE_REQUEST",q="PRODUCT_CREATE_SUCCESS",J="PRODUCT_CREATE_FAIL",G="PRODUCT_CREATE_RESET",B=function(){var e=Object(b.b)(),t=Object(b.c)((function(e){return e.productList})).loading,c=Object(b.c)((function(e){return e.productList.products})),r=Object(n.useState)([]),a=Object(j.a)(r,2),s=a[0],i=a[1],l=Object(n.useState)([]),d=Object(j.a)(l,2),u=d[0],m=d[1];return Object(n.useEffect)((function(){c&&m(c)}),[c]),Object(n.useEffect)((function(){if(0!==s.length){var e=Object(L.a)(c).reduce((function(e,t){return t.recipeIngredient.some((function(e){return!!s.some((function(t){return t.toLowerCase()===e.ingredient_name.toLowerCase()}))}))&&e.push(t),e}),[]);m(e)}else m(c)}),[s]),Object(n.useEffect)((function(){e({type:A})}),[]),Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)(C,{children:[Object(o.jsx)(D,{handleFilterCheck:function(e,t){if(t)i([].concat(Object(L.a)(s),[e]));else{var c=Object(L.a)(s).filter((function(t){return t!==e}));i(c)}}}),t?Object(o.jsx)(U,{}):Object(o.jsx)("div",{className:"row md:flex md:flex-wrap md:-m-3",children:null===u||void 0===u?void 0:u.map((function(e){return Object(o.jsx)("div",{className:"col md:w-1/2 lg:w-3/12 p-3 flex",children:Object(o.jsx)(T,{product:e})},e._id)}))})]})})},Q=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(B,{})})},W=function(){var e=Object(i.e)(),t=Object(b.b)(),c=Object(b.c)((function(e){return e.userLogin})),r=c.loading,a=c.userInfo;Object(n.useEffect)((function(){a&&e.push("/")}),[e,a]);return Object(o.jsxs)(C,{children:[Object(o.jsx)("h2",{className:"font-bold text-2xl mb-4",children:"Login"}),Object(o.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({type:m,payload:"Guest"})},children:[r&&Object(o.jsx)(U,{}),Object(o.jsx)(k,{variant:"submit",children:"Login"})]})]})},H=function(){return Object(o.jsx)(C,{children:Object(o.jsx)(W,{})})},V=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(H,{})})},K=function(){return Object(o.jsx)("div",{children:"Signup"})},X=function(){return Object(o.jsx)(C,{children:Object(o.jsx)(K,{})})},Y=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(X,{})})},Z=function(){var e=Object(i.e)(),t=Object(i.f)(),c=Object(b.c)((function(e){return e.productList.products})),n=null===c||void 0===c?void 0:c.filter((function(e){return e._id===t.id}))[0];return(c.length<1||!n)&&e.push("/"),Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"row md:flex space-x-3",children:[Object(o.jsx)("div",{className:"col md:w-4/12",children:Object(o.jsx)("div",{className:"dish-info__image block rounded bg-cover bg-center h-60 mb-3",style:{backgroundImage:"url(".concat(null===n||void 0===n?void 0:n.image,")")}})}),Object(o.jsx)("div",{className:"col md:w-4/6",children:Object(o.jsxs)("div",{className:"dish-info__text p-3",children:[Object(o.jsx)("h2",{className:"text-2xl font-bold mb-2",children:null===n||void 0===n?void 0:n.name}),Object(o.jsx)("h3",{className:"text-md font-bold mb-2",children:"Ingredients:"}),Object(o.jsx)("ol",{className:"list-decimal pl-4 text-sm mb-2",children:null===n||void 0===n?void 0:n.recipeIngredient.map((function(e){return Object(o.jsxs)("li",{children:[Object(o.jsxs)("strong",{className:"list-ingredients__name",children:[e.ingredient_name," : "]}),Object(o.jsxs)("span",{className:"list-ingredients__quantity",children:[e.ingredient_quantity," ",e.ingredient_unit]})]})}))}),Object(o.jsx)("h3",{className:"text-md font-bold mb-2",children:"How to cook:"}),Object(o.jsx)("ol",{className:"list-decimal pl-4 text-sm",children:null===n||void 0===n?void 0:n.recipeInstructions.map((function(e){return Object(o.jsx)("li",{className:"mb-2",children:e})}))})]})})]})})},$=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(C,{children:Object(o.jsx)(Z,{})})})},ee=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)($,{})})},te=function(){var e=Object(i.e)(),t=Object(b.b)(),c=Object(b.c)((function(e){return e.productCreate})),r=c.loading,a=c.success,s=Object(n.useState)(""),l=Object(j.a)(s,2),d=l[0],u=l[1],m=Object(n.useState)(""),x=Object(j.a)(m,2),p=x[0],h=x[1],O=Object(n.useState)([{ingredient_name:"",ingredient_quantity:"",ingredient_unit:""}]),f=Object(j.a)(O,2),g=f[0],v=f[1],y=Object(n.useState)(""),w=Object(j.a)(y,2),N=w[0],_=w[1],I=function(e,t){var c=Object(L.a)(g),n=t.target.name;Object.keys(c[e]).forEach((function(r){r===n&&(c[e][r]=t.target.value)})),v(c)};return Object(n.useEffect)((function(){a&&(e.push("/"),u(""),h(""),v([{ingredient_name:"",ingredient_quantity:"",ingredient_unit:""}]),_(""),t({type:G}))}),[a,e,t]),Object(o.jsxs)(C,{children:[r&&Object(o.jsx)(U,{}),Object(o.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c={name:d,image:p,recipeIngredient:g,recipeInstructions:N.split("\n")};t({type:P,payload:c})},children:[Object(o.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"Add New Dish"}),Object(o.jsx)("div",{className:"form-group mb-4",children:Object(o.jsx)("input",{className:"block w-full h-14 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",type:"text",placeholder:"Dish Name",value:d,onChange:function(e){return u(e.target.value)}})}),Object(o.jsxs)("div",{className:"form-group mb-1",children:[g.map((function(e,t){return Object(o.jsxs)("div",{className:"row md:flex md:-mx-3 items-center mb-3",children:[Object(o.jsx)("div",{className:"col md:w-1/4 md:px-3",children:Object(o.jsx)("input",{className:"block w-full h-14 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",type:"text",placeholder:"Ingredient name",name:"ingredient_name",value:e.ingredient_name,onChange:function(e){return I(t,e)}})}),Object(o.jsx)("div",{className:"col md:w-1/4 md:px-3",children:Object(o.jsx)("input",{className:"block w-full h-14 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",type:"text",placeholder:"Ingredient quantity",name:"ingredient_quantity",value:e.ingredient_quantity,onChange:function(e){return I(t,e)}})}),Object(o.jsx)("div",{className:"col md:w-1/4 md:px-3",children:Object(o.jsx)("input",{className:"block w-full h-14 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",type:"text",placeholder:"Ingredient Unit",name:"ingredient_unit",value:e.ingredient_unit,onChange:function(e){return I(t,e)}})}),t?Object(o.jsx)("div",{className:"col md:w-1/4 md:px-3",children:Object(o.jsx)("div",{className:"text-left",children:Object(o.jsx)("button",{className:"inline-block p-3 text-red-400 hover:opacity-70",onClick:function(){return function(e){var t=Object(L.a)(g);t.splice(e,1),v(t)}(t)},children:"Remove"})})}):null]},t)})),Object(o.jsx)("div",{className:"row flex",children:Object(o.jsx)("div",{className:"col md:w-3/4",children:Object(o.jsx)("div",{className:"text-right",children:Object(o.jsx)("button",{className:"inline-block p-3 text-red-400 hover:opacity-70",onClick:function(){v([].concat(Object(L.a)(g),[{ingredient_name:"",ingredient_quantity:"",ingredient_unit:""}]))},children:"Add More"})})})})]}),Object(o.jsxs)("div",{className:"form-group mb-3",children:[Object(o.jsx)("h2",{className:"text-lg font-bold mb-2",children:"Cooking Steps:"}),Object(o.jsx)("div",{className:"input mb-3",children:Object(o.jsx)("textarea",{className:"block w-full h-60 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",placeholder:"Write cooking steps",value:N,onChange:function(e){return _(e.target.value)}})})]}),Object(o.jsxs)("div",{className:"form-group mb-4",children:[Object(o.jsx)("h2",{className:"text-lg font-bold mb-2",children:"Upload Dish Image (URL):"}),Object(o.jsx)("input",{className:"block w-full h-14 bg-red-200 placeholder-gray-500 px-4 py-1 rounded",type:"text",placeholder:"Image URL",onChange:function(e){return h(e.target.value)}})]}),Object(o.jsx)(k,{variant:"submit",disabled:!d||!p||!N,children:"Submit"})]})]})},ce=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(te,{})})};var ne=function(){return Object(o.jsxs)("div",{className:"App text-black bg-gray-100 dark:bg-gray-800 min-h-screen pt-28 md:pt-15 pb-40",children:[Object(o.jsx)(g,{}),Object(o.jsxs)("main",{children:[Object(o.jsx)(i.a,{path:"/dish/:id",component:ee,exact:!0}),Object(o.jsx)(i.a,{path:"/login",component:V,exact:!0}),Object(o.jsx)(i.a,{path:"/signup",component:Y,exact:!0}),Object(o.jsx)(i.a,{path:"/cart",component:E,exact:!0}),Object(o.jsx)(i.a,{path:"/add",component:ce,exact:!0}),Object(o.jsx)(i.a,{path:"/",component:Q,exact:!0})]}),Object(o.jsx)(l,{})]})},re=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,76)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),n(e),r(e),a(e),s(e)}))},ae=c(25),se=c(42),ie=c(43),oe=c(7),le=c.n(oe),de=c(9),ue=c(21),je=c(22),be=c.n(je),me=function(){var e=Object(ue.a)(le.a.mark((function e(t){var c,n;return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,be.a.post("/api/products",t);case 2:return c=e.sent,n=c.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),xe=function(){var e=Object(ue.a)(le.a.mark((function e(){var t,c;return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,be.a.get("/api/products");case 2:return t=e.sent,c=t.data,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),pe=function(){var e=Object(ue.a)(le.a.mark((function e(t){var c,n,r;return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={headers:{"Content-Type":"application/json"}},e.next=3,be.a.post("/api/users/login",{name:t},c);case 3:return n=e.sent,r=n.data,localStorage.setItem("userInfo",JSON.stringify(r)),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),he=function(){localStorage.removeItem("userInfo")},Oe=le.a.mark(we),fe=le.a.mark(Ne),ge=le.a.mark(_e),ve=le.a.mark(Ie),ke=le.a.mark(Ce),ye=le.a.mark(Se);function we(e){var t;return le.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,Object(de.a)(pe,e.payload);case 3:return t=c.sent,c.next=6,Object(de.b)({type:x,user:t});case 6:c.next=10;break;case 8:c.prev=8,c.t0=c.catch(0);case 10:case"end":return c.stop()}}),Oe,null,[[0,8]])}function Ne(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(de.a)(he);case 3:return e.next=5,Object(de.b)({type:O});case 5:return e.next=7,Object(de.b)({type:_});case 7:e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),fe,null,[[0,9]])}function _e(e){var t;return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(de.a)(xe);case 3:return t=e.sent,e.next=6,Object(de.b)({type:M,products:t});case 6:e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),ge,null,[[0,8]])}function Ie(e){var t;return le.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,Object(de.a)(me,e.payload);case 3:return t=c.sent,c.next=6,Object(de.b)({type:q,product:t});case 6:return c.next=8,Object(de.b)({type:G});case 8:c.next=14;break;case 10:return c.prev=10,c.t0=c.catch(0),c.next=14,Object(de.b)({type:J});case 14:case"end":return c.stop()}}),ve,null,[[0,10]])}function Ce(e){var t,c;return le.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t=e.product,n.next=4,Object(de.b)({type:w,product:t});case 4:c=JSON.parse(localStorage.getItem("cartItems")||"[]"),localStorage.setItem("cartItems",JSON.stringify([].concat(Object(L.a)(c),[t]))),n.next=10;break;case 8:n.prev=8,n.t0=n.catch(0);case 10:case"end":return n.stop()}}),ke,null,[[0,8]])}function Se(){return le.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(de.c)(m,we);case 2:return e.next=4,Object(de.c)(h,Ne);case 4:return e.next=6,Object(de.c)(A,_e);case 6:return e.next=8,Object(de.c)(P,Ie);case 8:return e.next=10,Object(de.c)(y,Ce);case 10:case"end":return e.stop()}}),ye)}var Ee,Le,Re=Se,Te=c(18),Fe=Object(ie.a)(),Ue=Object(ae.combineReducers)({userLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return{loading:!0};case x:return{loading:!1,userInfo:t.user};case p:return{loading:!1,error:t.user};case O:return{};default:return e}},productList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{products:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return{loading:!0,products:[]};case M:return{loading:!1,products:t.products};case z:return{loading:!1,error:t.products};default:return e}},productCreate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case P:return{loading:!0};case q:return{loading:!1,success:!0,product:t.products};case J:return{loading:!1,error:!0};case G:return{};default:return e}},cart:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cartItems:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return e;case w:var c=t.product;return Object(Te.a)(Object(Te.a)({},e),{},{cartItems:[].concat(Object(L.a)(e.cartItems),[c])});case N:var n=t.id,r=Object(L.a)(e.cartItems).filter((function(e){return e._id!==n}));return localStorage.removeItem("cartItems"),localStorage.setItem("cartItems",JSON.stringify(r)),Object(Te.a)(Object(Te.a)({},e),{},{cartItems:r});case _:return Object(Te.a)(Object(Te.a)({},e),{},{cartItems:[]});default:return e}}}),De={userLogin:{userInfo:JSON.parse((null===(Ee=localStorage)||void 0===Ee?void 0:Ee.getItem("userInfo"))||"null")},cart:{cartItems:JSON.parse((null===(Le=localStorage)||void 0===Le?void 0:Le.getItem("cartItems"))||"[]")}},Ae=Object(ae.createStore)(Ue,De,Object(se.composeWithDevTools)(Object(ae.applyMiddleware)(Fe)));Fe.run(Re);var Me=Ae;s.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(d.a,{children:Object(o.jsx)(b.a,{store:Me,children:Object(o.jsx)(ne,{})})})}),document.getElementById("root")),re()}},[[75,1,2]]]);
//# sourceMappingURL=main.19148297.chunk.js.map