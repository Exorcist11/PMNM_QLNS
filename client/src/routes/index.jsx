import Home from "~/pages/Home";
import Department from "~/pages/Department";
import ManageStaff from "~/pages/ManageStaff";
import InformationStaff from "~/pages/InfomationStaff";
import Report from "~/pages/Report";
import Login from "~/pages/Auth";
import EmployeeList from "~/pages/EmpByDept";
import ChangePass from "~/pages/ChangePassword";

const publicRoute = [
  { path: "/login", component: Login, layout: null },
  { path: "/", component: Home },
  { path: "/department", component: Department },
  { path: "/staff-manage", component: ManageStaff },
  { path: "/infomation-staff", component: InformationStaff },
  { path: "/report", component: Report },
  { path: "/emp-list", component: EmployeeList },
  { path: "/change-pass", component: ChangePass },
];

export { publicRoute };
