describe('Create Event Tests', function() {
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
  
    it.skip('Should create an event with no customization', function(browser) {
        let event_name = "1-Vinh Nguyen's Meeting";
        let event_name_selector = "1-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
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

    it.skip('Should create an event with buffer time', function(browser) {
        let event_name = "2-Vinh Nguyen's Meeting";
        let event_name_selector = "2-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
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
            .click("button[data-calendly-label='scheduling_settings_section']") // click scheduling settings
            .click("div[name='buffer_time'] button") // click on buffer time
            .click("div[aria-labelledby='before_buffer_label']") // select before buffer
            .waitForElementPresent("div[aria-labelledby='before_buffer_label'] + div button:nth-of-type(4)",10000)
            .click("div[aria-labelledby='before_buffer_label'] + div button:nth-of-type(4)") // select 15 minutes
            .click("div[aria-labelledby='after_buffer_label']") // select after buffer
            .waitForElementPresent("div[aria-labelledby='after_buffer_label']+ div button:nth-of-type(4)",10000)
            .click("div[aria-labelledby='after_buffer_label']+ div button:nth-of-type(4)") // select 15 minutes
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(2000) // pause for calendly to save event configuration
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000)
            .click("div[data-testid='event-type-editor'] div:first-child button") // click done
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should create an event with minimum notice', function(browser) {
        let event_name = "3-Vinh Nguyen's Meeting";
        let event_name_selector = "3-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
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
            .click("button[data-calendly-label='scheduling_settings_section']") // click scheduling settings
            .click("div[name='minimum_notice'] button") // click on minimum notice
            .setValue("div[name='minimum_notice'] button  + div input",1) // set minimum notice to 1 hour
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(2000) // pause for calendly to save event configuration
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000)
            .click("div[data-testid='event-type-editor'] div:first-child button") // click done
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should create an event with daily limit', function(browser) {
        let event_name = "4-Vinh Nguyen's Meeting";
        let event_name_selector = "4-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
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
            .click("button[data-calendly-label='scheduling_settings_section']") // click scheduling settings
            .click("div[name='daily_limit'] button") // click on daily limit
            .setValue("div[name='daily_limit'] button + div input",10) // set daily limit to 10
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(2000) // pause for calendly to save event configuration
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000)
            .click("div[data-testid='event-type-editor'] div:first-child button") // click done
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should create an event with custom duration', function(browser) {
        let event_name = "5-Vinh Nguyen's Meeting";
        let event_name_selector = "5-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
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
            .click("div[aria-labelledby='duration-label']")
            .click("div[aria-labelledby='duration-label'] + div button:nth-of-type(5)")
            .setValue("input[name='customEventDuration']",1) // set custom duration to 1
            .click("div[name='customEventDurationType']") // expand duration types
            .click("div[name='customEventDurationType'] + div button:nth-of-type(2)") // select hrs
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click continue
            .waitForElementPresent("div[data-testid='event-type-editor'] button[aria-label='Close']", 10000)
            .click("div[data-testid='event-type-editor'] button[aria-label='Close']") // close notification
            .click("div[data-testid='event-type-editor'] div:first-child button") // click done
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
  