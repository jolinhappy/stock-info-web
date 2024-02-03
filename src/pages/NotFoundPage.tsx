import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NotFoundPage = () => (
  <Box height="100vh" display="flex" alignItems="center" flexDirection="column" pt={15}>
    <Typography variant="h3">404</Typography>
    <Typography variant="subtitle1">找不到該頁面</Typography>
  </Box>
);

export default NotFoundPage;
