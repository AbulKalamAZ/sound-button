import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './OBJRenderer.css';

import * as controlActionCreator from '../../../store/actions/control_actions';

import modelBackground from '../../../assets/button_background.png';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class GLBRenderer extends Component {
    constructor(props) {
        super(props);
        this.renderNodeGLB = createRef();
    }

    componentDidMount() {
        // Destructuring values from props
        const { models } = this.props.buttonInfo;
        // on progress methods
        const onProgress = (xhr) => {
            if (xhr.lengthComputable) {
                if (xhr.loaded === xhr.total) {
                    console.log('Model 100% downloaded');
                }
            }
        };

        // on error methods
        const onError = (error) => {
            console.log(error);
        };

        //load method
        const loadModel = () => {
            setTimeout(function () {
                wrapper.add(head);
                scene.add(wrapper);
            }, 10);
        };

        let scene,
            camera,
            renderer,
            light,
            light2,
            light3,
            light4,
            light5,
            light6,
            controls;

        // Creating a scene
        scene = new THREE.Scene();

        // Creating camera
        camera = new THREE.PerspectiveCamera(
            10,
            window.innerWidth / (window.innerHeight * 0.9),
            1,
            1500
        );

        camera.position.set(0, 250, 500);

        // Creating light source

        light = new THREE.DirectionalLight(0xffffff, 0.3);
        light.position.set(200, 0, 0);
        scene.add(light);

        light2 = new THREE.DirectionalLight(0xffffff, 0.3);
        light2.position.set(-200, 0, 0);
        scene.add(light2);

        light3 = new THREE.DirectionalLight(0xffffff, 0.3);
        light3.position.set(0, 200, 0);
        scene.add(light3);

        light4 = new THREE.DirectionalLight(0xffffff, 0.3);
        light4.position.set(0, -200, 0);
        scene.add(light4);

        light5 = new THREE.DirectionalLight(0xffffff, 0.3);
        light5.position.set(0, 200, 0);
        scene.add(light5);

        light6 = new THREE.DirectionalLight(0xffffff, 0.3);
        light6.position.set(0, -200, 0);
        scene.add(light6);

        // Creating renderer

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight * 0.9);

        // Configuring renderer

        this.renderNodeGLB.current.appendChild(renderer.domElement);

        // Configuring loader

        let head;

        let manager = new THREE.LoadingManager(loadModel);

        let loader = new GLTFLoader(manager);

        let wrapper = new THREE.Object3D();

        loader.load(
            models,
            function (obj) {
                head = obj.scene;
            },
            onProgress,
            onError,
            null,
            false
        );

        wrapper.position.set(0, 0, 0);
        // wrapper.rotation.x = (90 / 180) * Math.PI;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableRotate = true;
        controls.minDistance = 1;
        controls.maxDistance = 1000;

        //anmate method
        // let delta = 0;
        function animate() {
            // wrapper.rotation.y += 0.025;
            renderer.render(scene, camera);
            controls.update();

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Handle audio player control
    handlePlayerControl = () => {
        const { showFrame, playAudio, pauseAudio, control } = this.props;
        const { playAudioAutomatically } = this.props.buttonInfo;

        if (playAudioAutomatically) {
            if (!control.showFrame) {
                showFrame();
            }
        } else {
            if (control.playAudio) {
                pauseAudio();
            } else {
                playAudio();
            }
        }
    };
    render() {
        const { images } = this.props.buttonInfo;

        return (
            <div
                ref={this.renderNodeGLB}
                className="model-renderer"
                onClick={this.handlePlayerControl}
            >
                <img
                    src={images ?? modelBackground}
                    className="model-bg-img"
                    alt="default background media"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        control: state.control,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playAudio: () => dispatch(controlActionCreator.playAudio()),
        pauseAudio: () => dispatch(controlActionCreator.pauseAudio()),
        showFrame: () => dispatch(controlActionCreator.showFrame()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GLBRenderer);
