const overlay = document.getElementById('overlay')
const newItemModal = document.querySelector('.new-item-modal')
// const deletionModal = document.querySelector('.deletion-modal')
let itemToDelete;

function addProject(name) {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create project container
   const project = document.createElement('div')
   project.classList.add('project')
   
   const projectName = document.createElement('a')
   projectName.classList.add('project-name')
   projectName.setAttribute('href', "./modules.html")
   projectName.textContent = name

   const projectStatus = document.createElement('p')
   projectStatus.classList.add('project-status')
   projectStatus.textContent = 'Created'

   const projectModulesCounter = document.createElement('p')
   projectModulesCounter.classList.add('project-modules-counter')
   projectModulesCounter.textContent = '0'

   const projectScenariosCounter = document.createElement('p')
   projectScenariosCounter.classList.add('project-scenarios-counter')
   projectScenariosCounter.textContent = '0'

   const projectRunsCounter = document.createElement('p')
   projectRunsCounter.classList.add('project-runs-counter')
   projectRunsCounter.textContent = '0'

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
      actionsDropdown.appendChild(actionsItem)
   }

   actionsBtn.appendChild(actionsIcon)
   actionsBtn.appendChild(actionsDropdown)

   project.appendChild(projectName)
   project.appendChild(projectStatus)
   project.appendChild(projectModulesCounter)
   project.appendChild(projectScenariosCounter)
   project.appendChild(projectRunsCounter)
   project.appendChild(actionsBtn)
   fragment.appendChild(project)
   document.querySelector('.projects').append(fragment)
}

function openProjectModal() {
   // overlay.classList.remove('display-none')
   overlay.classList.add('active')
   newItemModal.classList.remove('display-none')
   newItemModal.querySelector('.new-item-name').focus()
}

function closeProjectModal() {
   // overlay.classList.add('display-none')
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
      document.querySelector('.projects').removeChild(itemToDelete)
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
      document.querySelector('.projects').removeChild(itemToDelete)
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
      const newProjectNameInput = document.querySelector('.new-item-name')
      if (newProjectNameInput.value) {
         addProject(newProjectNameInput.value)
         newProjectNameInput.value = ''
      } else {
         addProject('new project')
      }
      closeProjectModal()
   }
})

//click on the CANCEL BUTTON in the project modal to cancel new project creation
document.addEventListener('click', (e) => {
   if (e.target.value == "Cancel") {
      const newProjectNameInput = document.querySelector('.new-item-name')
      newProjectNameInput.value = ''
      closeProjectModal()
   }
})

//press ENTER when the modal is open to create a new project
window.addEventListener('keydown', (e) => {
   if (e.key == "Enter" && !newItemModal.classList.contains('display-none')) {
      const newProjectNameInput = document.querySelector('.new-item-name')
      if (newProjectNameInput.value) {
         addProject(newProjectNameInput.value)
         newProjectNameInput.value = ''
      } else {
         addProject('new project')
      }
      closeProjectModal()
   }
})

//click on the NEW BUTTON to add new project
document.querySelectorAll("input[value='New']").forEach(btn => btn.addEventListener('click', () => {
   openProjectModal()
}))

