import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './OBJRenderer.css';

import CircularProgress from '@material-ui/core/CircularProgress';

import * as controlActionCreator from '../../../store/actions/control_actions';

import modelBackground from '../../../assets/button_background.png';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class GLBRenderer extends Component {
    constructor(props) {
        super(props);
        this.renderNodeGLB = createRef();
        this.state = {
            isModelLoaded: false,
        };
    }

    componentDidMount() {
        // Destructuring values from props
        const { models } = this.props.buttonInfo;
        // on progress methods
        const onProgress = (xhr) => {
            if (xhr.lengthComputable) {
                if (xhr.loaded === xhr.total) {
                    console.log('Model 100% downloaded');
                    this.setState({
                        isModelLoaded: true,
                    });
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

        let scene, camera, renderer, light, light2, light3, controls;

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

        light = new THREE.AmbientLight(0x666666);
        scene.add(light);

        light2 = new THREE.DirectionalLight(0xdfebff, 1);
        light2.position.set(50, 200, 100);
        light2.position.multiplyScalar(1.3);
        scene.add(light2);

        light3 = new THREE.DirectionalLight(0xdfebff, 1);
        light3.position.set(-50, 200, -100);
        light3.position.multiplyScalar(1.3);
        scene.add(light3);

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
        const { playAudio, pauseAudio, control } = this.props;
        const { playAudioAutomatically } = this.props.buttonInfo;

        if (playAudioAutomatically) {
        } else {
            if (control.playAudio) {
                pauseAudio();
            } else {
                playAudio();
            }
        }
    };

    // handle open modal method

    handleOpenModal = () => {
        if (this.props.buttonInfo.redirectTo) {
            this.props.showIframe();
        }
    };
    render() {
        const { images } = this.props.buttonInfo;
        const { isModelLoaded } = this.state;
        return (
            <div
                ref={this.renderNodeGLB}
                className="model-renderer"
                onClick={this.handlePlayerControl}
                onDoubleClick={this.handleOpenModal}
            >
                {!isModelLoaded ? (
                    <CircularProgress
                        size={80}
                        className="model-loader-indicator"
                        color="primary"
                    />
                ) : null}
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
        showIframe: () => dispatch(controlActionCreator.showIframe()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GLBRenderer);
