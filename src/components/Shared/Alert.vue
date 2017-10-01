<template>
    <!--here means if mouse click close, dismissed event will be emitted-->
    <v-alert error dismissible @input="onClose" :value='true'>
       {{text}}
    </v-alert>
</template>

<<script>
export default {
    props:['text'],
    methods:{
        onClose(){
            this.$emit('dismissed')
        }
    }
}
</script>

