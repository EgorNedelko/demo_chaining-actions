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

function openQuickNavItem(elem, textValue) {
   elem.parentNode.children[1].classList.remove('contracted') //maximize text field
   elem.parentNode.children[1].classList.remove('borderless') //reveal the border
   elem.classList.add('square-borders') //square off button right borders
   elem.classList.add('opened') //minimize button width

   let start, end
   if (textValue == 'Projects') {
      start = 7
      end = 1
   } else if (textValue == 'Modules') {
      start = 6
      end = 2
   } else if (textValue == 'Scenarios') {
      start = 8
      end = 3
   }

   //minimize text 
   for (let i = start, timer = 100; i > end; i--, timer += 35) {
      setTimeout(()=>{elem.textContent = textValue.substring(0, i)}, timer)
   }
}

function closeQuickNavItem(elem, textValue) {
   elem.parentNode.children[1].classList.add('contracted') //minimize text field
   setTimeout(()=>{elem.parentNode.children[1].classList.add('borderless')},365) //hide the border 
   setTimeout(()=>{elem.classList.remove('square-borders')},250) //round off button right borders
   elem.classList.remove('opened') //maximize button width

   let start, end
   if (textValue == 'Projects') {
      start = 2
      end = 8
   } else if (textValue == 'Modules') {
      start = 3
      end = 7
   } else if (textValue == 'Scenarios') {
      start = 4
      end = 9
   }

   //minimize text 
   for (let i = start, timer = 100; i <= end; i++, timer += 35) {
      setTimeout(()=>{elem.textContent = textValue.substring(0, i)}, timer)
   }
}

//AUTO-LOADING
document.addEventListener('DOMContentLoaded', () => {
   currentLocation = localStorage.getItem('currentLocation')
   updatePath()
})


//EVENTS
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
         openQuickNavItem(elem, 'Projects')

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         closeQuickNavItem(elem, 'Projects')
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
         openQuickNavItem(elem, 'Modules')

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         closeQuickNavItem(elem, 'Modules')
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
         openQuickNavItem(elem, 'Scenarios')

      } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
         closeQuickNavItem(elem, 'Scenarios')
      }

      //Display dropdown
      elem.parentNode.children[2].classList.toggle('display-none')
   }
})

//Click on the QUICK NAV TEXT to toggle dropdown
document.querySelectorAll('.path-item-text').forEach(item => item.addEventListener('click', (e) => {
   let elem = e.target
   if (e.target.parentNode.children[2]) {
      //Display dropdown
      elem.parentNode.children[2].classList.toggle('display-none')
   }
}))

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