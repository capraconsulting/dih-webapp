/* eslint-disable new-cap */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.Should();
chai.use(chaiAsPromised);

module.exports = function () { // eslint-disable-line
    this.Then(/^I expect that element "(.*)" does exist$/, (selector) =>
        browser.elements(selector).value.should.have.length.above(0)
    );

    this.Then(/^I expect that element "(.*)" does not exist$/, (selector) =>
        browser.elements(selector).value.should.deep.equal([])
    );

    this.Then(/^I expect that title is equal to "(.*)"$/, (title) =>
        browser.getTitle().should.be.equal(title)
    );
};
