import React, {useState, useEffect, useCallback, useRef} from "react";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import * as notification from 'actions/Notification';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

function createData(id, alertName, alertType, industries, keyword) {
  return { id, alertName, alertType, industries, keyword };
}


export default function DataTable(props) {
  const { jobAlertList } = props;
  const [rows, setRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  
  const columns = [
    //{ field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'alertName',
      headerName: 'Job Alert Name',
      minWidth: 300,
      editable: false,
      hide: false,
    },
    {
      field: 'alertType',
      headerName: 'Job Alert Type',
      minWidth: 300,
      editable: false,
      hide: false,
      valueFormatter: (params: GridValueFormatterParams) => {
        if(params.value == 1) {
          return "Daily";
        } else if (params.value == 2) {
          return "Weekly";
        } else if (params.value == 3) {
          return "Monthly";
        } else {
          return params.value;
        }
      }
    },
    {
      field: 'industries',
      headerName: 'Industries',
      minWidth: 300,
      editable: false,
      hide: false,
      renderCell: (params: GridValueFormatterParams) => {
        return <div>{params.value.map(v => <Typography>{v.name}</Typography>)}</div>;
        //var data = params.value.map(v => <div style={dis}>{v.name}</div>)
        //return data;
      }
    },
    {
      field: 'keyword',
      headerName: 'Keyword',
      minWidth: 300,
      editable: false,
      hide: false,
    },
    {
      field: 'btn',
      width: 100,
      editable: false,
      hide: false,
      sortable: false,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
        </Tooltip>
      ),
    }
  ];

  var createTableData = (data) =>{
    if(data != null) {
      var alertData = [];
      data.forEach(jobAlert => {
        alertData.push(createData(jobAlert._id, jobAlert.alertName, jobAlert.alertType||1, jobAlert.industry, jobAlert.keywords||""))
      })
      setRows(alertData);
    }
  }

  var handleRowSelection = (items) => {
    setDeletedRows([...deletedRows, ...rows.filter((r) => items.includes(r.id))]);
  };
  
  var handleDelete = () => {
    var data = {
      jobAlerts : deletedRows.map(row => row.id)
    };
    axios.post('/api/candidates/delete/jobalert', data)
      .then(resp => {
        if(resp.data.isSuccess)
        {
          notification.success("You have deleted job alert successfully.");
          setRows(rows.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1));   
        }
        else {
          notification.error("The action cannot be performed at the moment. Please try again later.");
        }
      })
  };
  
  
  useEffect(() => {
    if(jobAlertList.length > 0) {
      createTableData(jobAlertList);
    }
  }, [jobAlertList]);
  
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={handleRowSelection}
        disableColumnMenu
      />
    </div>
    
  );
}