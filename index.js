// Require Libraries
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Require libraries
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRender");

const teamMembers= [];
const idArray = [];

function Webmenu(){

function addManager() {
  console.log("Please build your team");
    inquirer.prompt([
        {
            type:"input",
            name: "managerName",
            message: "Please enter the name of your manager",
            validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
        {
            type:"input",
            name: "managerId",
            message: "What is the managers id?",
            validate: answer => {
                const pass = answer.match(
                  /^[1-9]\d*$/
                );
                if (pass) {
                  return true;
                }
                return "Please enter a positive number greater than zero.";
              }
            },
        {
            type:"input",
            name: "managerEmail",
            message: "What is the managers email address?",
            validate: answer => {
              const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            }
        },
        {
          type:"input",
          name: "managerOfficeNumber",
          message: "What is the managers office number?",
          validate: answer => {
              const pass = answer.match(
                /^[1-9]\d*$/
              );
              if (pass) {
                return true;
              }
              return "Please enter a positive number greater than zero.";
            }
        }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }
        function createTeam(){
          inquirer.prompt([
        {
            type:"list",
            name: "memberChoice",
            message: "What member type would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "I dont want to add any more team members"
            ]
          }
        ]).then(userChoice => {
           switch (userChoice.memberChoice){
            case "Engineer":
            addEngineer();
            break;
            case "Intern":
              addIntern();
              break;
              default:
                buildTeam();
           }
        });
  }
function addEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "what is the engineers name?",
      validate: answer=>{
        if (answer !==""){
          return true;
        }
        return "Please enter at least one character.";
      }
    },
      {
        type: "input",
        name: "engineerId",
        message: "what is the engineers id?",
        validate: answer=> {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              if(idArray.includes(answer)){
                return "This ID is already taken. Please enter a different number";
              } else{
                return true;
              }
            }
          return "Please a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "what is the engineers email?",
        validate: answer=> {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
                return true;
              }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "what is the engineers Github username?",
        validate: answer=> {
            if (answer !==""){
              return true;
              }
          return "Please enter at least one character.";
        }
    }
  ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    createTeam();
  });
}
     function addIntern(){
       inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "what is the interns name?",
          validate: answer=>{
            if (answer !==""){
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "internId",
          message: "what is the interns id?",
          validate: answer=> {
              const pass = answer.match(
                /^[1-9]\d*$/
              );
              if (pass) {
                if(idArray.includes(answer)){
                  return "This ID is already taken. Please enter a different number";
                } else{
                  return true;
                }
              }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "what is the interns email?",
          validate: answer=> {
              const pass = answer.match(
                /\S+@\S+\.\S+/
              );
              if (pass) {
                  return true;
                }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "internSchool",
          message: "what is the interns school?",
          validate: answer=> {
              if (answer !==""){
                return true;
                }
            return "Please enter at least one character.";
          }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }
  function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR)
    }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
addManager();
}
Webmenu();