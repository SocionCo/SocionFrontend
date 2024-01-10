import { Box, Button, Dialog, Link, Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import apiString from '../../services/apiString';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import MediaKitModal from '../modals/MediaKitModal';


export default function BasicTableNoHeader({ rows, influencerEmail = "" }) {
  const navigate = useNavigate();
  const [mediaKitOpen, setMediaKitOpen] = React.useState(false);
  const handleClose = () => { 
    setMediaKitOpen(false);
  }

  return (
    <>
    <MediaKitModal
      open={mediaKitOpen}
      handleClose={handleClose}
      influencer={influencerEmail}

    />
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
                      (<TableCell align="center">
                        <Button 
                        onClick={() => setMediaKitOpen(true)}
                        disabled
                        target='_blank'>Not Available</Button>
                        </TableCell>)
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
                        navigate("/campaign/" + row.id);
                        window.location.reload();
                      }} component="th" scope="row" sx={{ cursor: 'pointer' }}>
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