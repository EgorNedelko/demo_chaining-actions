const overlay = document.querySelector('.overlay')
const newProjectModal = document.querySelector('.new-project-modal')

// class Project {
//    constructor(name, mods, scens) {
//       this.name = name
//       this.mods = mods
//       this.scens = scens
//       this.modsNum = mods.length
//       this.scensNum = scens.length
//    }
// }

//STORAGE FUNCTIONS
// function saveProjects() {
//    const projects = document.querySelectorAll('.project')

//    let projects = {
//       0 : {
//          name: 'someName',
//          mods: 0,
//          scens: 0,
//          modules: {
//             0
//          }
//       }
//    }
//    let projectNames = []
//    let projectMods = []
//    let projectScens = []
   
   // for (let i = 0; i < projects.length; i++) {
      // projectNames.push(projects[i].)
      // projectMods.push(projects[i].)
      // projectScens.push(projects[i].)
   // }

   // localStorage.removeItem('stepTypes')
   // localStorage.removeItem('stepStyles')
   // localStorage.removeItem('stepValues')
   // localStorage.setItem('stepTypes', stepTypes)
   // localStorage.setItem('stepStyles', stepStyles)
   // localStorage.setItem('stepValues', stepValues)
// }

// window.addEventListener("beforeunload", saveProjects)

// function loadSteps() {
//    let stepsContainer = document.querySelector('.steps')

//    if (localStorage.getItem('stepTypes')) {
//       stepsContainer.removeChild(stepsContainer.children[0])
   
//       const parsedTypes = localStorage.getItem('stepTypes')
//       const parsedStyles = localStorage.getItem('stepStyles')
//       const parsedValues = localStorage.getItem('stepValues')
//       const stepTypes = parsedTypes.split(',')
//       const stepStyles = parsedStyles.split(',')
//       const stepValues = parsedValues.split(',')

//       for (let i = 0; i < stepTypes.length; i++) {
//          addStep()

//          //modify stepDropdownBtn and stepInput
//          stepsContainer.children[i].children[2].children[0].children[0].textContent = stepTypes[i]
//          stepsContainer.children[i].children[2].children[1].value = stepValues[i]
//          stepsContainer.children[i].children[2].children[1].setAttribute('placeholder', stepTypesTextContent[stepTypes[i]])

//          //add styles to steps, btns and inputs
//          stepStyles[i].split(' ').forEach(style => stepsContainer.children[i].classList.add(style))
//          if (stepStyles[i].includes('options-opened')) {
//             openStepOptions(stepsContainer.children[i])
//          }
//          if (stepTypes[i] != 'Select Type') {
//             stepsContainer.children[i].children[2].children[0].children[0].classList.remove('no-type')
//             stepsContainer.children[i].children[2].children[0].children[0].classList.add('btn-white')
//          }
//       }
//    } 
// }

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

   const projectMenuIcon = document.createElement('img')
   projectMenuIcon.classList.add('project-menu-icon')
   projectMenuIcon.setAttribute('src', "https://img.icons8.com/color/48/000000/menu-2.png")

   project.appendChild(projectName)
   project.appendChild(projectStatus)
   project.appendChild(projectModulesCounter)
   project.appendChild(projectScenariosCounter)
   project.appendChild(projectRunsCounter)
   project.appendChild(projectMenuIcon)
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
      console.log(e.target.textContent)
      localStorage.removeItem('targetProject')
      localStorage.setItem('targetProject', e.target.textContent)
   }
})