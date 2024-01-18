import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/joy/Table";
import AdminAppbar from "../../components/AdminAppbar";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';

function Students() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const adminDetails =useSelector((state)=>state.admin)
  let accesstoken = adminDetails?.currentAdmin.token
  const fetchData = async () => {
    try {
      const response = await axios.get(`/admin/getAllStudents?page=${currentPage}&limit=${itemsPerPage}`,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: accesstoken,
        },
      });
      const data = response.data
      setStudents(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f4f5f7",
        margin: 0,
        padding: "15px 15px ",
        minHeight:'100vh',
      }}
    >
      <AdminAppbar/>
      <Grid container>
        <Box
          sx={{
            flexGrow: 1,
            marginTop:9
          }}
        >
          <Typography variant="h5">Students</Typography>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Table
            borderAxis="both"
            variant="outlined"
            size="sm"
            sx={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th> id</th>
                <th> Name</th>
                <th> Email</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>delete</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        <div>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span> Page {currentPage} </span>
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

export default Students;
