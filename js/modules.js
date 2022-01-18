const overlay = document.querySelector('.overlay')
const newModuleModal = document.querySelector('.new-module-modal')

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

   const moduleMenuIcon = document.createElement('img')
   moduleMenuIcon.classList.add('module-menu-icon')
   moduleMenuIcon.setAttribute('src', "https://img.icons8.com/color/48/000000/menu-2.png")

   module.appendChild(moduleName)
   module.appendChild(moduleStatus)
   module.appendChild(moduleScenariosCounter)
   module.appendChild(moduleRunsCounter)
   module.appendChild(moduleMenuIcon)
   fragment.appendChild(module)
   document.querySelector('.modules').append(fragment)
}

function openModuleModal() {
   overlay.style = "display: block;"
   newModuleModal.style = "display: block;"
}

function closeModuleModal() {
   overlay.style = "display: none;"
   newModuleModal.style = "display: none;"
}

//click on the SAVE BUTTON in the project modal to create a new project
document.addEventListener('click', (e) => {
   if (e.target.value == "Save") {
      const newModuleNameInput = document.querySelector('.new-module-name')
      if (newModuleNameInput.value) {
         addModule(newModuleNameInput.value)
         newModuleNameInput.value = ''
      } else {
         addModule('new module')
      }
      closeModuleModal()
   }
})

//click on the CANCEL BUTTON in the project modal to cancel new project creation
document.addEventListener('click', (e) => {
   if (e.target.value == "Cancel") {
      const newModuleNameInput = document.querySelector('.new-module-name')
      newModuleNameInput.value = ''
      closeModuleModal()
   }
})

//click on the ADD MODULE BUTTON to add new project
document.querySelectorAll("input[value='Add Module']").forEach(btn => btn.addEventListener('click', () => {
   openModuleModal()
}))

/////STORAGE FUNCTIONS
//click on the STORE to save to local Storage
document.querySelector("input[value='Store']").addEventListener('click', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   let targetProject = localStorage.getItem('targetProject')
   const modulesList = document.querySelectorAll('.module')

   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {
         userProjects[i].modules = []

         for (let j = 0; j < modulesList.length; j++) {
            userProjects[i].modules[j] = {
               name: modulesList[j].querySelector('.module-name').textContent
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

   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {
         for (let j = 0; j < userProjects[i].modules.length; j++) {
            addModule(userProjects[i].modules[j].name)
         }
      }
   }
})

//click on the module name to STORE DESTINATION 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('module-name')) {
      localStorage.removeItem('targetModule')
      localStorage.setItem('targetModule', e.target.textContent)
   }
})