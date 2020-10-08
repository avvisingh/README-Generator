var fs = require('fs');
var inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of your project?",
            name: "projectname"
        }
    ])
    .then((response) => {
        var fileName = response.projectname.toUpperCase().split('').join('') + '.md';

        fs.writeFile(fileName, JSON.stringify(response.projectname), (err) => {
            if (err) {
                console.log('There was an error. Try Again!');
            } else {
                console.log('Congratulations! You can now view your ReadMe.md file in your working directory');
            }
        });
    });