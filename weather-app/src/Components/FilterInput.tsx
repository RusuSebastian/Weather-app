import * as React from "react"
import { TextField } from "@mui/material";
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import JSONDATA from "../Data/city.list.json"

interface FilterProps{
  value:string | null | undefined;
  onChange:any;
  onInputChange:any;
  inputValue:any;
}

const Filter = ({value,onChange,onInputChange,inputValue} : FilterProps) =>{
  
    const cities = JSONDATA.map((option: { name: string; }) => option.name);
    const filterOptions = createFilterOptions({
        limit:10
      });

        return (
            <Autocomplete
            size="small"
            value={value}
            onChange={onChange}           
            inputValue={inputValue}
            onInputChange={onInputChange}
            id="free-solo-demo"
            freeSolo
            filterOptions={filterOptions}
            options={cities}
            renderInput={(params) => <TextField {...params} label="search for city" />}
          />
        )
}
export default Filter