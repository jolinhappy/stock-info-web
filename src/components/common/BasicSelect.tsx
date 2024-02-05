import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IBasicSelect } from '../../types/interface/component';

interface IBasicSelectProps {
  selectOptions: IBasicSelect[];
  value: number;
  onSelectChange: (event: SelectChangeEvent) => void;
}

const BasicSelect = ({ selectOptions, value, onSelectChange }: IBasicSelectProps) => (
  <FormControl sx={{ m: 1, minWidth: 120 }}>
    <Select
      value={value.toString()}
      onChange={onSelectChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      size="small"
    >
      {
        selectOptions && selectOptions.map((option: IBasicSelect) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))
      }
    </Select>
  </FormControl>
);

export default BasicSelect;
