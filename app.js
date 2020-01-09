const updateClickCount = (() => {
  const counts = {
    awesomeButton: 0,
    disabledButton: 0,
  }

  return (buttonToIncrement) => {
    const buttonName = buttonToIncrement.toString()
    if (typeof counts[buttonName] !== 'number') {
      return
    }

    counts[buttonName]++
    document.getElementById('awesome-button-click-count').textContent = counts.awesomeButton
    document.getElementById('disabled-button-click-count').textContent = counts.disabledButton
  }
})()

document.getElementById('awesome-button')
  .addEventListener('click', () => {
    updateClickCount('awesomeButton')
  })

document.getElementById('disabled-button')
  .addEventListener('click', () => {
    updateClickCount('disabledButton')
  })
