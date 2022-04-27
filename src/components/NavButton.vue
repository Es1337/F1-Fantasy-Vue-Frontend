<template>
<router-link :to="url" custom v-slot="{ navigate }">
    <button :style="{background: color}" class="btn" @click="navigate" role="link"> {{value}} </button>
</router-link>
</template>

<script>
export default {
    name:"NavButton",
    props:{
        url: {
            type: String,
            default: "/results"
        },
        value:{
            type: String,
            default: "Button"
        },
        color:{
            type: String,
            default: "black"
        }
    }
}
</script>