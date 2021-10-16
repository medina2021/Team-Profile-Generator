const renderTeam = team => {

// Manager html
const renderManager = manager => {
    return `
    <div class ="card employee-card">
    <div class ="card-header">
        <h2 class="card-title">${manager.getName()}</h2>
        <h3 class="card-title">${manager.getRole()}</h3>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${manager.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
            <li class="list-group-item">Office Number:${manager.getOfficeNumber()}</li>
        </ul>
    </div>
</div>>
`;
};
// Engineer html
const renderEngineer = engineer =>{
    return `
    <div class ="card employee-card">
    <div class ="card-header">
        <h2 class="card-title">${engineer.getName()}</h2>
        <h3 class="card-title">${engineer.getRole()}</h3>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${engineer.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
            <li class="list-group-item">Github: https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
        </ul>        
    </div>
</div>
`;
};
// Intern html
const renderIntern = intern => {
    return `
    <div class ="card employee-card">
    <div class ="card-header">
        <h2 class="card-title">${intern.getName()}</h2>
        <h3 class="card-title">${intern.getRole()}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${intern.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
            <li class="list-group-item">School:${intern.getSchool()}</li>
        </ul>        
    </div>
</div>>
 `;
};

const htmlArray = [];
 htmlArray.push(team
    .filter(employee => employee.getRole()==="Manager")
    .map(manager => renderManager(manager))
    );
htmlArray.push(team
    .filter(employee => employee.getRole()==="Engineer")
    .map(manager => renderEngineer(engineer))
    .join("")
    );
htmlArray.push(team
    .filter(employee => employee.getRole()==="Intern")
    .map(manager => renderIntern(intern))
    .join("")
    );

    return htmlArray.join("");
}

module.exports = team => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="style.css">
<script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class ="col-12 jumbotron mb-3 team-heading">
                <h1 class="textcenter">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="">
                ${renderTeam(team)}
            </div>
        </div>
   </div>
    
</body>
</html>
`;
};