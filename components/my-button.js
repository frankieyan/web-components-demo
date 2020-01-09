const template = document.createElement('template')
template.innerHTML = `
  <style>
    .button {
      font-family: "Lucida Grande", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 14px;
      color: rgb(255, 255, 255);
      background-color: rgb(0, 136, 191);
      cursor: pointer;
      padding: 16px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(0, 136, 191);
      border-radius: 4px;
    }

    .button[disabled] {
      color: rgb(127, 136, 140);
      background-color: rgb(242, 243, 243);
      border-color: rgba(0, 0, 0, 0.1);
      cursor: default;
    }
  </style>

  <button class="button"></button>
`

class MyButton extends HTMLElement {
  #button = null

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#button = shadow.querySelector('button')
    this.#button.innerHTML = this.innerHTML
  }

  connectedCallback() {
    this.#upgradeProperty('disabled')
    this.#button.addEventListener('click', this.#handleClick)
  }

  disconnectedCallback() {
    this.#button.removeEventListener('click', this.#handleClick)
  }

  set disabled(value) {
    const isDisabled = Boolean(value)

    if (isDisabled) {
      return this.#button.setAttribute('disabled', '')
    }

    this.#button.removeAttribute('disabled')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  #upgradeProperty = (prop) => {
    if (!this[prop]) {
      return
    }

    const value = this[prop]
    delete this[prop]
    this[prop] = value
  }

  #handleClick = () => {
    console.log('clicked')
  }
}

window.customElements.define('my-button', MyButton)
