const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Seg1Modal" : "Structure your testing flow",
   "Seg1Step1" : "Structure your testing flow",
   "Seg1Step2" : "Structure your testing flow",
   "Step3" : "Modules list",
   "Step4" : "Create a module...",
   "Step5" : "Quick Navigation Panel"
}

const modalsBodyContent = {
   "Welcome!" : "We would love to show you around - it won't take long.",
   "Seg1Modal" : "The power of zero-code testing automation lies ahead, in test scenarios. But to get there we need to create a project we will be testing and a module that our scenario will be focusing on.", 
   "Seg1Step1" : "At the top of the chain, there's a project. So let's make one.",
   "Seg1Step2" : "Project created! To view its content just click on the project name.",
   "Step3" : "If you look at the navigation panel above, you can see that we are now inside the selected project.",
   "Step4" : "Now we need a module - a part of the project we will be focusing on.",
   "Step5" : "Using the navigation panel above, we can instantly go to any part of the selected project."
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

function positionDoggy(isTimed, doggyClass, targetElem, leftPosition, topPosition) {
   let doggy = document.querySelector(`.${doggyClass}`)
   let targetElemPos = targetElem.getBoundingClientRect()
   let left, top

   if (doggyClass == 'doggy-head') {
      left = targetElemPos.x - leftPosition
      top = targetElemPos.y - topPosition
   } else {
      left = targetElemPos.x - targetElem.offsetWidth + leftPosition
      top = targetElemPos.y - targetElem.offsetHeight - topPosition
   }

   if (isTimed) {
      setTimeout(() => {
         doggy.style.left = `${left}px`
         doggy.style.top = `${top}px`
      }, 2000)
   } else {
      doggy.style.left = `${left}px`
      doggy.style.top = `${top}px`
   }
}

//////////////EVENTS
//PAGE LOADED
document.addEventListener('DOMContentLoaded', () => {
   //PROJECTS PAGE
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (document.querySelectorAll('.project').length == 0) {
         //Welcome Modal + DoggyHead
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         document.querySelector('.modal-next-btn').childNodes[0].textContent = "START QUICK TOUR"
         document.querySelector('.modal-header').removeChild(document.querySelector('.close-modal-btn'))
         
         //Add SKIP TOUR button
         const skipTourBtn = document.createElement('div')
         skipTourBtn.classList.add('modal-skip-btn')
         skipTourBtn.textContent = "SKIP TOUR"
         document.querySelector('.modal-footer').insertBefore(skipTourBtn, document.querySelector('.modal-next-btn'))
         document.querySelector('.modal-footer').style.justifyContent = "center"
         
         //Position doggy on the target element
         const targetElem = document.querySelector('.modal')
         positionDoggy(false, 'doggy-head', targetElem, 195, 130)

         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-head svg').setAttribute('opacity', '1') }, 1250)
      }
   }
})

//NEXT BUTTON
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Closing Welcome Modal
         if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
            //Remove Welcome Modal and doggy
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
            closeTourModal(true)

            //Create Segment1 Modal 
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Modal"], modalsBodyContent["Seg1Modal"]))
            openTourModal()
         } 
         //Closing Segment1 Modal 
         if (document.querySelector('.modal-header-content').textContent  == "Structure your testing flow") {
            //Remove Segment1 Modal and doggyHead
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
            closeTourModal(true)
   
            //Position doggy on the target element
            const targetElem = document.querySelector(".btn[value='New']")
            let targetElemPos = targetElem.getBoundingClientRect()
            positionDoggy(false, 'doggy', targetElem, 5, 55)

            //Create Segment1-Step1 Modal
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Step1"], modalsBodyContent["Seg1Step1"]))
               trimModal('1/7')
               document.querySelector('.modal').style.left = `${targetElemPos.x - document.querySelector('.modal').offsetWidth/1.5}px`
               document.querySelector('.modal').style.top = `${targetElemPos.y - targetElem.offsetHeight}px`
               // document.querySelector('.modal').removeChild(document.querySelector('.modal-footer'))
            }, 600)

            //Make doggy and modal visible
            openTourModal()
            setTimeout(() => { document.querySelector(".btn[value='New']").classList.add('onboarding-focus') }, 1000)
            setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
         }
      }
   }
})

//SAVE BUTTON
document.addEventListener('click', (e) => {
   //PROJECTS PAGE
   if (localStorage.getItem('currentLocation') == 'projects') {
      const items = document.querySelectorAll('.project')
      if (e.target.value == "Save" && items.length == 1) {
         //Remove doggy
         document.querySelector('.doggy svg').setAttribute('opacity', '0')

         //Position doggy on the target element
         let targetElem = document.querySelector(".project-name")
         let targetElemPos = targetElem.getBoundingClientRect()
         positionDoggy(true, 'doggy-flipped', targetElem, 110, 60)

         //Apply onboarding-focus
         setTimeout(() => { targetElem.parentNode.classList.add('onboarding-focus') }, 1000)
         
         //Create Segment1-Step2 Modal
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Step2"], modalsBodyContent["Seg1Step2"]))
            trimModal('2/7')
            document.querySelector('.modal').style.left = `${targetElemPos.x + document.querySelector('.modal').offsetWidth/2}px`
            document.querySelector('.modal').style.top = `${targetElemPos.y + targetElem.offsetHeight*8}px`
         }, 600)
   
         //make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 2000)
      }
   }
})

//Press ENTER to create the 1st project and continue Onboarding 
// window.addEventListener('keydown', (e) => { })

//Close Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal(true)
   }
})

//TOUR ELEMENTS EVENTS
document.querySelector("input[value='New']").addEventListener('click', () => {
   //PROJECTS PAGE
   if (localStorage.getItem('currentLocation') == 'projects')  {
      //Remove Segment1-Step1 Modal
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
   }
})
