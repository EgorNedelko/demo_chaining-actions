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

   //Hide other QUICKNAV dropdowns
   if (document.querySelector('.mod-link').parentNode.children[2]) {
      document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
   }
   if (document.querySelector('.scen-link').parentNode.children[2]) {
      document.querySelector('.scen-link').parentNode.children[2].classList.add('display-none')
   }
   
   if (userProjects.length) {
      if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
         //maximize text field
         elem.parentNode.children[1].classList.remove('contracted')
         //reveal the border
         elem.parentNode.children[1].classList.remove('borderless')
         //square off button right borders
         elem.classList.add('square-borders')
         //minimize button width
         elem.classList.add('opened')
         
         //minimize text 
         setTimeout(()=>{elem.textContent = "Project"},100)
         setTimeout(()=>{elem.textContent = "Proje"},150)
         setTimeout(()=>{elem.textContent = "Proj"},200)
         setTimeout(()=>{elem.textContent = "Pro"},250)
         setTimeout(()=>{elem.textContent = "Pr"},300)

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         //minimize text field
         elem.parentNode.children[1].classList.add('contracted')
         //hide the border 
         setTimeout(()=>{elem.parentNode.children[1].classList.add('borderless')},365)
         //round off button right borders
         setTimeout(()=>{elem.classList.remove('square-borders')},250)
         //maximize button width
         elem.classList.remove('opened')

         //maximize text
         setTimeout(()=>{elem.textContent = "Pro"},100)
         setTimeout(()=>{elem.textContent = "Proj"},150)
         setTimeout(()=>{elem.textContent = "Proje"},200)
         setTimeout(()=>{elem.textContent = "Projec"},250)
         setTimeout(()=>{elem.textContent = "Projects"},300)
      }

      //Display dropdown
      elem.parentNode.children[2].classList.toggle('display-none')
   }
})

//Click on the MODULES QUICK NAV ITEM to toggle dropdown
document.querySelector('.mod-link').addEventListener('click', (e) => {
   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let projectInd = localStorage.getItem('projectInd')
   const elem = e.target

   //Hide other QUICKNAV dropdowns
   if (document.querySelector('.pr-link').parentNode.children[2]) {
      document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
   }
   if (document.querySelector('.scen-link').parentNode.children[2]) {
      document.querySelector('.scen-link').parentNode.children[2].classList.add('display-none')
   }

   //Navigation logic
   if (currentLocation == 'projects') return
   
   if (userProjects[projectInd].modules.length) {
      if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
         //maximize text field
         elem.parentNode.children[1].classList.remove('contracted')
         //reveal the border
         elem.parentNode.children[1].classList.remove('borderless')
         //square off button right borders
         elem.classList.add('square-borders')
         //minimize button width
         elem.classList.add('opened')

         //minimize text 
         setTimeout(()=>{elem.textContent = "Module"},100)
         setTimeout(()=>{elem.textContent = "Modul"},150)
         setTimeout(()=>{elem.textContent = "Modu"},200)
         setTimeout(()=>{elem.textContent = "Mod"},250)

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         //minimize text field
         elem.parentNode.children[1].classList.add('contracted')
         //hide the border 
         setTimeout(()=>{elem.parentNode.children[1].classList.add('borderless')},365)
         //round off button right borders
         setTimeout(()=>{elem.classList.remove('square-borders')},250)
         //maximize button width
         elem.classList.remove('opened')

         //maximize text
         setTimeout(()=>{elem.textContent = "Modu"},100)
         setTimeout(()=>{elem.textContent = "Modul"},150)
         setTimeout(()=>{elem.textContent = "Module"},200)
         setTimeout(()=>{elem.textContent = "Modules"},250)
      }

      //Display dropdown
      elem.parentNode.children[2].classList.toggle('display-none')
   }
})

//Click on the SCENARIOS QUICK NAV ITEM to toggle dropdown
document.querySelector('.scen-link').addEventListener('click', (e) => {
   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let projectInd = localStorage.getItem('projectInd')
   let moduleInd = localStorage.getItem('moduleInd') 
   const elem = e.target

   //Hide other QUICKNAV dropdowns
   if (document.querySelector('.pr-link').parentNode.children[2]) {
      document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
   }
   if (document.querySelector('.mod-link').parentNode.children[2]) {
      document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
   }

   //Navigation logic
   if (currentLocation == 'projects' || currentLocation == 'modules') return
   
   if (userProjects[projectInd].modules[moduleInd].scenarios) {
      if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
         //maximize text field
         elem.parentNode.children[1].classList.remove('contracted')
         //reveal the border
         elem.parentNode.children[1].classList.remove('borderless')
         //square off button right borders
         elem.classList.add('square-borders')
         //minimize button width
         elem.classList.add('opened')
         
         //minimize text 
         setTimeout(()=>{elem.textContent = "Scenario"},100)
         setTimeout(()=>{elem.textContent = "Scenari"},150)
         setTimeout(()=>{elem.textContent = "Scenar"},200)
         setTimeout(()=>{elem.textContent = "Scena"},250)
         setTimeout(()=>{elem.textContent = "Scen"},300)

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         //minimize text field
         elem.parentNode.children[1].classList.add('contracted')
         //hide the border 
         setTimeout(()=>{elem.parentNode.children[1].classList.add('borderless')},365)
         //round off button right borders
         setTimeout(()=>{elem.classList.remove('square-borders')},250)
         //maximize button width
         elem.classList.remove('opened')

         //maximize text
         setTimeout(()=>{elem.textContent = "Scena"},100)
         setTimeout(()=>{elem.textContent = "Scenar"},150)
         setTimeout(()=>{elem.textContent = "Scenari"},200)
         setTimeout(()=>{elem.textContent = "Scenario"},250)
         setTimeout(()=>{elem.textContent = "Scenarios"},300)
      }

      //Display dropdown
      elem.parentNode.children[2].classList.toggle('display-none')
   }
})

//Force HOVER on adjacent text field
document.querySelectorAll('.path-item').forEach(item => item.addEventListener('mouseover', (e) => {
   e.target.parentNode.children[1].classList.add('hover')
}))
document.querySelectorAll('.path-item').forEach(item => item.addEventListener('mouseout', (e) => {
   e.target.parentNode.children[1].classList.remove('hover')
}))

document.querySelectorAll('.path-item-text').forEach(item => item.addEventListener('mouseover', (e) => {
   e.target.parentNode.children[0].classList.add('hover')
}))
document.querySelectorAll('.path-item-text').forEach(item => item.addEventListener('mouseout', (e) => {
   e.target.parentNode.children[0].classList.remove('hover')
}))

document.querySelector('.pr-link').addEventListener('dblclick', () => {
   if (currentLocation == 'projects') return
   changeCurrentLocation('projects')
   window.location = "./projects.html"
})
document.querySelector('.mod-link').addEventListener('dblclick', () => {
   if (currentLocation == 'projects' || currentLocation == 'modules') return
   changeCurrentLocation('modules')
   window.location = "./modules.html"
})
document.querySelector('.scen-link').addEventListener('dblclick', () => {
   if (currentLocation == 'projects' || currentLocation == 'modules'|| currentLocation == 'scenarios') return
   changeCurrentLocation('scenarios')
   window.location = "./scenarios.html"
})