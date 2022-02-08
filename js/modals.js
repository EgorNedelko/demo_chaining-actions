const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Step1" : "Structure your testing flow!",
   "Step2" : "Project created!",
   "Step3" : "Modules list",
   "Step4" : "Create a module...",
   "Step5" : "Quick Navigation Panel"
}

const modalsBodyContent = {
   "Welcome!" : "We would love to show you around - it won't take long.",
   "Step1" : "The power of zero-code testing automation lies ahead, in test scenarios. But first we need to create a project we are going to be testing.", 
   "Step2" : "Great! To view a project's content just click on it.",
   "Step3" : "If you look at the navigation panel above, you can see that we are now inside the selected project.",
   "Step4" : "Now we need a module - a part of the project we will be focusing on.",
   "Step5" : "Using the navigation panel above, we can instantly go to any part of the selected project."
}

//Constructor function
function buildModal(header, body) {
   let fragment = document.createDocumentFragment()

   const modal = document.createElement('div')
   modal.classList.add('modal')

   const modalHeader = document.createElement('div')
   modalHeader.classList.add('modal-header')

   const modalHeaderContent = document.createElement('div')
   modalHeaderContent.classList.add('modal-header-content')
   modalHeaderContent.textContent = header

   const closeModalBtn = document.createElement('div')
   closeModalBtn.classList.add('close-modal-btn')
   closeModalBtn.textContent = 'X'

   const modalBody = document.createElement('div')
   modalBody.classList.add('modal-body')
   
   const modalContent = document.createElement('div')
   modalContent.classList.add('modal-content', 'invisible')
   modalContent.textContent = body

   const modalFooter = document.createElement('div')
   modalFooter.classList.add('modal-footer')
   
   const modalNextBtn = document.createElement('div')
   modalNextBtn.classList.add('modal-next-btn')
   modalNextBtn.textContent = "NEXT"

   const modalNextBtnIcon = document.createElement('img')
   modalNextBtnIcon.classList.add('modal-next-btn-icon')
   modalNextBtnIcon.setAttribute('src', "https://img.icons8.com/windows/32/ffffff/circled-chevron-right.png")

   modalHeader.appendChild(modalHeaderContent)
   modalHeader.appendChild(closeModalBtn)
   modalBody.appendChild(modalContent)
   modalNextBtn.appendChild(modalNextBtnIcon)
   modalFooter.appendChild(modalNextBtn)

   modal.appendChild(modalHeader)
   modal.appendChild(modalBody)
   modal.appendChild(modalFooter)

   fragment.append(modal)
   return fragment
}

function openTourModal() {
   setTimeout(()=>{
      overlay.classList.add('active')
      document.querySelector('.modal').classList.add('active')
      document.querySelector('.modal-content').classList.remove('invisible')
   }, 1000)
}

function closeTourModal(isTimeout) {
   if (isTimeout) {
      setTimeout(() => {
         document.querySelector('.modal').classList.remove('active')
      }, 300)
      setTimeout(() => {
         overlay.classList.remove('active')
      }, 400)
      setTimeout(() => {
         document.querySelector('.container').removeChild(document.querySelector('.modal'))
      }, 500)
   } else {
      // overlay.classList.remove('active')
      document.querySelector('.modal').classList.remove('active')
      setTimeout(() => { document.querySelector('.container').removeChild(document.querySelector('.modal')) }, 200)
   }
}

//EVENTS
//Close Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal(true)
   }
})

//Initiate modal on every empty pageload
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (document.querySelectorAll('.project').length == 0) {
         //Welcome Modal + DoggyHead
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         document.querySelector('.modal-next-btn').childNodes[0].textContent = "START QUICK TOUR"
         openTourModal()

         //position doggy on the target element
         let doggyHead = document.querySelector('.doggy-head')
         let targetElem = document.querySelector(".modal")
         let targetElemPos = targetElem.getBoundingClientRect()
         doggyHead.style.left = `${targetElemPos.x-195}px`
         doggyHead.style.top = `${targetElemPos.y-136}px`

         //make doggy appear
         setTimeout(() => { doggyHead.querySelector('svg').setAttribute('opacity', '1') }, 1250)
      }
   } 
   // else if (localStorage.getItem('currentLocation') == 'modules') {
   //    if (!localStorage.getItem('userProjects')[localStorage.getItem('projectInd')].modules || document.querySelectorAll('.module').length == 0) {
   //       //Modal #3
   //       document.querySelector('.container').append(buildModal(modalsHeaderContent["Step3"], modalsBodyContent["Step3"]))
   //       let timeout = setTimeout(()=>{
   //          overlay.classList.add('active')
   //          document.querySelector('.modal').classList.add('active')
   //          document.querySelector('.modal-content').classList.remove('invisible')
   //       }, 1000)
   //    }
   // }
})

