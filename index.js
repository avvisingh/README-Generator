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
        }
    ])
    .then((response) => {
        var fileName = response.projectname.toUpperCase().split('').join('') + '.md';

        fs.writeFile(fileName, '#' + response.projectname + '\n\n', (err) => {
            if (err) {
                console.log('There was an error. Try Again!');
            } else {
                console.log('Congratulations! You can now view your ReadMe.md file in your working directory');
            }
        });

        var readmeContent = [response.description, response.installation, response.usage, response.contribution];
        var readmeTitle = ['Description', 'Installation', 'Usage', 'Contributing', 'Tests'];

        readmeContent.forEach((content, index) => {
            var titleIndex = readmeTitle[index];
            fs.appendFileSync(fileName, titleIndex + '\n' + content + '\n\n', (err) => {
                if (err) {
                    console.log('There was an error. Try Again!');
                } else {
                    console.log('Congratulations! You can now view your ReadMe.md file in your working directory');
                }
            });
        });


    });