const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Step2" : "Project created!"
}

const modalsBodyContent = {
   "Welcome!" : "The power of zero-code testing automation lies ahead, in test scenarios. But first we need to create a project we are going to be testing.",
   "Step2" : "Great! To view a project's content just click on it.",
   "Step3" : "Now we need a module - a part of the project we're focusing on."
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
//Start the tour
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (!localStorage.getItem('userProjects') || localStorage.getItem('userProjects').length == 2) {
         //Modal #1
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         let timeout = setTimeout(()=>{
            overlay.classList.add('active')
            document.querySelector('.modal').classList.add('active')
            document.querySelector('.modal-content').classList.remove('invisible')
         }, 1000)
      }
   } 
})

//Close Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal()
   }
})

document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
         closeTourModal()
         let timeout = setTimeout(() => {
            document.querySelector(".btn[value='New']").classList.add('onboarding-focus')
         }, 700)
      } else if (document.querySelector('.modal-header-content').textContent  == "Project created!") {
         closeTourModal()
         // let timeout = setTimeout(() => {
         //    document.querySelector(".project-name").classList.add('onboarding-focus')
         // }, 700)
      }
   }
})

document.addEventListener('click', (e) => {
   const items = document.querySelectorAll('.project')
   if (e.target.value == "Save" && items.length == 1) {
      //Modal #2
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