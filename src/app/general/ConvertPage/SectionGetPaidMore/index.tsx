import { Link } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const SectionGetPaidMore = (props: any) => {
  const styles = useStyles();

  return (
    <section className={styles.sectionGetPaidMore}>
      <div className={styles.contentBox}>
        <div className={styles.bagImage}>
          <img src="https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/bag.png" alt="" />
        </div>
        <div className={styles.grText}>
          <div>Ready to make more money?</div>
          <div>Start your job search today</div>
        </div>
        <div className={styles.clearfix}></div>
        <Link href="/joblist" className={styles.linkGet}>
          Get Paid More
        </Link>
      </div>
    </section>
  );
};

export default SectionGetPaidMore;
