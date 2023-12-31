import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // let copyState = { ...state };
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:

            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        //POSITION
        case actionTypes.FETCH_POSITION_START:
            // state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            // let copyState = { ...state };
            state.positions = action.data;
            // state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:

            // state.isLoadingGender = false;
            state.positions = [];
            return {
                ...state,
            }

        //ROLE
        case actionTypes.FETCH_ROLE_START:
            // state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            // let copyState = { ...state };
            state.roles = action.data;
            // state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:

            // state.isLoadingGender = false;
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer; 