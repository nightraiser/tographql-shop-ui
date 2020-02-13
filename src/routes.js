import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/details/:id',
        component: Details
    },
    {
        path: '/mycart',
        component: Cart,
    }
]

export default routes;