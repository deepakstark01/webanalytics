import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Collapse,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LuFuel } from "react-icons/lu";
import { FcAndroidOs, FcGlobe } from "react-icons/fc";
import {
  AiOutlineDashboard,
  AiOutlineCar,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { PiUserListDuotone } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";
import {FaCar} from "react-icons/fa";
import { FcParallelTasks } from "react-icons/fc";
import { useState } from "react"; // Import useState
import LogoutPage from "../../page/Logout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  const [selectedOption, setSelectedOption] = useState("Web");

  const handleChangeDrop = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <Box>
      {/* top header */}
      <Box
        bg="gray.800"
        color="white"
        py={4}
        px={8}
        shadow="md"
        zIndex={999}
        position="fixed"
        top={0}
        left={0}
        right={0}
        md="10"
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            <Link to="/">Dashboard</Link>
          </Text>
          <Icon
            as={isOpen ? AiOutlineClose : AiOutlineMenu}
            boxSize={8}
            onClick={() => setIsOpen(!isOpen)}
            display={["block", "none"]} // Show on mobile screens, hide on larger screens
            cursor="pointer"
          />
        </Flex>
      </Box>

      <Box
        bg="gray.800"
        color="white"
        py={4}
        // px={8}
        shadow="md"
        position="fixed"
        h="100vh"
        w="250px"
        zIndex={998}
        display={[isOpen ? "block" : "none", "block"]} // Show on mobile when menu is open, always show on larger screens
        top="68px" // Adjust this value to match the header's height
        // left={isOpen ? 0 : '-250px'}
      >
        <Flex justify="space-between" align="center" p="4">
          <Text fontSize="md" fontWeight="bold">
            <Link to="/">Automartz Dashboard</Link>
          </Text>
          <Icon
            as={isOpen ? AiOutlineClose : AiOutlineMenu}
            boxSize={8}
            onClick={() => setIsOpen(!isOpen)}
            cursor="pointer"
          />
          {/* Add your responsive menu toggle button here */}
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <VStack spacing={4} mt={4} align="start" px={8}>
            <Link to="/">
              <HStack spacing={2}>
                <Icon as={AiOutlineDashboard} />
                <Text>Dashboard</Text>
              </HStack>
            </Link>
            <Link to="/vehiclelog">
              <HStack spacing={2}>
                <Icon as={AiOutlineCar} />
                <Text>Vehiclelog</Text>
              </HStack>
            </Link>
            <Link to="/users">
              <HStack spacing={2}>
                <Icon as={PiUserListDuotone} />
                <Text>Users Stats</Text>
              </HStack>
            </Link>

            <Link to="/webimpressions">
              <HStack spacing={2}>
                <Icon as={TbHandClick} />
                <Text color={"white"}>Web</Text>
              </HStack>
            </Link>
            <Link to="/webevents">
              <HStack spacing={2}>
                <Icon as={FcGlobe} />
                <Text>Web Events</Text>
              </HStack>
            </Link>
            <Link to="/vendorsview">
              <HStack spacing={2}>
                <Icon as={FaCar} />
                <Text>Same Car</Text>
              </HStack>
            </Link>
            <Link to="/androidimpressions">
              <HStack spacing={2}>
                <Icon as={TbHandClick} />
                <Text>Android</Text>
              </HStack>
            </Link>
            <Link to="/actions">
              <HStack spacing={2}>
                <Icon as={FcAndroidOs} />
                <Text>Android Events</Text>
              </HStack>
            </Link>
          
            {/* onClick={handleLogout} */}
            <Link id="logout" onClick={handleLogoutClick}>
              <HStack spacing={2}>
                <Icon as={BiLogOut} />
                <Text>Log out</Text>
              </HStack>
            </Link>
          </VStack>
        </Collapse>
      </Box>
      {isLogoutOpen && <LogoutPage />}
    </Box>
  );
};

export default Navbar;
