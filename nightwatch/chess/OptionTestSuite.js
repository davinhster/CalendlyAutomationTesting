const request = require('request');

describe('Verify chess option buttons are working', function() {
    const hrefs = ["href='/library'","href='/explorer'","href='/solo-chess'","href='/vision'","href='/votechess'","href='/play/apps'","href='https://www.chesskid.com'","href='/videos'","href='/games'","href='/terms'","href='/learn-how-to-play-chess'","href='/resources'","href='https://chesscomshop.com'","href='/membership/gift'","href='https://chesscom.shop'","href='/computer-chess-championship'"];

    it('Should verify that each option is visible and working', function(browser) {
        browser
            .navigateTo("https://chess.com")
            .waitForElementVisible("button[aria-label='More'",10000)
            .moveToElement("button[aria-label='More'",0,0)
            .pause(1000)
            .assert.visible("button[aria-label='More']")
            .elements("css selector", "div.nav-panel-shade a", function(result) {
                if (result.value.length > 0) {
                    let options = result.value
                    options.forEach(function(option) {
                        let keys = Object.keys(option)
                        console.log(keys)
                        browser.elementIdAttribute(option[keys], "href", function(result) {
                            let href = result.value
                            console.log(href)
                            // curl href and get status code
                            request({ url: href, followRedirect: true }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log('Status code for', href, ":", response.statusCode);
                                } else {
                                    console.log('Error for', href, ":", error);
                                }
                            });
                        })
                    })
                } else {
                    console.log("ERROR: Unable to find options")
                }
            })
            for (let i = 0; i < hrefs.length; i++) {
                browser.isPresent("a[" + hrefs[i] + "]")
            }

        });


});
  