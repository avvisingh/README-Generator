var fs = require('fs');
var inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "projectname"
        },
        {
            type: "input",
            message: "Describe your project's functionality:",
            name: "description"
        },
        {
            type: "input",
            message: "Outline Installation Instructions for your clients:",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide some essential Usage Information for your clients:",
            name: "usage"
        },
        {
            type: "input",
            message: "Provide your guidelines for contribution here:",
            name: "contribution"
        },
        {
            type: "input",
            message: "Provide your guidelines for testing here:",
            name: "test"
        },
        {
            type: "input",
            message: "Please provide your Github username here:",
            name: "github"
        },
        {
            type: "input",
            message: "Please provide your email ID here:",
            name: "email"
        },
        {
            type: "input",
            message: "Please provide additional information on how you'd like clients to contact you with questions:",
            name: "questions"
        },
        {
            type: "checkbox",
            message: "Which License does your project fall under?",
            name: "license",
            choices: ['Apachev2', 'Boostv1', 'BSD3Clause', 'BSD2Clause', 'CreativeCommons0', 'Eclipse', 'GNUGPLv3', 'GNUGPLv2', 'IBM', 'ISC', 'MIT', 'Mozilla', 'ThePerlLicense', 'TheArtisticLicense2', 'Unlicense', 'WTFPL', 'Zlib']
        }
    ])
    .then((response) => {
        var fileName = 'README.md';

        fs.writeFileSync(fileName, '# ' + response.projectname + '\n', (err) => {
            if (err) {
                console.log('There was an error. Try Again!');
            } else {
                console.log('Congratulations! You can now view your ReadMe.md file in your working directory');
            }
        });

        //License Badge
        var licensing = {
            Apachev2: ['[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)', 'Apache v2.0'],
            Boostv1: ['[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)', 'Boost Software License 1.0'],
            BSD3Clause: ['[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)', 'BSD 3-Clause License'],
            BSD2Clause: ['[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)', 'BSD 2-Clasue License'],
            CreativeCommons0: ['[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)', 'CC0'],
            Eclipse: ['[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)', 'Eclipse Public License 1.0'],
            GNUGPLv3: ['[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)', 'GNU General Public License v3'],
            GNUGPLv2: ['[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)', 'GNU General Public License v2'],
            IBM: ['[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)', 'IBM Public License Version 1.0'],
            ISC: ['[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)', 'ISC License (ISC)'],
            MIT: ['[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)', 'The MIT License'],
            Mozilla: ['[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)', 'Mozilla Public License 2.0'],
            ThePerlLicense: ['[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)', 'The Perl License'],
            TheArtisticLicense2: ['[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)', 'The Artistic License 2.0'],
            Unlicense: ['[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)', 'The Unlicense'],
            WTFPL: ['[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)', 'Do What the Fuck You Want to Public License'],
            Zlib: ['[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)', 'The zlib/libpng License']
        }

        var licenseChosen = response.license;
        var licenseChosenString = String(licenseChosen);
        var licenseBadgeAppend = licensing[licenseChosenString][0];
        var licenseInfoAppend = licensing[licenseChosenString][1];
        fs.appendFileSync(fileName, licenseBadgeAppend + '\n\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('License Badge appending...');
            }
        });


        var readmeContent = [response.description, response.installation, response.usage, response.contribution, response.test];
        var readmeTitle = ['Description', 'Installation', 'Usage', 'Contributing', 'Tests', 'Questions', 'License'];

        // Table of Contents
        readmeTitle.forEach((content, index) => {
            var anchorLink = '(###' + content.toLowerCase() + ')';
            if (index === 0) {
                var contentLine = '## Table of Contents\n' + '* ' + '[' + content + ']' + anchorLink + '\n';
            } else if (index === (readmeTitle.length - 1)) {
                var contentLine = '* ' + '[' + content + ']' + anchorLink + '\n\n';
            } else {
                var contentLine = '* ' + '[' + content + ']' + anchorLink + '\n';
            }
            fs.appendFileSync(fileName, contentLine, (err) => {
                if (err) {
                    console.log('Error');
                } else {
                    console.log('All G');
                }
            })
        })

        //Appending user-provided content up to the 'Questions' section
        readmeContent.forEach((content, index) => {
            console.log(index);
            console.log(content);
            var titleIndex = readmeTitle[index];
            console.log(titleIndex);
            fs.appendFileSync(fileName, '### ' + titleIndex + '\n' + content + '\n\n', (err) => {
                if (err) {
                    console.log('There was an error. Try Again!');
                } else {
                    console.log('Congratulations! You can now view your ReadMe.md file in your working directory');
                }
            });
        });

        // Questions Section
        fs.appendFileSync(fileName, '### Questions\n', (err) => {
            if (err) {
                console.log('An error has occurred')
            } else {
                console.log('Appending Contents Heading...');
            }
        });

        fs.appendFileSync(fileName, '[Github Acc.] (https://github.com/' + response.github + ')\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('Github username appending...');
            }
        });

        fs.appendFileSync(fileName, response.email + '\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('Email appending...');
            }
        });

        fs.appendFileSync(fileName, response.questions + '\n\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('Questions section appending...');
            }
        });

        //License section

        fs.appendFileSync(fileName, '### License' + '\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('"License" heading appending...');
            }
        });
        fs.appendFileSync(fileName, 'Licensed under ' + '_' + licenseInfoAppend + '_\n\n', (err) => {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('License info being appended...');
            }
        });


    });