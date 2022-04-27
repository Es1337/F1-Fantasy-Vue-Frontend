<template>
    <button class="btn"> {{value}} </button>
</template>

<script>
export default {
    name:"NavButton",
    props:{
        value:{
            type: String,
            default: "Button"
        }
    }
}
</script>