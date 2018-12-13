<template>
  <div>
      <p class="cart-item--title is-inline">{{ cartItem.title }}</p>
      <div class="is-pulled-right">
           <p class="cart-remove-all--text" @click="deleteCart(cartItem)">
              <i class="fa fa-trash"></i>
            </p>
      </div>
      <div class="cart-item--content">
          <span class="cart-item--price has-text-primary has-text-weight-bold">{{ cartItem.price }}$ each</span>
          <span class="cart-item--quantity has-text-grey is-pulled-right">Quantity: {{ cartItem.quantity }}</span>
      </div>
  </div>
</template>
<script>
export default {
  name: "cartItem",
  props:['cartItem'],
  methods: {
    deleteCart (item) {
      this.$store.dispatch("deleteCartItem",item);
    }
  }

}

</script>
<style scoped>
.cart-item--modify,.cart-remove-all--text {
  cursor: pointer;
  margin: 0 1px;
}
</style>
