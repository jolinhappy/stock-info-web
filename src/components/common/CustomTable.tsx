import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { MONTHLY_REVENUE_TABLE_KEY } from '../../constants/common';

interface ICustomTableProps {
  columns: string[];
  rows: any;
}

const StyledTableHeaderRow = styled(TableRow)(({ theme }: any) => ({
  backgroundColor: theme.customColors.lightGray,
  '&:first-child td, &:first-child th': {
    borderTop: '1px solid #E0E0E0',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.customColors.lightGray,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({ columns, rows }: ICustomTableProps) => (
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <StyledTableHeaderRow>
        <TableCell>{MONTHLY_REVENUE_TABLE_KEY.DATE_TITLE}</TableCell>
        {
          columns.map((item: any) => (
            <TableCell align="right" key={item}>{item}</TableCell>
          ))
        }
      </StyledTableHeaderRow>
    </TableHead>
    <TableBody>
      {
        rows.map((row: any) => (
          row ? (
            <StyledTableRow key={row.name} hover>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {columns.map((item: any) => (
                <TableCell component="th" align="right" scope="row">
                  {row[item]}
                </TableCell>
              ))}
            </StyledTableRow>
          ) : <Box display="flex" justifyContent="center"><CircularProgress /></Box>
        ))
      }
    </TableBody>
  </Table>
);

export default CustomTable;
