import React, { useEffect, useState } from 'react';
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
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { getPlayer, editPlayer } from '../../actions/players';

const EditPlayer = ({
  getPlayer,
  editPlayer,
  player: { player },
  isAuthenticated,
  match,
}) => {
  useEffect(() => {
    getPlayer(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (!player) return;

    setFormData({
      name: player.name,
      position: player.position,
      age: player.age,
      gender: player.gender,
    });
  }, [player]);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    age: '',
    gender: '',
  });

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const { name, position, age, gender } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editPlayer(match.params.id, formData);
  };

  return (
    <Flex minH={'100vh'} justify={'center'} bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Edit a player</Heading>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder={name}
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
                placeholder={position}
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
                placeholder={age}
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
                placeholder={gender}
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
              Save Player
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

EditPlayer.propTypes = {
  getPlayer: PropTypes.func.isRequired,
  editPlayer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  player: state.players,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, getPlayer, editPlayer })(
  EditPlayer
);
