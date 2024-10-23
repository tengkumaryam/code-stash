<template>
  <div class="comments">
    <h3 class="header"><strong><u>List of comments retrieved from API</u></strong></h3>
    <br>
    <LesComments msg="Liste des commentaires:"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LesComments from '@/components/LesComments.vue';

export default {
name: 'CommentsView',
components: {
  LesComments
}
}
</script>