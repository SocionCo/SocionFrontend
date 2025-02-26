import CheckIcon from '@mui/icons-material/Check';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Searchbar from '../forms/inputs/Searchbar';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function handleDetailViewClick(row) {
  console.log(row);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Campaign Name',
  },
  {
    id: 'influencer',
    numeric: false,
    disablePadding: false,
    label: 'Talent',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: 'Client',
  },
  {
    id: 'talentManagers',
    numeric: false,
    disablePadding: false,
    label: 'Talent Manager(s)',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Booking Price',
  },
  {
    id: 'buttons',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id == "rate" ? "center" : "left"}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


function EnhancedTableToolbar(props) {
  const { selected, handleSearchChange } = props;
  const numSelected = selected.length;
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);





  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Active Campaigns
        </Typography>
      )}

      <IconButton onClick={(event) => {
        props.refresh();
        event.stopPropagation();
      }}>
        <RefreshIcon />
      </IconButton>

      <Box sx={{ position: 'relative' }}>
        <IconButton onClick={() => setSearchBarVisible(!searchBarVisible)}>
          <SearchIcon />
        </IconButton>
        {searchBarVisible && (
          <Searchbar
            sx={{
              position: 'absolute',
              width: '275px',
              top: '-60px', // Adjust the top value as needed
              left: '-100px',    // Adjust the left value as needed
              zIndex: 10,
              background: 'white',
              transform: 'translateX(-50%)', // Center horizontally above the icon
            }}
            handleChange={handleSearchChange}
          />)}
      </Box>

    </Toolbar>
  );
}


export default function EnhancedTable({ rows, refresh, handleComplete }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }


  React.useEffect(() => {
    const sortedRows = stableSort(rows, getComparator(order, orderBy));
  }, [rows, order, orderBy]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => {
      const filteredRows = stableSort(rows, getComparator(order, orderBy)).filter(row => {
        const searchWords = searchInput.toLowerCase().split(' ');
        return searchWords.every(word =>
          row.name.toLowerCase().includes(word) ||
          row.companyName.toLowerCase().includes(word)
        );
      });

      return filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    },
    [order, orderBy, page, rowsPerPage, searchInput, rows]
  );








  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar
        selected={selected}
        refresh={refresh}
        handleSearchChange={handleSearchChange}

      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              const trimmedName = row.name.length > 20 ? row.name.substring(0, 15) + "..." : row.name;
              const trimmedClientName = row.companyName.length > 20 ? row.companyName.substring(0, 15) + "..." : row.companyName;

              const trimmedTalentManagers = row.talentManagers.length > 20 ? row.talentManagers.substring(0, 15) + "..." : row.talentManagers;

              return (
                <TableRow
                  hover
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/campaign/" + row.id);
                  }}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {trimmedName}
                  </TableCell>
                  <TableCell align="left">{row.influencer}</TableCell>
                  <TableCell align="left">{trimmedClientName}</TableCell>
                  <TableCell align="left">{row.talentManagers}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="center">{row.rate}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={(event) => {
                      navigate("/campaign/" + row.id);
                      event.stopPropagation();
                    }}>
                      <Tooltip title="Detail View">
                        <ReadMoreIcon></ReadMoreIcon>
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={(event) => {
                      handleComplete(row.id);
                      event.stopPropagation();
                    }}>
                      <Tooltip title="Mark Complete">
                        <CheckIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>

              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}