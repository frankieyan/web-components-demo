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

  <button class="button">
    <slot></slot>
  </button>
`

class MyButton extends HTMLElement {
  #button = null

  static get observedAttributes() {
    return ['disabled']
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#button = shadow.querySelector('button')

    this.addEventListener('click', this.#handleClick)
    this.#button.addEventListener('click', this.#handleButtonClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick)
    this.#button.removeEventListener('click', this.#handleButtonClick)
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'disabled') {
      const disabled = newVal === 'true' || newVal === ''

      if (disabled) {
        this.#button.setAttribute('disabled', '')
      } else {
        this.#button.removeAttribute('disabled')
      }
    }
  }

  #handleButtonClick = (event) => {
    event.stopPropagation()

    const clickEvent = new CustomEvent('click', { bubbles: true })
    this.dispatchEvent(clickEvent)
  }

  #handleClick = (event) => {
    if (!(event instanceof CustomEvent)) {
      event.stopImmediatePropagation()
    }
  }
}

window.customElements.define('my-button', MyButton)
