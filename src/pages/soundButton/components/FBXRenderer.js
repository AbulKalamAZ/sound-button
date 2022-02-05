import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import "./OBJRenderer.css";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import * as controlActionCreator from "../../../store/actions/control_actions";

import imgPosX from "../../../assets/posx.jpg";
import imgNegX from "../../../assets/negx.jpg";
import imgPosY from "../../../assets/posy.jpg";
import imgNegY from "../../../assets/negy.jpg";
import imgPosZ from "../../../assets/posz.jpg";
import imgNegZ from "../../../assets/negz.jpg";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

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
      backgroundColor,
      backgroundImageForScene,
      lightColor,
      luminosityLight,
      playAnimationInLoop,
      positionLeft,
      positionBottom,
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
      directionalLight,
      light,
      light2,
      light3,
      light4,
      controls,
      backgroundLoader,
      texture,
      plane,
      animationMixers,
      listener,
      sound,
      audioLoader;

    // Explixitly setting body backgrundColor property

    if (backgroundImageForScene) {
      document.querySelector(
        "body"
      ).style.background = `url(${backgroundImageForScene})`;
      document.querySelector("body").style.backgroundaAttachment = "fixed";

      document.querySelector("body").style.backgroundRepeat = "no-repeat";
      document.querySelector("body").style.backgroundSize = "cover";
      document.querySelector("body").style.backgroundPosition = "center center";
    } else {
      document.querySelector("body").style.backgroundColor = backgroundColor;
    }

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

    directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 100, 0);
    directionalLight.castShadow = true;

    if (!noBackground) scene.add(light);

    if (lightColor) {
      light = new THREE.PointLight(lightColor, luminosityLight);
      light.position.set(0, 300, 500);
      scene.add(light);

      light2 = new THREE.PointLight(lightColor, luminosityLight);
      light2.position.set(500, 100, 0);
      scene.add(light2);

      light3 = new THREE.PointLight(lightColor, luminosityLight);
      light3.position.set(0, 100, -500);
      scene.add(light3);

      light4 = new THREE.PointLight(lightColor, luminosityLight);
      light4.position.set(-500, 300, 0);
      scene.add(light4);
    }

    // Creating a Audio Listener and adding it to the camera

    if (audios) {
      listener = new THREE.AudioListener();
      camera.add(listener);

      // Create a global audio source

      sound = new THREE.Audio(listener);

      // Loading the sound and set it as audio object's buffer

      audioLoader = new THREE.AudioLoader();

      audioLoader.load(audios, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(0.5);
        sound.setLoop(!playAnimationInLoop);

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
      // if has position

      if (positionLeft && positionBottom) {
        fbx.position.set(positionBottom, positionLeft, 0);
      } else {
        fbx.position.set(0, 0, 0);
      }

      // Scaling the model

      fbx.traverse((node) => {
        node.castShadow = true;
        if (scale) {
          fbx.scale.setScalar(scale);
        } else {
          fbx.scale.setScalar(0.5);
        }
      });

      if (animationFile) {
        // Loading external animation
        const animation = new FBXLoader();

        animation.load(animationFile, (anim) => {
          try {
            animationMixers = new THREE.AnimationMixer(fbx);

            const animatedModel = animationMixers.clipAction(
              anim.animations[0]
            );
            // For not looping around
            if (playAnimationInLoop) {
              animatedModel.setLoop(THREE.LoopOnce);
              animatedModel.clampWhenFinished = true;
              animatedModel.enable = true;
            }

            const parentContex = getParentContex();

            parentContex.setState({
              animatedModel: animatedModel,
            });
          } catch (err) {
            console.log("error from animation loader at FBXRenderer.js", err);
          }
        });
      } else {
        // if no external animation
        animationMixers = new THREE.AnimationMixer(fbx);
        const animatedModelBUILTIN = animationMixers.clipAction(
          fbx.animations[0]
        );

        // For not looping around
        if (playAnimationInLoop) {
          animatedModelBUILTIN.setLoop(THREE.LoopOnce);
          animatedModelBUILTIN.clampWhenFinished = true;
          animatedModelBUILTIN.enable = true;
        }

        const parentContex = getParentContex();

        parentContex.setState({
          animatedModel: animatedModelBUILTIN,
        });
      }

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
      "resize",
      () => {
        onWindowResize();
      },
      false
    );
  }

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
    // Destructuring state

    const { shouldAnimationPlay, animatedModel, globalSoundInstance } =
      this.state;

    if (shouldAnimationPlay) {
      if (animatedModel) animatedModel.stop();
      if (globalSoundInstance) globalSoundInstance.stop();

      this.setState((prevState) => ({
        shouldAnimationPlay: !prevState.shouldAnimationPlay,
      }));
    } else {
      if (animatedModel) animatedModel.play();
      if (globalSoundInstance) globalSoundInstance.play();

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
