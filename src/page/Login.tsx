import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Center,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AbsoluteCenter,
} from "@chakra-ui/react";
import Confetti from "./Confetti";
import { apiurl } from "./url";
// import ProgressBar from "../components/Meter/ProgressBar";

interface CustomStyledAlertProps {
  title: string;
  description: string;
  status: "info" | "success" | "warning" | "error";
}

const CustomStyledAlert: React.FC<CustomStyledAlertProps> = ({
  title,
  description,
  status,
}) => {
    const statusColors = {
        success: "green.100",
        warning: "yellow.100",
        error: "#ff0101",
        info: "blue.100",
      };
    
      // Get the background color based on the status
      const bgColor = statusColors[status];
  return (
    <Alert
      mt="4"
      status={status}
      bg={bgColor} // Set the background color dynamically
      border="1px"
      borderRadius="lg"
      boxShadow="lg"
      borderColor={`${status}.400`}
      color="white"
    >
      <AlertIcon color={`${status}.400`} />
      <AlertTitle ml="2" fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription ml="2">{description}</AlertDescription>
    </Alert>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false);
  const [showWrongPasswordAlert, setShowWrongPasswordAlert] = useState(false);
  const [progress, setProgress] = useState(0);


  // useEffect(() => {
  //   fetch('/usersprofile')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message && data.message === "Unauthorized") {
  //         setShowUnauthorizedAlert(true);
  //       }
  //       else{
  //         console.log(data);
  //           window.location.href = "/";
  //       }
  //     });
  // }, []);



  const handleRegister = async () => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , phone }),
      });

      const data = await response.json();
      if (data.message === "User registered successfully") {
        // Redirect the user to the desired location after successful login
        alert("Registered Successful");
        window.location.href = "/"; // Replace '/' with the path where you want to redirect the user
      } else {
        alert("User Already registered Please try with differnet mail");
      }

      console.log(data); // Handle the response data as needed (e.g., show a message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      var formdata = new FormData();
      formdata.append("username", email);
      formdata.append("password", password);
      const requestOptions: RequestInit = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      const response = await fetch(`${apiurl}/loginadmin`, requestOptions)

      const data = await response.json();
      console.log(data);

      if (data.message === "Login successful") {
        const accessToken = data.access_token;
        document.cookie = `access_token=${accessToken}; max-age=3600; path=/`;
        setLoginSuccess(true);
        window.location.href = "/";
        setShowUnauthorizedAlert(false);
        setShowWrongPasswordAlert(false);
      } else if (data.message === "Unauthorized") {
        setShowUnauthorizedAlert(true);
        setShowWrongPasswordAlert(false);
        setLoginSuccess(false);
      } else {
        setShowUnauthorizedAlert(false);
        setShowWrongPasswordAlert(true);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    
    // <Center minHeight="100vh" bg='rgb(86, 186, 237,0.6)' >
     <Center minHeight="100vh"  >
     <Confetti/>
      <Box
        position="absolute"
        maxW="md"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="dark-lg"
        bg="white"
      >
        <Heading textAlign="center" mb="4" color='#1e1f31'>
          Dashboard Login
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            colorScheme="white"
            focusBorderColor="transparent"
            bg='#f6f6f6'
            _focus={{
              borderBottomColor: '#5fbae9', // Change the bottom border color on focus
              boxShadow: 'dark-lg', // Remove any focus box-shadow
            }}
            borderBottom="2px solid #5fbae9"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {/* <FormControl mt="3">
          <FormLabel>Phone</FormLabel>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </FormControl> */}
        <FormControl mt="3">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            focusBorderColor="transparent"
            value={password}
            colorScheme="white"
            bg='#f6f6f6'
            _focus={{
              borderBottomColor: '#5fbae9', // Change the bottom border color on focus
              boxShadow: 'dark-lg', // Remove any focus box-shadow
            }}
            borderBottom="2px solid #5fbae9"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Flex justifyContent="center">
          <Button mt="4" colorScheme="#cceaf" bg='#56baed' onClick={handleLogin}  _hover={{boxShadow: 'dark-lg', }}>
            Login
            
          </Button>

          {/* <Button mt="4" m="4" colorScheme="#56baed" bg='#56baed' onClick={handleRegister} _focus={{boxShadow: 'dark-lg', }} >
            Register
          </Button> */}
        </Flex>

        {/* {showUnauthorizedAlert && (
          <CustomStyledAlert
            title="Unauthorized"
            description="Please log in"
            status="warning"
          />
        )} */}

        {showWrongPasswordAlert && (
          <CustomStyledAlert
            title="Wrong credentials"
            description="try again"
            status="error"
          />
        )}

        {loginSuccess && (
          <CustomStyledAlert
            title="Log in!"
            description="Login Successful"
            status="success"
          />
        )}
      </Box>
    </Center>

  );
};

export default Login;

