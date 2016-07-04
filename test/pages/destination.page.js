import page from './page';

module.exports = Object.create(page, {
    open: {
        value(id) {
            page.open.call(this, `/admin/destinations/${id}`);
        }
    }
});
