import Home from "~/pages/Home";
import Department from "~/pages/Department";
import ManageStaff from "~/pages/ManageStaff";
import InformationStaff from "~/pages/InfomationSalary";
import Report from "~/pages/Report";
import Login from "~/pages/Auth";

const publicRoute = [
  { path: "/login", component: Login, layout: null },
  { path: "/", component: Home },
  { path: "/department", component: Department },
  { path: "/staff-manage", component: ManageStaff },
  { path: "/infomation-staff", component: InformationStaff },
  { path: "/report", component: Report },
];

export { publicRoute };
