import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId })
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    {
        return axios.put('/api/edit-user', inputData);
    }
}
const deleteClinicService = (clinicId) => {

    return axios.delete(`/api/delete-clinic`, {
        data: {
            id: clinicId
        }
    });
}
const deleteSpecialtyService = (specialtyId) => {

    return axios.delete(`/api/delete-specialty`, {
        data: {
            id: specialtyId
        }
    });
}
const deleteHandbookService = (handbookId) => {

    return axios.delete(`/api/delete-handbook`, {
        data: {
            id: handbookId
        }
    });
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailInfoDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}
const saveDetailInfoClinicService = (data) => {
    return axios.post('/api/save-info-clinics', data)
}
const saveDetailInfoSpecialtyService = (data) => {
    return axios.post('/api/save-info-specialties', data)
}
const saveDetailInfoHandbookService = (data) => {
    return axios.post('/api/save-info-handbooks', data)
}
const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-info-doctors-byId?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraDoctorInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?id=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?id=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id-location?id=${data.id}&location=${data.location}`)
}
const getDetailSpecialtyById = (inputId) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${inputId}`)
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getDetailClinicById = (inputId) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${inputId}`)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const createNewHandbook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}
const getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`)
}
const getAllDetailHandbookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}
const getDetailHandbookById = (id) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${id}`)
}
const postPrescription = (data) => {
    return axios.post('/api/send-prescription', data)
}
const getSpecialtyBySearch = (search) => {
    return axios.get(`/api/get-all-specialty-by-search?search=${search}`)
}
const getDoctorBySearch = (search) => {
    return axios.get(`/api/get-all-doctor-by-search?search=${search}`)
}
const getClinicBySearch = (search) => {
    return axios.get(`/api/get-all-clinic-by-search?search=${search}`)
}
const getHandbookBySearch = (search) => {
    return axios.get(`/api/get-all-handbook-by-search?search=${search}`)
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    deleteClinicService, deleteSpecialtyService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailInfoDoctorService,
    saveDetailInfoClinicService,
    getDetailInfoDoctor, getDetailSpecialtyById,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraDoctorInfoById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty,
    getAllDetailSpecialtyById, createNewClinic,
    getAllClinic, getAllDetailClinicById,
    getDetailClinicById, saveDetailInfoHandbookService,
    getListPatientForDoctor, createNewHandbook,
    getAllHandbook, getAllDetailHandbookById, getDetailHandbookById,
    postPrescription, saveDetailInfoSpecialtyService, deleteHandbookService,
    getSpecialtyBySearch, getDoctorBySearch, getClinicBySearch, getHandbookBySearch
}

