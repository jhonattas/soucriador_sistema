/* eslint-disable */
import Api from '@/services/Api'

export default {

    createCategory(dados, token) {
        return Api().post('category', dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updateCategory(dados, token, id) {
        return Api().put('category/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteCategory(token, id) {
        return Api().delete('category/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    /** subcategories */
    createSubCategory(id, dados, token) {
        return Api().post('subcategory/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updateSubCategory(dados, token, id) {
        return Api().put('subcategory/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteSubCategory(token, id) {
        return Api().delete('subcategory/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    /** products */
    findProductByCode(token, id) {
        return Api().get('productCode/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    findProductsByTerm(dados, token) {
        return Api().post('productSearch', dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    createProduct(dados, token) {
        return Api().post('product', dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updateProduct(dados, token, id) {
        return Api().put('product/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteProduct(token, id) {
        return Api().delete('product/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    /** product subcategories */
    createProductSubcategory(id, dados, token) {
        return Api().post('product_category/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteProductSubcategory(token, id) {
        return Api().delete('product_category/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    /** product subcategories */
    createProductImage(id, dados, token) {
        return Api().post('product_image/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updateProductImage(dados, token, id) {
        return Api().put('product_image/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteProductImage(token, id) {
        return Api().delete('product_image/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },

    createPartner(dados, token) {
        return Api().post('partner', dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updatePartner(dados, token, id) {
        return Api().put('partner/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deletePartner(token, id) {
        return Api().delete('partner/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    createPartnerProductLink(dados, token) {
        return Api().post('partner_product', dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updatePartnerProductLink(dados, token, id) {
        return Api().put('partner_product/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deletePartnerProduct(token, id) {
        return Api().delete('partner_product/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    },
    updateFeaturedImage(dados, token, id) {
        return Api().put('featured_image/' + id, dados, {
            headers: {
                'x-access-token': token
            }
        })
    },
    deleteFeaturedImage(token, id) {
        return Api().delete('featured_image/' + id, {
            headers: {
                'x-access-token': token
            }
        })
    }
}