<template>
        <div class="player" v-if="this.currentSong">
            <h2>{{this.currentSong.title}}</h2>

            <div class="youtube-player">
                <youtube :video-id="this.currentSong.id" :player-vars="{ autoplay: 1 }" @ended="nextSong()"></youtube>
            </div>

            <h2>Playlist songs</h2>

            <div class="results">
                <div class="result" v-for="(song, index) in songs"
                    @click="change(index)"
                >
                    {{song.title}}
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Player',
    data () {
        return {
            songs: [],
            index: 0,
            currentSong: ''
        }
    },
    created () {
        this.getPlaylist()
    },
    methods: {
        getPlaylist() {
            this.$http.get('http://localhost:3000/playlist').then(res => {
                const isFirstGet = this.songs.length === 0;
                this.songs = res.body;
                if (isFirstGet) {
                    this.change();
                }

                setTimeout(this.getPlaylist, 10000);
            });
        },
        change(i = 0) {
            this.index = i;
            this.currentSong = this.songs[i];
        },
        nextSong() {
            if (this.index === this.songs.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }

            this.change(this.index);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .youtube-player {
        width: 200px;
        text-align: center;
        margin: auto;
    }
    .result {
        font-size: 1.3rem;
        background-color: teal;
        color: white;
        padding: 20px;
        width: 80%;
        text-align: left;
        min-width: 320px;
        margin: 20px auto;
        cursor: pointer;
    }
</style>
