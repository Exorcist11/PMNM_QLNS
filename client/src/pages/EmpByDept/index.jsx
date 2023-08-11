// Tạo một component riêng để hiển thị danh sách nhân viên của phòng ban
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const id = localStorage.getItem("deptID");
  useEffect(() => {
    // Gọi API để lấy danh sách nhân viên của phòng ban dựa trên departmentID
    axios
      .get(`http://localhost:3002/departments/${id}`)
      .then((response) => {
        setEmployeeList(response.data.listEmp);
      })
      .catch((error) => {
        throw ("Error fetching employee data:", error);
      });
  }, [id]);
  
  return (
    <div>
      <h2>Danh sách nhân viên của phòng ban</h2>
      <p></p>
    </div>
  );
};

export default EmployeeList;
