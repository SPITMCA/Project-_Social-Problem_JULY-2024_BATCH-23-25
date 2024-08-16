import httpService from "./http.service"

const getAttendance = async (eventId) => {
    try {
        const attendance = await httpService.get("attendance/event/" + eventId);
        console.log(attendance, 'res');
        if (attendance.data.length == 0) return -1;
        if (attendance.data[0].actualAttendance == true) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);

        return false;
    }
}

const setAttendance = async (eventId, status) => {
    try {
        const attendance = await httpService.post("attendance/create", { eventId, status })
        if (attendance.data.attendance) {
            return true;
        }
    } catch (error) {
        return false;
    }
}

export default {
    getAttendance,
    setAttendance
};