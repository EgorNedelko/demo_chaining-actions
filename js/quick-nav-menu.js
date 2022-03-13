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

function removeDropdown(targetContainer) {
   if (targetContainer.children[2]) {
      const dropdownToRemove = targetContainer.children[2]
      targetContainer.removeChild(dropdownToRemove)
   }
}

function updatePath() {
   let names = []
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const projectInd = localStorage.getItem('projectInd')
   const moduleInd = localStorage.getItem('moduleInd')

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
   setTimeout(()=> {
      currentLocation = localStorage.getItem('currentLocation')
      updatePath()
   }, 200) 
})


//EVENTS
//Click on the PROJECTS QUICK NAV ITEM to toggle dropdown
document.querySelector('.pr-link').addEventListener('click', (e) => {
   //Simple Tools Mode
   if (!localStorage.getItem('advancedTools') || localStorage.getItem('advancedTools') == 'false') {
      if (currentLocation == 'projects') return
      window.location = "./projects.html"
      return
   }

   const userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const elem = e.target

   //Hide other QUICKNAV dropdowns
   if (document.querySelector('.mod-link').parentNode.children[2]) {
      document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
   }
   if (document.querySelector('.scen-link').parentNode.children[2]) {
      document.querySelector('.scen-link').parentNode.children[2].classList.add('display-none')
   }
   
   if (userProjects) {
      if (userProjects.length) {
         if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
            openQuickNavItem(elem, 'Projects')
   
         } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
            closeQuickNavItem(elem, 'Projects')
         }
   
         //Display dropdown
         if (!elem.parentNode.children[1].textContent == "") {
            elem.parentNode.children[2].classList.toggle('display-none')
         } else {
            if (elem.parentNode.children[2].classList.contains('display-none')) {
               setTimeout(()=>{ elem.parentNode.children[2].classList.remove('display-none') }, 150)
            } else if (!elem.parentNode.children[2].classList.contains('display-none')) {
               elem.parentNode.children[2].classList.add('display-none')
            }
         }
      }
   }
})

//Click on the MODULES QUICK NAV ITEM to toggle dropdown
document.querySelector('.mod-link').addEventListener('click', (e) => {
   //Navigation logic
   if (currentLocation == 'projects') return

   //Simple Tools Mode
   if (!localStorage.getItem('advancedTools') || localStorage.getItem('advancedTools') == 'false') {
      if (currentLocation == 'modules') return
      window.location = "./modules.html"
      return
   }

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

   if (userProjects[projectInd].modules) {
      if (userProjects[projectInd].modules.length) {
         if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
            openQuickNavItem(elem, 'Modules')
   
         } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
            closeQuickNavItem(elem, 'Modules')
         }
   
         //Display dropdown
         if (!elem.parentNode.children[1].textContent == "") {
            elem.parentNode.children[2].classList.toggle('display-none')
         } else {
            if (elem.parentNode.children[2].classList.contains('display-none')) {
               setTimeout(()=>{ elem.parentNode.children[2].classList.remove('display-none') }, 150)
            } else if (!elem.parentNode.children[2].classList.contains('display-none')) {
               elem.parentNode.children[2].classList.add('display-none')
            }
         }
      }
   }
})

//Click on the SCENARIOS QUICK NAV ITEM to toggle dropdown
document.querySelector('.scen-link').addEventListener('click', (e) => {
   //Navigation logic
   if (currentLocation == 'projects' || currentLocation == 'modules') return

   //Simple Tools Mode
   if (!localStorage.getItem('advancedTools') || localStorage.getItem('advancedTools') == 'false') {
      if (currentLocation == 'scenarios') return
      window.location = "./scenarios.html"
      return
   }

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
   
   if (userProjects[projectInd].modules[moduleInd].scenarios) {
      if (userProjects[projectInd].modules[moduleInd].scenarios.length) {
         if (elem.parentNode.children[1].textContent == "" && !elem.classList.contains('opened')) {
            openQuickNavItem(elem, 'Scenarios')
   
         } else if (elem.parentNode.children[1].textContent == "" && elem.classList.contains('opened')) {
            closeQuickNavItem(elem, 'Scenarios')
         }
   
         //Display dropdown
         if (!elem.parentNode.children[1].textContent == "") {
            elem.parentNode.children[2].classList.toggle('display-none')
         } else {
            if (elem.parentNode.children[2].classList.contains('display-none')) {
               setTimeout(()=>{ elem.parentNode.children[2].classList.remove('display-none') }, 150)
            } else if (!elem.parentNode.children[2].classList.contains('display-none')) {
               elem.parentNode.children[2].classList.add('display-none')
            }
         }
      }
   }
})

