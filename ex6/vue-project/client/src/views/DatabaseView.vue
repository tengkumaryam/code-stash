<template>
    <div class="comments">
      <h3 class="header"><strong><u>List of datas retrieved from database</u></strong></h3>
      <br>
      <DataBaze msg="List of data:"/>
    </div>
  </template>

<script>
// @ is an alias to /src
import DataBaze from '@/components/DataBaze.vue';

export default {
  name: 'DatabaseView',
  components: {
    DataBaze
  }
}
</script>
