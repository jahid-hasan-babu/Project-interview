import { create } from "zustand";
import axios from "axios";
let BaseURL = "https://itder.com";

const CourseStore = create((set) => ({
  CoursesList: null,
  CoursesListRequest: async () => {
    let res = await axios.get(`${BaseURL}/api/get-course-list`);
    if (res.data["status_code"] === 201) {
      set({ CoursesList: res.data["courseData"] });
    }
  },
}));

export default CourseStore;
