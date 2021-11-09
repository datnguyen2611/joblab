import React from "react";
import { Container } from "@material-ui/core";
import NumberFormat from "react-number-format";
import useStyles from "./styles";

const Header = (props: any) => {
  const styles = useStyles();
  const { data } = props;

  return (
    <header className={styles.mainHeader}>
      <Container maxWidth="lg">
        <h1 className={styles.headerTitle}>
          Annual / Monthly / Weekly / Hourly Converter
        </h1>
        <h2 className={styles.headerTitleDes}>
          <NumberFormat
            value={data?.salary}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"HK$"}
            decimalScale={2}
          />{" "}
          a {data?.start} is how much per {data?.end}?
        </h2>
      </Container>
    </header>
  );
};

export default Header;
