const overlay = document.getElementById('overlay')
const newItemModal = document.querySelector('.new-item-modal')
const itemCounter = document.getElementById('itemCounter')
// const deletionModal = document.querySelector('.deletion-modal')
let itemToDelete;

function addModule(name) {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create project container
   const module = document.createElement('div')
   module.classList.add('module')
   
   const moduleName = document.createElement('a')
   moduleName.classList.add('module-name')
   moduleName.setAttribute('href', "./scenarios.html")
   moduleName.textContent = name

   const moduleStatus = document.createElement('p')
   moduleStatus.classList.add('module-status')
   moduleStatus.textContent = 'Created'

   const moduleScenariosCounter = document.createElement('p')
   moduleScenariosCounter.classList.add('module-scenarios-counter')
   moduleScenariosCounter.textContent = '0'

   const moduleRunsCounter = document.createElement('p')
   moduleRunsCounter.classList.add('module-runs-counter')
   moduleRunsCounter.textContent = '0'

   const actionsBtn = document.createElement('div')
   actionsBtn.classList.add('actions-btn')

   const actionsIcon = document.createElement('img')
   actionsIcon.classList.add('actions-icon')
   actionsIcon.setAttribute('src', "https://img.icons8.com/color/48/000000/menu-2.png")

   const actionsDropdown = document.createElement('div')
   actionsDropdown.classList.add('actions-dropdown')

   const actionsArr = ['Show', 'Execute', 'Schedule', 'Copy', 'Delete']
   for (let i = 0; i < actionsArr.length; i++) {
      const actionsItem = document.createElement('a')
      actionsItem.classList.add('actions-dropdown-item')
      actionsItem.textContent = actionsArr[i]
      if (actionsItem.textContent == "Show") {
         actionsItem.setAttribute('href', './scenarios.html')
      }
      actionsDropdown.appendChild(actionsItem)
   }

   actionsBtn.appendChild(actionsIcon)
   actionsBtn.appendChild(actionsDropdown)

   module.appendChild(moduleName)
   module.appendChild(moduleStatus)
   module.appendChild(moduleScenariosCounter)
   module.appendChild(moduleRunsCounter)
   module.appendChild(actionsBtn)
   fragment.appendChild(module)
   document.querySelector('.modules').append(fragment)
}

function openModuleModal() {
   overlay.classList.add('active')
   newItemModal.classList.remove('display-none')
   newItemModal.querySelector('.new-item-name').focus()
}

function closeModuleModal() {
   overlay.classList.remove('active')
   newItemModal.classList.add('display-none')
}

function handleDeletionModal() {
   overlay.classList.toggle('display-none')
   deletionModal.classList.toggle('display-none')
}

function openDeletionModal() {
   overlay.classList.remove('display-none')
   deletionModal.classList.remove('display-none')
}

function closeDeletionModal() {
   overlay.classList.add('display-none')
   deletionModal.classList.add('display-none')

}

//click on the DELETE (CONFIRM DELETION) BUTTON in the DELETION MODAL
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('deletion-confirmation')) {
      document.querySelector('.modules').removeChild(itemToDelete)
      closeDeletionModal()
      // handleDeletionModal()
   }
})

//click on the CANCEL (CANCEL DELETION) BUTTON in the DELETION MODAL
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('deletion-cancel')) {
      closeDeletionModal()
      // handleDeletionModal()
   }
})

//click on the CLOSE (CANCEL DELETION) ICON at the top of the DELETION MODAL
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-deletion-modal-icon')) {
      closeDeletionModal()
      // handleDeletionModal()
   }
})

//click on the DELETE ACTION BUTTON to delete selected project
document.addEventListener('click', (e) => {
   if (e.target.textContent == 'Delete') {
      itemToDelete = e.target.parentNode.parentNode.parentNode
      document.querySelectorAll('.actions-dropdown').forEach(el => el.classList.remove('visible'))
      document.querySelector('.modules').removeChild(itemToDelete)
      refreshItemCounter()
      saveModules()
      removeDropdown(document.querySelector('.modules-container'))
      updatePath()
      // openDeletionModal()
      // handleDeletionModal()
   }
})

