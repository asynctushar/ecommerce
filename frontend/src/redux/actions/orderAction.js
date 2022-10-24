import axios from "axios";
import appSlice from "../slices/appSlice";
import orderSlice from "../slices/orderSlice";

const { setError, setLoader } = appSlice.actions;
const { createNewOrder } = orderSlice.actions;

// Add to cart
export const createNewOrderAction = (order) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/order/new', order, { headers: { "Content-Type": "application/json" } });
        
        dispatch(createNewOrder(data.order));
        dispatch(setLoader(false));
        
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}