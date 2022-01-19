const overlay = document.querySelector('.overlay')
const newScenarioModal = document.querySelector('.new-scenario-modal')
// const deletionModal = document.querySelector('.deletion-modal')
let itemToDelete;

function addScenario(name) {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create project container
   const scenario = document.createElement('div')
   scenario.classList.add('scenario')
   
   const scenarioName = document.createElement('a')
   scenarioName.classList.add('scenario-name')
   scenarioName.setAttribute('href', "./edit-scenario.html")
   scenarioName.textContent = name

   const scenarioStatus = document.createElement('p')
   scenarioStatus.classList.add('scenario-status')
   scenarioStatus.textContent = 'Created'

   const scenarioStepsCounter = document.createElement('p')
   scenarioStepsCounter.classList.add('scenario-steps-counter')
   scenarioStepsCounter.textContent = '1'

   const scenarioRunsCounter = document.createElement('p')
   scenarioRunsCounter.classList.add('scenario-runs-counter')
   scenarioRunsCounter.textContent = '0'

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

   scenario.appendChild(scenarioName)
   scenario.appendChild(scenarioStatus)
   scenario.appendChild(scenarioStepsCounter)
   scenario.appendChild(scenarioRunsCounter)
   scenario.appendChild(actionsBtn)
   fragment.appendChild(scenario)
   document.querySelector('.scenarios').append(fragment)
}

function openScenarioModal() {
   overlay.style = "display: block;"
   newScenarioModal.style = "display: block;"
   newScenarioModal.querySelector('.new-scenario-name').focus()
}

function closeScenarioModal() {
   overlay.style = "display: none;"
   newScenarioModal.style = "display: none;"
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
      document.querySelector('.scenarios').removeChild(itemToDelete)
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
      document.querySelector('.scenarios').removeChild(itemToDelete)
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
      const newScenarioNameInput = document.querySelector('.new-scenario-name')
      if (newScenarioNameInput.value) {
         addScenario(newScenarioNameInput.value)
         newScenarioNameInput.value = ''
      } else {
         addScenario('new scenario')
      }
      closeScenarioModal()
   }
})

//click on the CANCEL BUTTON in the project modal to cancel new project creation
document.addEventListener('click', (e) => {
   if (e.target.value == "Cancel") {
      const newScenarioNameInput = document.querySelector('.new-scenario-name')
      newScenarioNameInput.value = ''
      closeScenarioModal()
   }
})

//click on the ADD SCENARIO BUTTON to add new project
document.querySelectorAll("input[value='Add Scenario']").forEach(btn => btn.addEventListener('click', () => {
   openScenarioModal()
}))

/////STORAGE FUNCTIONS
//click on the STORE to save to local Storage
document.querySelector("input[value='Store']").addEventListener('click', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let targetProject = localStorage.getItem('targetProject')
   let targetModule = localStorage.getItem('targetModule')
   const scenariosList = document.querySelectorAll('.scenario')

   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {

         //Locate module
         for (let j = 0; j < userProjects[i].modules.length; j++) {
            if (userProjects[i].modules[j].name == targetModule) {

               //Get stored and current modules
               const storedScenarios = []
               const currentScenarios = []
               if (userProjects[i].modules[j].scenarios) {
                  for (let y = 0; y < userProjects[i].modules[j].scenarios.length; y++) {
                     storedScenarios.push(userProjects[i].modules[j].scenarios[y].name)
                  }
                  for (let q = 0; q < scenariosList.length; q++) {
                     currentScenarios.push(scenariosList[q].querySelector('.scenario-name').textContent)
                  }

                  //Check #1 - get projects that were deleted
                  let deletedScenarios = []
                  for (let del = 0; del < storedScenarios.length; del++) {
                     if (!currentScenarios.includes(storedScenarios[del])) {
                        deletedScenarios.push(storedScenarios[del])
                     }
                  }

                  //Check #2 - get projects that were added
                  let addedScenarios = []
                  for (let add = 0; add < currentScenarios.length; add++) {
                     if (!storedScenarios.includes(currentScenarios[add])) {
                        addedScenarios.push(currentScenarios[add])
                     }
                  }

                  //Check #3 - whether there were changes 
                  if (addedScenarios.length == 0 && deletedScenarios.length == 0) {
                     return
                  }

                  //Remove deleted projects from the USERSPROJECT object
                  if (deletedScenarios.length != 0) {
                     for (let del = 0; del < deletedScenarios.length; del++) {
                        for (let y = 0; y < userProjects[i].modules[j].scenarios.length; y++) {
                           if (userProjects[i].modules[j].scenarios[y].name == deletedScenarios[del]) {
                              userProjects[i].modules[j].scenarios.splice(y,1)
                           }
                        }
                     }
                  }

                  //Add new projects to USERPROJECTS object
                  if (addedScenarios.length != 0) {
                     for (let add = 0; add < addedScenarios.length; add++) {
                        const scenariosLength = userProjects[i].modules[j].scenarios.length
                        userProjects[i].modules[j].scenarios[scenariosLength] = {
                           name: addedScenarios[add]
                        }
                     }
                  }

               //If there're no scenarios   
               } else {
                  userProjects[i].modules[j].scenarios = []
                  for (let q = 0; q < scenariosList.length; q++) {
                     userProjects[i].modules[j].scenarios[q] = {
                        name: scenariosList[q].querySelector('.scenario-name').textContent
                     }
                  }
               }
            }
         }
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
})

//LOADING 
document.addEventListener('DOMContentLoaded', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let targetProject = localStorage.getItem('targetProject')
   let targetModule = localStorage.getItem('targetModule')
   
   //Update path
   document.querySelector('.path-project').textContent = targetProject
   document.querySelector('.path-module').textContent = targetModule
   
   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {

         //Locate module
         if (userProjects[i].modules) {
            for (let j = 0; j < userProjects[i].modules.length; j++) {
               if (userProjects[i].modules[j].name == targetModule) {

                  //Load scenarios
                  if (userProjects[i].modules[j].scenarios) {
                     for (let y = 0; y < userProjects[i].modules[j].scenarios.length; y++) {
                        addScenario(userProjects[i].modules[j].scenarios[y].name)
                        let scenarioToModify = document.querySelectorAll('.scenario')[document.querySelectorAll('.scenario').length-1]
                        
                        //Update steps counter
                        if (userProjects[i].modules[j].scenarios[y].steps) {
                           scenarioToModify.querySelector('.scenario-steps-counter').textContent = userProjects[i].modules[j].scenarios[y].steps.length
                        }
                     }
                  }
               }
            }
         }
      }
   }
})

//click on the module name to STORE DESTINATION 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('scenario-name')) {
      localStorage.removeItem('targetScenario')
      localStorage.setItem('targetScenario', e.target.textContent)
   }
})