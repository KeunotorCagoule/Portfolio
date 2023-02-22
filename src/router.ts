import {Router} from 'express';

const router = Router();

//* EXAMPLE ROUTE
/*router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    });
});
*/


router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home'
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact'
    });
});

export default router;