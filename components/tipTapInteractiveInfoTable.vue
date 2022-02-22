<template>
  <div>
    <div
        v-if="dialog"
        id="myModal"
        class="modal"
        @click="closeModalWhenClickedOutside"
    >
      <div class="modal-content">
        <div>
          <span
              class="close"
              @click="closeDialog"
          >
            &times;
          </span>
        </div>
        <div>
          <table>
            <tr>
              <th class="text-center">
                Short Key
              </th>
              <th class="text-center">
                Result
              </th>
            </tr>
            <tr
                v-for="(item, index) in renderedShortKeys"
                :key="index"
            >
              <td class="text-center">
                <div
                    v-for="(img, index) in renderShortKeysImages(item.shortKey)"
                    :key="index"
                >
                  <div style="float: left">
                    <img
                        :src="img"
                        width="50"
                    >
                  </div>
                  <div
                      v-if="index < renderShortKeysImages(item.shortKey).length - 1"
                      style="float: left; position: relative; top: 7px;"
                  >
                    +
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div
                    v-html="renderItems(item.insert)"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import katex from 'katex'
import {katexShortkeys} from './formula/KatexShortkeys'

export default {
  name: 'InfoTable',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      renderedShortKeys: [],
      shortKeyImages: [],
      keyBoardKeys: {
        space: 'images/keyBoardKeys/space.png',
        ctrl: 'images/keyBoardKeys/ctrl.png',
        alt: 'images/keyBoardKeys/alt.png',
        T: 'images/keyBoardKeys/T.png',
        A: 'images/keyBoardKeys/A.png',
        W: 'images/keyBoardKeys/W.png',
        I: 'images/keyBoardKeys/I.png',
        P: 'images/keyBoardKeys/P.png',
        F: 'images/keyBoardKeys/F.png',
        R: 'images/keyBoardKeys/R.png',
        H: 'images/keyBoardKeys/H.png',
        L: 'images/keyBoardKeys/L.png',
        J: 'images/keyBoardKeys/J.png',
        Q: 'images/keyBoardKeys/Q.png',
        E: 'images/keyBoardKeys/E.png',
        S: 'images/keyBoardKeys/S.png',
        D: 'images/keyBoardKeys/D.png',
        B: 'images/keyBoardKeys/B.png',
        M: 'images/keyBoardKeys/M.png',
        K: 'images/keyBoardKeys/K.png',
        U: 'images/keyBoardKeys/U.png',
        G: 'images/keyBoardKeys/G.png',
        digit0: 'images/keyBoardKeys/0.png',
        digit1: 'images/keyBoardKeys/1.png',
        digit2: 'images/keyBoardKeys/2.png',
        digit3: 'images/keyBoardKeys/3.png',
        digit4: 'images/keyBoardKeys/4.png',
        digit5: 'images/keyBoardKeys/5.png',
        digit6: 'images/keyBoardKeys/6.png',
        digit7: 'images/keyBoardKeys/7.png',
        digit8: 'images/keyBoardKeys/8.png',
        digit9: 'images/keyBoardKeys/9.png',
        Numpad0: 'images/keyBoardKeys/0.png',
        Numpad1: 'images/keyBoardKeys/1.png',
        Numpad2: 'images/keyBoardKeys/2.png',
        Numpad3: 'images/keyBoardKeys/3.png',
        Numpad4: 'images/keyBoardKeys/4.png',
        Numpad5: 'images/keyBoardKeys/5.png',
        Numpad6: 'images/keyBoardKeys/6.png',
        Numpad7: 'images/keyBoardKeys/7.png',
        Numpad8: 'images/keyBoardKeys/8.png',
        Numpad9: 'images/keyBoardKeys/9.png',
      },
    }
  },
  created() {
    this.renderedShortKeys = katexShortkeys
    this.renderShortKeysImages('ctrl+alt+[KeyT]]')
    // console.log(this.shortKeyImages)
  },
  mounted() {
  },
  computed: {
    renderItems() {
      return (string) => {
        return katex.renderToString(string)
      }
    },
    renderShortKeysImages() {
      return (string) => {
        const shortKeyImages = []
        if (string.search('ctrl') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.ctrl)
        }
        if (string.search('Space') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.space)
        }
        if (string.search('alt') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.alt)
        }
        if (string.search('KeyT') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.T)
        }
        if (string.search('KeyA') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.A)
        }
        if (string.search('KeyW') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.W)
        }
        if (string.search('KeyI') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.I)
        }
        if (string.search('KeyP') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.P)
        }
        if (string.search('KeyF') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.F)
        }
        if (string.search('KeyR') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.R)
        }
        if (string.search('KeyH') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.H)
        }
        if (string.search('KeyL') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.L)
        }
        if (string.search('KeyJ') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.J)
        }
        if (string.search('KeyQ') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Q)
        }
        if (string.search('KeyE') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.E)
        }
        if (string.search('KeyS') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.S)
        }
        if (string.search('KeyD') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.D)
        }
        if (string.search('KeyB') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.B)
        }
        if (string.search('KeyM') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.M)
        }
        if (string.search('KeyK') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.K)
        }
        if (string.search('KeyU') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.U)
        }
        if (string.search('KeyG') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.G)
        }
        if (string.search('Digit0') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit0)
        }
        if (string.search('Digit1') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit1)
        }
        if (string.search('Digit2') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit2)
        }
        if (string.search('Digit3') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit3)
        }
        if (string.search('Digit4') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit4)
        }
        if (string.search('Digit5') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit5)
        }
        if (string.search('Digit6') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit6)
        }
        if (string.search('Digit7') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit7)
        }
        if (string.search('Digit8') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit8)
        }
        if (string.search('Digit9') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit9)
        }
        if (string.search('Numpad0') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad0)
        }
        if (string.search('Numpad1') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad1)
        }
        if (string.search('Numpad2') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad2)
        }
        if (string.search('Numpad3') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad3)
        }
        if (string.search('Numpad4') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad4)
        }
        if (string.search('Numpad5') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad5)
        }
        if (string.search('Numpad6') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad6)
        }
        if (string.search('Numpad7') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad7)
        }
        if (string.search('Numpad8') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad8)
        }
        if (string.search('Numpad9') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad9)
        }
        return shortKeyImages
      }
    }


  },
  methods: {
    closeDialog() {
      this.$emit('closedialog')
    },
    closeModalWhenClickedOutside(event) {
      let modal = document.getElementById('myModal');
      if (event.target === modal) {
        this.closeDialog()
      }
    },
  }
}
</script>

<style scoped>
.text-center {
  text-align: center !important;
}
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 530px;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 510px;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
