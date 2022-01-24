function updatePath() {
   let names = []
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const targetProject = localStorage.getItem('targetProject')
   const targetModule = localStorage.getItem('targetModule')
   const targetScenario = localStorage.getItem('targetScenario')
   const projectInd = localStorage.getItem('projectInd')
   const moduleInd = localStorage.getItem('moduleInd')
   // const scenarioInd = localStorage.getItem('scenarioInd')
   
   //Build project dropdown
   if (userProjects.length > 1) {
      names = []
      for (let i = 0; i < userProjects.length; i++) {
         if (userProjects[i].name != targetProject) {
            names.push(userProjects[i].name)
         }
      }
      buildPathDropdowns('.pr-container', names, userProjects.length-1)
   }

   //Build modules dropdown
   // if (userProjects[projectInd].modules.length > 1) {
   //    names = []
   //    for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
   //       if (userProjects[projectInd].modules[i].name != targetModule) {
   //          names.push(userProjects[projectInd].modules[i].name)
   //       }
   //    }
   //    buildPathDropdowns('.path-module', names, userProjects[projectInd].modules.length-1)
   // }

   //Build scenarios dropdown
   // if (userProjects[projectInd].modules[moduleInd].scenarios.length > 1) {
   //    names = []
   //    for (let i = 0; i < userProjects[projectInd].modules[moduleInd].scenarios.length; i++) {
   //       if (userProjects[projectInd].modules[moduleInd].scenarios[i].name != targetScenario) {
   //          names.push(userProjects[projectInd].modules[moduleInd].scenarios[i].name)
   //       }
   //    }
   //    buildPathDropdowns('.path-scenario', names, userProjects[projectInd].modules[moduleInd].scenarios.length-1)
   // }
}

function buildPathDropdowns(destinationClass, names, length) {
   const fragment = document.createDocumentFragment()
   const pathDropdown = document.createElement('div')
   pathDropdown.classList.add('path-dropdown', 'display-none')

   for (let i = 0; i < length; i++) {
      const pathDropdownItem = document.createElement('a')
      pathDropdownItem.classList.add('path-dropdown-item')
      pathDropdownItem.setAttribute('href', `./${destinationClass.substring(6)}s.html`)
      pathDropdownItem.textContent = names[i]
      pathDropdown.appendChild(pathDropdownItem)
   }
   fragment.appendChild(pathDropdown)
   document.querySelector(destinationClass).append(fragment)
}

//AUTO-LOADING
document.addEventListener('DOMContentLoaded', () => {
   updatePath()
})

//Click on the item to open the dropdown and contract the item
document.querySelector('.path-item').addEventListener('click', (e) => {
   const pathItemText = {
      "Projects" : "Pr",
      "Modules" : "Mod",
      "Scenarios" : "Scen"
   }
   const elem = e.target

   if (elem.textContent == "Projects" || elem.textContent == "Modules" || elem.textContent == "Scenarios") {
      elem.textContent = pathItemText[elem.textContent]
      elem.classList.add('opened')
      elem.parentNode.children[1].classList.remove('display-none')
      elem.parentNode.children[2].classList.remove('display-none')
   }
})