describe('Create Event Error Handling Tests', function() {
    var event_name_selectors = [];
    before(function(browser) {
        browser.window.maximize();
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
  
    it.skip('Should show error when creating event invalid minimum notice', function(browser) {
        let event_name = "6-Vinh Nguyen's Meeting";
        let event_name_selector = "6-Vinh Nguyen\\'s Meeting";
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
            .waitForElementPresent("div[name='minimum_notice'] button",10000, function() {
                this.click("div[name='minimum_notice'] button") // click on minimum notice
            })
            .setValue("div[name='minimum_notice'] button  + div input",-1) // set minimum notice to -1 hour
            .waitForElementPresent("xpath","//div[@name='minimum_notice']/div/div/div/div[2]",10000)
            .isVisible("xpath","//div[@name='minimum_notice']/div/div/div/div[2]") // verify error message is shown
            .setValue("div[name='minimum_notice'] button  + div input",1) // set minimum notice to 1 hour
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(5000)
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000, function() {
                this.click("xpath","/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[1]/div/button") // click done
            })
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should create an event with invalid daily limit', function(browser) {
        let event_name = "7-Vinh Nguyen's Meeting";
        let event_name_selector = "7-Vinh Nguyen\\'s Meeting";
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
            .setValue("div[name='daily_limit'] button + div input",'hi') // set daily limit to string
            .waitForElementPresent("xpath","//div[@name='daily_limit']/div/div/div/div[2]") 
            .isVisible("xpath","//div[@name='daily_limit']/div/div/div/div[2]") // verify error message is shown
            .pause()
            .setValue("div[name='daily_limit'] button + div input",10) // set daily limit to 10
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(5000) // pause for calendly to save event configuration
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000, function() {
                this.click("xpath","/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[1]/div/button") // click done
            })
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should create an event with invalid custom duration', function(browser) {
        let event_name = "8-Vinh Nguyen's Meeting";
        let event_name_selector = "8-Vinh Nguyen\\'s Meeting";
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
            .setValue("input[name='customEventDuration']",-1) // set custom duration to -1
            .isVisible("xpath","//div[@data-testid='duration-form']/div/div/div/div[4]//div[contains(text(),'Error')]") // verify error message is shown
            .setValue("input[name='customEventDuration']",1) // set custom duration to 1
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click continue
            .waitForElementPresent("div[data-testid='event-type-editor'] button[aria-label='Close']", 10000)
            .click("div[data-testid='event-type-editor'] button[aria-label='Close']") // close notification
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
  