const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card {
      display: block;
      margin: 0 12px 12px 0;
      padding: 12px;
      border: 1px solid #ececec;
    }
  </style>

  <section class="card">
    <slot></slot>
  </section>
`

class MyCard extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('my-card', MyCard)
