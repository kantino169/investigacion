<template>
  <div class="wrapper width-5of6">
    <div>
    <h5>Disciplinas</h5> 
    </div> 
    <br/>
    <div class="list">
      <div class="item"  >
        <div class="item-content">
          Nombre: 
        </div>
      </div>
    </div>
    <div class="row justify-around">
      <button class="primary"><i>note_add</i></button>
      <button class="secondary"><i>mode_edit</i></button>
      <button class="red"><i>delete</i></button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 1%;
  margin-left: 1%;
}
.row {
  margin-top: 1%
}
button {
    width: 15%;
    margin-bottom: 20px;
    /*height: 80px; */
  }

  button > i {
    font-size: 30px;
  }
</style>
