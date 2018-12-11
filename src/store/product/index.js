import axios from "axios"

const state = {
    productItems: []
}
const mutations = {
    // state is always the first argument of a mutation 
    // optional payload is the data we need here to update our state.
    UPDATED_PRODUCT_ITEMS (state,payload) {
        state.productItems = payload;
    }
}
const actions = {
    // The context object allows us to commit to a mutation in addition to accessing getters and state.
    // pull out a specific key into a variable from a JavaScript object. 
    // commit is an variable for context obj lambda
    getProductItems ({ commit }) {
        axios.get('/api/productLists').then(res => {
            //The entire response object consists of information such as the headers of the HTTP call, the status, the data that was retrieved etc.
            //the fetched data is the only relevant information for our mutation
            commit('UPDATED_PRODUCT_ITEMS',res.data);
        })
    }
}
const getters = {
    productItems: state => state.productItems
}

const productModule = {
    state,
    mutations,
    actions,
    getters
}

// export 
// then go to productList.vue 
export default productModule