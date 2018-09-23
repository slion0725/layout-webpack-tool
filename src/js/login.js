if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
import "../css/login.css";

import $ from "jquery";
import "bootstrap";
import Vue from "vue";
import example from "../vue/ExampleComponent.vue";

Vue.component("v-example", example);

new Vue({
  el: "#app"
});
