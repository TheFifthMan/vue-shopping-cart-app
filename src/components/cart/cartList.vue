<template>
    <div id="cart">
        <div class="cart--header has-text-centered">
            <i class="fa fa-2x fa-shopping-cart"></i>
        </div>
        <ul>
            <li class="cart-item" v-for="cartItem  in cartItems" :key="cartItem.id">
                <CartItem :cartItem ="cartItem" />
            </li>
            <div class="cart-details">
                <p>Total Quantity: <span class="has-text-weight-bold">{{ cartQuantity }}</span></p>
                <p class="cart-remove-all--text" @click="deleteCartAll()">
                    <i class="fa fa-trash"></i>Remove all
                </p>
            </div>
        </ul>
        <button :disabled="!cartItems.length" class="button is-primary">
        Checkout (<span class="has-text-weight-bold">${{ cartTotal }}</span>)
        </button>
    </div>
</template>
<script>
import CartItem from "./cartListItem.vue";
import { mapGetters } from 'vuex';

export default {
    name: "CartList",
    components: {
        CartItem,
    },
    methods: {
        deleteCartAll(){
            this.$store.dispatch("deleteCartAll");
        }
    },
    computed: {
        ...mapGetters([
            'cartItems',
            "cartTotal",
            "cartQuantity"
        ])
    },
    created() {
        this.$store.dispatch("getCartItems")
    }
}

</script>
<style scoped>
#cart {
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-empty-text {
  padding: 10px 0;
}

.cart--header {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 15px;
}

.cart-item {
  padding: 10px 0;
}

.cart-details {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.cart-remove-all--text {
  cursor: pointer;
}

.cart-remove-all--text .fa {
  padding-right: 5px;
}
</style>
