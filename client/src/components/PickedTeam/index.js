import React from 'react';
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

const PickedTeam = ({ position, players, removeFromTeam }) => {
  return (
    <Box w="50%">
      <Table variant="striped" colorScheme="green">
        <TableCaption>{position}</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Position</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {players
            ? players.map((player, idx) => {
                return (
                  <Tr key={idx} h={'50px'}>
                    <Td fontWeight={'bold'}>{player.name}</Td>
                    <Td>{player.position}</Td>
                    <Td>{player.age}</Td>
                    <Td>{player.gender}</Td>
                    <Td>
                      <Button
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'red.400'}
                        _hover={{
                          bg: 'red.500',
                        }}
                        onClick={() => removeFromTeam(player)}
                      >
                        Remove from Team
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            : null}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PickedTeam;