//Click on NEXT button on the onboarding modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      let doggy = document.querySelector('.doggy')

      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Step1 Modal
         if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
            //Close prev Modal and doggyHead
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
            closeTourModal(true)
   
            //position doggy on the target element
            let targetElem = document.querySelector(".btn[value='New']")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 5}px`
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 55}px`

            //position Step1 Modal
            setTimeout(() => {
               targetElem.classList.add('onboarding-focus')
               let modal = document.querySelector('.modal')
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Step1"], modalsBodyContent["Step1"]))
               document.querySelector('.modal').style.left = `${targetElemPos.x - document.querySelector('.modal').offsetWidth/1.5}px`
               document.querySelector('.modal').style.top = `${targetElemPos.y - targetElem.offsetHeight}px`
               document.querySelector('.modal').removeChild(document.querySelector('.modal-footer'))
            }, 600)
            //Make doggy and modal visible
            openTourModal()
            setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 1200)
         
         //Doggy #2
         } else if (document.querySelector('.modal-header-content').textContent  == "Project created!") {
            closeTourModal(true)
   
            //position doggy on the target element
            let targetElem = document.querySelector(".project-name")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 110}px`
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 60}px`
   
            //make doggy appear
            setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 400)
         } 

      //MODULES PAGE
      } else if (localStorage.getItem('currentLocation') == 'modules') {
         //Doggy #3
         if (document.querySelector('.modal-header-content').textContent == "Modules list") {
            closeTourModal(true)
   
            //position doggy on the target element
            let targetElem = document.querySelector(".pr-path")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 50}px`
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 48}px`
   
            //make doggy appear
            setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 400)
         }
      }
   }
})

//Press ENTER to create the 1st project and continue Onboarding 
window.addEventListener('keydown', (e) => {
   const items = document.querySelectorAll('.project')
   if (e.key == "Enter" && items.length == 1) {
      //Modal #2
      document.querySelector('.doggy svg').setAttribute('opacity', '0')
      document.querySelector('.container').append(buildModal(modalsHeaderContent["Step2"], modalsBodyContent["Step2"]))
      document.querySelector('.modal').removeChild(document.querySelector('.modal-footer'))
      openTourModal()
   }
})

//Click SAVE to create the 1st project and continue Onboarding
document.addEventListener('click', (e) => {
   const items = document.querySelectorAll('.project')
   if (e.target.value == "Save" && items.length == 1) {
      //Modal #2
      document.querySelector('.doggy svg').setAttribute('opacity', '0')
      document.querySelector('.container').append(buildModal(modalsHeaderContent["Step2"], modalsBodyContent["Step2"]))

      //position doggy on the target element
      let doggy = document.querySelector('.doggy')
      let targetElem = document.querySelector(".project-name")
      let targetElemPos = targetElem.getBoundingClientRect()
      doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 110}px`
      doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 60}px`

      //position Step2 Modal
      setTimeout(() => {
         targetElem.parentNode.classList.add('onboarding-focus')
         let modal = document.querySelector('.modal')
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Step1"], modalsBodyContent["Step1"]))
         document.querySelector('.modal').style.left = `${targetElemPos.x + document.querySelector('.modal').offsetWidth/2}px`
         document.querySelector('.modal').style.top = `${targetElemPos.y + targetElem.offsetHeight*8}px`
         document.querySelector('.modal').removeChild(document.querySelector('.modal-footer'))
      }, 600)

      //make doggy and modal visible
      openTourModal()
      setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 400)
   }
})


//TOUR ELEMENTS EVENTS
document.querySelector("input[value='New']").addEventListener('click', () => {
   if (document.querySelector('.modal').classList.contains('active')) {
      closeTourModal(false)
   }
})
