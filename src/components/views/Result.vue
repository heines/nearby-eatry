<template lang="pug">
  .p-result
    h1 Result Page.
    div(
      v-if="address"
      )
      h2 現在地
      p {{ address }}
    div(
      v-if="isError"
      )
      |{{ isError }}
      br
      |{{ errorLog }}
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
          Loading(
            width='150px'
            :isAnime='true'
            )
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
      address: '',
      isError: false,
      errorLog: null,
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
          navigator.geolocation.getCurrentPosition(
            () => {
            	let latlng = {lat: parseFloat(this.latitude), lng: parseFloat(this.longitude)};
            	let geocoder = new google.maps.Geocoder();
            	geocoder.geocode({
            		latLng: latlng
            	}, (results, status) => {
            		if (status == google.maps.GeocoderStatus.OK && results[0].geometry) {
                  let length = results[0].address_components.length;
                  let base = Array.from(results[0].address_components);
                  base[length - 2] = ' ';
                  let address_array = base.reverse();
            			this.address = '〒' + address_array.map(x => x.short_name).join('');
            		}
            	});
            },
            (error) => {
              this.isError = 1;
              this.errorLog = error.code + ':' + error.message;
            }
          );
          this.getPositions();
        },
        (error) => {
          this.isError += 2;
          if(!this.errorLog) {
            this.errorLog = error.code + ':' + error.message;
          }
        }
      )
    },
    getPositions: async function() {
      await this.getPlaces();
      setTimeout(() => {
        this.initMap();
      }, 5000);
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
          this.isError += 3;
          if(!this.errorLog) {
            this.errorLog = JSON.stringify(error);
          }
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
      this.isShown = true;
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
