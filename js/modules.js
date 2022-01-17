const overlay = document.querySelector('.overlay')
const newModuleModal = document.querySelector('.new-module-modal')

function openModuleModal() {
   overlay.style = "display: block"
   newModuleModal.style = "display: block"
}
function closeModuleModal() {
   overlay.style = "display: none"
   newModuleModal.style = "display: none"
}

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