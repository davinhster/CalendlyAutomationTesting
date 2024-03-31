## How to Run Nightwatch Test Suite

To run the Nightwatch test suite, follow these steps:

1. Download the and unzip the project

2. In your terminal navigate to the root project directory

3. Download the dependencies:
    ```sh
    npm install
    ```

4. set up a .env file in the root project directory for Calendly login:
    ```sh
    USERNAME=<username>
    PASSWORD=<password>
    ```

5. Run the following command:

   ```sh
   npx nightwatch nightwatch/calendly/BasicEventTestSuite.js
   ```