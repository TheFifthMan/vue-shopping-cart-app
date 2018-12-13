import axios from "axios";

const state = {
    cartItems: []
}
const mutations = {
    UPDATE_CART_ITEMS(state,payload) {
        state.cartItems = payload;
    }
}
const actions = {
    getCartItems({ commit }){
       axios.get('/api/cartLists').then((res) => {
           commit('UPDATE_CART_ITEMS',res.data);
       })
    },
    addCartItem({ commit },cartItem){
        axios.post('/api/cart/add',cartItem).then( res => {
            commit("UPDATE_CART_ITEMS",res.data);
        })
    },
    deleteCartItem({ commit }, cartItem){
        axios.post('/api/cart/delete', cartItem).then( res => {
            commit('UPDATE_CART_ITEMS', res.data);
        })
    },
    deleteCartAll({ commit }){
        axios.post('/api/cart/delete/all').then( res => {
            commit('UPDATE_CART_ITEMS',res.data);
        })
    }
}
const getters = {
    cartItems: state => state.cartItems,
    cartTotal: state => {
        return state.cartItems.reduce((acc,cartItem) => {
            return (cartItem.price * cartItem.quantity) + acc;
        },0).toFixed(2)
    },
    cartQuantity: state => {
        return state.cartItems.reduce((acc,cartItem) => {
            return cartItem.quantity + acc ;
        },0)
    }
}

const cartModule = {
    state,
    mutations,
    actions,
    getters
}
export default cartModule