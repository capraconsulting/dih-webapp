/* eslint-disable new-cap */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.Should();
chai.use(chaiAsPromised);

const client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'firefox'
    }
});


module.exports = function () { // eslint-disable-line
    this.Then(/^I expect that element "(.*)" does exist$/, (selector, done) =>
        client
            .waitForExist(selector, 1000)
            .elements(selector)
            .then(elements => {
                console.log('aofjaopsfkoajgoakfomaofgmakgmafwmqgkomafmopmgkosamkgamkomagod');
                console.log(elements);
                done();
            })
    );

    this.Then(/^I expect that element "(.*)" does not exist$/, (selector, done) =>
        client
            .waitForExist(selector, 1000, true)
            .elements(selector)
            .then(elements => {
                console.log('aofjaopsfkoajgoakfomaofgmakgmafwmqgkomafmopmgkosamkgamkomagod');
                console.log(elements);
                done();
            })
    );

    this.Then(/^I expect that title is equal to "(.*)"$/, (title, done) =>
        client
            .getTitle()
            .then(response => {
                console.log(response);
                console.log(title);
                done();
            })
    );
};
