/**
 * This page is purely for testing components, making sure new features work,
 * etc.
 */

import React from 'react'

import CreateOppFormComponent from '../opportunities/create/form'

class TestbedPage extends React.Component {
  render() {
    return (
      <CreateOppFormComponent linked={false} account={{name: 'TestName'}} />
    );
  }
}

export default TestbedPage;
