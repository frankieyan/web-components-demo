const ClickCounter = {
  data: () => ({
    disabled: false,
    count: 0,
    labelStyle: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
  template: `
    <my-card>
      <my-button v-on:click="count++" :disabled="disabled">
        I've been {{disabled ? 'disabled' : 'rendered'}} by Vue
      </my-button>

      <p>
        <label v-bind:style="labelStyle">
          <input type="checkbox" v-model="disabled" />
          Disable button
        </label>
      </p>

      <p>I've been clicked {{count}} times</p>
    </my-card>
  `,
}

new Vue({
  el: '#vue-app',
  render: h => h(ClickCounter),
})