//click on the ACTIONS BUTTON for dropdown menu to appear
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('actions-icon')) {
      document.querySelectorAll('.actions-dropdown').forEach(el => {
         if (el != e.target.parentNode.parentNode.querySelector('.actions-dropdown')) el.classList.remove('visible')
      })
      e.target.parentNode.parentNode.querySelector('.actions-dropdown').classList.toggle('visible')
   }
})

//click on the SAVE BUTTON in the project modal to create a new project
document.addEventListener('click', (e) => {
   if (e.target.value == "Save") {
      const newModuleNameInput = document.querySelector('.new-item-name')
      if (newModuleNameInput.value) {
         addModule(newModuleNameInput.value)
         newModuleNameInput.value = ''
      } else {
         addModule('new module')
      }
      saveModules()
      removeDropdown(document.querySelector('.modules-container'))
      updatePath()
      refreshItemCounter()
      closeModuleModal()
   }
})

//click on the CANCEL BUTTON in the project modal to cancel new project creation
document.addEventListener('click', (e) => {
   if (e.target.value == "Cancel") {
      const newModuleNameInput = document.querySelector('.new-item-name')
      newModuleNameInput.value = ''
      closeModuleModal()
   }
})

//press ENTER when the modal is open to create a new module
window.addEventListener('keydown', (e) => {
   if (e.key == "Enter" && !newItemModal.classList.contains('display-none')) {
      const newModuleNameInput = document.querySelector('.new-item-name')
      if (newModuleNameInput.value) {
         addModule(newModuleNameInput.value)
         newModuleNameInput.value = ''
      } else {
         addModule('new module')
      }
      saveModules()
      removeDropdown(document.querySelector('.modules-container'))
      updatePath()
      refreshItemCounter()
      closeModuleModal()
   }
})

//click on the ADD MODULE BUTTON to add new project
document.querySelectorAll("input[value='Add Module']").forEach(btn => btn.addEventListener('click', () => {
   openModuleModal()
}))

//HELPER FUNCTIONS
function refreshItemCounter() {
   itemCounter.textContent = document.querySelectorAll('.module').length
}

/////STORAGE FUNCTIONS
function saveModules() {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let targetProject = localStorage.getItem('targetProject')
   let saveProject = localStorage.getItem('saveProject') ? localStorage.getItem('saveProject') : targetProject

   const modulesList = document.querySelectorAll('.module')

   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == saveProject) {

         //Get stored and current modules
         const storedModules = []
         const currentModules = []
         if (userProjects[i].modules) {
            for (let j = 0; j < userProjects[i].modules.length; j++) {
               storedModules.push(userProjects[i].modules[j].name)
            }
            for (let y = 0; y < modulesList.length; y++) {
               currentModules.push(modulesList[y].querySelector('.module-name').textContent)
            }

            //Check #1 - get projects that were deleted
            let deletedModules = []
            for (let del = 0; del < storedModules.length; del++) {
               if (!currentModules.includes(storedModules[del])) {
                  deletedModules.push(storedModules[del])
               }
            }

            //Check #2 - get projects that were added
            let addedModules = []
            for (let add = 0; add < currentModules.length; add++) {
               if (!storedModules.includes(currentModules[add])) {
                  addedModules.push(currentModules[add])
               }
            }

            //Check #3 - whether there were changes 
            if (addedModules.length == 0 && deletedModules.length == 0) {
               return
            }

            //Remove deleted projects from the USERSPROJECT object
            if (deletedModules.length != 0) {
               for (let del = 0; del < deletedModules.length; del++) {
                  for (let j = 0; j < userProjects[i].modules.length; j++) {
                     if (userProjects[i].modules[j].name == deletedModules[del]) {
                        userProjects[i].modules.splice(j,1)
                     }
                  }
               }
            }

            //Add new projects to USERPROJECTS object
            if (addedModules.length != 0) {
               for (let add = 0; add < addedModules.length; add++) {
                  const modulesLength = userProjects[i].modules.length
                  userProjects[i].modules[modulesLength] = {
                     name: addedModules[add]
                  }
               }
            }
         
         //If there're no modules in this project
         } else {
            userProjects[i].modules = []
            for (let q = 0; q < modulesList.length; q++) {
               userProjects[i].modules[q] = {
                  name: modulesList[q].querySelector('.module-name').textContent
               }
            }
         }
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
}

