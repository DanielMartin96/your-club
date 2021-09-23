import React, { useState, useEffect } from 'react';
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
import { getTeam, editTeam } from '../../actions/teams';
import PropTypes from 'prop-types';
import PlayersTable from '../PlayersTable';
import PickedTeam from '../PickedTeam';

const EditTeam = ({
  isAuthenticated,
  getTeam,
  editTeam,
  team: { team },
  match,
}) => {
  useEffect(() => {
    getTeam(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (!team) return;

    setFormData({
      name: team.name,
      ageGroup: team.ageGroup,
      gender: team.gender,
      formation: team.formation,
      players: team.players,
    });
  }, [team]);

  const [formData, setFormData] = useState({
    name: '',
    ageGroup: '',
    gender: '',
    formation: '',
    players: [],
  });

  const { name, ageGroup, gender, formation, players } = formData;

  const addToTeam = player => {
    setFormData({ ...formData, players: [...players, player] });
  };

  const removeFromTeam = player => {
    setFormData({
      ...formData,
      players: players.filter(person => person.name !== player.name),
    });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    editTeam(match.params.id, formData);
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Flex justify={'center'} bg={'gray.50'} wrap={'wrap'}>
      <Box>
        <Stack spacing={8} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Team Details</Heading>
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
              <FormControl id="ageGroup">
                <FormLabel>Age Group</FormLabel>
                <Input
                  type="text"
                  placeholder="Age Group"
                  name="ageGroup"
                  value={ageGroup}
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
              <FormControl id="formation">
                <FormLabel>Formation</FormLabel>
                <Input
                  type="number"
                  placeholder="Formation"
                  name="formation"
                  value={formation}
                  onChange={onChange}
                  required
                />
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Pick Your Players</Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <PlayersTable addToTeam={addToTeam} />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Your Squad</Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <PickedTeam
              players={players.filter(
                player => player.position === 'Goalkeeper'
              )}
              removeFromTeam={removeFromTeam}
              position={'Goalkeepers'}
            />
            <PickedTeam
              players={players.filter(player => player.position === 'Defender')}
              removeFromTeam={removeFromTeam}
              position={'Defenders'}
            />
            <PickedTeam
              players={players.filter(
                player => player.position === 'Midfielder'
              )}
              removeFromTeam={removeFromTeam}
              position={'Midfielders'}
            />
            <PickedTeam
              players={players.filter(player => player.position === 'Forward')}
              removeFromTeam={removeFromTeam}
              position={'Forwards'}
            />
          </Box>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Button
              w={'100%'}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
              onClick={onSubmit}
            >
              Save Team
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

EditTeam.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getTeam: PropTypes.func.isRequired,
  editTeam: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  team: state.teams,
});

export default connect(mapStateToProps, { setAlert, getTeam, editTeam })(
  EditTeam
);
