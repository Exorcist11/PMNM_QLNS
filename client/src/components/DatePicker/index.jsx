import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePick(props) {
  const { label, datePick, value, variant } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        sx={{ width: "373.06px" }}
        onChange={datePick}
        value={value}
        slotProps={{ textField: { variant: variant } }}
      />
    </LocalizationProvider>
  );
}
