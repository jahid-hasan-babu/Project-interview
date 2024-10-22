import { useEffect, useState } from "react";
import TrackOrder from "./TrackOrder";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    // Retrieve order details and course details from session storage
    const storedOrder = JSON.parse(sessionStorage.getItem("orderDetails"));
    const storedCourses = JSON.parse(sessionStorage.getItem("courseDetails"));

    if (storedOrder) {
      setOrder(storedOrder.data.coursePurchaseData);
    }
    if (storedCourses) {
      setCourses(storedCourses); // Assuming storedCourses is directly usable
    }
  }, []);

  if (!order || !courses) {
    return <p>Loading...</p>; // Or you can show a loading spinner
  }

  return (
    <div className="m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">
        <div className="bg-white lg:p-p_30px w-full">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id :<span className="font-semibold">{order.id}</span>
            </p>
          </div>
          <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
            <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">User Information</p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name:</p>
                  <p className="text-start">{order.name || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email:</p>
                  <p className="text-start">{order.email || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Phone:</p>
                  <p className="text-start">{order.phone_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Address:</p>
                  <p className="text-start">{order.present_address || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Order Notes:</p>
                  <p className="text-start">{order.form_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Date of Birth:</p>
                  <p className="text-start">{order.date_of_birth || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-m_medium">
              <p className="font-bold md:mb-4 w-full">
                Parent/Guardian Information
              </p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Parent's Name:</p>
                  <p className="text-start">{order.father_name || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Parent's Phone Number:</p>
                  <p className="text-start">{order.father_phone_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>School/University:</p>
                  <p className="text-start">
                    {order.school_collage_name || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Name:</p>
                  <p className="text-start">
                    {order.local_guardian_name || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Phone Number:</p>
                  <p className="text-start">
                    {order.local_guardian_phone_no || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Blood Group:</p>
                  <p className="text-start">{order.blood_group || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className="md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm ">
                  <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border">
                    Unit image
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Course Name
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Student Name
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                    Quantity
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">
                    Price
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="border text-center w-10 h-12 px-2">
                      <img
                        className="w-auto h-auto object-cover mx-auto"
                        src={course.photo}
                        alt={course.name}
                      />
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course.course_name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {order.name || "N/A"}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course.quantity}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {course.discount_price}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      Tk {course.discount_price * course.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
