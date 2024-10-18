import { MeshReflectorMaterial, OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'

document.body.insertAdjacentHTML('beforeend', `
  <style>
    @font-face {
      font-family: "Redcollar";
      src: 
        local("Redcollar"), 
        url("/fonts/redcollar-400.woff2") format("woff2");
      font-weight: 400;
    }

    @font-face {
      font-family: "TT Commons";
      src: 
        local("TT Commons")
        url("/fonts/tt-commons-400.woff2") format("woff2");
      font-weight: 400;
    }

    body {
      margin: 0;
    }

    .description {
      position: fixed;
      left: 24px;
      bottom: 24px;
    }

    .description h1 {
      margin: 0;
      font-family: "Redcollar";
      font-weight: 400;
    }

    .description p {
      margin: 0;
      margin-top: 8px;
      font-family: "TT Commons";
      font-weight: 400;
      letter-spacing: 0.5px;
      color: #808080;
    }
  </style>

  <div id="app"></div>  
`)

const Scene = () => {
  return (
    <group>
      <pointLight intensity={10} />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial wireframe color="red" />
        <Text font='/public/fonts/redcollar-400.woff' fontSize={0.3} color="white">MAX</Text>
      </mesh>

      <mesh rotation-x={Math.PI / 2 * -1} position-y={-1}>
        <planeGeometry args={[3, 3]} />
        <MeshReflectorMaterial mirror={1} resolution={2000} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

const App = () => {
  return (
    <section>
      <Canvas style={{ height: '100vh' }} camera={{position: [3, 3, 3]}}>
        <OrbitControls />
        <Scene />
      </Canvas>

      <div className='description'>
        <h1>Text & Reflections</h1>
        <p>Technique to use custom fonts <br/>and reflections right in your canvas.</p>
      </div>
    </section>
  )
}

const root = createRoot(document.body.querySelector('#app') as HTMLDivElement)
root.render(<App />)