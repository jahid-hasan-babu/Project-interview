import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

const Search = () => {
  const [formNo, setFormNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://itder.com/api/search-purchase-data",
        {
          form_no: formNo,
          phone_no: phoneNo,
        }
      );

      if (response.status === 201) {
        setSearchResult(response.data.singleCoursePurchaseData);
        console.log("Search Result:", response.data.singleCoursePurchaseData);
      }
    } catch (error) {
      console.error("Error fetching search result:", error);
      setSearchResult(null); // Reset search result on error
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto">Search here</h1>
      <div className="h-[52px] relative col-span-4 w-[600px] mx-auto mb-4">
        <input
          type="text"
          name="form_no"
          placeholder="Form Number"
          value={formNo}
          onChange={(e) => setFormNo(e.target.value)}
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
      </div>
      <div className="h-[52px] relative col-span-4 w-[600px] mx-auto mb-4">
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
        <IoMdSearch
          onClick={handleSearch}
          className="text-2xl text-black absolute right-2 top-2 cursor-pointer"
        />
      </div>

      {searchResult && (
        <div className="w-[600px] font-bold text-lg mx-auto mt-4 p-4 border border-gray-300 rounded-md">
          <h2 className="font-bold text-lg">Search Result:</h2>
          <p>
            <strong>Name:</strong> {searchResult.name}
          </p>
          <p>
            <strong>Father's Name:</strong> {searchResult.father_name}
          </p>
          <p>
            <strong>Course Name:</strong> {searchResult.course_data.course_name}
          </p>
          <p>
            <strong>Total Course Fee:</strong> {searchResult.total_course_fee}
          </p>
          <img
            src={searchResult.photo}
            alt="Student"
            className="mt-2 w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
