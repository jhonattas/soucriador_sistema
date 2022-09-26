/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'

/* public */
import LoginPage from '@/pages/public/LoginPage'
import LogoutPage from '@/pages/public/LogoutPage'

/** admin */
import AdminDashboard from '@/pages/admin/DashboardAdmin'
/** categories */
import AdminCategoriesList from '@/pages/admin/categories/CategoriesList'
import AdminCategoryDetails from '@/pages/admin/categories/CategoryDetails'
import AdminCategoryEdit from '@/pages/admin/categories/CategoryEdit'
import AdminCategoryNew from '@/pages/admin/categories/CategoryNew'
/** products */
import AdminProductsList from '@/pages/admin/products/ProductsList'
import AdminProductNew from '@/pages/admin/products/ProductNew'
import AdminProductEdit from '@/pages/admin/products/ProductEdit'
import AdminProductDetails from '@/pages/admin/products/ProductDetails'
import AdminProductCategories from '@/pages/admin/products/ProductCategories'
import AdminProductCategoriesLink from '@/pages/admin/products/ProductCategoriesLink'
import AdminProductImages from '@/pages/admin/products/images/ProductImagesList'
import AdminProductImageNew from '@/pages/admin/products/images/ProductImageUpload'

import AdminFeaturedImageEdit from '@/pages/admin/featuredImages/FeaturedImageEdit'
import AdminFeaturedImageList from '@/pages/admin/featuredImages/FeaturedImageList'
import AdminFeaturedImageUpload from '@/pages/admin/featuredImages/FeaturedImageUpload'

import AdminProductImageEdit from '@/pages/admin/products/images/ProductImageEdit'
/** subcategories */
import AdminSubcategories from '@/pages/admin/subcategories/SubcategoriesList'
import AdminSubcategoryEdit from '@/pages/admin/subcategories/SubcategoryEdit'
import AdminSubcategoryNew from '@/pages/admin/subcategories/SubcategoryNew'
/** Sellers */
import AdminPartners from '@/pages/admin/partners/PartnersList'
import AdminPartnerDetails from '@/pages/admin/partners/PartnerDetails'
import AdminPartnerNew from '@/pages/admin/partners/PartnerNew'
import AdminPartnerEdit from '@/pages/admin/partners/PartnerEdit'
import AdminPartnerAvatarUpdate from '@/pages/admin/partners/profile/AvatarUpdate'
import AdminPartnerProductLink from '@/pages/admin/partners/PartnerProductLink'
/** Contacts */
import AdminContacts from '@/pages/admin/contacts/ContactsList'

Vue.use(Router)

export default new Router({
    routes: [
        /** publics */
        {
            path: '/',
            name: 'index',
            component: AdminDashboard
        },
        {
            path: '/admin/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/admin/logout',
            name: 'logout',
            component: LogoutPage
        },
        /** admin components  */
        {
            path: '/admin',
            name: 'admin_dashboard',
            component: AdminDashboard
        },
        /** categories */
        {
            path: '/admin/categories',
            name: 'admin_categories',
            component: AdminCategoriesList
        },
        {
            path: '/admin/category/:id',
            name: 'admin_category_details',
            component: AdminCategoryDetails
        },
        {
            path: '/admin/category/:id/edit',
            name: 'admin_category_edit',
            component: AdminCategoryEdit
        },
        {
            path: '/admin/category/new',
            name: 'admin_category_new',
            component: AdminCategoryNew
        },
        /** products */
        {
            path: '/admin/product/:id',
            name: 'admin_product_details',
            component: AdminProductDetails
        },
        {
            path: '/admin/product_categories/:id',
            name: 'admin_product_categories',
            component: AdminProductCategories
        },
        {
            path: '/admin/product_categories/:id/new',
            name: 'admin_product_categories_link',
            component: AdminProductCategoriesLink
        },
        {
            path: '/admin/product/:id/edit',
            name: 'admin_product_edit',
            component: AdminProductEdit
        },
        {
            path: '/admin/product/new',
            name: 'admin_product_new',
            component: AdminProductNew
        },
        {
            path: '/admin/products',
            name: 'admin_products',
            component: AdminProductsList
        },
        {
            path: '/admin/product/:id/images',
            name: 'admin_product_images',
            component: AdminProductImages
        },
        {
            path: '/admin/product/:id/images/new',
            name: 'admin_product_image_new',
            component: AdminProductImageNew
        },
        {
            path: '/admin/product/:id/image/edit',
            name: 'admin_product_image_edit',
            component: AdminProductImageEdit
        },
        /** subcategories */
        {
            path: '/admin/category/:id/subcategories',
            name: 'admin_subcategories',
            component: AdminSubcategories
        },
        {
            path: '/admin/subcategory/:id',
            name: 'admin_subcategory_edit',
            component: AdminSubcategoryEdit
        },
        {
            path: '/admin/category/:id/subcategory/new',
            name: 'admin_subcategory_new',
            component: AdminSubcategoryNew
        },
        {
            path: '/admin/partners/',
            name: 'admin_partners',
            component: AdminPartners
        },
        {
            path: '/admin/partners/new',
            name: 'admin_partner_new',
            component: AdminPartnerNew
        },
        {
            path: '/admin/partner/:id',
            name: 'admin_partner_details',
            component: AdminPartnerDetails
        },
        {
            path: '/admin/partner/:id/edit',
            name: 'admin_partner_edit',
            component: AdminPartnerEdit
        },
        {
            path: '/admin/partner/:id/avatar/update',
            name: 'admin_partner_avatar_update',
            component: AdminPartnerAvatarUpdate
        },
        {
            path: '/admin/partner_product/:id',
            name: 'admin_partner_product_link',
            component: AdminPartnerProductLink
        },
        {
            path: '/admin/contacts/',
            name: 'admin_contacts',
            component: AdminContacts
        },
        {
            path: '/admin/featured_image/',
            name: 'admin_featured_images',
            component: AdminFeaturedImageList
        },
        {
            path: '/admin/featured_image/:id/edit',
            name: 'admin_featured_image_edit',
            component: AdminFeaturedImageEdit
        },
        /** all */
        {
            path: '*',
            component: AdminDashboard
        }
    ],
    mode: 'history'
})