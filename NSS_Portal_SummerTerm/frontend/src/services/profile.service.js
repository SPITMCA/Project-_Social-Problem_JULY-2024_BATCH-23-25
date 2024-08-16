import httpService from "./http.service"

const updateUser = async (uid, year, course) => {
    try {
        const updatedUser = await httpService.put("profile/update", { uid, course, year });
        return true;
    } catch (error) {
        return false;
    }
}

const getProfile = async () => {
    try {
        const profile = await httpService.get("profile/profile");
        if (profile.data) {
            return profile.data;
        } else return false;
    } catch (error) {
        console.log(error, 'profile');
        return false;
    }
}

export default {
    updateUser,
    getProfile
}