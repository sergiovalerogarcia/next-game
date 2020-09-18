<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
button,
html {
  font-size: 48px;
}

button {
  border: 2px solid black;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #c0f0ff;
}

button:not(:last-child) {
  margin-right: 16px;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
