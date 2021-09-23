import React from 'react';
import { Alert as AlertBanner, AlertIcon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map(alert => (
    <AlertBanner key={alert.id} status={alert.alertType}>
      <AlertIcon />
      {alert.msg}
    </AlertBanner>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
