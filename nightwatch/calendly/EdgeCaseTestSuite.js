describe('Edge Case Test Suite', function() {
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
  
    it.skip('Should test the boundaries for an event with custom duration', function(browser) {
        let event_name = "9-Vinh Nguyen's Meeting";
        let event_name_selector = "9-Vinh Nguyen\\'s Meeting";
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
            .pause()
            .setValue("input[name='customEventDuration']",721) // set custom duration to 721
            .isVisible("xpath","//div[@data-testid='duration-form']/div/div/div/div[4]//div[contains(text(),'Error')]") // verify error message is shown
            .setValue("input[name='customEventDuration']",720) // set custom duration to 720
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click continue
            .waitForElementPresent("div[data-testid='event-type-editor'] button[aria-label='Close']", 10000)
            .click("div[data-testid='event-type-editor'] button[aria-label='Close']") // close notification
            .waitForElementPresent("div[data-testid='event-type-editor'] div:first-child button",10000, function() {
                this.click("xpath","/html/body/div[6]/div[2]/div/div/div/div[1]/div/div/div[1]/div/button") // click done
            })
            .waitForElementPresent(`button[aria-label='${event_name_selector}']`, 10000)
            .assert.visible(`button[aria-label='${event_name_selector}']`) // verify event card is created
    });

    it.skip('Should test the boundaries for an event with custom description', function(browser) { //todo: figure out how to stop nightwatch upon failure
        let event_name = "10-Vinh Nguyen's Meeting";
        let event_name_selector = "10-Vinh Nguyen\\'s Meeting";
        event_name_selectors.push(event_name_selector)
        const invalidLargeTextInput = "a".repeat(10001);
        const validLargeTextInput = "a".repeat(993);
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
            .click("button[data-calendly-label='event_details_section']") // click event details
            .waitForElementPresent("div[class='ql-editor ql-blank']")
            .pause()
            .execute(function(invalidLargeTextInput) { // set description to exceed maximum large text input
                const element = document.querySelector('div.ql-editor.ql-blank');
                element.innerHTML = invalidLargeTextInput;
              }, [invalidLargeTextInput])
            .waitForElementPresent("xpath","//form//div[contains(text(),'Is too long')]",10000)
            .isVisible("xpath","//form//div[contains(text(),'Is too long')]") // verify error message is shown
            .pause()
            .execute(function(validLargeTextInput) { // set description to exceed maximum large text input
                const element = document.querySelector('div.ql-editor');
                element.innerHTML = validLargeTextInput;
              }, [validLargeTextInput])
            .click("div[data-testid='event-type-editor-footer'] button:nth-of-type(2)") // click save and close
            .pause(5000)
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
  