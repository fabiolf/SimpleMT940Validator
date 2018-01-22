# Simple MT940 Validator Application


## Overview

This application aims at performing a few validations in a simplified **MT940** file format that can be either a CSV or XML file.

The focus of this application is in the Frontend. So, there is no complex backend to perform more complicated tasks such as access control. The application is hosted by a simple http server run by Node.js.

## Prerequisites

### Node.js and npm

Node.js was used in the backend just to host a simple http server, to serve the pages. Moreover, [`npm`][npm] was used as the package manager for backend (with [Karma][karma] to run the unit tests and the http-server) and [`bower`][bower] for frontend. Just follow the steps bellow to setup all the needed infrastructure to run the application.
- Get [Node.js][node].
- Install the tool dependencies (it reads the dependencies from `package.json`): `npm install`

Bower will be installed by `npm` (as specified in `package.json`) and after that, `npm` will automatically run `bower install`, which will read `bower.json` and perform frontend packages installation.

## Running the Application

After setting up the needed infrastructure, to run the application simply follow the following steps:
- Run `npm start`.
- Navigate your browser to [http://localhost:8000/](http://localhost:8000/) to see the application running.

### Usage

When you browse the [http://localhost:8000/](http://localhost:8000/) starting point, the default route will be to the home page. It is just a welcome page describing in short what the Application does. To perform a validation, choose the _Validation_ item in the navigation bar on the top of the screen.

That will open the Validation page, where the only active element will be the _Choose file_ button. Click the button to choose a file to be validated. The application will only let you choose .csv or .xml files. 

Once the file is chosen, click the _Validate!_ button to validate the file. The result will either be a table with every transaction reference and its validation status or an alert telling that something went wrong.

You can always click in the _Choose file_ button to select another file and repeat the process.

## Unit Testing

For this project I used [Jasmine][jasmine] to create the specs for the tests and, as mentioned already, [Karma][karma] to run it. To run the tests, run `npm test`. A browser will start and connect to the Karma server. For this project, I used just Chrome as the only supported browser for unit testing, but the application was also tested in Safari and it runs just as well.

Karma is defined by its `karma.conf.js` file, where its behaviour is specified. It will keep running and monitoring the specs files. If they are changed, the tests will be re-run. To close it, just hit `ctrl-c`.

## Application Description

- The application filesystem layout structure is based on the [angular-seed][angular-seed] project. For this project Angular v1.5.11 was used.
- There is no dynamic backend (no application server) for this application as the focus of the assignment seemed to be in the frontend.
- For the visual elements of the user interface [Bootstrap][bootstrap] v3.3.7 was used together with [UI Bootstrap][ui-bootstrap] to handle some elements behaviour in an AngularJS Application.
- Other used modules:
  - Angular-xml: angularJS module to handle XML files, that includes the X2JS library, which was used to parse the XML contents into a JSON object, easier to manipulate.
  - js-sorted-set: angularJS module that implements a _sorted-set_ data structured using a _Red-Black-Tree_ under the hoods. Offers great _insert_ and _contains_ performance (both runs in logarithmic time). Used to determine if a transaction is unique.
  - angular-mocks: used in the Jasmine unit tests, to mock dependencies injected into the tested modules.

The next sections explain each module of the Application in more details.

### Core Module

The core module contains the services reused in other parts of the Application.

#### CSVParser

Reusable CSV file parser. In its API there is only one method `parse`, which receives the data to be parsed, in CSV format. The output is an Array where each element corresponds to a line of the original file. Each line is itself another Array, where each item represents one column of the line.

The only validation performed is if each line has the same number of columns that the header line has. In case of an invalid file, the service throws an exception, that must be caught by the invoking module.

It has its own set of unit tests, located at the `csv-parser.service.specs.js`.

#### XMLParser

Reusable XML file parser. This service relies on X2JS library (bundled in the `angular.xml` module) to parse the XML into a JSON object. Its API is the same as the CSVParser above, having only one method `parse`. This method, however, is tightly coupled with the mt940 format specified by the project requirement and creates the same Array of Arrays described above, looking for specific elements in the parsed XML file.

It doesn't really perform any additional validations, apart from the ones already done by X2JS library, which returns either a valid json object or `undefined`. So, if the XML is malformed, it will return `undefined` and this module will throw an exception, that, again, must be handled by the invoking module.

It has its own set of unit tests, located at the `xml-parser.service.specs.js`.

#### ValidationService

This module implements the validations specified in the project requirements:

- all transaction references should be unique
- the end balance needs to be validated

It receives an Array of Arrays, generated by the parsers, and perform the validations above together with some others:

- transaction references should be a valid number
- start balance should be a valid number
- mutation should be a valid number
- end balance should be a valid number

I decided to include these extra validations since those are the fields I would be working with and I needed to make sure they are as expected.

This module generates a validation object, which is an Array containing the required output to create the report. Each line of the array is composed by:
- transaction reference
- the status of the validation process for that transaction reference.

It has its own set of unit tests, located at the `validation.service.specs.js`.

### Alert module

In some parts of the Application, some messages needed to be displayed for the user. Bootstrap comes bundled with a nice view alert system. This module encapsulates those system into a component/directive (that has a place in the main page, just above the views area), and provides a service to be called anywhere in the Application (provided the needed dependency is included in the invoking module).

This module is composed of:
- a template, with the structure of the HTML that should be displayed in the Application alert area.
- a simple controller to describe the dynamic behavior of that alert area:
  - it only has the methods `addAlert` and `closeAlert`, that handle the dynamicity of that part of the Application.
- a service, to provide an API to be reused anywhere in the Application. The API is described below:
  - add: inserts a new Alert into the Alert area (used, for instance, when an exception is thrown by the parsers)
  - get: retrieves the full list of alerts (used by ng-repeat to show alerts in the screen)
  - delete: removes one specific alert from the list (used by the alert close button)
  - deleteAll: cleans all alerts in the list (when a new file is being validated)

This module unit tests are located in the files `alert-module.service.specs.js` and `alert-module.component.specs.js`.

### Home Page

This simple module is responsible to show the welcome screen of the Application. It has no dynamic behaviour and, therefore, no controller attached. It has only the HTML template to be shown by the ng-view directive once the routing system activates it.

It has no unit tests, since no behaviour was implemented.

### Validation Page

This module is responsible for the Validation screen of the Application. It comprises the HTML template shown to the user as well as a controller, that specifies its dynamic behaviour.

This module also have a custom directive `<file-reader>`, responsible to read the text file chosen by the user and extract its content into a controller variable. This controller variable is then used in the parsing phase.

After the parsing and the validation phase, angular `ng-repeat` directive is used to display the report, that is kept hidden by `ng-show` while we don't have anything to show.

The report is shown using a paginated table format. For those 10-12 records used in the example files, pagination would not be required. But in a real world application we would have thousands of records and it would be impossible to show everyone at once to the used.

This module's unit tests are located in the `validation-page.component.specs.js` file.

## Application Directory Layout

```
app/                     --> all the source code of the app (along with unit tests)
  bower_components/...   --> 3rd party JS/CSS libraries, including Angular, jQuery and others used in the Application
  core/                  --> all the source code of the core module (stuff used throughout the app)
    csv-parser/...       --> files for the `core.csvParser` submodule, including JS source code, specs
    validation/...       --> files for the `core.validationService` submodule, including JS source code, specs
    xml-parser/...       --> files for the `core.xmlParser` submodule, including JS source code, specs
    core.module.js       --> the core module
  home-page/...          --> files for the `homeModule` module, including JS source code and HTML templates
  img/...                --> image files
  validation-page/...    --> files for the `validationModule` module, including JS source code, HTML templates, specs
  app.config.js          --> app-wide configuration of Angular routing service
  app.controller.js      --> Higher level Application dynamic behaviour
  app.css                --> default stylesheet for the Application
  app.module.js          --> the main app module
  index.html             --> app layout file (the main HTML template file of the app)

node_modules/...         --> development tools (fetched using `npm`)

bower.json               --> Bower specific metadata, including client-side dependencies
karma.conf.js            --> config file for running unit tests with Karma
package.json             --> Node.js specific metadata, including development tools dependencies
.gitignore               --> git file to specify ignorable files that should not be added into the versioning system

instructions.html        --> Instructions provided by Rabobank for this assignment
records.csv              --> CSV file example with transactions
records.xml              --> XML file example with transactions
records-invalid.csv      --> invalid CSV file example with broken structure
records-invalid.xml      --> invalid XML file example with a XML format error
records-invalid-tag.xml  --> valid XML file but with some records lacking required tags for the assignment (transaction reference and mutation, for instance)
README.md                --> This file
```

## Contact

For more information on this project, please contact me [Fabio Fonseca](mailto:fabio.l.fonseca@gmail.com).


[angular-seed]: https://github.com/angular/angular-seed
[bower]: http://bower.io/
[bootstrap]: https://getbootstrap.com/docs/3.3/
[ui-bootstrap]: https://angular-ui.github.io/bootstrap/
[git-home]: https://git-scm.com/
[git-setup]: https://help.github.com/articles/set-up-git
[google-phone-gallery]: http://web.archive.org/web/20131215082038/http://www.android.com/devices
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[node]: https://nodejs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[npm]: https://www.npmjs.com/
