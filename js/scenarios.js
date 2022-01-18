const overlay = document.querySelector('.overlay')
const newScenarioModal = document.querySelector('.new-scenario-modal')

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
   scenarioStepsCounter.textContent = '0'

   const scenarioRunsCounter = document.createElement('p')
   scenarioRunsCounter.classList.add('scenario-runs-counter')
   scenarioRunsCounter.textContent = '0'

   const scenarioMenuIcon = document.createElement('img')
   scenarioMenuIcon.classList.add('scenario-menu-icon')
   scenarioMenuIcon.setAttribute('src', "https://img.icons8.com/color/48/000000/menu-2.png")

   scenario.appendChild(scenarioName)
   scenario.appendChild(scenarioStatus)
   scenario.appendChild(scenarioStepsCounter)
   scenario.appendChild(scenarioRunsCounter)
   scenario.appendChild(scenarioMenuIcon)
   fragment.appendChild(scenario)
   document.querySelector('.scenarios').append(fragment)
}

function openScenarioModal() {
   overlay.style = "display: block;"
   newScenarioModal.style = "display: block;"
}

function closeScenarioModal() {
   overlay.style = "display: none;"
   newScenarioModal.style = "display: none;"
}

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

   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {
         for (let j = 0; j < userProjects[i].modules.length; j++) {
            if (userProjects[i].modules[j].name == targetModule) {
               userProjects[i].modules[j].scenarios = []

               for (let y = 0; y < scenariosList.length; y++) {
                  userProjects[i].modules[j].scenarios[j] = {
                     name: scenariosList[j].querySelector('.scenario-name').textContent
                  }
               }
            }
         }
      }
   }
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
})

//LOADING 
document.addEventListener('DOMContentLoaded', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let targetProject = localStorage.getItem('targetProject')
   let targetModule = localStorage.getItem('targetModule')
   
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {
         for (let j = 0; j < userProjects[i].modules.length; j++) {
            if (userProjects[i].modules[j].name == targetModule) {
               for (let y = 0; y < userProjects[i].modules[j].scenarios.length; y++) {
                  addScenario(userProjects[i].modules[j].scenarios[y].name)
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