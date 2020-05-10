<template>
    <div class="note">
        <h3> 
            {{note.description}}
        </h3>
        <input type="text" v-model="description">
        <button v-on:click="updateNote(note.id)">Enregistrer</button>
        <button v-on:click="deleteNote(note.id)">Effacer</button>
    </div> 
</template>
<script>
    export default {
        name: 'Note',
        props: ['note'],
        data() {
            return {
                description:"", 
            }
        },
        methods: {
            updateNote(id) {
            this.$emit('event_update',{ description: this.description, id: id})
            },
            deleteNote(notes_id){
                this.$emit('event_delete', notes_id);
            },
        }
    }
</script>
<style>
    .note {
        background-color: lightgrey;
    }
</style>