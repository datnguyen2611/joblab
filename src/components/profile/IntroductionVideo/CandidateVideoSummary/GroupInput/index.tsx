import React from "react";
import useStyles from "./styles";

const GroupInput = (props: any) => {
  const styles = useStyles();
  const {defaultValue, onChangeValue, uiHeader, subTitleHeader, subTitleDescription} = props;

  return (
    <>
      <div className={styles.formViewSwitcher}>
        <h5 className={styles.uiHeader}>{uiHeader}</h5>
        <div className={styles.formElements}>
          <div className={styles.containerDescription}>
            <div className={styles.subTitleHeader}>
              {subTitleHeader}
            </div>
            <div className={styles.subTitleDescription} dangerouslySetInnerHTML={{__html: subTitleDescription}}></div>
          </div>
          <div className={styles.containerTextArea}>
            <textarea
              className={styles.textAreaInput}
              placeholder="Type here"
              spellCheck="false"
              defaultValue={defaultValue}
              onChange={(e) => onChangeValue(e.target.value)}
            >
            </textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupInput;
