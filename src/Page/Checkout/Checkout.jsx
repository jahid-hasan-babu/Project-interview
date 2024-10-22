import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import axios from "axios"; // Using axios for API requests
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
  } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    guardianNumber: "",
    dob: "",
    bloodGroup: "",
    photo: "",
  });

  const totalPrice = getTotalPrice(); // Calculated total price

  const handleChange = (e) => {
    const { id, type, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.parentName ||
      !formData.parentNumber ||
      !formData.school ||
      !formData.jobInfo ||
      !formData.email ||
      !formData.gender ||
      !formData.presentAddress ||
      !formData.permanentAddress ||
      !formData.nid ||
      !formData.mobile ||
      !formData.guardianName ||
      !formData.guardianNumber ||
      !formData.dob ||
      !formData.bloodGroup ||
      !formData.photo
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const admissionData = {
      course_id: cart[0]?.id,
      admission_date: new Date().toISOString().split("T")[0],
      name: formData.fullName,
      father_name: formData.parentName,
      father_phone_no: formData.parentNumber,
      school_collage_name: formData.school,
      job_title: formData.jobInfo,
      email: formData.email,
      gender: formData.gender,
      present_address: formData.presentAddress,
      permanent_address: formData.permanentAddress,
      nid_no: formData.nid,
      phone_no: formData.mobile,
      local_guardian_name: formData.guardianName,
      local_guardian_phone_no: formData.guardianNumber,
      date_of_birth: formData.dob,
      blood_group: formData.bloodGroup,
      course_fee: cart[0]?.discount_price || 0,
      course_qty: cart[0]?.quantity || 1,
      total_course_fee:
        (cart[0]?.discount_price || 0) * (cart[0]?.quantity || 1),
      discount_course_fee: 0,
      sub_total_course_fee:
        (cart[0]?.discount_price || 0) * (cart[0]?.quantity || 1),
      form_no: formData.formNo,
      photo: formData.photo,
      user_id: 1, // Replace with actual user ID if applicable
    };

    console.log(admissionData);

    // Sending the admissionData to the API
    try {
      const response = await axios.post(
        "https://itder.com/api/course-purchase",
        admissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle success response
      toast.success("Data submit success");
      // save data in session storage
      sessionStorage.setItem("response", JSON.stringify(response));
      // Redirect to success page
      window.location.href = "/order-details";
    } catch (error) {
      console.error("Error submitting admission form", error.response.data);
    }
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        className="bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no:
              </label>
              <input
                type="text"
                id="formNo"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.formNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Parent's Name:
              </label>
              <input
                type="text"
                id="parentName"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Parent's Phone Number:
              </label>
              <input
                type="text"
                id="parentNumber"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.parentNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College/University:
              </label>
              <input
                type="text"
                id="school"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information (If Any):
              </label>
              <input
                type="text"
                id="jobInfo"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.jobInfo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <input
                type="text"
                id="presentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.presentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <input
                type="text"
                id="permanentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID/Passport Number:
              </label>
              <input
                type="text"
                id="nid"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.nid}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobile"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Guardian Name:
              </label>
              <input
                type="text"
                id="guardianName"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.guardianName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="guardianNumber"
                className="block font-semibold text-base mb-2"
              >
                Guardian Phone Number:
              </label>
              <input
                type="text"
                id="guardianNumber"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.guardianNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block font-semibold text-base mb-2"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              className="w-full border border-gray-300 rounded-md p-2"
              accept=".jpg, .jpeg, .png, .svg, .gif"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Cart Section */}
        <div className="mt-4 px-4">
          <div className="lg:flex items-start gap-3 flex-col lg:flex-row">
            <div className="w-full lg:w-[58%] bg-white border-2">
              <table className="overflow-x-auto w-full">
                <thead>
                  <tr className="border-b-4 border-gray-300">
                    <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                      Course
                    </th>
                    <th className="text-[14.4px] font-bold p-[7px] text-black">
                      Price
                    </th>
                    <th className="text-[14.4px] font-bold p-[7px] text-black">
                      Quantity
                    </th>
                    <th className="text-[14.4px] font-bold p-[7px] text-black">
                      Sub Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((course) => (
                    <tr key={course.id} className="border-b border-gray-300">
                      <td>
                        <div className="flex items-center justify-center">
                          <div className="w-[20%] text-center flex items-center justify-center">
                            <button onClick={() => removeFromCart(course.id)}>
                              <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                            </button>
                          </div>
                          <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                            <img
                              className="h-[40px] w-[70px]"
                              src={course.photo}
                              alt={course.course_name}
                            />
                            <p className="text-sm px-2 text-center flex">
                              {course.course_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-sm font-bold p-2 text-black text-center">
                          Tk {course.discount_price}
                        </p>
                      </td>
                      <td className="p-1 md:p-4 text-[14px]">
                        <div className="flex items-center">
                          <button
                            className="px-1 md:px-2 py-1 border rounded-l hover:bg-gray-200"
                            onClick={(e) => {
                              e.preventDefault();
                              decrementQuantity(course.id);
                            }}
                          >
                            -
                          </button>
                          <span className="px-2 md:px-4">
                            {course.quantity}
                          </span>
                          <button
                            className="px-1 md:px-2 py-1 border rounded-r hover:bg-gray-200"
                            onClick={(e) => {
                              e.preventDefault();
                              incrementQuantity(course.id);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <p className="text-sm font-bold p-2 text-black text-center">
                          Tk {course.discount_price * course.quantity}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:w-[41%] bg-white border-2">
              <div className="px-[30px]">
                <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                  Cart Summary
                </h2>
                <div className="py-3 flex justify-between border-b border-gray-300">
                  <span className="text-md font-bold">Total Price:</span>
                  <span className="text-md font-bold">Tk {totalPrice}</span>
                </div>
                <button
                  type="submit"
                  className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
