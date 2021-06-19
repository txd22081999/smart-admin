import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxMarkers from 'mapbox-gl-markers'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './Mapbox.scss'

const MAPBOX_TOKEN = `pk.eyJ1IjoidHhkMjIwOCIsImEiOiJja3EzbHp1anAwOXYyMndtbDB0dXJydm4yIn0.jM_t_wNf5iPs75xaBmigOQ`
mapboxgl.accessToken = MAPBOX_TOKEN

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: true, // Do not use the default marker style
})

const Mapbox = (props) => {
  const { handleMapMove = () => {}, defaultLat, defaultLng } = props

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(defaultLng)
  const [lat, setLat] = useState(defaultLat)
  const [zoom, setZoom] = useState(14)
  // 10.762913 106.6799777,17

  useEffect(() => {
    if (map.current) return // initialize map only once
    console.log([lng, lat])
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
    map.current.addControl(geocoder)

    map.current.on('move', () => {
      const centerLng = map.current.getCenter().lng.toFixed(4)
      const centerLat = map.current.getCenter().lat.toFixed(4)
      setLng(centerLng)
      setLat(centerLat)
      setZoom(map.current.getZoom().toFixed(2))
      handleMapMove({ lat: parseFloat(centerLat), lng: parseFloat(centerLng) })
    })
  }, [])

  return (
    <div className='Mapbox'>
      <div className='long-lat'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container' />
    </div>
  )
}

export default Mapbox
