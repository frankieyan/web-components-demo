const { createElement, useState } = React
const render = ReactDOM.render
const html = htm.bind(createElement)

function ClickCounter() {
  const [disabled, setDisabled] = useState(false)
  const [count, setCount] = useState(0)

  const handleButtonClick = event => {
    setCount(count + 1)
  }

  const handleCheckboxChange = event => {
    setDisabled(event.target.checked)
  }

  const labelStyle = { display: 'flex', alignItems: 'center' }

  return html`
    <my-card>
      <my-button onClick=${handleButtonClick} disabled=${disabled}>
        I've been ${disabled ? 'disabled' : 'rendered'} by React
      </my-button>

      <p>
        <label style=${labelStyle}>
          <input type="checkbox" onChange=${handleCheckboxChange} checked=${disabled} />
          Disable button
        </label>
      </p>

      <p>I've been clicked ${count} times</p>
    </my-card>
  `
}

render(html`<${ClickCounter}/>`, document.getElementById("react-app"))
