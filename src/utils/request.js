import HTTPREQUEST from "./http"

export const getYear = (data) => {
    return HTTPREQUEST.get('/view/year', data)
}

export const saveText = (data) => {
    return HTTPREQUEST.post('/view/text', data)
}