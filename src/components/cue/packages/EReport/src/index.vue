<script>
import hdGrid from "../../Egrid/src/egrid.vue";
import hdReport from "../../Report/src/index.vue";
export default {
    name: "HdEReport",
    mixins: [hdReport], //混合hdReport
    components: { hdGrid },
}
</script>
