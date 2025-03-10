<template>
    <div ref="mapContainer" class="w-screen h-screen">

    </div>
    <n-button class="z-50" @click="resume"> asdsad</n-button>
    {{ coords }}
</template>

<script setup>
import { useGeolocation } from '@vueuse/core'
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet's CSS is included

// Reference to the map container
const mapContainer = ref(null);
const { coords, locatedAt, error, resume, pause } = useGeolocation()
onMounted(() => {
    // Initialize the map
    const map = L.map(mapContainer.value).setView([-6.981874, 108.503279], 13); // Initial position and zoom

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a custom marker
    const customIcon = L.icon({
        iconUrl: 'https://res.cloudinary.com/dfjruncxv/image/upload/v1741309568/lab_baweeo.jpg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    L.marker([coords.value.latitude, coords.value.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup('Custom marker')
        .openPopup();
});
</script>
