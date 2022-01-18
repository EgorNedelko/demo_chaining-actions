const overlay = document.querySelector('.overlay')
const newProjectModal = document.querySelector('.new-project-modal')

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

   const projectActionsBtn = document.createElement('div')
   projectActionsBtn.classList.add('actions-btn')

   const projectMenuIcon = document.createElement('img')
   projectMenuIcon.classList.add('project-menu-icon')
   projectMenuIcon.setAttribute('src', "https://img.icons8.com/color/48/000000/menu-2.png")

   const projectActionsDropdown = document.createElement('div')
   projectActionsDropdown.classList.add('actions-dropdown')

   const projectActionsArr = ['Show', 'Execute', 'Schedule', 'Copy', 'Delete']
   for (let i = 0; i < projectActionsArr.length; i++) {
      const projectAction = document.createElement('a')
      projectAction.classList.add('actions-dropdown-item')
      projectAction.textContent = projectActionsArr[i]
      projectActionsDropdown.appendChild(projectAction)
   }

   projectActionsBtn.appendChild(projectMenuIcon)
   projectActionsBtn.appendChild(projectActionsDropdown)

   project.appendChild(projectName)
   project.appendChild(projectStatus)
   project.appendChild(projectModulesCounter)
   project.appendChild(projectScenariosCounter)
   project.appendChild(projectRunsCounter)
   project.appendChild(projectActionsBtn)
   fragment.appendChild(project)
   document.querySelector('.projects').append(fragment)
}

function openProjectModal() {
   overlay.style = "display: block"
   newProjectModal.style = "display: block"
}

function closeProjectModal() {
   overlay.style = "display: none"
   newProjectModal.style = "display: none"
}

//click on the ACTIONS BUTTON for dropdown menu to appear
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('project-menu-icon')) {
      document.querySelectorAll('.actions-dropdown').forEach(el => {
         if (el != e.target.parentNode.parentNode.querySelector('.actions-dropdown')) el.classList.remove('visible')
      })
      e.target.parentNode.parentNode.querySelector('.actions-dropdown').classList.toggle('visible')
   }
})

//click on the SAVE BUTTON in the project modal to create a new project
document.addEventListener('click', (e) => {
   if (e.target.value == "Save") {
      const newProjectNameInput = document.querySelector('.new-project-name')
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
      const newProjectNameInput = document.querySelector('.new-project-name')
      newProjectNameInput.value = ''
      closeProjectModal()
   }
})

//click on the NEW BUTTON to add new project
document.querySelectorAll("input[value='New']").forEach(btn => btn.addEventListener('click', () => {
   openProjectModal()
}))

/////STORAGE FUNCTIONS
//click on the STORE to save to local Storage
document.querySelector("input[value='Store']").addEventListener('click', () => {
   const projectsList = document.querySelectorAll('.project')
   let userProjects = []
   for (let i = 0; i < projectsList.length; i++) {
      userProjects[i] = {
         name: projectsList[i].querySelector('.project-name').textContent
      }
   }
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
})

//LOADING 
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('userProjects')) {
      let parsedProjects = JSON.parse(localStorage.getItem('userProjects'))
      for (let i = 0; i < parsedProjects.length; i++) {
         addProject(parsedProjects[i].name)
      }
   }
})

//click on the project name to STORE DESTINATION 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('project-name')) {
      localStorage.removeItem('targetProject')
      localStorage.setItem('targetProject', e.target.textContent)
   }
})