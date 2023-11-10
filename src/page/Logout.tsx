import React, { useState, useEffect, useRef } from 'react';
import { Center, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure } from '@chakra-ui/react';

const LogoutPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onOpen();
  }, []);

  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const handelCancell=()=>{
    onClose();
    window.location.href = "/";
    
  }
  const handleLogout = () => {
    setIsLoading(true);
    // Simulate logout process
    document.cookie = `access_token=expired; max-age=0; path=/`;
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      window.location.href = "/";
    }, 1500); // Simulated delay of 1.5 seconds

    window.location.href = "/login";
  };

  return (
    <Center height="100vh">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Logout</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="green" boxShadow="dark-lg"  onClick={handelCancell} >
                Cancel
              </Button>
              <Button colorScheme="red" boxShadow="dark-lg" onClick={handleLogout} ml={3} isLoading={isLoading}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};

export default LogoutPage;
