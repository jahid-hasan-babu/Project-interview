import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  // Add a course to the cart
  addToCart: (course) =>
    set((state) => {
      const existingCourse = state.cart.find((item) => item.id === course.id);
      if (existingCourse) {
        return {
          cart: state.cart.map((item) =>
            item.id === course.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...course, quantity: 1 }] };
    }),

  // Remove a course from the cart
  removeFromCart: (courseId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== courseId),
    })),

  // Increment the quantity of a course
  incrementQuantity: (courseId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === courseId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  // Decrement the quantity of a course
  decrementQuantity: (courseId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === courseId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  // Get the total count of courses in the cart (computed value)
  getTotalCount: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  // Get the total price of items in the cart (computed value)
  getTotalPrice: () =>
    get().cart.reduce(
      (total, item) => total + item.quantity * parseFloat(item.discount_price),
      0
    ),
}));

export default useCartStore;
