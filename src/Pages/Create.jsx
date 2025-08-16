import React, { Fragment } from 'react';
import Create from '../Components/Create/Create';
import Header from '../Components/Header/Header';

const CreatePage = () => {
  return (
    <Fragment>
      <Header/>
      <main>
        <Create />
      </main>
    </Fragment>
  );
};

export default CreatePage;
