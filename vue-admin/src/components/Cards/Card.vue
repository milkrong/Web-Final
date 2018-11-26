<template>
  <div class="card">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "card"
};
</script>
<style>
.card {
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
}

.card .card-title,
.card .stats,
.card .category,
.card .description,
.card .social-line,
.card .actions,
.card .card-content,
.card .card-footer,
.card small,
.card a {
  position: relative;
}

.card .card-header {
  padding: 20px 15px 0px;
  position: relative;
  border-radius: 3px 3px 0 0;
  z-index: 3;
}

.card .card-footer {
  padding: 0 15px 15px;
}

.card .card-footer hr {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