/////STORAGE FUNCTIONS
function saveProjects() {
   const projectsList = document.querySelectorAll('.project')
   let userProjects = []
   if (localStorage.getItem('userProjects')) {
      userProjects = JSON.parse(localStorage.getItem('userProjects'))
   }

   //If there's USERPROJECTS in localStorage
   if (localStorage.getItem('userProjects')) {
      //Get stored and current projects
      const storedProjects = []
      const currentProjects = []
      for (let i = 0; i < userProjects.length; i++) {
         storedProjects.push(userProjects[i].name)
      }
      for (let i = 0; i < projectsList.length; i++) {
         currentProjects.push(projectsList[i].querySelector('.project-name').textContent)
      }

      //Check #1 - get projects that were deleted
      let deletedProjects = []
      for (let i = 0; i < storedProjects.length; i++) {
         if (!currentProjects.includes(storedProjects[i])) {
            deletedProjects.push(storedProjects[i])
         }
      }
      //Check #2 - get projects that were added
      let addedProjects = []
      for (let i = 0; i < currentProjects.length; i++) {
         if (!storedProjects.includes(currentProjects[i])) {
            addedProjects.push(currentProjects[i])
         }
      }

      //Check #3 - whether there were changes 
      if (addedProjects.length == 0 && deletedProjects.length == 0) {
         return
      }

      //Remove deleted projects from the USERSPROJECT object
      if (deletedProjects.length != 0) {
         for (let i = 0; i < deletedProjects.length; i++) {
            for (let j = 0; j < userProjects.length; j++) {
               if (userProjects[j].name == deletedProjects[i]) {
                  userProjects.splice(j,1)
               }
            }
         }
      }

      //Add new projects to USERPROJECTS object
      if (addedProjects.length != 0) {
         for (let i = 0; i < addedProjects.length; i++) {
            const userProjectsLength = userProjects.length
            userProjects[userProjectsLength] = {
               name: addedProjects[i]
            }
         }
      }

   //If there's no USERPROJECTS in localStorage   
   } else {
      for (let i = 0; i < projectsList.length; i++) {
         userProjects[i] = {
            name: projectsList[i].querySelector('.project-name').textContent
         }
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
}

function loadProjects() {
   if (localStorage.getItem('userProjects')) {
      let userProjects = JSON.parse(localStorage.getItem('userProjects'))

      //Load projects
      for (let i = 0; i < userProjects.length; i++) {
         addProject(userProjects[i].name)
         let projectToModify = document.querySelectorAll('.project')[document.querySelectorAll('.project').length-1]

         //Update modules counter
         if (userProjects[i].modules) {
            projectToModify.querySelector('.project-modules-counter').textContent = userProjects[i].modules.length
         
            //Update scenarios counter
            let scenariosCounter = 0
            for (let j = 0; j < userProjects[i].modules.length; j++) {
               if (userProjects[i].modules[j].scenarios) {
                  scenariosCounter += userProjects[i].modules[j].scenarios.length
               }
            }
            projectToModify.querySelector('.project-scenarios-counter').textContent = scenariosCounter
         }
      }
   }
}

//click on the CLEAR ALL BUTTON to clear out the localStorage and the list
document.querySelector("input[value='Clear All']").addEventListener('click', () => {
   //Rewrite USERPROJECTS object
   localStorage.clear()
   
   //Clean all current projects
   document.querySelectorAll('.project').forEach(project => document.querySelector('.projects').removeChild(project))
})

//click on the project name to STORE DESTINATION 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('project-name') || e.target.classList.contains('path-dropdown-item')) {
      storeDestination(e.target)
   }
})

function storeDestination(targetElem) {
   let projectInd = 0

   localStorage.removeItem('targetProject')
   localStorage.setItem('targetProject', targetElem.textContent)

   if (localStorage.getItem('userProjects')) {
      let userProjects = JSON.parse(localStorage.getItem('userProjects')) 
      for (let i = 0; i < userProjects.length; i++) {
         if (userProjects[i].name == targetElem.textContent) {
            projectInd = i
         }
      }
   }

   localStorage.removeItem('projectInd')
   localStorage.setItem('projectInd', projectInd)
   changeCurrentLocation('modules')
}

//AUTO-SAVING
window.addEventListener('beforeunload', saveProjects)
document.querySelector('.sidebar-pr-link').addEventListener('click', () => {
   changeCurrentLocation('projects')
})

//LOADING 
document.addEventListener('DOMContentLoaded', loadProjects)

function changeCurrentLocation(newValue) {
   localStorage.removeItem('currentLocation')
   localStorage.setItem('currentLocation', newValue)
}
