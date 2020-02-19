<template lang="pug">
  .p-result(v-if="latitude")
    h1 Result Page.
    div(v-if="latitude")
      h2 現在地
      p {{ latitude }},{{ longitude }}
    transition
      transition-group
        div(
          v-show = "isShown"
          key = "res-map"
          )
          div
            #map
        div(
          v-show = "!isShown"
          key = "res-loading"
          )
          Loading
    router-link(to="/") home
</template>

<script>
import axios from 'axios';
import Loading from '@/components/atoms/Loading.vue';

export default {
  name: 'redult',
  data: function() {
    return {
      pos: '',
      latitude: null,
      longitude: null,
      places: [],
      locations: null,
      map: null,
      isShown: false,
    }
  },
  components: {
    Loading
  },
  mounted: function() {
    this.getPosition();
  },
  methods: {
    getPosition: function() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let coords = position.coords;
          // 緯度経度だけ取得
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
          this.getPositions();
        },
        (error) => {
          console.log(error);
        }
      )
    },
    getPositions: async function() {
      await this.getPlaces();
      if(this.locations) {
        this.initMap();
      }
    },
    getPlaces: function() {
      if(this.latitude) {
        axios.get('https://heiness.net/nearby-eatry/api',
          {
            params: {
              key: process.env.VUE_APP_API_KEY,
              lat: this.latitude,
              lng: this.longitude,
            }
          }
        )
        .then(response => {
          this.places = response.data.results;
          this.locations = this.places.map(x => {
            return Object.assign(
              { "name": x.name },
              x.geometry.location
            );
          });
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    initMap: function () {
      // 中心データ
      let zoom = 17;
      let marker = [];
      let infoWindow = [];
      let center = {
        lat: this.latitude,
        lng: this.longitude
      };
      // 地図の作成
      let mapLatLng = new google.maps.LatLng({
        lat: this.locations[0]['lat'],
        lng: this.locations[0]['lng']
      }); // 緯度経度のデータ作成
      let map = new google.maps.Map(document.getElementById('map'), {
        center: mapLatLng,
        zoom  : zoom
      });

      // マーカー毎の処理
      for (var i = 0; i < this.locations.length; i++) {
        let markerLatLng = new google.maps.LatLng({
          lat: this.locations[i]['lat'],
          lng: this.locations[i]['lng']
        }); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map
        });
      }
      setTimeout(() => {
        this.isShown = true;
      }, 1000);
    },
  }
}
</script>

<style lang="scss">
  #map {
     width: 100%;
     height: 400px;
     background-color: grey;
   }
</style>
