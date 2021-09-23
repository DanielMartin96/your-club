import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTeams, removeTeam } from '../../actions/teams';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from '@chakra-ui/react';

const TeamsTable = ({ getTeams, removeTeam, auth, teams }) => {
  useEffect(() => {
    if (auth.user === null) return;

    const { email } = auth.user;

    getTeams(email);
  }, [auth.user, getTeams]);

  return (
    <Box mt={6} rounded={'lg'} bg={'white'} boxShadow={'lg'} p={4}>
      <Table variant="striped" colorScheme="green">
        <TableCaption>Your teams</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age Group</Th>
            <Th>Gender</Th>
            <Th>Formation</Th>
            <Th>Players</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.map((team, idx) => {
            return (
              <Tr key={idx}>
                <Td fontWeight={'bold'}>{team.name}</Td>
                <Td>{team.ageGroup}</Td>
                <Td>{team.gender}</Td>
                <Td>{team.formation}</Td>
                <Td>{team.players.length}</Td>
                <Td>
                  <Link to={`/edit-team/${team._id}`}>
                    <Button
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'yellow.400'}
                      _hover={{
                        bg: 'yellow.500',
                      }}
                    >
                      Edit Team
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Button
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'red.400'}
                    _hover={{
                      bg: 'red.500',
                    }}
                    onClick={() => {
                      removeTeam(team._id);
                      setTimeout(() => {
                        window.location.reload();
                      }, 3000);
                    }}
                  >
                    Delete Team
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

TeamsTable.propTypes = {
  auth: PropTypes.object,
  teams: PropTypes.array,
};

const mapStateToProps = state => ({
  auth: state.auth,
  teams: state.teams.teams,
});

export default connect(mapStateToProps, { getTeams, removeTeam })(TeamsTable);
