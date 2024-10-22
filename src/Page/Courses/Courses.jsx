import React, { useEffect, useState } from "react";
import CourseStore from "../store/CourseStore";
import Loader from "../../Utils/Loader/Loader";
import ReactPaginate from "react-paginate";

const Courses = () => {
  const { CoursesList, CoursesListRequest } = CourseStore();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    CoursesListRequest();
  }, [CoursesListRequest]);

  if (!CoursesList) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const pageCount = Math.ceil(CoursesList.length / itemsPerPage);

  const currentItems = CoursesList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((course) => {
            // Calculate discount percentage
            const regularPrice = parseFloat(course.regular_price);
            const discountPrice = parseFloat(course.discount_price);
            const discountAmount = regularPrice - discountPrice;
            const discountPercentage = (
              (discountAmount / regularPrice) *
              100
            ).toFixed(0);

            return (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={course.photo}
                    className="h-auto md:h-[60vh] w-full object-cover"
                    alt={course.course_name}
                  />
                  <div className="absolute top-0 left-0 p-2">
                    <h3 className="text-blue-500 text-xl font-bold">
                      {course.course_name}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">
                    {course.course_name}
                  </h2>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex text-blue-500 text-md">★★★★★</span>
                    <span className="ml-2 text-gray-600 text-md font-bold">
                      {course.trainer_data.name}
                    </span>
                  </div>
                  <p className="text-gray-600 text-md mb-4">
                    Course Details{" "}
                    <span className="text-blue-500">Show Details</span>
                  </p>
                  <hr />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="line-through text-gray-400 text-sm">
                        Tk {course.regular_price}
                      </span>
                      <span className="text-green-600 text-md font-bold ml-2">
                        -{discountPercentage}%
                      </span>
                      <span className="text-black text-lg font-bold ml-2">
                        Tk {course.discount_price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No courses available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <ReactPaginate
        breakLabel={<span className="mx-2">...</span>}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4 space-x-1"
        pageClassName="inline-flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 hover:bg-blue-500 hover:text-white transition duration-150"
        previousClassName="mx-1"
        nextClassName="mx-1"
        disabledClassName="opacity-50 cursor-not-allowed"
        activeClassName="bg-blue-500 text-white"
      />
    </div>
  );
};

export default Courses;
