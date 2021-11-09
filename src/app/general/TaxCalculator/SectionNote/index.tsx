import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const SectionNote = (props: any) => {
  const styles = useStyles();
  const history = useHistory();
  const queryString = require("query-string");
  const parsed = queryString.parse(history.location.search);

  return (
    <section className={styles.sectionNote}>
      NOTE* Withholding is calculated based on the tables of {parsed.country || 'Hong Kong'}, income
      tax. For simplification purposes some variables (such as marital status
      and others) have been assumed. This document does not represent legal
      authority and shall be used for approximation purposes only.
    </section>
  );
};

export default SectionNote;
