import React, { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../../utils/axios"
import { useDispatch, useSelector } from 'react-redux';
import { signInAdminStart, signInAdminSuccess, signInAdminFailure,} from '../../redux/adminSlice';


function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.admin);
 
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
  
    try {
      if (!formData.email && !formData.password) {
        dispatch(signInAdminFailure("Please provide both email and password."));
        return;
      } else if (!formData.email) {
        dispatch(signInAdminFailure("Please provide an email."));
        return;
      } else if (!formData.password) {
        dispatch(signInAdminFailure("Please provide a password."));
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        dispatch(signInAdminFailure("Please provide a valid email address."));
        return;
      }
      if (formData.password.length < 4) {
        dispatch(signInAdminFailure("Password should be at least 4 characters long."));
        return;
      }
      dispatch(signInAdminStart());

const response = await axios.post("/admin/login", formData, {
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(response.data);
const data = response.data;

   
      setFormData({
        email: "",
        password: "",
      });
      if (data.success === false) {
        dispatch(signInAdminFailure(data.message));
        return;
      }
    
      dispatch(signInAdminSuccess(data));
      
      navigate('/')
    } catch (error) {
      dispatch(signInAdminFailure(error?.response?.data?.message));
    
    }
  };
  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        
        <TextField
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {error && (
          <Typography variant="h6"  gutterBottom sx={{ color: 'red' }} >
            {error}
          </Typography>
        )}
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "loading" : "Login"}
        </Button>
        
      </Box>
    </Box>
  </Container>
  )
}

export default AdminLogin