function loadModules() {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const targetProject = localStorage.getItem('targetProject')

   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {

         //Load modules
         if (userProjects[i].modules) {
            for (let j = 0; j < userProjects[i].modules.length; j++) {
               addModule(userProjects[i].modules[j].name)
               let moduleToModify = document.querySelectorAll('.module')[document.querySelectorAll('.module').length-1]
               
               //Update scenarios counter
               if (userProjects[i].modules[j].scenarios) {
                  moduleToModify.querySelector('.module-scenarios-counter').textContent = userProjects[i].modules[j].scenarios.length
               }
            }
         }
      }
   }

   //Update path, name and counter
   document.querySelector('.pr-path').textContent = targetProject
   document.getElementById('itemName').textContent = targetProject
   refreshItemCounter()
}

//Click on the CLEAR ALL BUTTON to clear out CURRENT PROJECT
document.querySelector("input[value='Clear All']").addEventListener('click', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const targetProject = localStorage.getItem('targetProject')
   
   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {

         //Erase all modules at this destination inside USERPROJECTS object
         userProjects[i].modules = []
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
   
   //Clean all current module
   document.querySelectorAll('.module').forEach(module => document.querySelector('.modules').removeChild(module))
   refreshItemCounter()
})

//Сlick on the MODULE NAME to store destination 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('module-name') || e.target.classList.contains('path-dropdown-item')) {
      storeDestination(e.target)
   }
})

//Click on the SHOW action button to store destination
document.addEventListener('click', (e) => {
   if (e.target.textContent == 'Show') {
      const targetElem = e.target.parentNode.parentNode.parentNode.querySelector('.module-name')
      storeDestination(targetElem)
   }
})

function storeDestination(targetElem) {
   let userProjects = JSON.parse(localStorage.getItem('userProjects')) 
   let targetProject = localStorage.getItem('targetProject')
   let saveProject = targetProject
   let projectInd = localStorage.getItem('projectInd')
   let moduleInd = 0

   //if it's a project
   if (targetElem.parentNode.parentNode.classList.contains('projects-container')) {
      for (let i = 0; i < userProjects.length; i++) {
         if (userProjects[i].name == targetElem.textContent) {
            projectInd = i
         }
      }
      changeCurrentLocation('modules')
      localStorage.removeItem('projectInd')
      localStorage.setItem('projectInd', projectInd)
      localStorage.removeItem('targetProject')
      localStorage.setItem('targetProject', targetElem.textContent)
      localStorage.removeItem('saveProject')
      localStorage.setItem('saveProject', saveProject)

   //if it's a module
   } else if (targetElem.parentNode.parentNode.classList.contains('modules-container') ||
               targetElem.classList.contains('module-name')) {
      for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
         if (userProjects[projectInd].modules[i].name == targetElem.textContent) {
            moduleInd = i
         }
      }
      changeCurrentLocation('scenarios')
      localStorage.removeItem('moduleInd')
      localStorage.setItem('moduleInd', moduleInd)
      localStorage.removeItem('targetModule')
      localStorage.setItem('targetModule', targetElem.textContent)
   }
}

//AUTO-SAVING
window.addEventListener('beforeunload', saveModules)
document.querySelector('.sidebar-pr-link').addEventListener('click', () => {
   changeCurrentLocation('projects')
})

//AUTO-LOADING 
document.addEventListener('DOMContentLoaded', () => {
   //Remove save project upon pageLoad so the refreshPage check can work
   localStorage.removeItem('saveProject')
   currentLocation = localStorage.getItem('currentLocation')
   loadModules()
})

function changeCurrentLocation(newValue) {
   localStorage.removeItem('currentLocation')
   localStorage.setItem('currentLocation', newValue)
}
