import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";


function SideBar() {
  return (
    <div className="sidebar">

      {/* Home Page Link */}
      <Link to="/"><img src={logo} alt="E-commerce" /></Link>

      {/* Dashboard Link */}
      <Link to="/admin/dashboard" ><p><DashboardIcon />Dashboard</p></Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products" >

            {/* All Product view Link */}
            <Link to="/admin/products" >
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            {/* Create Product Link */}
            <Link to="/admin/product" >
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      {/* Orders view Link */}
      <Link to="/admin/orders" >
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>

      {/* User View Link */}
      <Link to="/admin/users" >
        <p><PeopleIcon />Users</p>
      </Link>

      <Link to="/admin/reviews" >
        <p><RateReviewIcon />Reviews</p>
      </Link>
    </div>
  )
}

export default SideBar