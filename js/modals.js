const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Step2" : "Project created!",
   "Step3" : "Modules list",
   "Step4" : "Create a module...",
   "Step5" : "Quick Navigation Panel"
}

const modalsBodyContent = {
   "Welcome!" : "The power of zero-code testing automation lies ahead, in test scenarios. But first we need to create a project we are going to be testing.",
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
   modalContent.classList.add('modal-content')
   // modalContent.classList.add('modal-content', 'invisible')
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

function openTourModal(content) {
   overlay.classList.add('active')
   document.querySelector('.container').append(buildModal(content))
   setTimeout(() => {
      document.querySelector('.modal').classList.add('active')
      document.querySelector('.modal-content').classList.remove('invisible')
   }, 500)
}

function closeTourModal() {
   document.querySelector('.modal').classList.remove('active')
   setTimeout(() => {
      overlay.classList.remove('active')
   }, 100)
   document.querySelector('.container').removeChild(document.querySelector('.modal'))
}

//EVENTS
//Close Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal()
   }
})

//Initiate modal on every empty pageload
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (document.querySelectorAll('.project').length == 0) {
         //Modal #1
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         document.querySelector('.modal-next-btn').childNodes[0].textContent = "START QUICK TOUR"

         //position doggy on the target element
         let doggyHead = document.querySelector('.doggy-head')
         let targetElem = document.querySelector(".modal")
         let targetElemPos = targetElem.getBoundingClientRect()
         doggyHead.style.left = `${targetElemPos.x-195}px`;
         doggyHead.style.top = `${targetElemPos.y-151}px`;

         let timeout = setTimeout(()=>{
            overlay.classList.add('active')
            document.querySelector('.modal').classList.add('active')
            // document.querySelector('.modal-content').classList.remove('invisible')
         }, 1000)
         //make doggy appear
         setTimeout(() => { doggyHead.querySelector('svg').setAttribute('opacity', '1') }, 1200)
      }
   } else if (localStorage.getItem('currentLocation') == 'modules') {
      if (!localStorage.getItem('userProjects')[localStorage.getItem('projectInd')].modules || document.querySelectorAll('.module').length == 0) {
         //Modal #3
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Step3"], modalsBodyContent["Step3"]))
         let timeout = setTimeout(()=>{
            overlay.classList.add('active')
            document.querySelector('.modal').classList.add('active')
            document.querySelector('.modal-content').classList.remove('invisible')
         }, 1000)
      }
   }
})

//Click on NEXT button on the onboarding modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      let doggy = document.querySelector('.doggy')

      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Doggy #1
         if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
            closeTourModal()
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
   
            //position doggy on the target element
            let targetElem = document.querySelector(".btn[value='New']")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 5}px`;
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 55}px`;
   
            //make doggy appear
            setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 400)
         
         //Doggy #2
         } else if (document.querySelector('.modal-header-content').textContent  == "Project created!") {
            closeTourModal()
   
            //position doggy on the target element
            let targetElem = document.querySelector(".project-name")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 110}px`;
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 60}px`;
   
            //make doggy appear
            setTimeout(() => { doggy.querySelector('svg').setAttribute('opacity', '1') }, 400)
         } 

      //MODULES PAGE
      } else if (localStorage.getItem('currentLocation') == 'modules') {
         //Doggy #3
         if (document.querySelector('.modal-header-content').textContent == "Modules list") {
            closeTourModal()
   
            //position doggy on the target element
            let targetElem = document.querySelector(".pr-path")
            let targetElemPos = targetElem.getBoundingClientRect()
            doggy.style.left = `${targetElemPos.x - targetElem.offsetWidth + 50}px`;
            doggy.style.top = `${targetElemPos.y - targetElem.offsetHeight - 48}px`;
   
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
      let timeout = setTimeout(()=>{
         overlay.classList.add('active')
         document.querySelector('.modal').classList.add('active')
         document.querySelector('.modal-content').classList.remove('invisible')
      }, 1000)
   }
})

//Click SAVE to create the 1st project and continue Onboarding
document.addEventListener('click', (e) => {
   const items = document.querySelectorAll('.project')
   if (e.target.value == "Save" && items.length == 1) {
      //Modal #2
      document.querySelector('.doggy svg').setAttribute('opacity', '0')
      document.querySelector('.container').append(buildModal(modalsHeaderContent["Step2"], modalsBodyContent["Step2"]))
      let timeout = setTimeout(()=>{
         overlay.classList.add('active')
         document.querySelector('.modal').classList.add('active')
         document.querySelector('.modal-content').classList.remove('invisible')
      }, 1000)
   }
})

// function cutout() {
   // const elem = document.querySelector(".btn[value='New']")
   // let rect = elem.getBoundingClientRect()
   
   // document.getElementById('overlay-cutout').classList.add('active')
   //left
   // document.getElementById('cutout-left').style.right = `${window.innerWidth - rect.x + 10}px`
   
   // //right
   // document.getElementById('cutout-right').style.left = `${rect.x + elem.offsetWidth + 10}px`
   
   // //top
   // document.getElementById('cutout-top').style.bottom = `${window.innerHeight - rect.y + 10}px`
   // //top-left-trim
   // document.getElementById('cutout-top').style.left = `${rect.x - 10}px`
   // //top-right-trim
   // document.getElementById('cutout-top').style.right = `${window.innerWidth - rect.x - elem.offsetWidth - 10}px`
   
   // //bottom 
   // document.getElementById('cutout-bottom').style.top = `${rect.y + elem.offsetHeight + 10}px`
   // //bottom-left-trim
   // document.getElementById('cutout-bottom').style.left = `${rect.x - 10}px`
   // //bottom-right-trim
   // document.getElementById('cutout-bottom').style.right = `${window.innerWidth - rect.x - elem.offsetWidth - 10}px`
// }


//SHEPHERD 
// const tour = new Shepherd.Tour({
//    defaultStepOptions: {
//      cancelIcon: {
//        enabled: true
//      },
//      classes: 'class-1 class-2',
//      scrollTo: { behavior: 'smooth', block: 'center' }
//    }
//  });
 
//  tour.addStep({
//    title: 'Creating a Shepherd Tour',
//    text: `Creating a Shepherd tour is easy. too!\
//    Just create a \`Tour\` instance, and add as many steps as you want.`,
//    attachTo: {
//      element: '.sidebar',
//      on: 'bottom'
//    },
//    buttons: [
//      {
//        action() {
//          return this.back();
//        },
//        classes: 'shepherd-button-secondary',
//        text: 'Back'
//      },
//      {
//        action() {
//          return this.next();
//        },
//        text: 'Next'
//      }
//    ],
//    id: 'creating'
//  });
 
//  tour.start();