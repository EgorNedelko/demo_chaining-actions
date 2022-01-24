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
         names.push(userProjects[i].name)
      }
      buildPathDropdowns('.pr-container', names, userProjects.length)
   }

   // Build modules dropdown
   if (userProjects[projectInd].modules.length > 1) {
      names = []
      for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
         names.push(userProjects[projectInd].modules[i].name)
      }
      buildPathDropdowns('.mod-container', names, userProjects[projectInd].modules.length)
   }

   //Build scenarios dropdown
   if (userProjects[projectInd].modules[moduleInd].scenarios.length > 1) {
      names = []
      for (let i = 0; i < userProjects[projectInd].modules[moduleInd].scenarios.length; i++) {
         names.push(userProjects[projectInd].modules[moduleInd].scenarios[i].name)
      }
      buildPathDropdowns('.scen-container', names, userProjects[projectInd].modules[moduleInd].scenarios.length)
   }
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
document.querySelectorAll('.path-item').forEach(item => item.addEventListener('click', (e) => {
   const elem = e.target
   const pathItemText = {
      "Projects" : "Pr",
      "Modules" : "Mod",
      "Scenarios" : "Scen"
   }

   if (elem.textContent == "Projects" || elem.textContent == "Modules" || elem.textContent == "Scenarios") {
      elem.textContent = pathItemText[elem.textContent]
      elem.classList.add('opened')
      elem.parentNode.children[1].classList.remove('display-none')
      elem.parentNode.children[2].classList.remove('display-none')
   }
}))