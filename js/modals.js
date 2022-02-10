//Global variable for controlling the tour
let tourEnabled = false;

const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Seg1Header" : "Structure your testing flow",
   "Navbar" : "Navigation panel"
}

const modalsBodyContent = {
   "Welcome!" : "We would love to show you around - it won't take long.",
   "Seg1Modal" : "The power of zero-code testing automation lies ahead, in test scenarios. But to get there we need to create a project we will be testing and a module that our scenario will be focusing on.", 
   "Seg1Step1" : "At the top of the chain, there's a project. So let's make one.",
   "Seg1Step2" : "Project created! To view its content just click on the project name.",
   "Navbar" : "If you look at the navigation panel above, you can see that we are now inside the selected project where its modules are.",
   "Seg1Step3" : "Now we need a module - a part of the project we will be focusing on.",
   "Seg1Step4" : "Another way to navigate your project is to click on the navigation menu level you're currently on and select an item you want to go to.",
   "Seg1Step5" : "Almost there! Now we need an actual test scenario where all the fun stuff happens.",
   "Seg1Step6" : "Lastly, a third way you can access the content of an item is to click on its menu button and select 'Show'.",
   "Seg1Step7" : "Using the navigation panel above, we can instantly go to any part of the selected project."
}

//Constructor functions
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
   modalNextBtn.textContent = "GOT IT!"

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

function trimModal(orderNum) {
   document.querySelector('.modal-footer').removeChild(document.querySelector('.modal-next-btn'))
   const modalOrderNum = document.createElement('div')
   modalOrderNum.classList.add('modal-order-num')
   modalOrderNum.textContent = orderNum
   document.querySelector('.modal-footer').append(modalOrderNum)
}

function openTourModal() {
   setTimeout(()=>{
      overlay.classList.add('active')
      document.querySelector('.modal').classList.add('active')
      document.querySelector('.modal-content').classList.remove('invisible')
   }, 1000)
}

function closeTourModal(isTimed) {
   if (isTimed) {
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

function positionDoggy(isTimed, doggyClass, leftPosition, topPosition) {
   let doggy = document.querySelector(`.${doggyClass}`)

   if (isTimed) {
      setTimeout(() => {
         doggy.style.left = `${leftPosition}%`
         doggy.style.top = `${topPosition}%`
      }, 2000)
   } else {
      doggy.style.left = `${leftPosition}%`
      doggy.style.top = `${topPosition}%`
   }
}

function positionModal(isTimed, leftPosition, topPosition) {
   if (isTimed) {
      setTimeout(() => {
         document.querySelector('.modal').style.left = `${leftPosition}%`
         document.querySelector('.modal').style.top = `${topPosition}%`
      }, 600)
   } else {
      document.querySelector('.modal').style.left = `${leftPosition}%`
      document.querySelector('.modal').style.top = `${topPosition}%`
   }
}

//////////////EVENTS
//PAGE LOADED
document.addEventListener('DOMContentLoaded', () => {
   //PROJECTS PAGE
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (document.querySelectorAll('.project').length == 0) {
         //Create Welcome Modal 
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         document.querySelector('.modal-next-btn').childNodes[0].textContent = "START QUICK TOUR"
         document.querySelector('.modal-header').removeChild(document.querySelector('.close-modal-btn'))
         positionDoggy(false, 'doggy-head', 40, 37)
         
         //Add SKIP TOUR button
         const skipTourBtn = document.createElement('div')
         skipTourBtn.classList.add('modal-skip-btn')
         skipTourBtn.textContent = "SKIP TOUR"
         document.querySelector('.modal-footer').insertBefore(skipTourBtn, document.querySelector('.modal-next-btn'))
         document.querySelector('.modal-footer').style.justifyContent = "center"
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-head svg').setAttribute('opacity', '1') }, 1250)
      }
   }

   if (tourEnabled) {
      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Navbar"], modalsBodyContent["Navbar"]))
         positionModal(false, 35, 38)
         positionDoggy(false, 'doggy-flipped', 26, 16.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').style.color = "grey" }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1250)
      }
   
      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step5"]))
         positionModal(false, 40, 23)
         positionDoggy(false, 'doggy', 61, 11.5)
         trimModal('5/7')
         
         //Apply Onboarding focus
         setTimeout(() => { document.querySelector(".btn[value='Add Scenario']").classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }
   }

   //STEPS PAGE
   // if (localStorage.getItem('currentLocation') == 'steps') {
   //    document.addEventListener('mouseover', (e) => {
   //       darkenUponHover(e)
   //    })
   // }
})

//NEXT BUTTON
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //In the Welcome Modal
         if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
            //Close prev
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
            closeTourModal(true)
            tourEnabled = true

            //Create next 
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Modal"]))
            openTourModal()
         } 

         //In the Segment1 Modal 
         if (document.querySelector('.modal-header-content').textContent  == "Structure your testing flow") {
            //Close prev
            closeTourModal(true)
   
            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step1"]))
               trimModal('1/7')
            }, 600)
            positionModal(true, 62, 20)
            positionDoggy(false, 'doggy', 78, 11.5)

            //Apply Onboarding focus
            setTimeout(() => { document.querySelector(".btn[value='New']").classList.add('onboarding-focus') }, 1000)
            
            //Make doggy and modal visible
            openTourModal()
            setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
         }
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy-flipped > svg').setAttribute('opacity', '0')
         closeTourModal(true)

         //Remove Onboarding focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').removeAttribute('style') }, 500)

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step3"]))
            trimModal('3/7')
         }, 600)
         positionModal(true, 46, 22)
         positionDoggy(false, 'doggy', 64, 11.5)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".btn[value='Add Module']").classList.add('onboarding-focus') }, 1000)

         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }
   }
})

//SAVE BUTTON
document.addEventListener('click', (e) => {
   if (e.target.value == "Save" && tourEnabled) {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step2"]))
            trimModal('2/7')
         }, 600)
         positionModal(true, 30, 46)
         positionDoggy(false, 'doggy-flipped', 26, 27.3)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".project-name").parentNode.classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
   
         //Create new
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step4"]))
            trimModal('4/7')
         }, 600)
         positionModal(true, 45, 41)
         positionDoggy(false, 'doggy-flipped', 36, 16.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').style.color = "grey" }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
      }

      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
         // document.removeEventListener('mouseover', darkenUponHover, false)
   
         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step6"]))
            trimModal('6/7')
         }, 600)
         positionModal(true, 58, 49)
         positionDoggy(true, 'doggy', 79, 21.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.scenario').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 2000)
      }
   }
})

//Press ENTER to create the 1st project and continue Onboarding 
// window.addEventListener('keydown', (e) => { })

//Close Tour Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal(true)
      if (localStorage.getItem('currentLocation') == 'modules') {
         document.querySelector('.scen-link').removeAttribute('style')
      }
   }
})

//SKIP TOUR button
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-skip-btn')) {
      tourEnabled = false
      closeTourModal(true)
      document.querySelector('.doggy-head svg').setAttribute('opacity', '0')
   }
})

//TOUR ELEMENTS EVENTS
if (document.querySelector("input[value='New']")) {
   document.querySelector("input[value='New']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='New']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='New']").classList.remove('onboarding-focus')
      }
   })
}

if (document.querySelector("input[value='Add Module']")) {
   document.querySelector("input[value='Add Module']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='Add Module']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='Add Module']").classList.remove('onboarding-focus')
      }
   })
}

if (document.querySelector("input[value='Add Scenario']")) {
   document.querySelector("input[value='Add Scenario']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='Add Scenario']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='Add Scenario']").classList.remove('onboarding-focus')
      }
   })
}
