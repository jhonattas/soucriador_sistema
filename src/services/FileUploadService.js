import * as axios from 'axios'

const BASE_URL = process.env.API_URL

function upload(formData, id) {
    const url = `${BASE_URL}partner_avatar_upload/${id}`
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/avatar/${img.id}` })))
}

function uploadFeatured(formData, productUrl, description, token) {
    const url = `${BASE_URL}featured_image_upload`
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}`, product_url: productUrl, description: description })))
}

export { upload }
export { uploadFeatured }