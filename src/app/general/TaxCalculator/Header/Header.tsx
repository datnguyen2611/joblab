import { Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import React from 'react';
import useStyles from './styles';

const Header = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  const queryString = require("query-string");
  const parsed = queryString.parse(history.location.search);
  
  return (
    <header className={styles.mainHeader}>
      <Container maxWidth="lg">
        <h1 className={styles.headerTitle}>Income tax calculator {parsed.country || 'Hong Kong'}</h1>
        <h2 className={styles.headerTitleDes}>Find out how much your salary is after tax</h2>
      </Container>
    </header>
  );
};

export default Header;