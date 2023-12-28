const userService = require("./user.service");

async function updateCartItem(userId, cartItemId, cartItemDate) {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) {
      throw new Error("cart item not found : ", cartItemId);
    }
    const user = await userService.findeUserById(item.userId);
    if (!user) {
      throw new Error("user not found :", userId);
    }
    if (user._id.toString === userId.toString) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("youcant update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findeUserById(userId);

  if (user._id.toString === cartItem.userId.toString) {
    await CartItem.findeUserByIdAndDelete(cartItemId);
  }

  throw new Error("you cant remove another user's item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartitem not found with id", cartItemId);
  }
}

modulce.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
