<template>
  <div id="noteslist">
    <h1>Toutes les notes</h1>
    <!-- Formulaire pour créer une note -->
    <form> 
      <input type="text" v-model="note.description">
      <!-- Choix de la zone à la création -->
      <label for="body_zone">Choisir une zone du corps :</label>
      <select name="body_zone" v-model="note.bz_id" required>
          <option value="1">Tête</option>
          <option value="2">Thorax</option>
          <option value="3">Abdomen</option>
          <option value="4">Bras</option>
          <option value="5">Mains</option>
          <option value="6">Jambes</option>
          <option value="7">Pieds</option>
      </select>
      <button v-on:click="postNote">SEND IT</button>
    </form>
    <!-- Afficher toutes les notes -->
    <div v-for="note in noteslist.all_notes" :key="note.description">
    <Note v-bind:note="note" @event_update="update" @event_delete="deletenote"> </Note>
        <!-- https://vuejs.org/v2/guide/list.html -->
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import Note from "./Note.vue";
export default {
    name: 'Noteslist',
    components: { Note},
    data() {
        return {
             note :
             {
             id:0,
             description:"",
             bz_id: 0
             },
            noteslist: [],
            url :"http://localhost:8080/api",
            urn :"http://localhost:8080/api/notes/new",
            urm :"http://localhost:8080/api/zone/modify/",
            uro :"http://localhost:8080/api/zone/delete/"
        };
    },
  methods: {
     get_noteslist() {
       axios.get(this.url)
        .then((response) => {
           this.noteslist = response.data;
           console.log(this.noteslist);
         })
         .catch((error) => {
           console.log(error);
         });
      },
     postNote (){
       axios
        .post(this.urn, this.note)
        .then ((response) => {
          console.log(response.data);
        })
        .catch ((error)=>{
          console.log(error);
        });
      },
     update(note){
       this.note.id=note.id;
       this.note.description = note.description
       axios.put(this.urm+note.id, {description:note.description, id:note.id})
       .then ((response)=> {
         console.log(response.data);}
       )
       .catch ((error)=> {
         console.log(error);
       })
      },
      deletenote(id) {
         axios.delete(this.uro+id)
        .then ((response)=> {
         console.log(response.data);}
        )
        .catch ((error)=> {
          console.log(error);
        })
      }
  },
   mounted() {
    this.get_noteslist();
   },
};
</script>

<style>
#Notes {
    background-color:red;
}
#noteslist {
    background-color: #a2b9bc;
    margin: 10px auto;
    padding: 10px;
    width: 500px;
}
button {
    color: #fff;
    text-decoration: none;
    background: #6b5b95;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    border: none;
}
</style>