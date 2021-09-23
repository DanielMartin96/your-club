import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <>
      <Link to="/add-player">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.300'}
          _hover={{
            bg: 'green.400',
          }}
        >
          Add Player
        </Button>
      </Link>
      <Link to="/add-team">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.500'}
          _hover={{
            bg: 'green.600',
          }}
        >
          Add Team
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.600'}
          _hover={{
            bg: 'green.700',
          }}
        >
          Dashboard
        </Button>
      </Link>
    </>
  );

  const loginAndRegister = (
    <>
      <Link to="/login">
        <Button fontSize={'sm'} fontWeight={400}>
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.400'}
          _hover={{
            bg: 'green.500',
          }}
        >
          Register
        </Button>
      </Link>
    </>
  );

  const signOut = (
    <Link to="/">
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'red.400'}
        _hover={{
          bg: 'red.500',
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </Link>
  );

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}
      >
        <Stack align={'center'} direction={'row'} spacing={6}>
          <Link to="/">
            <Text
              fontFamily={'heading'}
              fontWeight={'bold'}
              color={useColorModeValue('gray.800', 'white')}
            >
              YourClub
            </Text>
          </Link>
          {isAuthenticated ? authLinks : null}
        </Stack>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {isAuthenticated ? signOut : loginAndRegister}
        </Stack>
      </Flex>
    </Box>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
