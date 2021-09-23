import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { addPlayer } from '../../actions/players';
import PropTypes from 'prop-types';

const AddPlayer = ({ isAuthenticated, addPlayer }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    age: '',
    gender: '',
  });

  const { name, position, age, gender } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addPlayer(formData);
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Flex minH={'100vh'} justify={'center'} bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Add a player</Heading>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="position">
              <FormLabel>Position</FormLabel>
              <Input
                type="text"
                placeholder="Position"
                name="position"
                value={position}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="age">
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                placeholder="Age"
                name="age"
                value={age}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Input
                type="text"
                placeholder="Gender"
                name="gender"
                value={gender}
                onChange={onChange}
                required
              />
            </FormControl>
            <Button
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
              onClick={onSubmit}
            >
              Add Player
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

AddPlayer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, addPlayer })(AddPlayer);
