<template>
    <div class="details">
      <h3 class="header"><strong>Details from clicked card</strong></h3>
      <br>
      <CommentDetail />
    </div>
  </template>

<script>
// @ is an alias to /src
import CommentDetail from '@/components/CommentDetail.vue';

export default {
  name: 'DetailsView',
  components: {
    CommentDetail
  }
}
</script>