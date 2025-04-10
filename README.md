# ZettaProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Form JSON Structure Documentation

This document provides a detailed description of the JSON structure used to define a form, including its components, properties, and their intended use.

## Overview

The JSON structure represents a form configuration that includes metadata about the form and an array of fields for user input. Each field can have various types, validation rules, and dependencies.

## JSON Structure

The overall structure of the JSON is as follows:

```json
{
  "formInfo": {
    "title": "string"
  },
  "fields": [
    {
      "type": "string",
      "key": "string",
      "label": "string",
      "placeholder": "string (optional)",
      "validation": {
        // Validation rules (optional)
      },
      "validationDependencies": [
        {
          "field": "string",
          "value": "any",
          "validation": {
            // Validation rules (optional)
          }
        }
      ],
      "visibilityDependencies": [
        {
          "field": "string",
          "value": "any"
        }
      ],
      "options": [
        "string"
      ],
      "fields": [
        // Nested fields for Group types (optional)
      ]
    }
  ],
  "services": {
    "dataService": "string"
  }
}
```

### Components

1. **formInfo**: An object containing metadata about the form.
   - **title**: A string representing the title of the form.

2. **fields**: An array of field objects that define the input elements of the form. Each field object can have the following properties:

   - **type**: A string that specifies the type of input field. Common types include:
     - `"Text"`: A single-line text input.
     - `"Textarea"`: A multi-line text input.
     - `"Dropdown"`: A dropdown selection input.
     - `"Radio button"`: A set of radio buttons for selection.
     - `"Checkbox"`: A checkbox input.
     - `"Group"`: A group of related fields.

   - **key**: A string that serves as a unique identifier for the field.

   - **label**: A string that serves as the label for the field, displayed to the user.

   - **placeholder**: A string that provides a hint to the user about what to enter in the field (optional).

   - **validation**: An object that defines validation rules for the field (optional). Common validation rules include:
     - **required**: A boolean indicating if the field is mandatory.
     - **regex**: A regular expression to validate the format of the input.
     - **minLength**: Minimum number of characters required.
     - **maxLength**: Maximum number of characters allowed.

   - **validationDependencies**: An array of conditions that must be met for the field's validation to apply (optional). Each object in the array can have:
     - **field**: The key of the field that the dependency is based on.
     - **value**: The value that the field must have for the validation to apply.
     - **validation**: An object defining additional validation rules that apply when the dependency is met.

   - **visibilityDependencies**: An array of conditions that determine whether the field is visible (optional). Each object in the array can have:
     - **field**: The key of the field that the dependency is based on.
     - **value**: The value that the field must have for the field to be visible.

   - **options**: An array of strings representing the options for Dropdown and Radio button fields (optional).

   - **fields**: An array of nested field objects for Group types, allowing for the creation of complex forms with related fields (optional).

3. **services**: An object containing service-related information.
   - **dataService**: A string representing the endpoint URL for data handling.****

## Example

Here is a simplified example of a form JSON structure:

```json
{
  "formInfo": {
    "title": "Sample Form"
  },
  "fields": [
    {
      "type": "Text",
      "key": "firstName",
      "label": "First Name",
      "placeholder": "Enter your first name",
      "validation": {}
    },
    {
      "type": "Dropdown",
      "key": "state",
      "label": "State",
      "options": ["California", "Texas", "New York"],
      "validation": {}
    }
  ]
}
```

## Example 2

Here is more complicated example of a form JSON structure:

