<template lang="pug">
  .p-result
    h1 検索結果一覧
    transition
      transition-group
        div(
          v-show = "isShown || isError > 0"
          key = "res-map"
          )
          div(
            v-if="isError"
            )
            |{{ isError }}
            br
            |{{ errorLog }}
          div(
            v-show = "isShown"
            )
            #map
        div(
          v-show = "!isShown && !isError"
          key = "res-loading"
          )
          Loading(
            width='150px'
            :isAnime='true'
            title = "WAIT A MINUTE!"
            )
    div(
      v-if="address"
      )
      h2 現在地
      p {{ address }}
    router-link(
      to = "/"
      ) home
</template>

<script>
import axios from 'axios';
import Loading from '@/components/atoms/Loading.vue';
const currentIcon = require('@/assets/current.png');

export default {
  name: 'redult',
  data: function() {
    return {
      pos: '',
      latitude: null,
      longitude: null,
      places: [],
      marker: [],
      infoWindow: [],
      locations: null,
      map: null,
      isShown: false,
      address: '',
      isError: false,
      errorLog: null,
    }
  },
  props: {
    inputs: {
      type: String
    }
  },
  components: {
    Loading
  },
  mounted: function() {
    this.getPosition();
  },
  methods: {
    getPosition: async function() {
      if(this.inputs) {
        // 入力から周辺情報を取得
        this.getInputPosition();
      } else {
        // 現在地を取得
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            let coords = position.coords;
            // 緯度経度だけ取得
            this.latitude = coords.latitude;
            this.longitude = coords.longitude;
            // 現在地から周辺情報を取得
            this.getCurrentPosition();
          },
          (error) => {
            this.isError += 2;
            if(!this.errorLog) {
              this.errorLog = error.code + ':' + error.message;
            }
          }
        );
      }
    },
    getInputPosition: function() {
      let geocoder = new google.maps.Geocoder();
      if(this.inputs) {
        geocoder.geocode({
          address: this.inputs
        }, (results, status) => {
          if(results.length > 0) {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.getCurrentPosition();
          } else {
            this.isError = true;
            this.errorLog = "一致する住所がありませんでした。";
          }
        });
      }
    },
    getCurrentPosition: function() {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        latLng: {
          lat: parseFloat(this.latitude),
          lng: parseFloat(this.longitude)
        }
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results[0].geometry) {
          let regexp = new RegExp(/[0-9０-９]/);
          let length = results[0].address_components.length;
          let base = Array.from(results[0].address_components);
          base = base.map((x, index) => {
            if(index === length - 2) {
                return ' ';
            } else if(x.short_name && !(index === 0 || index === length - 1)) {
              let end_char = x.short_name.slice(-1);
              return regexp.test(end_char) ? `${x.short_name}-` : x.short_name;
            } else {
              return x.short_name;
            }
          });
          let address_array = base.reverse();
          this.address = '〒' + address_array.join('');
          
          this.getPlaces();
        }
      });
    },
    getPlaces: async function() {
      let destinations = '';
      if(this.latitude) {
        await axios.get('https://heiness.net/nearby-eatry/api/places',
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
              {
                "name": x.name,
                "rating": x.rating,
                "vicinity": x.vicinity,
              },
              x.geometry.location,
            );
          });
          destinations = this.locations.map(x => 
            `${x['lat']},${x['lng']}`
          ).join('|');
        })
        .catch(error => {
          this.isError += 3;
          if(!this.errorLog) {
            this.errorLog = JSON.stringify(error);
          }
        })
        await axios.get('https://heiness.net/nearby-eatry/api/distancematrix',
          {
            params: {
              key: process.env.VUE_APP_API_KEY,
              lat: this.latitude,
              lng: this.longitude,
              dst: destinations
            }
          }
        )
        .then(res => {
          let elements = Array.from(res.data.rows[0].elements);
          let arrayLocations = this.locations.map((x, index) => {
            x.distance = elements[index].distance.text;
            x.duration = elements[index].duration.text;
            return x;
          })
          this.initMap();
        })
      }
    },
    initMap: function () {
      // 中心データ
      let center = {
        lat: this.latitude,
        lng: this.longitude
      };
      // 地図作成
      let mapLatLng = new google.maps.LatLng(center);
      let map = new google.maps.Map(document.getElementById('map'), {
        center: mapLatLng,
      });
      
      // ビジネス分野のピンを非表示
      let styleOptions = [{
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }];
      let lopanType = new google.maps.StyledMapType(styleOptions);
      map.mapTypes.set('noText', lopanType);
      map.setMapTypeId('noText');

      // マーカー毎の処理
      let bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.locations.length; i++) {
        let markerLatLng = new google.maps.LatLng({
          lat: this.locations[i]['lat'],
          lng: this.locations[i]['lng']
        });
        this.marker[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map
        });
        // クリック時の説明
        this.infoWindow[i] = new google.maps.InfoWindow({
          content: `
            <div class="v-balloon">
              <span>${this.locations[i]['name']}</span>
              <br />
              ${this.locations[i]['vicinity']}
              <br />
              約 ${this.locations[i]['distance']}
              /
              約 ${this.locations[i]['duration']}
              <br />
              <a
                href = "https://www.google.com/maps/dir/?api=1&destination=${this.locations[i]['lat']},${this.locations[i]['lng']}"
                target = "_blank"
              >経路をGoogle Mapで表示</a>
            </div>
          `
        });
        // 現在地にマーカーを表示
        let myLocation = new google.maps.Marker({
          map: map,
          position: center,
          animation: google.maps.Animation.DROP,
          icon: currentIcon,
          title: '現在地'
        });
        
        this.markerEvent(i);
        bounds.extend(this.marker[i].position);
        map.fitBounds(bounds);       
      }
      this.isShown = true;
    },
    markerEvent: function(i) {
      this.marker[i].addListener('click', () => {
        this.infoWindow[i].open(map, this.marker[i]);
      });
    }
  },
}
</script>

<style lang="scss">
  #map {
    width: 100%;
    height: 400px;
    background-color: grey;
  }
  a {
    display: inline-block;
    margin: 1em;
    &:hover {
      color: #ffd817 !important;
    }
  }
  .v-balloon {
    text-align: left;
    span {
      font-weight: bold;
    }
  }
</style>
