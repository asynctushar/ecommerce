import { Fragment, useEffect, useState } from 'react';
import './ResetPassword.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../../redux/actions/userAction';
import Loader from '../../Loader/Loader';
import { useNavigate, useParams } from 'react-router';
import { useAlert } from 'react-alert';
import { clearErrorAction } from '../../../redux/actions/appAction';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { isUpdated, forgotPasswordMessage } = useSelector(state => state.userState);
    const { error, isLoading } = useSelector(state => state.appState);
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8 && confirmPassword.length < 8) {
            return alert.show('Password length should be minimum 8 characters');
        }

        if (password !== confirmPassword) {
            return alert.show("New password doesn't match with confirm password");
        }

        dispatch(resetPasswordAction(token, { password, confirmPassword }))
    }

    useEffect(() => {
        if (isUpdated) {
            alert.success(forgotPasswordMessage.message);
            navigate('/login');
        }
    }, [dispatch, isUpdated, forgotPasswordMessage]);

    if (error) {
        alert.show(error.response.data.message);
        dispatch(clearErrorAction());
    }

    return (
        <Fragment >
            {isLoading ? <Loader /> :
                <div className="update-password">
                    <div className="update-form-container">
                        <h3 className="update-password-heading">Reset password</h3>
                        <form className="update-password-form" onSubmit={updatePasswordSubmit}>
                            <div className="regPassword">
                                <LockOpenIcon />
                                <input type="password" name="password" placeholder="New Password" value={password} required onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="regConfirmPassword">
                                <LockOpenIcon />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button className="update-password-button">
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default UpdatePassword;