import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _f2fcac3a = () => import('..\\..\\frontend\\pages\\posts\\new.vue' /* webpackChunkName: "pages_posts_new" */).then(m => m.default || m)
const _2f545986 = () => import('..\\..\\frontend\\pages\\manage\\signin.vue' /* webpackChunkName: "pages_manage_signin" */).then(m => m.default || m)
const _59b8a357 = () => import('..\\..\\frontend\\pages\\posts\\edit.vue' /* webpackChunkName: "pages_posts_edit" */).then(m => m.default || m)
const _e615dff4 = () => import('..\\..\\frontend\\pages\\posts\\scratchs.vue' /* webpackChunkName: "pages_posts_scratchs" */).then(m => m.default || m)
const _c29e8010 = () => import('..\\..\\frontend\\pages\\posts\\tag\\_tag.vue' /* webpackChunkName: "pages_posts_tag__tag" */).then(m => m.default || m)
const _1d5ce00d = () => import('..\\..\\frontend\\pages\\posts\\_slug.vue' /* webpackChunkName: "pages_posts__slug" */).then(m => m.default || m)
const _4e0d600c = () => import('..\\..\\frontend\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/posts/new",
			component: _f2fcac3a,
			name: "posts-new"
		},
		{
			path: "/manage/signin",
			component: _2f545986,
			name: "manage-signin"
		},
		{
			path: "/posts/edit",
			component: _59b8a357,
			name: "posts-edit"
		},
		{
			path: "/posts/scratchs",
			component: _e615dff4,
			name: "posts-scratchs"
		},
		{
			path: "/posts/tag/:tag?",
			component: _c29e8010,
			name: "posts-tag-tag"
		},
		{
			path: "/posts/:slug?",
			component: _1d5ce00d,
			name: "posts-slug"
		},
		{
			path: "/",
			component: _4e0d600c,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
