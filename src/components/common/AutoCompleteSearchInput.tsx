import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface IAutoCompleteSearchInputProps {
  autocompleteOptions: any;
  onSearchInputChange: any;
  onClickOption: any;
}

const StyledAutocomplete = styled(Autocomplete)(() => ({
  width: '350px',
  '& .MuiAutocomplete-popupIndicator': {
    transform: 'none',
  },
  '& legend': {
    display: 'none',
  },
  '& [data-shrink="true"]': {
    display: 'none',
  },
}));

const AutoCompleteSearchInput = ({
  autocompleteOptions,
  onSearchInputChange,
  onClickOption,
}: IAutoCompleteSearchInputProps) => (
  <StyledAutocomplete
    loading
    popupIcon={<SearchIcon />}
    // disableClearable
    options={autocompleteOptions ? autocompleteOptions.map((option: any) => ({ label: option.label, id: option.id })) : []}
    renderOption={(props, option: any) => (
      <Box component="li" {...props}>{option.label}</Box>
    )}
    getOptionLabel={(option: any) => option.label}
    isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
    onInputChange={(event, value) => onSearchInputChange(event, value)}
    onChange={onClickOption}
    renderInput={(params: any) => (
      <TextField
        {...params}
        label="輸入台／美股代號，查看公司價值"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
        size="small"
      />
    )}
  />
);

export default AutoCompleteSearchInput;
