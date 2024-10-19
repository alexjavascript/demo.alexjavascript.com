'use strict'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
    }
  </style>

  <div id="app"></div>
`)

const Scene = () => {
  const { position: { x, y, z}, color, visible } = useControls('Box', {
    position: {
      value: {x: 0, y: 0, z: 0},
      min: -2,
      max: 2,
      step: 0.01
    },
    color: '#ff0000',
    clickMe: button(() => console.log('Click!')),
    choise: { options: [ 'a', 'b', 'c' ]},
    interval: {
      min: 0,
      max: 10,
      value: [3, 7]
    },
    visible: true
  })

  console.log('rerender Scene')
  
  return (
    <group>
      <mesh position={[ x, y, z]} visible={visible}>
        <boxGeometry />
        <meshBasicMaterial color={color}/>
      </mesh>
    </group>
  )
}

const Performance = () => {
  const { visible, position } = useControls('Performance Monitor', {
    visible: true,
    position: { options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']}
  })

  if (!visible) {
    return null
  } 

  return (
    <Perf position={position}/>
  )
}

const App = () => {
  console.log('render App')
  return (
    <StrictMode>
      <Leva collapsed={false} />
      
      <Canvas style={{ height: '100vh' }}>
        <OrbitControls />
        <Performance />
        <Scene />
      </Canvas>
    </StrictMode>
  )
}

const root = createRoot(document.querySelector('#app') as HTMLDivElement)
root.render(<App />)