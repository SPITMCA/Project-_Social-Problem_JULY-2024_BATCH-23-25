import httpService from "./http.service"


const uploadImage = (data) => {
    console.log(data.get("file"));

    return httpService.post("gallery/create", data)
        .then(res => {
            console.log(res);
            return true;
        }).catch(err => {
            console.log(err.response.data);
            return true;
        })
}

export default {
    uploadImage
};