import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Container, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function CustomButton(props) {
  const { nameBtn } = props;
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const account = JSON.parse(localStorage.getItem("account"));
  
  const netSalary = account.salary * account.position.wage;
  const startDate = new Date(account.contractSignDate);

  const currentDate = new Date();
  const timeDiff = (currentDate - startDate) / (1000 * 60 * 60 * 24);

  const grossSalary = () => {
    let grossSalary = netSalary;

    if (timeDiff > 180) {
      grossSalary = netSalary * 0.3 + netSalary;
    }

    return grossSalary;
  };
 
  return (
    <div>
      <Button variant="contained" onClick={handleButtonClick}>
        {nameBtn}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
        <DialogTitle>Bảng lương chi tiết</DialogTitle>
        <Divider />
        <DialogContent>
          <Container>
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Mã nhân viên:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {account.employeeID}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Họ tên:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {account.firstName + " " + account.lastName}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Vị trí:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {account.position.roleName}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Hệ số lương:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {account.position.wage}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Lương cứng:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {account.salary}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: "50px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" gutterBottom sx={{ width: "200px" }}>
                Tổng nhận:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ width: "200px" }}>
                {grossSalary()}
              </Typography>
            </Box>
            <Divider />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
