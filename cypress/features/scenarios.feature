Scenario: P001 Send data from the registration form to the endpoint
Given user has filled all required fields
When the form is submitted
Then the data are sent to the endpoint
And the request body matches the user inputs

Scenario: P002 Submit the registration form with random data
Given user has filled all required fields
When the submit button is clicked
Then the form is submitted

Scenario: P003 Trigger validation of the registration form
Given user has opened the registration form
When the submit button is clicked on without filling required fields
Then the validation is triggered
And error messages are displayed

Scenario: P004 Display the registration form on a responsive device (iphone-8)
Given user has opened the registration form on a tablet
When the form is displayed in the tablet resolution
Then all fields and buttons are visible
And the page fits the screen

Scenario: P005 Display the registration form on a responsive device (ipad-2)
Given user has opened the registration form on a tablet
When the form is displayed in the tablet resolution
Then all fields and buttons are visible
And the page fits the screen

Scenario: P006 Test validation of the email address field
Given user has opened the registration form
When an invalid email address is provided
Then the error message is displayed

Scenario: P007 Open Zendesk chat modal
Given user has opened the registration form
When the Zendesk chat button is clicked
Then the Zendesk chat modal is displayed

Scenario: P008 Use Zendesk chat modal
Given user has opened the Zendesk chat modal
When all required fields are filled
Then it is possible to chat with the customer support

Scenario: P009 Display Zendesk on mobile in fullscreen mode
Given user has clicked on the Zendesk chat button
When the Zendesk chat modal is opened on a mobile device
Then it is displayed in a fullscreen mode

Scenario: P010 Mandatory Terms&Conditions checkbox
Given user has opened the registration form
When the mandatory checkbox is not checked
Then an error message is displayed
And it is not possible to submit the form

Scenario: P011 Allow Latin-only characters
Given user has filled a input field
When other than Latin script is inserted
Then an error message is displayed

Scenario: P012 Phone number validation
Given user has opened the registration form
When other than numbers in the approved range are inserted
Then an error message is displayed

Scenario: P013 Email address validation
Given user has opened the registration form
When an invalid email address is inserted
Then an error message is displayed

Scenario: P014 Display Country drop-down list
Given user has opened the registration form
When a string is filled in the form
Then a drop-down list that starts with the string is displayed

Scenario: P015 Display Platform drop-down list
Given user has opened the registration form
When the Platform field is clicked on
Then a drop-down list is displayed

Scenario: P016 Display Account drop-down list
Given user has opened the registration form
When the Account field is clicked on
Then a drop-down list is displayed

Scenario: P017 Display Leverage drop-down list
Given user has opened the registration form
When the Leverage field is clicked on
Then a drop-down list is displayed

Scenario: P018 Display Currency drop-down list
Given user has opened the registration form
When the Currency field is clicked on
Then a drop-down list is displayed

Scenario: P019 Initial balance validation
Given user has opened the registration form
When the Initial balance field is provided with a number outside of the permitted range
Then an error message is displayed

Scenario: P020 Possible to complete the form using tabbing navigation
Given user has opened the registration form
When the tabbing navigation is used
Then the next element is focused on
And it is possible to submit the registration form using just a keyboard

Scenario: P021 Change border-color and font color for valid fields
Given user has filled a field in the registration form
When the input is valid
Then the border-color changes to green
And the font color changes to green

Scenario: P022 Change border-color and font color for invalid fields
Given user has filled a field in the registration form
When the input is invalid
Then the border-color changes to red
And the font color changes to red

Scenario: P023 Privacy policy links
Given user has opened the registration form
When the links in page footer are clicked on
Then the correct page is opened
