import React from "react";
import { Button } from "@mui/material";

export function App(): React.ReactElement {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" onChange={onChange} hidden />
    </Button>
  );
}
