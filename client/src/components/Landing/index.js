import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container maxW={'3xl'}>
      <Stack as={Box} textAlign={'center'} py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Build your own <br />
          <Text as={'span'} color={'green.400'}>
            PERSONALISED TEAMS
          </Text>
        </Heading>
        <Flex justify={'center'}>
          <Link to="/login">
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              m={2}
              _hover={{
                bg: 'green.500',
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              colorScheme={'green'}
              bg={'red.400'}
              rounded={'full'}
              px={6}
              m={2}
              _hover={{
                bg: 'red.500',
              }}
            >
              Register
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
