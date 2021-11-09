import React from 'react';

const TrueFalseIcon = ({checker}) => {

  return (
    <div>
      { checker == true ?
          <font size="4"><i style={{'color':'green'}} className="fas fa-check mr-2"/></font> 
          : ((checker == false) ? <font size="4"><i style={{'color':'red'}} className="fas fa-times mr-2"/></font> : "N/A")
      }
    </div>
  );
}

export default TrueFalseIcon;