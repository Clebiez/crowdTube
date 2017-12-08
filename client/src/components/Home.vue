<template>
        <div class="home">
            <md-input-container>
                <label>Entre ta vidéo gros !</label>
                <md-input v-model="searchInput" placeholder="Fatal bazooka feat Vito"></md-input>
            </md-input-container>
            <md-button class="md-raised md-primary"
                v-on:click="searchSongs()"
            >
                Rechercher
            </md-button>

            <div class="results">
                <div class="result" v-for="song in songs">
                <md-card>
                  <md-card-media>
                    <img :src="song.thumbnails.medium.url" alt="Song">
                  </md-card-media>

                  <md-card-header>
                    <div class="md-subheader">{{song.title}}</div>
                  </md-card-header>

                  <md-card-actions>
                    <md-button class="md-raised"
                        v-on:click="addSong(song)"
                    >
                        Ajouter
                    </md-button>
                  </md-card-actions>
              </md-card>
                    <img  alt="">
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            searchInput: '',
            msg: 'Welcome to Your Vue.js App',
            songs: []
        }
    },
    methods: {
        searchSongs() {
            this.$http.get('http://localhost:3000/search?q=' + this.searchInput).then(res => {
                this.songs = res.body;
            });
        },
        addSong(song) {
            song.url = 'https://www.youtube.com/embed/' + song.id + '?autoplay=true'
            this.$http.post('http://localhost:3000/playlist', {song});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.result {
    width: 300px;
    margin: 20px;
    display: inline-block;
}
.home {
    width: 100%;
    padding: 50px;
}
</style>
