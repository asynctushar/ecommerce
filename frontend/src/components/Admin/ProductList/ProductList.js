import './ProductList.css';
import { Fragment, useEffect } from 'react';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { clearDeleteProductStatusAction, getAdminAllProductsAction, deleteProductAction } from '../../../redux/actions/productAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminAllProducts, deleteProductStatus } = useSelector(state => state.productState);
    const { error } = useSelector(state => state.appState);

    useEffect(() => {
        dispatch(getAdminAllProductsAction());

        if (deleteProductStatus) {
            alert.success("Product Deleted Successfully.");
            navigate("/admin/dashboard");
            dispatch(clearDeleteProductStatusAction());
        }

    }, [dispatch, deleteProductStatus, adminAllProducts]); // eslint-disable-line react-hooks/exhaustive-deps

    if (error) {
        alert.error(error.response.data);

        dispatch(clearErrorAction());
    }

    const deleteProduct = (id) => {
        dispatch(deleteProductAction(id));
    }

    const columns = [
        { field: 'id', headerName: "Product Id", minWidth: 250, flex: .8 },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 350,
            flex: 1
        },
        {
            field: 'stock',
            headerName: 'Stock',
            minWidth: 120,
            flex: .3,
            type: "number"
        },
        {
            field: 'price',
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: .5
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: .3,
            minWidth: 150,
            sortable: false,
            type: 'number',
            renderCell: (params) => {
                return (
                    <Fragment>
                        < Link to={`/admin/product/${params.row.id}`}>
                            <Edit />
                        </Link >
                        <Button onClick={() => deleteProduct(params.row.id)} >
                            <Delete />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = []

    adminAllProducts && adminAllProducts.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    })


    return (
        <Fragment>
            <MetaData title="All Products-Admin" />
            <div className="dashboard">
                <SideBar />
                <div className="productlist-container">
                    <h1 className="productlist-heading">All Products</h1>
                    <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick pageSize={10} rowsPerPageOptions={[10]} className="productlist-table" />
                </div>
            </div>
        </Fragment>
    )
}
export default ProductList;