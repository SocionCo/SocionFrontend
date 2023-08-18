import { Box, Button, Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import apiString from '../../services/apiString';
import { useState } from 'react';
import ContractDetailView from '../modals/ContractDetailView';


export default function BasicTableNoHeader({ rows }) {
  const [contractToOpen, setContractToOpen] = useState(null);
  const [showContractDetailView, setShowContractDetailView] = useState(null);

  const closeContractDetailView = () => {
    setShowContractDetailView(false);
  }


  return (
    <>
      {contractToOpen && (<ContractDetailView
        contractId={contractToOpen}
        open={showContractDetailView}
        handleClose={closeContractDetailView}

      />)}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => {


              if (row.name === "Analytics") {
                return (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {
                      row.details ?
                        (<TableCell align="center"><Button target='_blank' href={apiString + "/api/getYoutubeInfo/" + row.details}>Open Analytics</Button></TableCell>) : (<TableCell align="center"><Button target='_blank' href={apiString + "/api/getYoutubeInfo/" + row.details} disabled>Not Available</Button></TableCell>)
                    }
                  </TableRow>
                );

              } else {
                return (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {row.id ?
                      (<TableCell onClick={() => {
                        setContractToOpen(row.id);
                        setShowContractDetailView(true);
                      }} component="th" scope="row" sx={{cursor: 'pointer'}}>
                        {row.name}
                      </TableCell>) : (<TableCell
                        component="th" scope="row">
                        {row.name}
                      </TableCell>)
                    }
                    <TableCell align="center">{row.details}</TableCell>
                  </TableRow>
                );

              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}