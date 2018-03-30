<template>
    <div>
        <v-container fluid grid-list-md grid-list-sm grid-list-xs>
            <mock-template/>
        </v-container>
    </div>
</template>
<script>
import MockTemplate from './template'


export default{

    components: {
        MockTemplate,
    },
    data(){
        return{
            
        }
    }

}

</script>