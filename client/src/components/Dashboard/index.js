import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';
import PlayersTable from '../PlayersTable';
import TeamsTable from '../TeamsTable';

const Dashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Box>
      <Flex wrap={'wrap'} justify={'space-evenly'}>
        <PlayersTable />
        <TeamsTable />
      </Flex>
    </Box>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
