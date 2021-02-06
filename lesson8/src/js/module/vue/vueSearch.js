import Vue from "../../vue";

/**
 * VUE Component header menu
 */
Vue.component('app-search', {
    template: `
    <div class="d-flex m-sm-2 mb-0">
      <input class="form-control me-2 search m-1 m-sm-0" placeholder="поиск товаров" v-model="searchLine" @input="$emit('input',searchLine)" v-on:keyup.enter="search">
      <button class="btn btn-outline-success back mx-sm-2 m-1" @click="search">поиск</button>
    </div>
    `,

    props: {
        search: Function,
        value: String
    },
    data() {
        return {
            searchLine: this.value
        }
    },
    watch: {
        value(newValue) {
            this.searchLine = newValue
        }
    }
})