import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./SideBar";




function ProductList() {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    dispatch(getAdminProduct());

  }, [dispatch, error, alert])

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },


    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}><EditIcon /></Link>

            <Button><DeleteIcon /></Button>
          </Fragment>
        )
      }
    },
  ];

  const rows = [];

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
    })
  });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 className='productListHeading'>ALL PRODUCT</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />

        </div>
      </div>
    </>
  )
}

export default ProductList