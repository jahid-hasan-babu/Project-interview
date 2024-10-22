import { RiDeleteBin5Line } from "react-icons/ri";
import useCartStore from "../store/useCartStore";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
  } = useCartStore();

  const totalPrice = getTotalPrice(); // Use the computed value

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        {cart.length > 0 ? (
          <div className="lg:flex items-start gap-3">
            <div className="w-full lg:w-[58%] bg-white border-2">
              <table className="overflow-x-auto w-full">
                <thead>
                  <tr className="border-b-4 border-gray-300">
                    <th className="text-[14.4px] w-6/12 font-bold p-[2px] md:p-[7px] text-black">
                      Course
                    </th>
                    <th className="text-[14.4px] font-bold p-[7px] text-black">
                      Price
                    </th>
                    <th className="text-[14.4px] font-bold md:p-[7px] text-black">
                      Quantity
                    </th>
                    <th className="text-[14.4px] font-bold p-[7px] text-black">
                      Sub Total
                    </th>
                    <th className="text-[14.4px] font-bold p-[4px] md:p-[7px] text-black">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((course) => (
                    <tr key={course.id} className="border-b">
                      <td className="p-2 md:p-4 text-[14px]">
                        {course.course_name}
                      </td>
                      <td className="p-4 text-[14px]">
                        Tk {course.discount_price}
                      </td>
                      <td className="p-1 md:p-4 text-[14px]">
                        <div className="flex items-center">
                          <button
                            className="px-1 md:px-2 py-1 border rounded-l hover:bg-gray-200"
                            onClick={() => decrementQuantity(course.id)}
                          >
                            -
                          </button>
                          <span className="px-2 md:px-4">
                            {course.quantity}
                          </span>
                          <button
                            className="px-1 md:px-2 py-1 border rounded-r hover:bg-gray-200"
                            onClick={() => incrementQuantity(course.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-[14px]">
                        Tk {course.discount_price * course.quantity}
                      </td>
                      <td className="p-2 md:p-4 text-[14px]">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            removeFromCart(course.id);
                            toast.success(`Cart remove successfully!`);
                          }}
                        >
                          <RiDeleteBin5Line size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Price Summary */}
            <div className="w-full lg:w-[40%] bg-white p-4 border-2">
              <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
              <div className="flex justify-between">
                <span className="text-md font-medium">Total Price:</span>
                <span className="text-md font-bold">Tk {totalPrice}</span>
              </div>
              <Link to="/checkout">
                {" "}
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Cart;
