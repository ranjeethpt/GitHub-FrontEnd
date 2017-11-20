/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

describe('App', function () {

    beforeEach(function () {
        browser.get('/');
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual("GitHub - API");
    });

    it('should have <main>', function () {
        expect(element(by.css('my-app main')).isPresent()).toEqual(true);
    });

    it('should have a main title', function () {
        expect(element(by.css('main h1')).getText()).toEqual('Editor!');
    });
});
