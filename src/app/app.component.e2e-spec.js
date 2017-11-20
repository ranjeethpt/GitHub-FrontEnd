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
});
