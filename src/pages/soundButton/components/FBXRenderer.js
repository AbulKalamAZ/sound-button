import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './OBJRenderer.css';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import * as controlActionCreator from '../../../store/actions/control_actions';

import imgPosX from '../../../assets/posx.jpg';
import imgNegX from '../../../assets/negx.jpg';
import imgPosY from '../../../assets/posy.jpg';
import imgNegY from '../../../assets/negy.jpg';
import imgPosZ from '../../../assets/posz.jpg';
import imgNegZ from '../../../assets/negz.jpg';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

class FBXRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModelLoaded: false,
      shouldAnimationPlay: false,
      animatedModel: null,
      globalSoundInstance: null,
    };
    this.renderNodeFBX = createRef();
  }

  componentDidMount() {
    // on window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const activateControlButton = () => {
      this.setState({
        isModelLoaded: true,
      });
    };

    const getParentContex = () => {
      return this;
    };

    // Destructuring values from props
    const {
      models,
      audios,
      animationFile,
      changeBackground,
      noBackground,
      scale,
      posX,
      posY,
      posZ,
      negX,
      negY,
      negZ,
    } = this.props.buttonInfo;

    let scene,
      camera,
      renderer,
      light,
      light2,
      light3,
      controls,
      backgroundLoader,
      texture,
      plane,
      animationMixers,
      listener,
      sound,
      audioLoader;

    // Creating renderer

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: noBackground ? true : false,
    });

    // Configuring renderer

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    this.renderNodeFBX.current.appendChild(renderer.domElement);

    // Creating a scene
    scene = new THREE.Scene();

    // Creating camera
    camera = new THREE.PerspectiveCamera(60, 1920 / 1080, 1.0, 1000.0);

    camera.position.set(0, 90, 200);

    // Creating light source

    light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(50, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;

    if (!noBackground) scene.add(light);

    light2 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light2);

    light3 = new THREE.HemisphereLight(0x6b6b6b, 0x080820, 1);
    scene.add(light3);

    // Creating a Audio Listener and adding it to the camera

    listener = new THREE.AudioListener();
    camera.add(listener);

    // Create a global audio source

    sound = new THREE.Audio(listener);

    // Loading the sound and set it as audio object's buffer

    audioLoader = new THREE.AudioLoader();

    if (audios) {
      audioLoader.load(audios, (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);

        // Getting parent context and updating the state
        const parentContex = getParentContex();

        parentContex.setState({
          globalSoundInstance: sound,
        });
      });
    }

    // Configuring loader

    let loader = new FBXLoader();

    loader.load(models, function (fbx) {
      fbx.traverse((node) => {
        node.castShadow = true;
        if (scale) {
          fbx.scale.setScalar(scale);
        } else {
          fbx.scale.setScalar(0.5);
        }
      });

      // Loading animation
      const animation = new FBXLoader();

      animation.load(animationFile, (anim) => {
        try {
          animationMixers = new THREE.AnimationMixer(fbx);

          const animatedModel = animationMixers.clipAction(anim.animations[0]);
          const parentContex = getParentContex();

          parentContex.setState({
            animatedModel: animatedModel,
          });
        } catch (err) {
          console.log('error from animation loader at FBXRenderer.js', err);
        }
      });

      activateControlButton();
      scene.add(fbx);
    });

    // wrapper.position.set(0, 0, 0);
    // wrapper.rotation.x = (90 / 180) * Math.PI;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 20, 0);

    controls.update();

    // Background loader
    backgroundLoader = new THREE.CubeTextureLoader();

    // Checking whether user sent background image or not
    if (changeBackground) {
      if (posX && posY && posZ && negX && negY && negZ) {
        texture = backgroundLoader.load([posX, negX, posY, negY, posZ, negZ]);
      } else {
        texture = backgroundLoader.load([
          imgPosX,
          imgNegX,
          imgPosY,
          imgNegY,
          imgPosZ,
          imgNegZ,
        ]);
      }
    } else {
      texture = backgroundLoader.load([
        imgPosX,
        imgNegX,
        imgPosY,
        imgNegY,
        imgPosZ,
        imgNegZ,
      ]);
    }

    scene.background = !noBackground && texture;

    // Creating plane

    plane =
      !noBackground &&
      new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0x202020,
        })
      );

    if (!noBackground) {
      plane.castShadow = true;
      plane.receiveShadow = true;
      plane.rotation.x = -Math.PI / 2;
      plane.position.set(0, 0, 0);
      scene.add(plane);
    }

    //animate method
    // let delta = 0;
    const clock = new THREE.Clock();
    function animate() {
      let delta = clock.getDelta();

      if (animationMixers) {
        animationMixers.update(delta);
      }
      // if (!rotateModelByMouse) wrapper.rotation.y += 0.01;
      renderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(animate);
    }

    animate();

    // On window resize
    window.addEventListener(
      'resize',
      () => {
        onWindowResize();
      },
      false
    );
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
      if (this.props.buttonInfo.openLinkInAniFrame) {
        this.props.showIframe();
      } else {
        window.open(this.props.buttonInfo.redirectTo);
      }
    }
  };

  // plays animation and sound

  controlAnimation = () => {
    if (this.state.shouldAnimationPlay) {
      if (this.state.animatedModel) this.state.animatedModel.stop();
      if (this.state.globalSoundInstance) this.state.globalSoundInstance.stop();

      this.setState((prevState) => ({
        shouldAnimationPlay: !prevState.shouldAnimationPlay,
      }));
    } else {
      if (this.state.animatedModel) this.state.animatedModel.play();
      if (this.state.globalSoundInstance) this.state.globalSoundInstance.play();

      this.setState((prevState) => ({
        shouldAnimationPlay: !prevState.shouldAnimationPlay,
      }));
    }
  };

  render() {
    return (
      <div
        ref={this.renderNodeFBX}
        className='model-renderer'
        onClick={this.handlePlayerControl}
        onDoubleClick={this.handleOpenModal}
      >
        <div className='control-button'>
          <Button
            variant='contained'
            size='large'
            onClick={this.controlAnimation}
            disabled={!this.state.isModelLoaded}
          >
            {this.state.shouldAnimationPlay ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FBXRenderer);
