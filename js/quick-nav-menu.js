let currentLocation;
const pathItemText = {
   "Projects" : "Pr",
   "Modules" : "Mod",
   "Scenarios" : "Scen"
}
const pathItem = {
   "Pr" : "Projects",
   "Mod" : "Modules",
   "Scen" : "Scenarios"
}

function updatePath() {
   let names = []
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const targetProject = localStorage.getItem('targetProject')
   const targetModule = localStorage.getItem('targetModule')
   const targetScenario = localStorage.getItem('targetScenario')
   const projectInd = localStorage.getItem('projectInd')
   const moduleInd = localStorage.getItem('moduleInd')
   const scenarioInd = localStorage.getItem('scenarioInd')

   //Build projects regardless (for projects, modules, scenarios and steps)
   if (userProjects) {
      names = []
      for (let i = 0; i < userProjects.length; i++) {
         names.push(userProjects[i].name)
      }
      buildPathDropdowns('.projects-container', names, userProjects.length)
   }

   //For modules
   if (currentLocation == 'modules') {
      //build modules
      if (userProjects[projectInd].modules) {
         names = []
         for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
            names.push(userProjects[projectInd].modules[i].name)
         }
         buildPathDropdowns('.modules-container', names, userProjects[projectInd].modules.length)
      }
   }

   //For scenarios
   if (currentLocation == 'scenarios') {
      //build modules
      names = []
      for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
         names.push(userProjects[projectInd].modules[i].name)
      }
      buildPathDropdowns('.modules-container', names, userProjects[projectInd].modules.length)

      //build scenarios
      if (userProjects[projectInd].modules[moduleInd].scenarios) {
         names = []
         for (let i = 0; i < userProjects[projectInd].modules[moduleInd].scenarios.length; i++) {
            names.push(userProjects[projectInd].modules[moduleInd].scenarios[i].name)
         }
         buildPathDropdowns('.scenarios-container', names, userProjects[projectInd].modules[moduleInd].scenarios.length)
      }
   }

   //For steps
   if (currentLocation == 'steps') {
       //build modules
       names = []
       for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
          names.push(userProjects[projectInd].modules[i].name)
       }
       buildPathDropdowns('.modules-container', names, userProjects[projectInd].modules.length)
 
       //build scenarios
      names = []
      for (let i = 0; i < userProjects[projectInd].modules[moduleInd].scenarios.length; i++) {
         names.push(userProjects[projectInd].modules[moduleInd].scenarios[i].name)
      }
      buildPathDropdowns('.scenarios-container', names, userProjects[projectInd].modules[moduleInd].scenarios.length)
   }
}

function buildPathDropdowns(destinationClass, names, length) {
   const fragment = document.createDocumentFragment()
   const pathDropdown = document.createElement('div')
   pathDropdown.classList.add('path-dropdown', 'display-none')

   for (let i = 0; i < length; i++) {
      const pathDropdownItem = document.createElement('a')
      pathDropdownItem.classList.add('path-dropdown-item')
      const currentLoc = destinationClass.split('-')[0].substring(1)
      let newLoc
      switch (currentLoc) {
         case "projects":
            newLoc = "modules"
            break;
         case "modules":
            newLoc = "scenarios"
            break;
         case "scenarios":
            newLoc = "steps"
            break;
      }
      pathDropdownItem.setAttribute('href', `./${newLoc}.html`)
      pathDropdownItem.textContent = names[i]
      pathDropdown.appendChild(pathDropdownItem)
   }
   fragment.appendChild(pathDropdown)
   document.querySelector(destinationClass).append(fragment)
}

//AUTO-LOADING
document.addEventListener('DOMContentLoaded', () => {
   currentLocation = localStorage.getItem('currentLocation')
   updatePath()
})

//Click on the PROJECTS QUICK NAV ITEM to toggle dropdown
document.querySelector('.pr-link').addEventListener('click', (e) => {
   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const elem = e.target

   if (userProjects.length) {
      if (!elem.classList.contains('opened')) {
         elem.textContent = "Pr"
         elem.classList.add('opened')
         elem.parentNode.children[1].classList.remove('display-none')
         elem.parentNode.children[2].classList.remove('display-none')
      } else {
         elem.textContent = "Projects"
         elem.classList.remove('opened')
         elem.parentNode.children[1].classList.add('display-none')
         elem.parentNode.children[2].classList.add('display-none')
      }
   }
})


//Click on the MODULES QUICK NAV ITEM to toggle dropdown
document.querySelector('.mod-link').addEventListener('click', (e) => {
   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let projectInd = localStorage.getItem('projectInd')
   const elem = e.target

   if (userProjects[projectInd].modules.length) {
      if (!elem.classList.contains('opened')) {
         elem.textContent = "Mod"
         elem.classList.add('opened')
         elem.parentNode.children[1].classList.remove('display-none')
         elem.parentNode.children[2].classList.remove('display-none')
      } else {
         elem.textContent = "Modules"
         elem.classList.remove('opened')
         elem.parentNode.children[1].classList.add('display-none')
         elem.parentNode.children[2].classList.add('display-none')
      }
   }
})

//Click on the SCENARIOS QUICK NAV ITEM to toggle dropdown
document.querySelector('.scen-link').addEventListener('click', (e) => {
   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let projectInd = localStorage.getItem('projectInd')
   let moduleInd = localStorage.getItem('moduleInd') 
   const elem = e.target

   if (userProjects[projectInd].modules[moduleInd].scenarios.length) {
      if (!elem.classList.contains('opened')) {
         elem.textContent = "Scen"
         elem.classList.add('opened')
         elem.parentNode.children[1].classList.remove('display-none')
         elem.parentNode.children[2].classList.remove('display-none')
      } else {
         elem.textContent = "Scenarios"
         elem.classList.remove('opened')
         elem.parentNode.children[1].classList.add('display-none')
         elem.parentNode.children[2].classList.add('display-none')
      }
   }
})
