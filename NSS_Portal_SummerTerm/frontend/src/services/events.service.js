import httpService from "./http.service"

const allEvents = async () => {
    try {
        const eventsObj = await httpService.get("events/all");
        const eventsArr = eventsObj.data.eventsArr;

        return eventsArr;

    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}

const singleEvent = async (id) => {
    try {
        const eventObj = await httpService.get("events/" + id);

        const event = eventObj.data;
        console.log(event, 'data');

        return event;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}

export default {
    allEvents,
    singleEvent
}