import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors,
    saveDetailInfoDoctorService, getAllSpecialty, getAllClinic, saveDetailInfoClinicService,
    deleteClinicService, saveDetailInfoSpecialtyService, deleteSpecialtyService, getAllHandbook, saveDetailInfoHandbookService, deleteHandbookService
}
    from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

//gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        }
        catch (e) {
            fetchGenderFail(e);
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        }
        catch (e) {
            fetchPositionFail(e);
            console.log('fetchPositionStart error', e)
        }
    }
}

export const fetchPositionSuccess = (posData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: posData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        }
        catch (e) {
            fetchRoleFail(e);
            console.log('fetchRoleStart error', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFail());
            }
        }
        catch (e) {
            saveUserFail(e);
            console.log('saveUserFail error', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserFail = () => ({
    type: 'CREATE_USER_FAILED'
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all user error")
                dispatch(fetchAllUsersFail());
            }
        }
        catch (e) {
            toast.error("fetch all user error")
            fetchAllUsersFail(e);
            console.log('fetchAllUsersFail error', e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a new user succeed")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete a new user error");
                dispatch(deleteUserFail());
            }
        }
        catch (e) {
            toast.error("Delete a new user error")
            deleteUserFail(e);
            console.log('deleteUserFail error', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const deleteClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success("Delete a clinic succeed")
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete a clinic error");
                dispatch(deleteClinicFail());
            }
        }
        catch (e) {
            toast.error("Delete a clinic error")
            deleteClinicFail(e);
            console.log('delete Clinic Fail error', e)
        }
    }
}
export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS
})
export const deleteClinicFail = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
})
export const deleteSpecialty = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(clinicId);
            if (res && res.errCode === 0) {
                toast.success("Delete a specialty succeed")
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete a specialty error");
                dispatch(deleteSpecialtyFail());
            }
        }
        catch (e) {
            toast.error("Delete a specialty error")
            deleteSpecialtyFail(e);
            console.log('delete specialty Fail error', e)
        }
    }
}
export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})
export const deleteSpecialtyFail = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})
export const deleteHandbook = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteHandbookService(clinicId);
            if (res && res.errCode === 0) {
                toast.success("Delete a handbook succeed")
                dispatch(deleteHandbookSuccess());
            } else {
                toast.error("Delete a handbook error");
                dispatch(deleteHandbookFail());
            }
        }
        catch (e) {
            toast.error("Delete a handbook error")
            deleteHandbookFail(e);
            console.log('delete handbook Fail error', e)
        }
    }
}
export const deleteHandbookSuccess = () => ({
    type: actionTypes.DELETE_HANDBOOK_SUCCESS
})
export const deleteHandbookFail = () => ({
    type: actionTypes.DELETE_HANDBOOK_FAILED
})
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {

                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update user error");
                dispatch(editUserFail());
            }
        }
        catch (e) {
            toast.error("Update user error")
            editUserFail(e);
            console.log('editUserFail error', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
            console.log('Top doctors error', e)
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
            console.log('get all doctors error', e)
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInfoDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save info doctor succeed!")
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save info doctor failed")
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
                })
            }
        }
        catch (e) {
            toast.error("Save info doctor failed")
            dispatch({
                type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
            })
            console.log('save info doctor error', e)
        }
    }
}
export const saveDetailClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInfoClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Save info clinic succeed!")
                dispatch({
                    type: actionTypes.SAVE_INFO_CLINIC_SUCCESS,
                })
            } else {
                toast.error("Save info clinic failed")
                dispatch({
                    type: actionTypes.SAVE_INFO_CLINIC_FAILED,
                })
            }
        }
        catch (e) {
            toast.error("Save info clinic failed")
            dispatch({
                type: actionTypes.SAVE_INFO_CLINIC_FAILED,
            })
            console.log('save info clinic error', e)
        }
    }
}
export const saveDetailSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInfoSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success("Save info specialty succeed!")
                dispatch({
                    type: actionTypes.SAVE_INFO_SPECIALTY_SUCCESS,
                })
            } else {
                toast.error("Save info specialty failed")
                dispatch({
                    type: actionTypes.SAVE_INFO_SPECIALTY_FAILED,
                })
            }
        }
        catch (e) {
            toast.error("Save info specialty failed")
            dispatch({
                type: actionTypes.SAVE_INFO_SPECIALTY_FAILED,
            })
            console.log('save info specialty error', e)
        }
    }
}
export const saveDetailHandbook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInfoHandbookService(data);
            if (res && res.errCode === 0) {
                toast.success("Save info handbook succeed!")
                dispatch({
                    type: actionTypes.SAVE_INFO_HANDBOOK_SUCCESS,
                })
            } else {
                toast.error("Save info spechandbookialty failed")
                dispatch({
                    type: actionTypes.SAVE_INFO_HANDBOOK_FAILED,
                })
            }
        }
        catch (e) {
            toast.error("Save info handbook failed")
            dispatch({
                type: actionTypes.SAVE_INFO_HANDBOOK_FAILED,
            })
            console.log('save info handbook error', e)
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        }
        catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
            console.log('FETCH_ALLCODE_SCHEDULE_TIME error', e)
        }
    }
}
export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START,
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInfoFailed())
            }
        }

        catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed())
            console.log('fetchRequiredDoctorInfoFailed: ', e)
        }
    }
}
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})