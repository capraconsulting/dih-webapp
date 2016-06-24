class Page {
    constructor() {
        this.title = 'Dråpen i havet';
    }

    open(path) {
        browser.url(browser.options.baseUrl + path);
    }
}

export default new Page();
