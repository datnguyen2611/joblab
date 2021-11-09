import { Button } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";

type Props = {
  dataCountries: Array<{
    id: number;
    country: string;
    net_pay: number;
    average_tax: number;
    rank: number;
    acronym: string;
  }>;
};

const TableCountries: React.FC<Props> = ({ dataCountries }: Props) => {
  const styles = useStyles();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <table className={styles.tableCountries}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Net Pay</th>
            <th>Average Tax</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {dataCountries?.map((item, index) => {
            if (showMore) {
              return (
                <tr key={item.id}>
                  <td>
                    <div className={styles.groupImage}>
                      <img
                        className={styles.iconAcronym}
                        src={`https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/flags_16/${item.acronym}.png`}
                        alt=""
                      />
                      {item.country}
                    </div>
                  </td>
                  <td>{item.net_pay}</td>
                  <td>{item.average_tax}%</td>
                  <td>
                    <span
                      className={`${
                        index === dataCountries?.length - 1
                          ? styles.leastRank
                          : ""
                      } ${index === 0 ? styles.bestRank : ""}`}
                    >
                      {item.rank}
                    </span>
                  </td>
                </tr>
              );
            } else {
              if (index >= dataCountries?.length - 3 || index < 3) {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.groupImage}>
                        <img
                          className={styles.iconAcronym}
                          src={`https://jobslab-media.s3.ap-east-1.amazonaws.com/web/picture/taxCalculator/flags_16/${item.acronym}.png`}
                          alt=""
                        />
                        {item.country}
                      </div>
                    </td>
                    <td>HKD {item.net_pay}</td>
                    <td>{item.average_tax}%</td>
                    <td>
                      <span
                        className={`${
                          index === dataCountries?.length - 1
                            ? styles.leastRank
                            : ""
                        } ${index === 0 ? styles.bestRank : ""}`}
                      >
                        {item.rank}
                      </span>
                    </td>
                  </tr>
                );
              }
            }
          })}
        </tbody>
      </table>
      {!showMore && dataCountries?.length > 6 && (
        <div className={styles.tableShowMore}>
          <Button
            onClick={() => setShowMore(true)}
            className={styles.btnShowMore}
          >
            Show more
          </Button>
        </div>
      )}
    </>
  );
};

export default TableCountries;
