<template>
  <div v-if="showAlert" class="position-absolute top-50 start-50 translate-middle w-75 h-75">
    <div :class="['alert', 'alert-dismissible', `alert-${alertType}`]" role="alert">
      <strong v-if="alertType === 'success'">Well done!</strong>
      <strong v-if="alertType === 'danger'">Oh snap!</strong>
      {{ alertMessage }}
    </div>
  </div>
</template>
