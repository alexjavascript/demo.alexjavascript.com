import { Html, OrbitControls, PivotControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { createRoot } from 'react-dom/client'

document.body.insertAdjacentHTML('beforeend', `
  <style>
    @font-face {
      font-family: "Red Collar";
      src: url("/public/fonts/redcollar-400.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: "TT Commons";
      src: url("/public/fonts/tt-commons-400.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
    }

    body {
      margin: 0;
    }

    .object-label {
      display: flex;
      flex-direction: column;
    }
    
    .object-label__title {
      margin: 0;
      margin-top: 8px;
      font-family: "Red Collar";
      font-size: 24px;
      font-weight: 400;
      color: #000000;
    }

    .object-label__eyebrow {
      order: -1;
      margin: 0;
      margin-top: 16px;
      font-family: "TT Commons";
      font-size: 12px;
      font-weight: 400;
      color: #7e7e7e;
    }

    .object-label__avatar {
      order: -2;
      display: block;
      width: 100px;
      height: auto;
      border-radius: 8px;
    }

    .object-label__avatar--big {
    width: 150px;
    }

    .object-label__avatar--small {
      width: 50px;
    }
  </style>  

  <div id="app"></div>
`)

const Scene = () => {
  return (
    <group>
      <PivotControls lineWidth={1} anchor={[0, 0, 0]} scale={2} >
        <mesh position={[-1, 0, 0]}>
          <sphereGeometry />
          <meshBasicMaterial wireframe color="gray" />
          <Html position={[0, 0.5, 0]} distanceFactor={6}>
            <article className="object-label">
              <h1 className="object-label__title">Sphere</h1>
              <p className="object-label__eyebrow">Object: A</p>
              <img className="object-label__avatar object-label__avatar--big" src="/public/images/eyes.gif" />
            </article>
          </Html>
        </mesh>
      </PivotControls>

      <PivotControls lineWidth={1} anchor={[0, 0, 0]} scale={2} >
        <mesh position={[1, 0, 0]}>
          <capsuleGeometry args={[0.5, 2]} />
          <meshBasicMaterial wireframe color="tomato" />
          <Html position={[0, 0.5, 0]} distanceFactor={6}>
            <article className="object-label">
              <h1 className="object-label__title">Capsule</h1>
              <p className="object-label__eyebrow">Object: B</p>
              <img className="object-label__avatar object-label__avatar--small" src="/public/images/redcollar-logotype.svg" />
            </article>
          </Html>
        </mesh>
      </PivotControls>
    </group>
  )
}

const App = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <OrbitControls makeDefault />
      <Scene />
    </Canvas>
  )
}

createRoot(document.querySelector('#app') as HTMLDivElement).render(<App />)