<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'mwt';
  src: url("./assets/fonts/方正喵呜体.ttf");
}

*{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
  text-decoration: none;
}
.flex{
  display: flex;
}
.j-c{
  justify-content: center;
}
.j-s{
  justify-content: space-between;
}
.a-c{
  align-items: center;
}
</style>
