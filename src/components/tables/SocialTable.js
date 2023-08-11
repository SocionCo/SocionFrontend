import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const TikTokIcon = ({ color = "#000000" }) => {
    return (
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        height={24}
        width={24}
      >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
      </svg>
    );
  };

export default function SocialTable({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            <Stack direction='row' spacing={.5}>
                                <InstagramIcon sx={{ fill: '#E4405F' }} />
                                <Typography>Instagram</Typography>
                            </Stack>
                        </TableCell>
                        <TableCell align="center">{rows.instagram ? rows.instagram : "Not Added"}</TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            <Stack direction='row' spacing={.5}>
                                <YouTubeIcon sx={{ fill: '#CD201F' }} />
                                <Typography>Youtube</Typography>
                            </Stack>
                        </TableCell>
                        <TableCell align="center">{rows.youtube ? rows.youtube : "Not Added"}</TableCell>
                    </TableRow>
                    <TableRow

                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                        <Stack direction='row' spacing={.5}>
                                <TikTokIcon />
                                <Typography>TikTok</Typography>
                            </Stack>
                        </TableCell>
                        <TableCell align="center">{rows.tiktok ? rows.tiktok : "Not Added"}</TableCell>
                    </TableRow>
                    <TableRow
                        key={rows.instagram}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            <Stack direction='row' spacing={.5}>
                                <FacebookIcon sx={{ fill: '#1877F2' }} />
                                <Typography>Facebook</Typography>
                            </Stack>
                        </TableCell>
                        <TableCell align="center">{rows.facebook ? rows.facebook : "Not Added"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}