```json
{
    "formInfo": {
      "title": "Sample Form 2"
    },
    "fields": [
      {
        "type": "Text",
        "key": "firstName",
        "label": "First Name",
        "placeholder": "Enter your first name",
        "validation": {}
      },
      {
        "type": "Textarea",
        "key": "comments",
        "label": "Comments",
        "placeholder": "Write your comments here",
        "validation": {}
      },
      {
        "type": "Dropdown",
        "key": "state",
        "label": "State",
        "options": ["California", "Texas", "New York"],
        "validation": {}
      },
      {
        "type": "Radio button",
        "key": "subscriptionPlan",
        "label": "Subscription Plan",
        "options": ["Basic", "Premium"],
        "validation": {}
      },
      {
        "type": "Text",
        "key": "userEmail",
        "label": "Email Address",
        "validationDependencies": [
          {
            "field": "state",
            "value": "California",
            "validation": {
              "required": true
            }
          }
        ],
        "validation": {
          "regex": "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
        }
      },
      {
        "type": "Group",
        "key": "contactInfo",
        "label": "Contact Information",
        "fields": [
          {
            "type": "Text",
            "label": "Phone Number",
            "key": "phoneNumber",
            "validation": {}
          },
          {
            "type": "Text",
            "label": "City",
            "key": "city",
            "validation": {}
          },
          {
            "type": "Text",
            "label": "Zip Code",
            "key": "zipCode",
            "validation": {
                "minLength": 5,
                "maxLength": 10
            }
          },
          {
            "type": "Group",
            "label": "Additional Contact Info",
            "key": "additionalContactInfo",
            "fields": [
              {
                "type": "Text",
                "label": "Alternate Phone",
                "key": "alternatePhone",
                "validation": {}
              },
              {
                "type": "Text",
                "label": "Fax Number",
                "key": "faxNumber",
                "validation": {}
              }
            ]
          }
        ]
      },
      {
        "type": "Checkbox",
        "key": "emailUpdates",
        "label": "Receive Email Updates",
        "validation": {}
      },
      {
        "type": "Text",
        "key": "promoCode",
        "label": "Promo Code",
        "placeholder": "Enter promo code",
        "visibilityDependencies": [
          {
            "field": "state",
            "value": "Texas"
          },
          {
            "field": "emailUpdates",
            "value": true
          }
        ],
        "validation": {
          "required": true,
          "minLength": 5
        }
      }
    ]
  }
```

## Example 3

Here is more complicated example of a form JSON structure with API fetching:

```json
{
  "formInfo": {
    "title": "Example form 1"
  },
  "fields": [
    {
      "type": "Text",
      "key": "name",
      "label": "Name",
      "placeholder": "Enter your name",
      "validation": {}
    },
    {
      "type": "Textarea",
      "key": "notes",
      "label": "Notes",
      "placeholder": "Enter notes here",
      "validation": {}
    },
    {
      "type": "Dropdown",
      "key": "country",
      "label": "Country",
      "options": ["USA", "Canada", "UK"],
      "validation": {}
    },
    {
      "type": "Radio button",
      "key": "plan",
      "label": "Plan",
      "options": ["Individual", "Business"],
      "validation": {}
    },
    {
      "type": "Text",
      "key": "email",
      "label": "Email",
      "validationDependencies": [
        {
          "field": "country",
          "value": "USA",
          "validation": {
            "required": true
          }
        }
      ],
      "validation": {
        "regex": "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
      }
    },
    {
      "type": "Group",
      "key": "address",
      "label": "Address",
      "fields": [
        {
          "type": "Text",
          "label": "Street",
          "key": "street",
          "validation": {}
        },
        {
          "type": "Text",
          "label": "City",
          "key": "city",
          "validation": {}
        },
        {
          "type": "Text",
          "label": "ZIP Code",
          "key": "zip",
          "validation": {
            "minLength": 5,
            "maxLength": 10
          }
        },
        {
          "type": "Group",
          "label": "Additional Data",
          "key": "additionalData",
          "fields": [
            {
              "type": "Text",
              "label": "Apartment Number",
              "key": "apartmentNumber",
              "validation": {}
            },
            {
              "type": "Text",
              "label": "Apartment Floor",
              "key": "apartmentFloor",
              "validation": {}
            }
          ]
        }
      ]
    },
    {
      "type": "Checkbox",
      "key": "newsletter",
      "label": "Subscribe to newsletter",
      "validation": {}
    },
    {
      "type": "Text",
      "key": "referral",
      "label": "Referral Code",
      "placeholder": "Enter referral code",
      "visibilityDependencies": [
        {
          "field": "country",
          "value": "Canada"
        },
        {
          "field": "newsletter",
          "value": true
        }
      ],
      "validation": {
        "required": true
      }
    }
  ],
  "services": {
    "dataService": "https://run.mocky.io/v3/666cac42-21c0-4c09-88ab-b875b654a1d3"
  }
}
```

## Conclusion

This JSON structure provides a flexible way to define forms with various input types and validation rules. It can be easily integrated into web applications to create dynamic and user-friendly forms.
