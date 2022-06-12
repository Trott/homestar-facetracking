import { OBJLoader } from 'https://unpkg.com/three@0.136.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.136.0/examples/jsm/loaders/MTLLoader.js';

const THREE = window.MINDAR.FACE.THREE;
document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const anchor = mindarThree.addAnchor(360);

    const mtlloader = new MTLLoader();
    mtlloader.load('./head.mtl', (materials) => {
      materials.preload();

      const loader = new OBJLoader();
      loader.setMaterials(materials);

      loader.load(
        './head.obj',
        // called when resource is loaded
        function ( head ) {
          // scene.add( head.scene );
          anchor.group.add(head);
          head.scale.set(5, 5, 5);
          console.log('added')
        },
        // called when loading is in progresses
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
          console.log( 'An error happened' );
        }
      );
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
