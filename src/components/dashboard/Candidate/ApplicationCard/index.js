import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import ApplicationItem from './ApplicationItem';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';


import {Badge} from 'reactstrap';
//import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
//import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//import "@patternfly/react-core/dist/styles/base.css";
/*
import {
  DataToolbar,
  DataToolbarItem,
  DataToolbarContent,
  DataToolbarFilter,
  DataToolbarToggleGroup,
  DataToolbarGroup
} from "@patternfly/react-core/dist/esm/experimental";
import {
  Title,
  Select,
  SelectOption,
  SelectVariant,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Bullseye,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  InputGroup,
  TextInput,
  Button,
  ButtonVariant
} from "@patternfly/react-core";

import { SearchIcon, FilterIcon } from "@patternfly/react-icons";
import { Table, TableHeader, TableBody, TableVariant } from "@patternfly/react-table";
*/
class ApplicationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Job Title" },
        { title: "Company" },
        { title: "Last Update" },
        { title: "Status" },
        { title: "" }
      ],
      rows: [
        { cells: ["US-Node 1", "5", "25", "5", "Stopped"] },
        { cells: ["US-Node 2", "5", "30", "2", "Down"] },
        { cells: ["US-Node 3", "13", "35", "12", "Degraded"] },
        { cells: ["US-Node 4", "2", "5", "18", "Needs Maintainence"] },
        { cells: ["US-Node 5", "7", "30", "5", "Running"] },
        { cells: ["US-Node 6", "5", "20", "15", "Stopped"] },
        { cells: ["CZ-Node 1", "12", "48", "13", "Down"] },
        { cells: ["CZ-Node 2", "3", "8", "20", "Running"] },
        { cells: ["CZ-Remote-Node 1", "15", "20", "10", "Down"] },
        { cells: ["Bangalore-Node 1", "20", "30", "30", "Running"] }
      ],
    }
  }
  
  render() {
    const appList = this.props.appList;
    const { rows, columns } = this.state;
    
    return (
      <div className="jr-card">
        <div className="jr-card-header mb-3 d-flex">
          <h3 className="mb-0 mr-auto">Application List</h3>
          <span className="badge badge-secondary">{appList.length+" Application"+(appList.length>1 ? "s" : "")}</span>
        </div>
        <CustomScrollbars className="scrollbar" style={{height: 280}}>
          <div className="table-responsive-material applicationList-table-container">
            <div id="css_table">
              <div className="css_tr table-underline">
                <div className="css_th css_th--styled"></div>
                <div className="css_th css_th--styled"><h4>Job Title</h4></div>
                <div className="css_th css_th--styled"><h4>Company</h4></div>
                <div className="css_th css_th--styled"><h4>Last Update</h4></div>
                <div className="css_th css_th--styled"><h4>Status</h4></div>
              </div>
              {
                  appList.map(app => {
                    return (
                      <ApplicationItem key={app._id} data={app}/>
                    );
                  })
              }
              
            </div>
            {
              appList.length <= 0 ?
                  <div className="recordNotFound notfound" style={{height:'200px'}}>
                  <img src={encodeURI(WEB_IMAGE_URL+"candidate/dashboard/notfound.png")}/>
                    <span>
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                        &nbsp; No Record Found.
                    </span> 
                  </div>
                : ""
            }
            {/*<Table
              cells={columns}
              rows={rows}
              variant={TableVariant.compact}
              aria-label="Compact Table"
              borders={false}
            >
              <TableHeader />
              <TableBody />
            </Table>*/}
          
            {/*<table className="project-list-table table remove-table-border mb-0 applicationList-scroll">
              <thead>
                <tr>
                  <th scope="col">Job Title</th>
                  <th scope="col">Company</th>
                  <th scope="col">Last Update</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              
              <tbody>
                {appList.map(app => {
                  return (
                    <ApplicationItem key={app._id} data={app}/>
                  );
                })}
              </tbody>
            </table>*/}
            {/*<Link to={"/candidate/applications"} className="float-md-right"><span>See All</span> <i className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`}/></Link>*/}
          </div>
        </CustomScrollbars>
      </div>
    );
  }
};

export default ApplicationCard;