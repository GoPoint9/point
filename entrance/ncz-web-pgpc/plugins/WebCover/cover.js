export const loaderHTML = `
  <div class='br_loader_main'>
    <div class='br_loader_bg'></div>
    <div class='br_loader_content'>
      <div class='br_spinner'>
        <div class='spinner_inner'>
          <div class='spinner_line'></div>
          <div class='spinner_line'></div>
          <div class='spinner_line'></div>
          <div class='spinner_circle'>&#9679;</div>
        </div>
      </div>
    </div>
  </div>`

export const cover = {
  loader (timeout, parentElement) {
    let loaderElement = document.getElementById('br_loader')

    if (!loaderElement) {
      const fragment = document.createDocumentFragment()
      const loaderDiv = document.createElement('div')
      loaderDiv.id = 'br_loader'

      const appElement = document.getElementById('app')
      loaderElement = loaderDiv
      loaderDiv.innerHTML = loaderHTML

      fragment.appendChild(loaderDiv)
      if (parentElement) {
        loaderDiv.className = 'br_loader_child'
        parentElement.appendChild(fragment)
      } else {
        loaderDiv.className = 'br_loader_root'
        document.body.insertBefore(fragment, appElement)
      }
    }
    this.close(loaderElement, timeout)
  },
  init (options = {}, callback) {
    const sortedOptions = this.sortOptions(options)
    const dialogElement = document.getElementById('pp_model_dialog')

    if (dialogElement) {
      const mainElement = this.getByClass(dialogElement, 'pp_model_dmain')
      const bodyElement = this.getByClass(dialogElement, 'pp_model_dbody')

      mainElement.removeChild(bodyElement)

      const fragment = document.createDocumentFragment()
      fragment.appendChild(
        this.createDom(sortedOptions, options, dialogElement, function (e) {
          callback && callback(e)
        })
      )

      dialogElement.classList.add('active')
      mainElement.appendChild(fragment)
    } else {
      const fragment = document.createDocumentFragment()
      const dialogStructure = []
      let depth = 0

      while (depth < 2) {
        const div = document.createElement('div')
        if (depth > 0) dialogStructure[depth - 1].appendChild(div)
        dialogStructure[depth] = div
        depth++
      }

      dialogStructure[0].id = 'pp_model_dialog'
      dialogStructure[0].className = options.class ? `pp_model_dialog active ${options.class}` : 'pp_model_dialog active'
      dialogStructure[1].className = 'pp_model_dmain'

      dialogStructure[1].appendChild(this.createDom(sortedOptions, options, dialogStructure[0], callback))

      const coverElement = document.createElement('div')
      coverElement.className = 'pp_model_dcover'
      coverElement.id = 'pp_model_dcover'

      dialogStructure[1].appendChild(coverElement)
      fragment.appendChild(dialogStructure[0])
      document.body.appendChild(fragment)
    }

    const coverElement = document.getElementById('pp_model_dcover')
    coverElement.onclick = () => {
      if (typeof options.cover !== 'boolean' || options.cover) {
        this.close(dialogElement)
        callback('cover')
      }
    }

    if (options.timeOut) {
      this.close(dialogElement, options.timeOut)
    }
  },
  sortOptions (options) {
    const sorted = {}
    if (options.icon) sorted.icon = options.icon
    if (options.title) sorted.title = options.title
    if (options.html) sorted.html = options.html
    if (options.btn) sorted.btn = options.btn
    return sorted
  },
  getByClass (parentElement, className) {
    const elements = parentElement.getElementsByTagName('*')
    return Array.from(elements).find((el) => el.className === className)
  },
  createDom (sortedOptions, options, dialogElement, callback) {
    const bodyElement = document.createElement('div')
    bodyElement.className = 'pp_model_dbody'
    bodyElement.style = options.style || ''

    Object.entries(sortedOptions).forEach(([key, value]) => {
      if (key === 'btn') {
        const buttonContainer = document.createElement('div')
        buttonContainer.className = `pp_model_db${key}`

        Object.entries(value).forEach(([buttonClass, buttonText]) => {
          const button = document.createElement('div')
          button.className = buttonClass
          button.innerHTML = `<span>${buttonText}</span>`
          button.addEventListener('click', () => {
            this.close(dialogElement)
            callback && callback(buttonClass)
          })
          buttonContainer.appendChild(button)
        })

        bodyElement.appendChild(buttonContainer)
      } else if (key === 'icon') {
        const iconElement = document.createElement('div')
        iconElement.className = `pp_model_db${key} ${value}`
        iconElement.innerHTML = `<span class=br_dialog_d${value}></span>`
        bodyElement.appendChild(iconElement)
      } else {
        const contentElement = document.createElement('div')
        contentElement.className = `pp_model_db${key}`
        contentElement.innerHTML = value
        bodyElement.appendChild(contentElement)
      }
    })

    return bodyElement
  },
  close (element, timeout) {
    if (typeof timeout === 'number') {
      element.classList.add('active')
      setTimeout(() => element.classList.remove('active'), timeout)
    } else if (timeout) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
  },
}
export default cover
// window.cover = loaderUtility;
