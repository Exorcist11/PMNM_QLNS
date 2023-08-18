import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall(props) {
  const { name, onChangeVar, apiURL, titleV } = props;
  const [data, setData] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChangeVar) {
      onChangeVar(event.target.value);
    }
  };
  
  React.useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        throw ("Error fetching data:", error);
      });
  }, [apiURL]);

  return (
    <FormControl sx={{ minWidth: "373px" }}>
      <InputLabel id="demo-select-small-label">{name}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedValue}
        label="data"
        onChange={handleSelectChange}
      >
        {data.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item[titleV]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
