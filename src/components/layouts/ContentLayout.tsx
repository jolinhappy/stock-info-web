import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)(({ theme }: any) => ({
  width: '100%',
  height: '55px',
  padding: theme.spacing(2),
}));

const ContentLayout = () => (
  <Box height="100%">
    <StyledPaper variant="outlined">股票名稱</StyledPaper>
  </Box>
);

export default ContentLayout;
