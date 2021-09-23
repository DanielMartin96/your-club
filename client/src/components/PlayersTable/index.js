import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlayers, removePlayer } from '../../actions/players';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
} from '@chakra-ui/react';

const PlayersTable = ({
  getPlayers,
  removePlayer,
  auth,
  players,
  addToTeam,
}) => {
  useEffect(() => {
    if (auth.user === null) return;

    const { email } = auth.user;

    getPlayers(email);
  }, [auth.user, getPlayers]);

  const params = window.location.pathname;

  return (
    <Box mt={6} rounded={'lg'} bg={'white'} boxShadow={'lg'} p={4}>
      <Table variant="striped" colorScheme="green">
        <TableCaption>Your players</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map((player, idx) => {
            return (
              <Tr key={idx} h={'50px'}>
                <Td fontWeight={'bold'}>{player.name}</Td>
                <Td>{player.position}</Td>
                <Td>{player.age}</Td>
                <Td>{player.gender}</Td>
                {params !== '/dashboard' ? (
                  <Td>
                    <Button
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'green.400'}
                      _hover={{
                        bg: 'green.500',
                      }}
                      onClick={() => addToTeam(player)}
                    >
                      Add To Team
                    </Button>
                  </Td>
                ) : (
                  <>
                    <Td>
                      <Link to={`/edit-player/${player._id}`}>
                        <Button
                          fontSize={'sm'}
                          fontWeight={600}
                          color={'white'}
                          bg={'yellow.400'}
                          _hover={{
                            bg: 'yellow.500',
                          }}
                        >
                          Edit Player
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
                          removePlayer(player._id);
                          setTimeout(() => {
                            window.location.reload();
                          }, 3000);
                        }}
                      >
                        Delete Player
                      </Button>
                    </Td>
                  </>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

PlayersTable.propTypes = {
  email: PropTypes.string,
  players: PropTypes.array,
};

const mapStateToProps = state => ({
  auth: state.auth,
  players: state.players.players,
});

export default connect(mapStateToProps, { getPlayers, removePlayer })(
  PlayersTable
);