//Click on the QUICK NAV TEXT to toggle dropdown
document.querySelectorAll('.path-item-text').forEach(item => item.addEventListener('click', (e) => {
   //Simple Tools Mode
   if (!localStorage.getItem('advancedTools') || localStorage.getItem('advancedTools') == 'false') {
      const targetDestination = e.target.classList[1]
      
      switch (targetDestination) {
         case "pr-path":
            if (currentLocation == 'projects') return
            window.location = "./projects.html"
            break;
         case "mod-path":
            if (currentLocation == 'modules') return
            window.location = "./modules.html"
            break;
         case "scen-path":
            if (currentLocation == 'scenarios') return
            window.location = "./scenarios.html"
            break;
         default:
            return
      }
      return
   }

   let elem = e.target
   if (e.target.parentNode.children[2]) {
      //Display dropdown
      if (!elem.parentNode.children[1].textContent == "") {
         elem.parentNode.children[2].classList.toggle('display-none')
      } else {
         if (elem.parentNode.children[2].classList.contains('display-none')) {
            setTimeout(()=>{ elem.parentNode.children[2].classList.remove('display-none') }, 150)
         } else if (!elem.parentNode.children[2].classList.contains('display-none')) {
            elem.parentNode.children[2].classList.add('display-none')
         }
      }
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
   window.location = "./projects.html"
})
document.querySelector('.mod-link').addEventListener('dblclick', () => {
   if (currentLocation == 'projects' || currentLocation == 'modules') return
   window.location = "./modules.html"
})
document.querySelector('.scen-link').addEventListener('dblclick', () => {
   if (currentLocation == 'projects' || currentLocation == 'modules'|| currentLocation == 'scenarios') return
   window.location = "./scenarios.html"
})

//Click anywhere besides quick nav items for them to close (if they're open)
document.addEventListener('click', (e) => {
   if (currentLocation == 'projects') {
      if (e.target != document.querySelector('.pr-link')) {
         if (document.querySelector('.pr-link').classList.contains('opened') && document.querySelector('.pr-link').parentNode.children[1].textContent == '') {
            closeQuickNavItem(document.querySelector('.pr-link'), 'Projects')
            // this check should redundant since the item should be opened if there's no data for dropdown
            if (document.querySelector('.pr-link').parentNode.children[2]) {
               document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
            }
         }
      }
   } else if (currentLocation == 'modules') {
      if (e.target != document.querySelector('.pr-link') && e.target != document.querySelector('.pr-path')) {
         if (document.querySelector('.pr-link').parentNode.children[2]) {
            document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
         }
      }

      if (e.target != document.querySelector('.mod-link')) {
         if (document.querySelector('.mod-link').classList.contains('opened') && document.querySelector('.mod-link').parentNode.children[1].textContent == '') {
            closeQuickNavItem(document.querySelector('.mod-link'), 'Modules')
            // this check should redundant since the item should be opened if there's no data for dropdown
            if (document.querySelector('.mod-link').parentNode.children[2]) {
               document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
            }
         }
      }
   } else if (currentLocation == 'scenarios') {
      if (e.target != document.querySelector('.pr-link') && e.target != document.querySelector('.pr-path')) {
         if (document.querySelector('.pr-link').parentNode.children[2]) {
            document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
         }
      }

      if (e.target != document.querySelector('.mod-link') && e.target != document.querySelector('.mod-path')) {
         if (document.querySelector('.mod-link').parentNode.children[2]) {
            document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
         }
      }

      if (e.target != document.querySelector('.scen-link')) {
         if (document.querySelector('.scen-link').classList.contains('opened') && document.querySelector('.scen-link').parentNode.children[1].textContent == '') {
            closeQuickNavItem(document.querySelector('.scen-link'), 'Scenarios')
            // this check should redundant since the item should be opened if there's no data for dropdown
            if (document.querySelector('.scen-link').parentNode.children[2]) {
               document.querySelector('.scen-link').parentNode.children[2].classList.add('display-none')
            }
         }
      }
   } else if (currentLocation == 'steps') {
      if (e.target != document.querySelector('.pr-link') && e.target != document.querySelector('.pr-path')) {
         if (document.querySelector('.pr-link').parentNode.children[2]) {
            document.querySelector('.pr-link').parentNode.children[2].classList.add('display-none')
         }
      }

      if (e.target != document.querySelector('.mod-link') && e.target != document.querySelector('.mod-path')) {
         if (document.querySelector('.mod-link').parentNode.children[2]) {
            document.querySelector('.mod-link').parentNode.children[2].classList.add('display-none')
         }
      }

      if (e.target != document.querySelector('.scen-link') && e.target != document.querySelector('.scen-path')) {
         if (document.querySelector('.scen-link').parentNode.children[2]) {
            document.querySelector('.scen-link').parentNode.children[2].classList.add('display-none')
         }
      }
   }
})

//ACTIONS DROPDOWNS
window.addEventListener('click', (e) => {
   if (!e.target.classList.contains('actions-icon')) {
      const dropdowns = document.querySelectorAll('.actions-dropdown')
      dropdowns.forEach(menu => {
         if (menu.classList.contains('visible')) {
            menu.classList.remove('visible')
         }
      })
   }
})

//actions-btn hover change color function
function darkenUponHover(e) {
   if (e.target.classList.contains('actions-btn')) {
      const targetItem = e.target.parentNode
      targetItem.classList.add('hover')
   } else if (e.target.classList.contains('actions-icon')) {
      const targetItem = e.target.parentNode.parentNode
      targetItem.classList.add('hover')
   }
}

// document.addEventListener('mouseover', (e) => {
//    darkenUponHover(e)
// })
document.addEventListener('mouseout', (e) => {
   if (e.target.classList.contains('actions-btn')) {
      const targetItem = e.target.parentNode
      targetItem.classList.remove('hover')
   } else if (e.target.classList.contains('actions-icon')) {
      const targetItem = e.target.parentNode.parentNode
      targetItem.classList.remove('hover')
   }
}) 