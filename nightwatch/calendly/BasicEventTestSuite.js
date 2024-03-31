describe('Basic Event Test Suite', function() {
    var event_name_selectors = [];
    before(function(browser) {
        browser
            .navigateTo('https://calendly.com/')
            .waitForElementPresent('button#onetrust-accept-btn-handler', 10000)
            .click("button#onetrust-accept-btn-handler") // accept cookies
            .click("a[href='/login'] span:first-child") // click login button
            .waitForElementPresent("input[type='email']", 10000)
            .setValue("input[type='email']",process.env.USERNAME)  // enter username
            .waitForElementPresent("button[type='submit']", 10000)
            .click("button[type='submit']") // click login
            .waitForElementPresent("input[type='password']", 10000)
            .setValue("input[type='password']",process.env.PASSWORD) // enter password
            .click("button[type='submit']") // click continue
            .waitForElementPresent("div[class^='event-type-group-list-item user-item']",10000)
    });
  
    it('Should create an event with basic settings', function(browser) {
        let event_name = "1-Vinh Nguyen's Meeting";
        let event_name_selector = "1-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)

        // Create an event with valid event_name and basic configurations
        browser
            .waitForElementPresent("a[href*='event_types/new']",10000)
            .execute(function() { // using this function since click() doesnt support * locators
                document.querySelector("a[href*='event_types/new']").click(); // create new event
            })
            .waitForElementPresent("tr[data-component='one-on-one'] button:first-child", 10000)
            .click("tr[data-component='one-on-one'] button:first-child") // select one on one meeting
            .waitForElementPresent("div[role='dialog'] button:nth-of-type(2)", 10000)
            .click("div[role='dialog'] button:nth-of-type(2)") // select next
            .waitForElementPresent("form input#event-name-field", 10000)
            .setValue("form input#event-name-field","")
            .sendKeys('form input#event-name-field', browser.Keys.ENTER)
            .isPresent("xpath","//div[contains(text(),'Please provide an event name.')]")
            .setValue("form input#event-name-field",event_name) // name event
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click continue
            .waitForElementPresent("div[data-testid='event-type-editor'] button[aria-label='Close']", 10000)
            .click("div[data-testid='event-type-editor'] button[aria-label='Close']") // close notification

        // Edge Case - No input
        let emptyInput = "";
        browser
            .waitForElementPresent("button[data-calendly-label='event_details_section']",10000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",emptyInput)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .refresh()
            .isPresent("h1[data-testid='event-name-display']")
        
        // Edge Case - Input exceeds max character limit
        let exceedMaxInput = "a".repeat(1000);
        browser
            .waitForElementPresent("button[data-calendly-label='event_details_section']",10000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",exceedMaxInput)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .isPresent("xpath","//div[contains(text(),'maximum is 55 characters')]")
            .setValue("input#event-name-field",event_name)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .pause(3000) // save
            .refresh()

        // Edge Case - Input is exactly the max character limit
        let exactInput = "a".repeat(55);
        browser
            .waitForElementPresent("button[data-calendly-label='event_details_section']",10000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",exactInput)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .pause(3000) // save
            .refresh()

        // Symbol test
        let varietyInput = "!@#[]%^&*()+-=_%#<>?.,/`~:;{}|";
        browser
            .waitForElementPresent("button[data-calendly-label='event_details_section']",10000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",varietyInput)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .pause(3000) // save
            .refresh()

        //SQL Injection Test
        let sqlQuery = "'; DROP TABLE users; --";
        let sqlQuerySelector = "\\'; DROP TABLE users; --";
        browser
            .waitForElementPresent("button[data-calendly-label='event_details_section']",10000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",sqlQuery)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .pause(3000) // save
            .navigateTo("https://calendly.com/event_types/user/me")
            .pause(3000) // let page load
            .isPresent("xpath","//p[contains(text(),'Vinh')]")
            .click(`button[aria-label='${sqlQuerySelector}'`)
            .pause(3000)
            .click("button[data-calendly-label='event_details_section']")
            .waitForElementPresent("input#event-name-field",10000)
            .pause(1000)
            .setValue("input#event-name-field",event_name)
            .sendKeys('input#event-name-field', browser.Keys.ENTER)
            .pause(3000) // save
        
        // Revert the event name after all the input tests
        browser
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000, function() {
                this.click("xpath","/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[1]/div/button") // click done
            })
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    after(function(browser) {
        browser.navigateTo("https://calendly.com/event_types/user/me")
        .waitForElementPresent("div[class^='event-type-group-list-item user-item']",10000)
        for (let event_name_selector of event_name_selectors) {
            browser
                .click(`button[aria-label='${event_name_selector} settings']`) // click on gear icon
                .click(`button[aria-label='${event_name_selector} settings'] + div button:nth-of-type(5)`) // click on delete
                .click("div[role='dialog'] button:nth-of-type(2)") // click delete
                .waitForElementNotPresent(`button[aria-label='${event_name_selector}']`, 10000)
                .assert.not.elementPresent(`button[aria-label='${event_name_selector}']`) // verify event card has been deleted
        }
    });
});
  