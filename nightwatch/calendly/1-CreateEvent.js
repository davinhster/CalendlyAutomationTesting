describe('Create Event with no customization', function() {
    var event_name = "1-Vinh Nguyen's Meeting";
    var event_name_selector = "1-Vinh Nguyen\\'s Meeting";
    before(function(browser) {
        browser
            .navigateTo('https://calendly.com/')
            .waitForElementPresent('button#onetrust-accept-btn-handler', 10000)
            .click("button#onetrust-accept-btn-handler") // accept cookies
            .click("a[href='/login'] span:first-child") // click login button
            .waitForElementPresent("input[type='email']", 10000)
            .setValue("input[type='email']",process.env.USERNAME)  // enter username
            .click("button[type='submit']") // click login
            .waitForElementPresent("input[type='password']", 10000)
            .setValue("input[type='password']",process.env.PASSWORD) // enter password
            .click("button[type='submit']") // click continue
    });
  
    it('Should create an event with no customization', function(browser) {
        browser
            .waitForElementPresent("a[href*='event_types/new']",10000)
            .execute(function() { // using this function since click() doesnt support * locators
                document.querySelector("a[href*='event_types/new']").click(); // create new event
            })
            .waitForElementPresent("tr[data-component='one-on-one'] button:first-child", 10000)
            .click("tr[data-component='one-on-one'] button:first-child") // select one on one meeting
            .waitForElementPresent("div[role='dialog'] button:nth-of-type(2)", 10000)
            .click("div[role='dialog'] button:nth-of-type(2)") // select next
            .waitForElementPresent("form input", 10000)
            .setValue("form input#event-name-field",event_name) // name event
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click continue
            .waitForElementPresent("div[data-testid='event-type-editor'] button[aria-label='Close']", 10000)
            .click("div[data-testid='event-type-editor'] button[aria-label='Close']") // close notification
            .click("div[data-testid='event-type-editor'] div:first-child button") // click done
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    after(function(browser) {
        browser
            .click(`button[aria-label='${event_name_selector} settings']`) // click on gear icon
            .click(`button[aria-label='${event_name_selector} settings'] + div button:nth-of-type(5)`) // click on delete
            .click("div[role='dialog'] button:nth-of-type(2)") // click delete
            .waitForElementNotPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.not.elementPresent(`button[aria-label='${event_name_selector}']`) // verify event card has been deleted
            .end()
    });
});
  