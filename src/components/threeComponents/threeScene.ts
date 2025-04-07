import { useEffect } from "react";
import * as THREE from "three";
import img from "../../textures/tilesets/simple/tileset_brick_worn.png";

const ThreeScene = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const width = window.innerWidth;
        const height = window.innerHeight;
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const camera = new THREE.OrthographicCamera(
            -width / 2, // left
            width / 2, // right
            height / 2, // top
            -height / 2, // bottom
            0.001, // near
            1000 // far
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff); // мягкое освещение
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xff0000, 1); // направленный свет
        directionalLight.position.set(30, 30, 10).normalize(); // позиция света
        scene.add(directionalLight);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(img);
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            color: new THREE.Color(0xffffff),
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(10, 10, 10);
        // cube.position.set(0, 0б 0);
        scene.add(cube);

        camera.position.z = 130;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
};

export default ThreeScene;
