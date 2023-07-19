import Home from "~/pages/Home";
import Report from "~/pages/Report";
import InfomationStaff from "~/pages/InfomationStaff";
const publicRoute = [
  { path: "/", component: Home },
  { path: "/report", component: Report },
  { path: "/infomation-staff", component: InfomationStaff },
];

export { publicRoute };
